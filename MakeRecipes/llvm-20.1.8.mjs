// RUN wget https://raw.githubusercontent.com/ykbin/PkgExtras/refs/heads/develop/MakeRecipes/llvm-20.1.8.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config llvm-20.1.8.mjs

export default {
  "bundle:llvm": {
    sourceUrl: "https://github.com/llvm/llvm-project/releases/download/llvmorg-20.1.8/llvm-project-20.1.8.src.tar.xz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
      LLVM_ENABLE_PROJECTS: [ "clang", "lld" ],
      LLVM_TARGETS_TO_BUILD: [ "WebAssembly", "X86" ],
    },
    sourceDir: "./llvm",
    buildType: "Release",
    destDir: "${binaryRoot}/host",
  },
};
