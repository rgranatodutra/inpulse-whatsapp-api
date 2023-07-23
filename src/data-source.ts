import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath = path.join(__dirname, './entities/**.{ts,js}');
    const migrationsPath = path.join(__dirname, './migrations/**.{ts,js}');

    const databaseURL = process.env.DATABASE_URL;

    if(!databaseURL) {
        throw new Error("Missing enviroment variable: 'DATABASE_URL'");
    };

    return {
        type: 'mysql',
        url: databaseURL,
        synchronize: false,
        logging: false,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    };
};

export const AppDataSource = new DataSource(dataSourceConfig());