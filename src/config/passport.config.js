// /* eslint-disable indent */
// import passport from 'passport';
// import local from 'passport-local';
// import userModel from '../Dao/models/user.model.js';
// import { createHash, validatePass, date } from '../utils.js';
// import { cartService } from '../repository/index.repository.js';

// const LocalStrategy = local.Strategy;

// const initializePassport = () => {
//     passport.serializeUser((user, done) => {
//         done(null, user._id);
//     });
//     passport.deserializeUser(async (id, done) => {
//         const user = await userModel.findById(id);
//         done(null, user);
//     });

//     passport.use('register', new LocalStrategy(
//         { passReqToCallback: true, usernameField: 'mail' },
//         async (req, username, password, done) => {
//             const newCart = await cartService.addCart();
//             const { first_name, last_name, mail, age } = req.body;
//             const avatar = req.file?.path;
//             try {
//                 const exist = await userModel.findOne({ mail: username });
//                 if (exist) {
//                     req.logger.debug('Usuario existente');
//                     return done(null, false);
//                 }
//                 const user = { first_name, last_name, mail, age, password: createHash(password), cart: newCart.message.payload._id, avatar };
//                 const result = await userModel.create(user);
//                 return done(null, result);
//             } catch (err) {
//                 return done('error al registrar usuario: ' + err);
//             }
//         }
//     ));

//     passport.use('login', new LocalStrategy({ usernameField: 'mail' },
//         async (username, password, done) => {
//             try {
//                 const user = await userModel.findOne({ mail: username });
//                 if (!user) {
//                     return done(null, false);
//                 }
//                 if (!validatePass(password, user)) {
//                     return done(null, false);
//                 }
//                 user.last_connection.login = await date();
//                 await user.save();
//                 return done(null, user);
//             } catch (err) {
//                 return done('error al intentar ingresar: ' + err);
//             }
//         }));
// };

// export default initializePassport;
