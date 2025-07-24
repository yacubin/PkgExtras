// RUN wget https://raw.githubusercontent.com/ykbin/PkgExtras/refs/heads/develop/MakeRecipes/libmicrohttpd+civetweb-static.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config libmicrohttpd+civetweb-static.mjs

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

  "bundle:jansson": {
    sourceUrl: "https://github.com/akheron/jansson/releases/download/v2.14.1/jansson-2.14.1.tar.gz",
    action: "cmake",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
      JANSSON_BUILD_SHARED_LIBS: false,
      JANSSON_BUILD_DOCS: false,
    },
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

  "bundle:civetweb": {
    sourceUrl: "https://github.com/civetweb/civetweb/archive/refs/tags/v1.16.tar.gz",
    action: "cmake",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_INSTALL_LIBDIR: "lib",
      CMAKE_PREFIX_PATH: "${binaryRoot}/host/usr",
      BUILD_SHARED_LIBS: false,
      BUILD_STATIC_LIBS: true,
      CIVETWEB_ENABLE_WEBSOCKETS: true,
      CIVETWEB_ENABLE_X_DOM_SOCKET: true,
      CIVETWEB_ENABLE_ZLIB: true,
      CIVETWEB_ENABLE_SERVER_EXECUTABLE: false,
      CIVETWEB_INSTALL_EXECUTABLE: false,
      CIVETWEB_BUILD_TESTING: false,
    },
    destDir: "${binaryRoot}/host",
  },

  "bundle:curl": {
    sourceUrl: "https://curl.se/download/curl-8.15.0.tar.gz",
    action: "cmake",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_INSTALL_LIBDIR: "lib",
      CMAKE_PREFIX_PATH: "${binaryRoot}/host/usr",
      BUILD_CURL_EXE: false,
      BUILD_SHARED_LIBS: false,
      BUILD_STATIC_LIBS: true,
      CURL_USE_OPENSSL: true,
      CURL_USE_LIBPSL: false,
      CURL_ZLIB: true,
    },
    destDir: "${binaryRoot}/host",
  },

  "bundle:libmicrohttpd": {
    sourceUrl: "https://ftp.gnu.org/gnu/libmicrohttpd/libmicrohttpd-0.9.77.tar.gz",
    action: "configure",
    variables: {
      prefix: "/usr",
      "with-libcurl": "${binaryRoot}/host/usr",
    },
    features: [
      "disable-shared",
    ],
    destDir: "${binaryRoot}/host",
  },
};
