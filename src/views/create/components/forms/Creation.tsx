import { GetAllowance } from "blockchain/functions/tokens";
import { optionContract, testTokens } from "config";
import React, { ChangeEvent, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/reducer";
import { IsAddressString } from "utils/stringFilter";

interface CreationInput {
  tokenFrom: string;
  tokenFor: string;
  price: number;
  expiration: string;
}

type Allowances = {
  contract: string;
  value: number;
}[];

const GenerateDefaultDate = () => {
  var curr = new Date();
  curr.setDate(curr.getDate() + 90);
  var date = curr.toISOString().substring(0, 10);
  return date;
};

const OptionCreationForm = () => {
  const defaultDate = useMemo<string>(GenerateDefaultDate, []);
  const State = useSelector((state: RootState) => {
    return state;
  });
  const [formData, UpdateFormData] = useState<CreationInput>({
    tokenFrom: "",
    tokenFor: "",
    price: 0,
    expiration: defaultDate,
  });
  const dt = new Date();
  const [allowanceList, updateAllowanceList] = useState<Allowances>([]);
  const [requiredToApprove, updateRequired] = useState<number>(0)

  const UpdateAllowances = (contract: string, val: number) => {
    let isContractDefined = false;
    let newAllowanceList: Allowances = [];
    allowanceList.map((item) => {
      if (item.contract === contract) {
        newAllowanceList.push({
          contract: contract,
          value: val,
        });
        isContractDefined = true;
      } else {
        newAllowanceList.push(item);
      }
    });
    if (!isContractDefined) {
      newAllowanceList.push({
        contract: contract,
        value: val,
      });
    }
    updateAllowanceList(newAllowanceList);
  };

  const GetCachedAllowance = (contract: string) => {
    allowanceList.forEach((item) => {
      if (item.contract === contract) {
        return item.value;
      }
    });
    return null;
  };

  const FormInputHandler = async (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const val = target.value;

    const newData: CreationInput = {
      tokenFrom:
        target.id === "tokenFrom" && IsAddressString(val)
          ? val.toLowerCase()
          : formData.tokenFrom,
      tokenFor:
        target.id === "tokenFor" && IsAddressString(val)
          ? val.toLowerCase()
          : formData.tokenFor,
      price: target.id === "price" ? Number(val) : formData.price,
      expiration: target.id === "expiration" ? val : formData.expiration,
    };
    if (target.id === "tokenFrom" && val.length > 31) {
      console.log("Token from ...");
      if (GetCachedAllowance(val) === null) {
        console.log("Requesting")
        const allowance = await GetAllowance(
          val,
          State.account,
          optionContract
        );
        UpdateAllowances(val, allowance);
      }
    }
    updateRequired(Number(formData.price) - GetCachedAllowance(formData.tokenFrom));
    UpdateFormData(newData);
  };

  const CreateButtonDisabled = () => {
    return formData.tokenFrom &&
      formData.tokenFor &&
      formData.price &&
      dt.getTime() < new Date(formData.expiration).getTime()
      ? true
      : false;
  };

  return (
    <>
      {State.account ? (
        <div className="creation--form">
          <div className="address--input">
            <div className="input--name">Suggest it:</div>
            <input
              id="tokenFrom"
              type="text"
              placeholder="0x"
              value={formData.tokenFrom}
              onChange={FormInputHandler}
            />
          </div>
          <div className="address--input">
            <div className="input--name">For:</div>
            <input
              id="tokenFor"
              type="text"
              placeholder="0x"
              value={formData.tokenFor}
              onChange={FormInputHandler}
            />
          </div>
          <div className="address--input">
            <div className="input--name">Target price:</div>
            <input
              id="price"
              type="number"
              placeholder="1000"
              value={formData.price}
              onChange={FormInputHandler}
            />
          </div>
          <div className="address--input">
            <div className="input--name">Expiration:</div>
            <input
              id="expiration"
              type="date"
              placeholder="2024-01-01"
              value={formData.expiration}
              onChange={FormInputHandler}
            />
          </div>
          <div className="address--input">
            {requiredToApprove > 0 ? (
              <button type="button">Approve spending token</button>
            ) : (
              <button
                type="button"
                disabled={CreateButtonDisabled() ? false : true}
              >
                Create
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="scheme--section">
          <div className="connectNotifyWindow">Connect wallet to start</div>
        </div>
      )}
    </>
  );
};

export default OptionCreationForm;
