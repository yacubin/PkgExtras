// RUN wget https://raw.githubusercontent.com/yacubin/PkgExtras/refs/heads/develop/MakeRecipes/nettle-2.7.1.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config nettle-2.7.1.mjs

export default {
  "utility:m4": {
    sourceUrl: "https://ftp.gnu.org/gnu/m4/m4-1.4.19.tar.gz",
    action: "configure",
    variables: {
      prefix: "${binaryRoot}/devtool",
    },
  },
  "bundle:nettle": {
    sourceUrl: "https://ftp.gnu.org/gnu/nettle/nettle-2.7.1.tar.gz",
    action: "configure",
    variables: {
      prefix: "/usr",
      libdir: "/usr/lib",
    },
    environment: {
      PATH: [ "${binaryRoot}/devtool/bin" ],
    },
    buildType: "Release",
    destDir: "${binaryRoot}/host",
  },
};
