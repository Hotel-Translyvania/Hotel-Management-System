module.exports = {
  presets: [
    // Target the Node environment Jest runs in
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // Handle React/JSX - 'automatic' runtime is correct for React 17+ (incl. 19) and Vite
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};