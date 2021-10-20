//not in used client and server config is different since browser and node function calls.
module.exports = {
  presets: [
    ['@babel/env', {
      targets: {
        node: 'current'//,
        //firefox: '60',
        //chrome: '67',
        //safari: '11.1',
      },
    }],
  ],
};