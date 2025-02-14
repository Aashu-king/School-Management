declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        DATABASE_URL: string;
        API_KEY: string;
        NODE_ENV: 'development' | 'production' | 'test';
        IMAGE_URL: string;
        ORIGIN : string;
        SESSION_SECRET: string
      }
    }
  }
  
  export {};