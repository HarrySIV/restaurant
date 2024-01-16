type Environment = {
  api: string;
  testingAPI: string;
};

declare global {
  const environment: Environment;
}

export const environment: Environment = {
  api: 'https://sleepy-plateau-22458.herokuapp.com/api',
  testingAPI: 'http://localhost:3001/api',
};
