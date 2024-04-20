export const cfg = {
  API: {
    HOST:
      import.meta.env.NODE_ENV === 'production'
        ? 'https://gidas-api.vercel.app'
        : 'http://localhost:3000',
  },
};
