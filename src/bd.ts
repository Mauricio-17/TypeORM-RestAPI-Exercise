import {DataSource} from 'typeorm';
import {Car} from "./entities/Car";
import {Client} from "./entities/Client";
import {Revision} from "./entities/Revision";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    username: 'root', 
    password: '1q2w3e4r5t',
    port: 3310,
    database: 'TypeOrmTest',
    entities: [Client, Car, Revision],
    logging: true,
    //synchronize: true, // it will create the same entities time after time
});
