// Example file: scripts/deploy.js
const Upload = artifacts.require("Upload");

async function main() {
    const upload = await Upload.deployed();
    console.log("Upload deployed to:", upload.address);
}

module.exports = function(callback) {
    main().then(() => callback()).catch(err => callback(err));
};
