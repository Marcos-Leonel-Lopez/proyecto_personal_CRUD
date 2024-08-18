/* eslint-disable indent */
import { config } from '../config/config.js';

const persistence = config.persistence.type;

let userPersistence;
// let productPersistence;
// let sessionPersistence;
// let cartPersistence;

switch (persistence) {
    case 'mongo':
        // const{ConnectionDB} = await import('../config/mongooseDB.config.js');
        // ConnectionDB.getInstance();
        // const {ProductMongo} = await import('./managers/mongo/products.mongo.js');
        // productPersistence = new ProductMongo();
        // const {UserMongo} = await import('./managers/mongo/users.mongo.js');
        // userPersistence = new UserMongo();
        // const {SessionMongo} = await import('./managers/mongo/sessions.mongo.js');
        // sessionPersistence = new SessionMongo();
        // const {CartMongo} = await import('./managers/mongo/carts.mongo.js');
        // cartPersistence = new CartMongo();
        break;
    case 'sql': {
        const { MySqlDBConnection } = await import('../config/MySQL.config.js');
        MySqlDBConnection.getInstance();
        const { UserModel } = await import('../models/MySQL/user.models.js');
        userPersistence = UserModel;
        break;
    }
}
// export {productPersistence, userPersistence,sessionPersistence,cartPersistence};
export { userPersistence };
