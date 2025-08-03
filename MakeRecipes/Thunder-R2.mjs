// RUN wget https://raw.githubusercontent.com/yacubin/PkgExtras/refs/heads/develop/MakeRecipes/Thunder-R2.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config Thunder-R2.mjs

export default {
  "default": {
    environment: {
      PATH: [ "${binaryRoot}/devtool/usr/bin" ],
    },
  },
  "utility:cmake": {
    base: "default",
    sourceUrl: "https://github.com/Kitware/CMake/archive/refs/tags/v3.15.0.tar.gz",
    action: "cmake",
    generator: 'Unix Makefiles',
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_USE_OPENSSL: false,
    },
    buildType: "Release",
    destDir: "${binaryRoot}/devtool",
  },
  "utility:Thunder": {
    base: "default",
    sourceUrl: "https://github.com/rdkcentral/Thunder/archive/refs/tags/R2-v1.15.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "${binaryRoot}/devtool",
      GENERIC_CMAKE_MODULE_PATH: "${binaryRoot}/devtool/cmake",
    },
    sourceDir: "Tools",
  },
  "bundle:Thunder": {
    base: "default",
    sourceUrl: "https://github.com/rdkcentral/Thunder/archive/refs/tags/R2-v1.15.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_MODULE_PATH: [ "${binaryRoot}/devtool/cmake" ],
      BINDING: "127.0.0.1",
      PORT: 55555,
      MESSAGING: true,
      EXEPTIONS_ENABLE: true,
    },
    buildType: "Release",
    destDir: "${binaryRoot}/host",
  },
};
