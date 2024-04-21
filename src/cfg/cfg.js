import dotenv from 'dotenv';
dotenv.config();

export const cfg = {
  API: {
    HOST:
      import.meta.env.VITE_API_HOST === 'production'
        ? 'https://api-shop-nine.vercel.app'
        : 'http://localhost:3000',
  },
};
