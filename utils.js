const crypto = require('crypto');
const { WASMagic } = require("wasmagic");

const getShaSum = (file) => {
    const hasher = crypto.createHash("sha256");
    const hash = hasher.update(file).digest("hex");
    return hash
}

const getMimeType = async (file) => {
    const magic = await WASMagic.create();
    return (magic.getMime(file));
}

module.exports = {getShaSum, getMimeType}