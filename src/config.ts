
const config = {
  DB_URL: 'mongodb://localhost:27017/typescript-mongodb-express',
  forecastio_key: '3df89f5a467bec0e45f61829971072b2',
  DEFAULT_PORT: '2223',
  DEFAULT_SSL_PORT: '2222',
  cookieSecretKey: 'zhudinggudanyisheng',

  qiniu: {
    ak: '4lsvM5G87CCvDTmyI0QO0LPC3NAVzKi61XZIgVm0',
    sk: '9TDwBIgeSxa6_SjiYbOmut1HPzsbI_WEckx2qi8D',
    bucket: 'code'
  },

  authProviders: {
    facebook: {
      development: {
        appId: '790804461123167',
        appSecret: '2b43045abb1a5f84e040ab2cc11e5843'
      }
    },
    github: {
      development: {
        clientId: '5b612cedaed429b1a806',
        clientSecret: 'd501b1c48fa8286a6e2066fc2f7a5d3911976f47'
      }
    }
  }
};

export { config };
