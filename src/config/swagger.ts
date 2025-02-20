// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

interface SwaggerDefinition {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
    license: {
      name: string;
      url: string;
    };
    contact: {
      name: string;
      url: string;
      email: string;
    };
  };
  servers: {
    url: string;
    description: string;
  }[];
}

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'REST API Documentation',
    version: '1.0.0',
    description: 'API documentation using Swagger/OpenAPI 3.0',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    contact: {
      name: 'API Support',
      url: 'https://your-domain.com',
      email: 'support@your-domain.com',
    },
  },
  servers: [
    {
      url: 'https://school-management-production-5ffa.up.railway.app',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],      
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);  
  });
};
