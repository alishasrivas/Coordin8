import { Sequelize } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';

export const dbInstance = new Sequelize({
    dialect: SqliteDialect,
    storage: '../db.sqlite',
});