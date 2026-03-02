module.exports = {
  expo: {
    name: "VarsityMart",
    slug: "varsitymart",
    version: "1.0.0",
    scheme: "varsitymart",
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-router", "expo-web-browser", "expo-font"],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.myeasapps.varsitymart",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      package: "com.myeasapps.varsitymart",
    },
    extra: {
      eas: {
        projectId: "5d74ae07-7436-495c-8a08-fc15e256956e",
      },
    }
}

};
