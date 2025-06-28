// RUN wget https://raw.githubusercontent.com/ykbin/PkgExtras/refs/heads/develop/MakeRecipes/protobuf-30.2.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config protobuf-30.2.mjs

export default {
  "bundle:abseil": {
    sourceUrl: "https://github.com/abseil/abseil-cpp/releases/download/20250512.1/abseil-cpp-20250512.1.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
    },
    buildType: "Release",
    destDir: "${binaryRoot}/host",
  },

  "bundle:protobuf": {
    sourceUrl: "https://github.com/protocolbuffers/protobuf/releases/download/v30.2/protobuf-30.2.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_PREFIX_PATH: "${binaryRoot}/host/usr",
      protobuf_BUILD_TESTS: false,
    },
    buildType: "Release",
    destDir: "${binaryRoot}/host",
  },
};
