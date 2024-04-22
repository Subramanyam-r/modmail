import { ApplicationCommandOptionType, ChatInputApplicationCommandData, ChatInputCommandInteraction, User } from "discord.js";
import Thread from "../../types/thread.class";

export const data: ChatInputApplicationCommandData = {
    name: "create-thread",
    description: "Create a modmail thread with a user.",
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: "user",
            description: "User ID of the user",
            required: true
        }
    ]
}

export async function handler(interaction: ChatInputCommandInteraction) {
    const user: User | null = interaction.options.getUser("user");

    if (!user) {
        interaction.editReply("Invalid User!");
        return;
    }

    global.logger.info(`Creating a new thread for user: ${user.username}`);

    const thread = await Thread.new(user);
    interaction.reply(`Thread Created: ${thread.channel.url}`);
}