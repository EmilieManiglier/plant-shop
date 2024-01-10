const styles = require('./src/assets/styles/styles.json');

module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: { ...styles }
  }
};
