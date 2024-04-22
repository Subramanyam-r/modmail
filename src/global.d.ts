import { Client } from "discord.js";
import { ThreadService } from "./services/thread.service";
import { ConfigYaml } from "./types/global.type";
import Logger from "./types/logger.class";

export declare global {
    var client: Client<true>;
    var logger: Logger;
    var config: ConfigYaml;
    var threadService: ThreadService;
}