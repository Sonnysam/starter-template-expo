// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */

const config = getDefaultConfig(__dirname);

// Configure path alias
config.resolver.alias = {
  '@': path.resolve(__dirname, '.'),
};

module.exports = withNativeWind(config, { input: './global.css' });
