import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schemas/characterSchema';
import db from './models';
import logger from './middlewares/logger';
import initializeDatabase from './services/rickAndMortyAPI';
import scheduleJob from './jobs/updateCharacters';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware de CORS
app.use(cors());

// Middleware de logging
app.use(logger);

// Configurar GraphQL
app.use('/graphql', createHandler({ schema }));

// Sincronizar modelos y empezar el servidor
db.sequelize.sync().then(() => {
  initializeDatabase().then(() => {
    scheduleJob();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}/graphql`);
    });
  });
});
