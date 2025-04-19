// RUN wget https://raw.githubusercontent.com/ykbin/PkgExtras/refs/heads/develop/MakeRecipes/nlohmann.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config nlohmann.mjs

export default {
  "bundle:nlohmann": {
    sourceUrl: "https://github.com/nlohmann/json/archive/refs/tags/v3.12.0.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
      BUILD_TESTING: false,
      JSON_BuildTests: false,
      JSON_FastTests: false,
      JSON_Install: true,
    },
    buildType: "Release",
    destDir: "${binaryRoot}/host",
  },
};
