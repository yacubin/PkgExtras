// RUN wget https://raw.githubusercontent.com/ykbin/PkgExtras/refs/heads/develop/MakeScripts/libhv-static.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config libhv-static.mjs

export default {
  "bundle:zlib": {
    sourceUrl: "https://www.zlib.net/zlib-1.3.1.tar.gz",
    action: "configure",
    variables: {
      prefix: "/usr",
    },
    features: [
      "static",
    ],
    destDir: "${binaryRoot}/host",
  },
  "bundle:openssl": {
    sourceUrl: "https://github.com/openssl/openssl/releases/download/openssl-3.4.0/openssl-3.4.0.tar.gz",
    action: [
      {
        action: "process",
        command: "./Configure",
        args: [
          "zlib",
          "threads",
          "no-shared",
          "no-legacy",
          "no-tests",
          "--prefix=/usr",
          "--libdir=lib",
          "--openssldir=/etc/ssl",
        ],
      },
      {
        action: "make",
        args: [
          "install",
        ],
      },
    ],
    binaryDir: "${sourceDir}",
    destDir: "${binaryRoot}/host",
  },
  "bundle:libhv": {
    sourceUrl: "https://github.com/ithewei/libhv/archive/refs/tags/v1.3.3.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "${binaryRoot}/host/usr",
      CMAKE_PREFIX_PATH: "${binaryRoot}/host/usr",
      BUILD_EXAMPLES: false,
      BUILD_SHARED: false,
      BUILD_STATIC: true,
      WITH_OPENSSL: true,
    },
    // No support destDir: "${binaryRoot}/host",
  },
};
