import { Guild } from "discord.js";

export function handler(guild: Guild) {
    global.logger.info(`New Guild joined, ID: ${guild.id}, Name: ${guild.name}`);
}