import passport from 'passport';
import local from 'passport-local';
import { userModel } from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils/crypto.js';
const LocalStrategy = local.Strategy;

export function configurePassport() {
  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { edad, apellido, nombre } = req.body;
          const userExists = await userModel.findOne({ email: username });
          if (userExists) {
            return done(null, false);
          }
          const newUser = await userModel.create({
            nombre,
            edad,
            apellido,
            email: username,
            password: createHash(password),
          });
          return done(null, newUser);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            console.log('Usuario no existe en el login');
            return done(null, false);
          }
          if (!isValidPassword(password, user.password)) {
            console.log('contraseña incorrecta');
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({ _id: id });
    done(null, user);
  });
}
