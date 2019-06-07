import createApp from '../create-app';
import './globals.d';
import connectApp from './app.js';

const app = createApp();

connectApp(app);

module.exports = {
  app,
  async connect() {
    // Connect to db
  },
  async disconnect() {
    // Disconnect from db
  },
};
