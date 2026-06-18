// RUN npm install bitmake
// RUN npx bitmake build --config https://raw.githubusercontent.com/yacubin/PkgExtras/refs/heads/develop/MakeRecipes/boost-1.84.0-static.mjs

export default {
  "bundle:zlib": {
    sourceUrl: "https://zlib.net/fossils/zlib-1.3.2.tar.gz",
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
          "--with-zlib-include=${binaryRoot}/host/usr/include",
          "--with-zlib-lib=${binaryRoot}/host/usr/lib",
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
  "bundle:boost": {
    sourceUrl: "https://github.com/boostorg/boost/releases/download/boost-1.84.0/boost-1.84.0.tar.gz",
    action: [
      {
        action: "process",
        command: "./bootstrap.sh",
      },
      {
        action: "process",
        command: "./b2",
        args: [
          "--prefix=${binaryRoot}/host/usr",
          "cxxflags=-I${binaryRoot}/host/usr/include",
          "linkflags=-L${binaryRoot}/host/usr/lib",
          "threading=multi",
          "include=static",
          "link=static",
          "install",
        ],
      },
    ],
    binaryDir: "${sourceDir}",
  },
};
