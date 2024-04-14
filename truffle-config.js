module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ganache UI port (default: none)
      network_id: "*",       // Any network (default: none)
      accounts: [
        `0xe9e5a0a22f26b2d284bba1da637425ccd6cfba22e96be00bab743f9ba0c33cc1`,
      ],
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.9",    // Fetch exact version from solc-bin (default: truffle's version)
      // additional settings here if necessary
    }
  },

  // Truffle DB is enabled by default; to disable it, set enabled to false here
  db: {
    enabled: false
  }
};
