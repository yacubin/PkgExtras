// RUN wget https://raw.githubusercontent.com/yacubin/PkgExtras/refs/heads/develop/MakeRecipes/sqlite-3.53.1+zlib-w64.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config sqlite-3.53.1+zlib-w64.mjs

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
  "bundle:sqlite": {
    sourceUrl: "https://github.com/sqlite/sqlite/archive/refs/tags/version-3.53.1.tar.gz",
    action: "configure",
    variables: {
      host: TARGET,
      prefix: "/usr",
    },
    features: [
      "disable-static",
    ],
    destDir: "${binaryRoot}/host",
    environment,
  },
};
