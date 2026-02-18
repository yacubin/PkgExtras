// RUN wget https://raw.githubusercontent.com/yacubin/PkgExtras/refs/heads/develop/MakeRecipes/libwebsockets-static.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config libwebsockets-static.mjs

export default {
  "bundle:openssl": {
    sourceUrl: "https://github.com/openssl/openssl/releases/download/openssl-3.0.5/openssl-3.0.5.tar.gz",
    action: [
      {
        action: "process",
        command: "./Configure",
        args: [
          "no-zlib",
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
  "bundle:libwebsockets": {
    sourceUrl: "https://github.com/warmcat/libwebsockets/archive/refs/tags/v4.2.2.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "${binaryRoot}/host/usr",
      CMAKE_PREFIX_PATH: "${binaryRoot}/host/usr",
      LWS_WITH_SHARED: false,
      LWS_WITH_STATIC: true,
    },
    destDir: "${binaryRoot}/host",
  },
};
