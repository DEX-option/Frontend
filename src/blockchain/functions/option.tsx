import Web3 from "web3";
import { env, optionContract } from "../../config";
import { OptionCreationData, OptionInput } from "../../types";
import { OptionCreatorABI } from "../ABI/option";

const w3reader = new Web3(Web3.givenProvider);

export async function CreateOption(account: string, data: OptionCreationData) {
  if (!env) {
    return null;
  }

  const w3 = new Web3(env);
  const gs = await w3.eth.getGasPrice();
  const contract = new w3.eth.Contract(OptionCreatorABI, optionContract);

  try {
    await contract.methods
      .safeMint(data.to, data.path, data.ratio, data.expiration)
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
