import { DMChannel, GuildChannel, Message, TextChannel } from "discord.js";
import Thread from "../types/thread.class";

export async function handler(message: Message) {
    if (message.author.bot) return;
    if (message.channel instanceof DMChannel) await dmHandler(message);
    if (message.channel instanceof GuildChannel) await guildMessageHandler(message);
}

async function dmHandler(message: Message) {
    try {

        let thread: Thread | null = await Thread.ofUser(message.author);
        if (!thread) thread = await Thread.new(message.author);

        await thread.userMessage(message.content);

    } catch (err) {
        global.logger.error(`dmHandler: ${JSON.stringify(err)}`)
    }
}

async function guildMessageHandler(message: Message) {
    const thread = await Thread.ofChannel(message.channel as TextChannel);

    if (!thread) return;

    await thread.modMessage(message);
}