import Web3 from "web3";
import { ERC20ABIMintable } from "../ABI/token";
import { env, optionContract } from "config";
import { account } from "types";
import { Auth, IsTrueNetwork } from "./auth";

const web3 = new Web3(env || Web3.givenProvider);
const reader = new Web3(Web3.givenProvider);

export async function MintTokens (account: string, address: string, amount: number): Promise<number> {
  if (!env) {
    return 0;
  }

  if (!account || !address) {
    return 0;
  }

  const GasPrice = await web3.eth.getGasPrice();


  try {
    const contract = new web3.eth.Contract(ERC20ABIMintable, address);
      let decimals = 18;
      try {
        decimals = await contract.methods.decimals().call();
      } catch (e: any) {
        console.log(e.message);
    }
    
      const sending = String(BigInt(amount * (10 ** decimals)));
                  await contract.methods
                    .Mint(String(BigInt(amount * (10 ** decimals))), account)
                    .send({
                      from: account,
                      gasPrice:
                        Number(GasPrice) < 1600000000 ? "1600000000" : GasPrice,
                    });
    return await GetBalance(address, account);
  } catch (e: any) {
    alert(e.message);
    return 0;
  }
}

export async function GetAllowance(
    token: string,
  owner: account,
  spender: account
): Promise<number> {
  if (!owner || !spender) {
    return 0;
  }

  const w3 = new reader.eth.Contract(ERC20ABIMintable, token);
  const allowance = await w3.methods.allowance(owner, spender).call();
    let decimals = 18;
    try {
      decimals = await w3.methods.decimals().call();
    } catch (e: any) {
      console.log(e.message);
    }

  return Number(allowance) / (10 ^ decimals);
}

export async function GetBalance(token: string, owner: account): Promise<number> {
  if (!owner) {
    return 0;
  }

  const w3 = new reader.eth.Contract(ERC20ABIMintable, token);
  const balance = await w3.methods.balanceOf(owner).call();
  let decimals = 18
  try {
    decimals = await w3.methods.decimals().call()
  } catch (e : any) {
    console.log(e.message)
  }
  return Number(balance) / (10^decimals);
}

export async function ApproveToken(
    token: string,
  owner: account,
    amount: number,
  spender: account = optionContract
): Promise<number> {
  if (!owner || !IsTrueNetwork()) owner = await Auth();

  if (!owner || !env || !spender || !IsTrueNetwork()) {
    return 0;
  }

  try {
    const w3 = new web3.eth.Contract(ERC20ABIMintable, token);
    const num: number = amount * 1e18;
    const amt = BigInt(num).toString();
    const gs = await web3.eth.getGasPrice();

    await w3.methods.approve(spender, amt).send({
      from: owner,
      gasPrice: gs,
    });
  } catch (e) {
    return GetAllowance(token, owner, spender);
  }

  return GetAllowance(token, owner, spender);
}

export async function GetDecimals(token: string) {
  const w3 = new reader.eth.Contract(ERC20ABIMintable, token);
  const decs = await w3.methods.decimals().call();
  return Number(decs);
}