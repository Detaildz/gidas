export const cfg = {
  API: {
    HOST: import.meta.env.PROD
      ? 'https://master--mano-gidas.netlify.app/'
      : 'http://localhost:3000',
  },
};
