import { ChatInputApplicationCommandData, ChatInputCommandInteraction, TextChannel } from "discord.js";
import Thread from "../../types/thread.class";

export const data: ChatInputApplicationCommandData = {
    name: "close-thread",
    description: "Close an existing thread"
}

export async function handler(interaction: ChatInputCommandInteraction) {
    const thread = await Thread.ofChannel(interaction.channel as TextChannel);

    if (!thread) {
        await interaction.editReply("This channel is not a modmail channel!")
        return;
    }

    await thread.closeThread();
}