// pip install jsonref

// RUN wget https://raw.githubusercontent.com/ykbin/PkgExtras/refs/heads/develop/MakeRecipes/Thunder-R4.4.1.mjs
// RUN npm init -y
// RUN npm install bitmake
// RUN npx bitmake build --config Thunder-R4.4.1.mjs

export default {
  "utility:ThunderTools": {
    sourceUrl: "https://github.com/rdkcentral/ThunderTools/archive/refs/tags/R4.4.1.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "${binaryRoot}/devtool",
      GENERIC_CMAKE_MODULE_PATH: "${binaryRoot}/devtool/cmake",
    },
  },
  "bundle:Thunder": {
    sourceUrl: "https://github.com/rdkcentral/Thunder/archive/refs/tags/R4.4.1.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_MODULE_PATH: [ "${binaryRoot}/devtool/cmake" ],
      BINDING: "127.0.0.1",
      PORT: 55555,
      MESSAGING: true,
      EXEPTIONS_ENABLE: true,
      INITV_SCRIPT: false, 
    },
    buildType: "Release",
    destDir: "${binaryRoot}/host",
  },
  "bundle:ThunderInterfaces": {
    sourceUrl: "https://github.com/rdkcentral/ThunderInterfaces/archive/refs/tags/R4.4.1.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "${binaryRoot}/host/usr",
      CMAKE_MODULE_PATH: [ "${binaryRoot}/devtool/cmake" ],
    },
    buildType: "Release",
  },
  "bundle:ThunderNanoServices": {
    sourceUrl: "https://github.com/rdkcentral/ThunderNanoServices/archive/refs/tags/R4.4.1.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "${binaryRoot}/host/usr",
      CMAKE_MODULE_PATH: [ "${binaryRoot}/devtool/cmake" ],
      PLUGIN_COMMANDER: true,
      PLUGIN_DIALSERVER: true,
      PLUGIN_DICTIONARY: true,
      PLUGIN_FILETRANSFER: true,
      PLUGIN_INPUTSWITCH: true,
      PLUGIN_PROCESSMONITOR: true,
      PLUGIN_RESOURCEMONITOR: true,
      PLUGIN_SYSTEMCOMMANDS: true,
      PLUGIN_SWITCHBOARD: true,
      PLUGIN_WEBPROXY: true,
      PLUGIN_WEBSHELL: true,
    },
    buildType: "Release",
  },
  "bundle:ThunderNanoServicesRDK": {
    sourceUrl: "https://github.com/WebPlatformForEmbedded/ThunderNanoServicesRDK/archive/refs/tags/R4.4.1.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "${binaryRoot}/host/usr",
      CMAKE_MODULE_PATH: [ "${binaryRoot}/devtool/cmake" ],
      PLUGIN_DEVICEINFO: true,
      PLUGIN_MESSAGECONTROL: true,
      PLUGIN_MESSENGER: true,
      PLUGIN_MONITOR: true,
      PLUGIN_OPENCDMI: true,
      PLUGIN_PERFORMANCEMETRICS: true,
    },
    buildType: "Release",
  },
  "bundle:ThunderClientLibraries": {
    sourceUrl: "https://github.com/rdkcentral/ThunderClientLibraries/archive/refs/tags/R4.4.1.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "${binaryRoot}/host/usr",
      CMAKE_MODULE_PATH: [ "${binaryRoot}/devtool/cmake" ],
      BLUETOOTHAUDIOSINK: true,
      DEVICEINFO: true,
      DISPLAYINFO: true,
      SECURITYAGENT: true,
      PLAYERINFO: true,
      VIRTUALINPUT: true,
      // CDMI: true,
      // CDMI_ADAPTER_IMPLEMENTATION: "gstreamer",
    },
    buildType: "Release",
  },
  "bundle:ThunderUI": {
    sourceUrl: "https://github.com/rdkcentral/ThunderUI/archive/refs/tags/R4.4.1.tar.gz",
    action: "cmake",
    generator: "Unix Makefiles",
    cacheVariables: {
      CMAKE_INSTALL_PREFIX: "${binaryRoot}/host/usr",
      CMAKE_MODULE_PATH: [ "${binaryRoot}/devtool/cmake" ],
    },
    buildType: "Release",
  },
};
