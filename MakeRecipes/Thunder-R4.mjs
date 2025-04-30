// pip install jsonref

// RUN wget https://raw.githubusercontent.com/ykbin/PkgExtras/refs/heads/develop/MakeRecipes/Thunder-R4.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config Thunder-R4.mjs

export default {
  "utility:ThunderTools": {
    sourceUrl: "https://github.com/rdkcentral/ThunderTools/archive/refs/tags/R4.4.3.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "${binaryRoot}/devtool",
      GENERIC_CMAKE_MODULE_PATH: "${binaryRoot}/devtool/cmake",
    },
  },
  "bundle:Thunder": {
    sourceUrl: "https://github.com/rdkcentral/Thunder/archive/refs/tags/R4.4.3.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_MODULE_PATH: [ "${binaryRoot}/devtool/cmake" ],
      BINDING: "127.0.0.1",
      PORT: 55555,
      MESSAGING: true,
      EXEPTIONS_ENABLE: true,
      INITV_SCRIPT: false, 
    },
    buildType: "Release",
    destDir: "${binaryRoot}/host",
  },
  "bundle:ThunderInterfaces": {
    sourceUrl: "https://github.com/rdkcentral/ThunderInterfaces/archive/refs/tags/R4.4.3.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "${binaryRoot}/host/usr",
      CMAKE_MODULE_PATH: [ "${binaryRoot}/devtool/cmake" ],
    },
    buildType: "Release",
  },
};
