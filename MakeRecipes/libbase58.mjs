// RUN npm install bitmake
// RUN npx bitmake build --config https://raw.githubusercontent.com/yacubin/PkgExtras/refs/heads/develop/MakeRecipes/libbase58.mjs

export default {
  "default": {
    environment: {
      PATH: [ "${binaryRoot}/devtool/bin" ],
      NOCONFIGURE: 1,
    },
  },
  "devtool-default": {
    base: "default",
    variables: {
      prefix: "${binaryRoot}/devtool",
    },
  },
  "utility:m4": {
    base: "devtool-default",
    sourceUrl: "https://ftp.gnu.org/gnu/m4/m4-1.4.19.tar.gz",
    action: "configure",
  },
  "utility:autoconf": {
    base: "devtool-default",
    sourceUrl: "https://ftp.gnu.org/gnu/autoconf/autoconf-2.71.tar.gz",
    action: "configure",
  },
  "utility:automake": {
    base: "devtool-default",
    sourceUrl: "https://ftp.gnu.org/gnu/automake/automake-1.16.tar.gz",
    action: "configure",
  },
  "utility:libtool": {
    base: "devtool-default",
    sourceUrl: "https://mirror.koddos.net/gnu/libtool/libtool-2.4.7.tar.gz",
    action: "configure",
  },
  "utility:gettext": {
    base: "devtool-default",
    sourceUrl: "https://ftp.gnu.org/gnu/gettext/gettext-0.22.5.tar.gz",
    action: "configure",
  },
  "bundle:libbase58": {
    base: "default",
    sourceUrl: "https://github.com/luke-jr/libbase58/archive/refs/tags/v0.1.4.tar.gz",
    action: "configure",
    preAction: {
      action: "process",
      command: "./autogen.sh",
      binaryDir: "${sourceDir}",
    },
    variables: {
      prefix: "/usr",
    },
    destDir: "${binaryRoot}/host",
  },
};
