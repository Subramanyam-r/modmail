import { Events } from "discord.js";
import { clientReadyHandler, guildCreateHandler, interactionCreateHandler, messageCreateHandler } from "./event-handlers";

global.client.on(Events.ClientReady, clientReadyHandler);

global.client.on(Events.GuildCreate, guildCreateHandler)

global.client.on(Events.MessageCreate, messageCreateHandler);

global.client.on(Events.InteractionCreate, interactionCreateHandler);