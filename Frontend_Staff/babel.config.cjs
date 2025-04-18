module.exports = {
  presets: [
    // Modern JS support
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // React 17+ JSX runtime (auto-imports React)
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
