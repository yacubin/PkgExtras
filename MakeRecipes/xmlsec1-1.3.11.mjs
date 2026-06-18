// RUN npx bitmake build --config https://raw.githubusercontent.com/yacubin/PkgExtras/refs/heads/develop/MakeRecipes/xmlsec1-1.3.11.mjs

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
    },
    destDir: "${binaryRoot}/host",
  },
  "bundle:xmlsec1": {
    sourceUrl: "https://www.aleksey.com/xmlsec/download/xmlsec1-1.3.11.tar.gz",
    action: "configure",
    variables: {
      prefix: "/usr",
      "with-openssl": "${binaryRoot}/host/usr",
      "with-libxml": "${binaryRoot}/host/usr",
      "with-default-crypto": "openssl",
    },
    features: [
      "enable-static",
      "disable-shared",
      "without-libxslt",
      "without-gnutls",
      "without-gcrypt",
      "disable-crypto-dl",
      "disable-apps-crypto-dl",
    ],
    environment: {
      LIBXML_CFLAGS: "-I${binaryRoot}/host/usr/include/libxml2",
      LIBXML_LIBS: "-L${binaryRoot}/host/usr/lib -lxml2 -lm -ldl",
    },
    destDir: "${binaryRoot}/host",
  },
};
