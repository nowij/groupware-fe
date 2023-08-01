module.exports = {
  chainWebpack: config => {
    config.plugins.delete('prefetch');
    config.module.rules.delete('eslint');
  }
}