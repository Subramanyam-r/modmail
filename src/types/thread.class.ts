import { Channel, ChannelType, Guild, Message, TextChannel, User } from "discord.js";
import moment from "moment";
import { v4 } from "uuid";
import MessageModel from "../db-models/message.model";
import ThreadModel from "../db-models/thread.model";

export default class Thread {
    user: User;
    channel: TextChannel;
    model: ThreadModel;

    constructor(user: User, channel: TextChannel, model: ThreadModel) {
        this.user = user;
        this.channel = channel;
        this.model = model;
    }

    public static async ofUser(user: User): Promise<Thread | null> {
        const threadModel: ThreadModel | null = await ThreadModel.findOne({
            where: {
                user_id: user.id, status: "OPEN"
            }
        });

        if (!threadModel) return null;

        let channel_id = threadModel.channel_id;
        const channel: Channel | undefined = global.client.channels.cache.get(channel_id);
        if (!channel) {
            threadModel.update({ status: "CLOSED" });
            return null;
        };

        return new Thread(user, channel as TextChannel, threadModel);
    }

    public static async new(user: User): Promise<Thread> {
        global.logger.info(`Creating a new thread for user: ${user.username}`);
        const user_id = user.id;
        const username = (await global.client.users.fetch(user_id)).username;

        const modGuildId = global.config.server;
        const categoryId = global.config.category;

        const modGuild: Guild = await global.client.guilds.fetch(modGuildId);

        const threadChannel: TextChannel = await modGuild.channels.create({
            type: ChannelType.GuildText,
            name: username,
            parent: categoryId
        });

        const threadModel = await ThreadModel.create({
            id: v4(),
            channel_id: threadChannel.id,
            user_id, username,
            status: "OPEN",
            created_at: moment().toISOString()
        });

        return new Thread(user, threadChannel, threadModel);
    }

    public static async ofChannel(channel: TextChannel) {
        const threadModel: ThreadModel | null = await ThreadModel.findOne({
            where: {
                channel_id: channel.id, status: "OPEN"
            }
        });

        if (!threadModel) return null;

        const threadUser = await global.client.users.fetch(threadModel.user_id);

        return new Thread(threadUser, channel, threadModel);
    }

    public async send(user: User, message: string, isModMessage: boolean = false) {
        const sentMessage: Message = await this.channel.send(`**${user.username}**: ${message}`);

        await MessageModel.create({
            id: v4(),
            message_id: sentMessage.id,
            content: message,
            sender_id: user.id,
            sender_username: user.username,
            thread_id: this.model.id,
            is_mod_response: isModMessage,
        });
    }

    public async userMessage(message: string) {
        await this.send(this.user, message)
    }

    public async modMessage(message: Message) {
        await this.send(message.author, message.content, true);
        await this.user.send(`**${message.author.username}**: ${message.content}`);
        await message.delete();
    }

    public async closeThread() {
        global.logger.info(`Closing thread for user: ${this.user.username}`)
        await this.channel.delete();
        await this.model.update({ status: "CLOSED" });
        await this.user.send("Thread Closed!");
    }
}