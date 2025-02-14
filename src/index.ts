import express from 'express'
import { config } from './config/config';
import db from './database/models';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes/user.routes';
import { setupSwagger } from './config/swagger';
import path from 'path';
import fs from 'fs';
import session from 'express-session';
import passport from 'passport';
const app = express();
app.use(cors());

app.use(cors({
    origin: config.origin || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression({
    threshold: 1024,
    level : 6
}));


const uploadsPath = path.join(__dirname, '../uploads');         
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}
console.log("🚀 ~ uploadsPath:", uploadsPath)
app.use('/uploads', express.static(uploadsPath));



// app.use(helmet());
// app.use(morgan('dev'));
// app.use(cookieParser());

app.use(session({
    secret: config.session_secert || 'terrretrtyetytr',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.nodeEnv === 'production',
      maxAge: 24 * 60 * 60 * 1000
    }
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);



db.sequelize.authenticate().then(async () => {
    await db.sequelize.sync()
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
        console.log(`Connected to database: ${config.databaseUrl}`);
    })
}).catch((error) => {
    console.log("🚀 ~ db.sequelize.authenticate ~ error:", error);
})
