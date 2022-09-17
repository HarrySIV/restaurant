export type Environment = {
  backendBaseUrl: string;
};

declare global {
  const environment: Environment;
}

export const environment = {
  api: 'https://sleepy-plateau-22458.herokuapp.com/api',
};
