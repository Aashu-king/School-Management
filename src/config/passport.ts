// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import bcrypt from 'bcryptjs';
// import { User } from "../database/models/user.model";
// import { Request } from 'express';

// passport.use(new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password'
//     },
//     async (email: string, password: string, done) => {
//       try {
//         const user = await User.findOne({ 
//           where: { email: email.toLowerCase() },
//           include: [{ model: User['associations'].role.target }]
//         });
        
//         if (!user) {
//           return done(null, false, { message: 'Invalid email or password.' });
//         }
        
//         const isMatch = await bcrypt.compare(password, user.passwordHash);
        
//         if (!isMatch) {
//           return done(null, false, { message: 'Invalid email or password.' });
//         }
        
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   ));
  
//   passport.serializeUser((user: any, done) => {
//     done(null, user.userId);
//   });
  
//   passport.deserializeUser(async (id: string, done) => {
//     try {
//       const user = await User.findByPk(id, {
//         include: [{ model: User['associations'].role.target }]
//       });
//       done(null, user);
//     } catch (error) {
//       done(error);
//     }
//   });