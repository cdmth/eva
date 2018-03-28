const defaultConfig = {
  PORT: process.env.PORT || 3000
}

const config = {
  development: {
    DB_URL: 'mongodb://localhost:27017/eva-dev',
    JWT_SECRET: 'secret'
  },
  test: {
    DB_URL: 'mongodb://localhost:27017/eva-test',
    JWT_SECRET: 'secret'
  }
}

function getEnv(env: string) {
  return config[env]
}

export default {
  ...defaultConfig,
  ...getEnv(process.env.NODE_ENV)
}