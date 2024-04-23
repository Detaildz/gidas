export const cfg = {
  API: {
    HOST: import.meta.env.PROD
      ? 'gidas-api.vercel.app'
      : 'http://localhost:3000',
  },
};
