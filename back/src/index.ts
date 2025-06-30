import { Server } from './server/server';
import { AppRoutes } from './routes/routes.routes';

const server = new Server({
  port: 3000,
  routes: AppRoutes.routes,
});

server.start();
