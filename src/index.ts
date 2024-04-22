import { Sequelize } from "sequelize-typescript";
import "./global.init";
import "./listeners";
import { ProcessEnv } from './types/global.type';

const { DISCORD_LOGIN_TOKEN, NODE_ENV } = process.env as ProcessEnv;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/../db.sqlite`,
    models: [__dirname + '/db-models/**/*.model.ts'],
    logging: false
})

sequelize.sync({ alter: true });

global.client.login(DISCORD_LOGIN_TOKEN);