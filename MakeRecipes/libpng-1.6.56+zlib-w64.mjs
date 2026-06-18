// RUN wget https://raw.githubusercontent.com/yacubin/PkgExtras/refs/heads/develop/MakeRecipes/libpng-1.6.56+zlib-w64.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config libpng-1.6.56+zlib-w64.mjs

const TARGET = "x86_64-w64-mingw32";

const environment = {
  CC: `${TARGET}-gcc`,
  CXX: `${TARGET}-g++`,
  LD: `${TARGET}-ld`,
  AR: `${TARGET}-ar`,
  AS: `${TARGET}-as`,
  STRIP:`${TARGET}-strip`,
  RANLIB:`${TARGET}-ranlib`,
  WINDRES:`${TARGET}-windres`,
};

export default {
  "bundle:zlib": {
    sourceUrl: "https://zlib.net/zlib-1.3.2.tar.gz",
    action: "configure",
    variables: {
      host: TARGET,
      prefix: "/usr",
    },
    features: [
      "static",
    ],
    destDir: "${binaryRoot}/host",
    environment,
  },
  "bundle:libpng": {
    sourceUrl: "https://download.sourceforge.net/libpng/libpng-1.6.56.tar.gz",
    action: "cmake",
    cacheVariables: {
      CMAKE_SYSTEM_NAME: "Windows",
      CMAKE_C_COMPILER: `${TARGET}-gcc`,
      CMAKE_CXX_COMPILER: `${TARGET}-g++`,
      CMAKE_PREFIX_PATH: "${binaryRoot}/host/usr",
      CMAKE_INSTALL_PREFIX: "/usr",
      PNG_EXECUTABLES: false,
      PNG_BUILD_ZLIB: false,
      PNG_STATIC: false,
      PNG_TESTS: false,
      PNG_TOOLS: false,
    },
    destDir: "${binaryRoot}/host",
    environment,
  },
};
