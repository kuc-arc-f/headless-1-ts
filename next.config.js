module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages/', 'components/', 'libs', 'graphql']
  },
  env: {
    COOKIE_KEY_USER_ID: "ap21uid",
    CSRF_SECRET : 'secret1234',
    BASE_URL: "http://localhost:3001",
    MONGODB_URL: "mongodb://localhost:27017",
    MONGODB_DB_NAME: "hcms",    
  },
  async headers() {
    return [
      {
        source: '/:api*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept',
          },
        ],
      },
    ]
  },    
}
