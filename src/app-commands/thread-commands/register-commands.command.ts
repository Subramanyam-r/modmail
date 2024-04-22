import { ChatInputApplicationCommandData, ChatInputCommandInteraction } from "discord.js";

export const data: ChatInputApplicationCommandData = {
    name: "register-commands",
    description: "Register the Modmail slash commands",
}

export async function handler(interaction: ChatInputCommandInteraction) {

    interaction.editReply("DONE");
}