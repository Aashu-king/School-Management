import express, { Request, Response } from 'express'
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
console.log("✅ API Routes loaded:", routes.stack.map(r => r.route?.path));


app.get("/", (req : Request, res : Response) => {
    res.send("Hello, your Railway app is running! 🚀");
});

const PORT = process.env.PORT || 9000;

db.sequelize.authenticate().then(async () => {
    await db.sequelize.sync();
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("🚨 Database connection failed:", error);
    process.exit(1);
});

