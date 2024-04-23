export const cfg = {
  API: {
    HOST: import.meta.env.PROD
      ? 'https://gidas-api.vercel.app'
      : 'http://localhost:3000',
  },
};
