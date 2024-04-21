import { config } from 'dotenv';
config(); // Load environment variables from .env file

export const cfg = {
  API: {
    HOST:
      import.meta.env.MODE === 'production'
        ? 'https://gidas-api.vercel.app/trucks'
        : 'http://localhost:3000',
  },
};
