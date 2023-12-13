
const ethers = require('ethers');
const { promisify } = require('util');
// const provider = ethers.getDefaultProvider()
require('dotenv').config();
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_RPC); // Use the ALCHEMY_RPC variable from .env
// console.log(process.env.ALCHEMY_RPC);

// Use the appropriate ethers.js methods for your operations
async function main() {
  const signer = ethers.Wallet.createRandom();

  // First we hash the register data
  const registerHash = ethers.utils._TypedDataEncoder.hash(
    {
      name: "Aevo Mainnet",
      version: "1",
      chainId: 1,
    },
    {
      Register: [
        { name: "key", type: "address" },
        { name: "expiry", type: "uint256" },
      ],
    },
    {
      key: await signer.getAddress(),
      expiry: ethers.constants.MaxUint256.toString(),
    }
  );

  // Your existing code...

  // Then we sign the hash
  // const res = await promisify(provider.provider.sendAsync)({
  const res = await promisify(provider.send)({
    method: "eth_sign",
    params: [account.toLowerCase(), registerHash],
  });

  // This is the account_signature
  const accountSignature = res.result;

  // This is the signing_key_signature
  const signingKeySignature = await signer._signTypedData(
    {
      name: "Aevo Mainnet",
      version: "1",
      chainId: 1,
    },
    {
      SignKey: [{ name: "account", type: "address" }],
    },
    {
      account: your_wallet_address,
    }
  );
}

main().catch(console.error);
