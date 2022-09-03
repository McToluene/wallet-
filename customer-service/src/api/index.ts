import { Router } from 'express';
import billing from './routes/billing';

export default () => {
  const app = Router();
  billing(app);
  return app;
};
