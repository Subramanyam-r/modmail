import { Client, GatewayIntentBits, Partials } from 'discord.js';
import fs from "fs";
import yaml from "js-yaml";
import Logger from './types/logger.class';
// import { ThreadService } from './services/thread.service';
import { ConfigYaml } from './types/global.type';

const client: Client<true> = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

global.client = client;
global.logger = new Logger();

const doc: ConfigYaml = yaml.load(fs.readFileSync('./config.yaml', 'utf8')) as ConfigYaml;
global.config = doc;
