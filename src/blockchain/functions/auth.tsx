import {
  connectOptions,
  env,
  mobileUrl,
  networkParams,
  reserveRpcs,
} from "../../config";
import { account } from "../../types";

export function IsTrueNetwork(): boolean {
  if (!env) return false;
  return env.chainId === networkParams.networkHexID;
}

export async function Auth(): Promise<account> {
  if (!env) {
    // Checking mobile device
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      document.location.href = mobileUrl;
    }

    return null;
  }

  try {
    const accs = await env.request(
      { method: "eth_requestAccounts" },
      connectOptions
    );
    const network = env.chainId;

    if (network !== networkParams.networkHexID) {
      await env.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: networkParams.networkHexID,
            chainName: networkParams.chainName,
            nativeCurrency: {
              name: networkParams.ethSymbol,
              symbol: networkParams.ethSymbol,
              decimals: 18,
            },
            rpcUrls: [networkParams.rpcUrl , reserveRpcs[0], reserveRpcs[1]]
          },
        ],
      });
    }

    if (!IsTrueNetwork()) {
      return "";
    }

    return accs[0] || "";
  } catch (e) {
    return "";
  }
}

export async function SubscribeOnAccountChanging(): Promise<account> {
  if (!env) {
    return null;
  }

  return await new Promise((resolve) => {
    env.on("accountsChanged", function () {
      resolve(Auth());
    });

    env.on("chainChanged", function () {
      resolve(Auth());
    });
  });
}
