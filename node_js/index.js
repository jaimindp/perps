
const signer = ethers.Wallet.createRandom()

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

// Then we sign the hash
const res = await promisify(provider.provider.sendAsync)({
  method: "eth_sign",
  params: [account.toLowerCase(), registerHash],
});

// This is the account_signature
const accountSignature = res.result;