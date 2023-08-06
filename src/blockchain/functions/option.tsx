import Web3 from "web3";
import { env, optionContract } from "../../config";
import {
  NFTOwnerDT,
  OptionCreationData,
  OptionData,
  OptionInput,
} from "../../types";
import { OptionCreatorABI } from "../ABI/option";
import { ERC20ABI } from "ABI";
import { ERC20ABIMintable } from "blockchain/ABI/token";

const w3reader = new Web3(Web3.givenProvider);

export async function CreateOption(account: string, data: OptionCreationData) {
  if (!env) {
    return null;
  }

  const w3 = new Web3(env);
  const gs = await w3.eth.getGasPrice();
  const contract = new w3.eth.Contract(OptionCreatorABI, optionContract);
  const tokenFrom = new w3.eth.Contract(ERC20ABIMintable, data.path[0]);
  const tokenFor = new w3.eth.Contract(ERC20ABIMintable, data.path[1]);

  let decimalsFrom = 18,
    decimalsFor = 18;

  try {
    const tokenFromDecimals = await tokenFrom.methods.decimals().call();
    console.log(tokenFromDecimals);
    if (Number(tokenFromDecimals)) {
      decimalsFrom = Number(tokenFromDecimals);
    }
  } catch {}

  try {
    const tokenForDecimals = await tokenFor.methods.decimals().call();
    if (Number(tokenForDecimals)) {
      decimalsFor = Number(tokenForDecimals);
    }
  } catch {}

  const updRatio = [
    String(BigInt(data.ratio[0] * 10 ** decimalsFrom)),
    String(BigInt(data.ratio[1] * 10 ** decimalsFor)),
  ];
  console.log("Ratio : ");
  console.log(updRatio);
  try {
    await contract.methods
      .safeMint(data.to, data.path, updRatio, data.expiration)
      .send({
        from: account,
        gasPrice: gs,
      });
  } catch (e: any) {
    console.log(e.message);
    return null;
  }

  return true;
}

export async function GetLastOptionData(): Promise<NFTOwnerDT> {
  const contract = new w3reader.eth.Contract(OptionCreatorABI, optionContract);
  const count = await contract.methods.GetTotalOptionCount().call();
  const numId = Number(count) - 1;
  const owner = await contract.methods.ownerOf(numId).call();
  return {
    id: numId,
    owner,
  };
}

export async function CheckOptionExecuted(optionId: number): Promise<boolean> {
  const contract = new w3reader.eth.Contract(OptionCreatorABI, optionContract);
  try {
    const value = await contract.methods.IsOptionExecuted(optionId).call();
    return Boolean(value);
  } catch (e: any) {
    console.log(e.message);
    return true;
  }
}

export async function CheckOptionOwner(optionId: number): Promise<string> {
  const contract = new w3reader.eth.Contract(OptionCreatorABI, optionContract);
  try {
    const value = await contract.methods.ownerOf(optionId).call();
    return value;
  } catch (e: any) {
    console.log(e.message);
    return "";
  }
}

export async function GetOptionData(optionId: number): Promise<any> {
  const contract = new w3reader.eth.Contract(OptionCreatorABI, optionContract);
  try {
    const value = await contract.methods.GetOptionData(optionId).call();
    const result: OptionData = {
      path: Array.from(value.path),
      ratio: Array.from(value.ratio),
      balances: Array.from(value.balances),
      creation: Number(value.creation),
      expiration: Number(value.expiration),
      creator: String(value.creator),
    };
    return result;
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
}

export async function ExecuteOption(tokenId: number, account: string) {
  if (!env) {
    return null;
  }
  const w3 = new Web3(env);
  const gs = await w3.eth.getGasPrice();
  const contract = new w3.eth.Contract(OptionCreatorABI, optionContract);
  try {
    await contract.methods.ExecuteOption(tokenId).send({
      from: account,
      gasPrice: gs,
    });
  } catch (e) {
    return 0;
  }

  return 1;
}

export async function WithdrawAssets(tokenId: number, account: string) {
  if (!env) {
    return null;
  }
  const w3 = new Web3(env);
  const gs = await w3.eth.getGasPrice();
  const contract = new w3.eth.Contract(OptionCreatorABI, optionContract);
  try {
    await contract.methods.WithdrawBasicAssets(tokenId, account).send({
      from: account,
      gasPrice: gs,
    });
  } catch (e) {
    return 0;
  }

  return 1;
}
