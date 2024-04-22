import { ChatInputCommandInteraction, Interaction } from "discord.js";
import * as commands from "../app-commands";

export async function handler(interaction: Interaction) {

    if (interaction instanceof ChatInputCommandInteraction) await chatCommandInteractionHandler(interaction);
}

async function chatCommandInteractionHandler(interaction: ChatInputCommandInteraction) {
    const command = Object.values(commands).find(c => c.data.name === interaction.commandName);

    if (!command) return;

    await interaction.deferReply();
    await command.handler(interaction);
}