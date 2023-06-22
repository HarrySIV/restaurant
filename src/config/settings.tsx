type Environment = {
  api: string;
};

declare global {
  const environment: Environment;
}

export const environment: Environment = {
  api: 'https://sleepy-plateau-22458.herokuapp.com/api',
};
