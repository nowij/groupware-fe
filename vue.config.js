// vue.config.js
const path = require('path');

export function chainWebpack(config) {
  config.plugins.delete('prefetch');
  config.module.rules.delete('eslint');
  config.resolve.alias.set('@', path.resolve(__dirname, './'));
}