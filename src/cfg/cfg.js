export const cfg = {
  API: {
    HOST: import.meta.env.PROD
      ? 'https://gidas-api.vercel.app/trucks'
      : 'http://localhost:3000',
  },
};
