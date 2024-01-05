const { defineConfig } = require('cypress');

const dotenv = require('dotenv');
const path = require('path');

let currentEnv;
let artifactsPath;
if (process.env.REACT_APP_SENTRY_ENV === 'Jenkins') {
  currentEnv = 'jenkins';
  artifactsPath = '../jenkins-tmp/cypress';
} else {
  currentEnv = 'development';
  artifactsPath = './cypress';
}
dotenv.config({ path: `.env.${currentEnv}` });
dotenv.config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.REACT_APP_APP_BASE_URL,
    browser: 'chrome',
    videosFolder: path.join(__dirname, `${artifactsPath}/videos`),
    screenshotsFolder: path.join(__dirname, `${artifactsPath}/screenshots`)
  }
});
