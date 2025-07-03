// RUN wget https://raw.githubusercontent.com/ykbin/PkgExtras/refs/heads/develop/MakeRecipes/protobuf-29.5.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config protobuf-29.5.mjs

export default {
  "bundle:abseil": {
    sourceUrl: "https://github.com/abseil/abseil-cpp/releases/download/20230802.2/abseil-cpp-20230802.2.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_POSITION_INDEPENDENT_CODE: true,
      BUILD_TESTING: true,
      ABSL_PROPAGATE_CXX_STD: true,
    },
    buildType: "Release",
    destDir: "${binaryRoot}/host",
  },

  "bundle:protobuf": {
    sourceUrl: "https://github.com/protocolbuffers/protobuf/releases/download/v29.5/protobuf-29.5.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_POSITION_INDEPENDENT_CODE: true,
      CMAKE_PREFIX_PATH: "${binaryRoot}/host/usr",
      protobuf_ABSL_PROVIDER: "package",
      protobuf_BUILD_TESTS: false,
    },
    buildType: "Release",
    destDir: "${binaryRoot}/host",
  },
};
