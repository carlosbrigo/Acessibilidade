import Sequelize from 'sequelize';

import { databaseConfig } from './database-config.js';

import { Local } from '../models/Local.js';

import * as fs from 'fs';

const sequelize = new Sequelize(databaseConfig);

//Inicia Tabelas
Local.init(sequelize);


//Associar em ordem 
Local.associate(sequelize.models);


//Para para de criar automatico
//databaseInserts();

function databaseInserts() {
    (async () => {

        await sequelize.sync({ force: true });

     })();
}

export default sequelize;