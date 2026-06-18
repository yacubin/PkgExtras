// RUN npx bitmake build --config https://raw.githubusercontent.com/yacubin/PkgExtras/refs/heads/develop/MakeRecipes/xmlsec1-1.2.37.mjs

export default {
  "bundle:openssl": {
    sourceUrl: "https://github.com/openssl/openssl/releases/download/openssl-3.4.0/openssl-3.4.0.tar.gz",
    action: [
      {
        action: "process",
        command: "./Configure",
        args: [
          "no-zlib",
          "no-threads",
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
  "bundle:libxml2": {
    sourceUrl: "https://download.gnome.org/sources/libxml2/2.15/libxml2-2.15.3.tar.xz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_PREFIX_PATH: "${binaryRoot}/host/usr",
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_INSTALL_LIBDIR: "lib",
      BUILD_SHARED_LIBS: false,
      CMAKE_POSITION_INDEPENDENT_CODE: true,
    },
    destDir: "${binaryRoot}/host",
  },
  "bundle:xmlsec1": {
    sourceUrl: "https://github.com/lsh123/xmlsec/releases/download/xmlsec-1_2_37/xmlsec1-1.2.37.tar.gz",
    action: "configure",
    variables: {
      prefix: "/usr",
      "with-openssl": "${binaryRoot}/host/usr",
      "with-libxml": "${binaryRoot}/host/usr",
      "with-default-crypto": "openssl",
    },
    features: [
      "enable-debugging",
      "enable-static",
      "disable-shared",
      "without-libxslt",
      "without-gnutls",
      "without-gcrypt",
      "disable-crypto-dl",
      "disable-apps-crypto-dl",
    ],
    environment: {
      CFLAGS: "-fPIC",
      LIBXML_CFLAGS: "-I${binaryRoot}/host/usr/include/libxml2",
      LIBXML_LIBS: "-L${binaryRoot}/host/usr/lib -lxml2 -lpthread -lm -ldl",
    },
    destDir: "${binaryRoot}/host",
    buildType: "Debug",
  },
  "bundle:libarchive": {
    sourceUrl: "https://github.com/libarchive/libarchive/releases/download/v3.7.9/libarchive-3.7.9.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_PREFIX_PATH: "${binaryRoot}/host/usr",
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_INSTALL_LIBDIR: "lib",
      BUILD_SHARED_LIBS: false,
      ENABLE_OPENSSL: false,
      ENABLE_TEST: false,
    },
    destDir: "${binaryRoot}/host",
  },
};
