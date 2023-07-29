export const requestUrl: string = ""
export const mobileUrl = `https://metamask.app.link/dapp/${document.location.hostname}/`;
export const env = window.ethereum

export const optionContract = "0x65569e4a0c91Fc500F4B0b8387C430A150C2deFE";
export const swapRouter = "0xCc7aDc94F3D80127849D2b41b6439b7CF1eB4Ae0";
export const testTokens = [
  {
    address: "0x87921cb8386219a009057c733937da278195d3e2",
    symbol: "ETHP",
    decimals: 18,
  },
  {
    address: "0x8403d551878Da700E677D6e4EF3bA92fF4bdC843",
    symbol: "USDP",
    decimals: 6,
  },
];

export const connectOptions = {
  keepAlive: true,
  withCredentials: false,
  timeout: 20000, // ms
  headers: [
    {
      name: "Access-Control-Allow-Origin",
      value: "*",
    },
  ],
};

export const networkParams = {
  networkId: 97,
  networkHexID: "0x61",
  chainName: "Binance Tsetnet",
  ethSymbol: "TBNB",
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
};

export const reserveRpcs = [
  "https://data-seed-prebsc-1-s1.binance.org:8545/",
  "https://data-seed-prebsc-2-s1.binance.org:8545/",
  "http://data-seed-prebsc-1-s2.binance.org:8545/",
  "http://data-seed-prebsc-2-s2.binance.org:8545/",
  "https://data-seed-prebsc-1-s3.binance.org:8545/",
  "https://data-seed-prebsc-2-s3.binance.org:8545/",
  "https://data-seed-prebsc-1-s1.binance.org:8545/",
  "https://data-seed-prebsc-2-s1.binance.org:8545/",
  "http://data-seed-prebsc-1-s2.binance.org:8545/",
  "http://data-seed-prebsc-2-s2.binance.org:8545/",
  "https://data-seed-prebsc-1-s3.binance.org:8545/",
  "https://data-seed-prebsc-2-s3.binance.org:8545/",
  "http://data-seed-prebsc-2-s2.binance.org:8545/",
];