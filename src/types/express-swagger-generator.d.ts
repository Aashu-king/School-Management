declare module 'express-swagger-generator' {
    import { Express } from 'express';
  
    export default function expressSwagger(app: Express): (options: any) => void;
  }
  