declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

export {}
