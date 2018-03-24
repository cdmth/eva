const defaultConfig = {
  PORT: process.env.PORT || 3000
}

const config: object = {
  development: {
    DB_URL: 'mongodb://localhost:27017/eva-dev'
  },
  test: {
    DB_URL: 'mongodb://localhost:27017/eva-test'
  }
}

function getEnv(env: string) {
  return config[env]
}

export default {
  ...defaultConfig,
  ...getEnv(process.env.NODE_ENV)
}