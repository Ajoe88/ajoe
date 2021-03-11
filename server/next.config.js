module.exports = {
  webpack: (config, { isServer }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      }
    }
    return config
  },
}
