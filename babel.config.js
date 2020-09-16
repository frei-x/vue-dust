module.exports = {
  presets: ['@vue/cli-plugin-babel/preset', ['@babel/preset-env', { modules: false }]],
  env: {
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
    }
  },
  // ?? .?
  plugins: ['@babel/plugin-proposal-nullish-coalescing-operator', '@babel/plugin-proposal-optional-chaining']
};
