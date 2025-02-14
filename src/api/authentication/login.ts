import { Request, Response, NextFunction,RequestHandler } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { User } from '../../database/models/user.model';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

class AuthController {
  constructor() {
    this.initializePassport();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  private initializePassport() {
    passport.use(new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email: string, password: string, done) => {
        try {
          const user = await User.findOne({ 
            where: { email: email.toLowerCase() },
            include: [{ model: User['associations'].role.target }]
          });
          console.log("🚀 ~ AuthController ~ user:", user)
          
          if (!user) {
            return done(null, false, { message: 'You are not registered with us.' });
          }
          
          const isMatch = await bcrypt.compare(password, user.passwordHash);
          
          if (!isMatch) {
            return done(null, false, { message: 'Invalid password.' });
          }
          
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    ));

    passport.serializeUser((user: any, done) => {
      console.log("🚀 ~ AuthController ~ passport.serializeUser ~ user:", user)
      done(null, user.userId);
    });

    passport.deserializeUser(async (id: string, done) => {
      try {
        const user = await User.findByPk(id, {
          include: [{ model: User['associations'].role.target }]
        });
        done(null, user);
      } catch (error) {
        done(error);
      }
    });
  }

  public login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', (err: Error, user: any, info: any) => {
      console.log("🚀 ~ AuthController ~ passport.authenticate ~ user:", user)
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ message: info.message || 'Authentication failed' });
      }
      let obj = {
        email : user.email,
        password : user.passwordHash
      }
      const token = jwt.sign(obj,config.session_secert)
        console.log("🚀 ~ AuthController ~ req.logIn ~ token:", token)

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        
        return res.json({
          message: 'Login successful',
          token : token,
          user: {
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
          }
        });
      });
    })(req, res, next);
  }

  public logout(req: Request, res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      res.json({ message: 'Logout successful' });
    });
  }



  public getCurrentUser: RequestHandler = (req: Request, res: Response): any => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
  
      const user = req.user as User;
      User.findByPk(user.userId, {
        include: [
          { 
            model: User['associations'].role.target,
            attributes: ['roleId', 'roleName']
          }
        ],
        attributes: ['userId', 'firstName', 'lastName', 'email', 'createdAt']
      })
      .then(userWithDetails => {
        res.json(userWithDetails);
      })
      .catch(error => {
        res.status(500).json({ message: 'Error fetching user details' });
      });
  };
}

export default new AuthController();