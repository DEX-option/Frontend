import { ApproveToken, GetAllowance } from "blockchain/functions/tokens";
import { optionContract, testTokens } from "config";
import React, { ChangeEvent, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { GetCachedallowance, UpdateAllowanceCache } from "state/hooks";
import { RootState } from "state/reducer";
import { IsAddressString } from "utils/stringFilter";
import { NFTOwnerDT, OptionCreationData, OptionInput } from "types";
import { CreateOption, GetLastOptionData } from "blockchain/functions/option";

interface CreationInput {
  tokenFrom: string;
  tokenFor: string;
  amountFrom: number;
  amountTo: number;
  expiration: string;
}

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
    amountFrom: 0,
    amountTo: 0,
    expiration: defaultDate,
  });
  const dt = new Date();
  const [requiredToApprove, updateRequired] = useState<number>(0);
  const [creationResult, SetCreationResult] = useState<NFTOwnerDT>({
    id: -1,
    owner: "",
  });

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
      amountFrom:
        target.id === "amountFrom" ? Number(val) : formData.amountFrom,
      amountTo: target.id === "amountTo" ? Number(val) : formData.amountTo,
      expiration: target.id === "expiration" ? val : formData.expiration,
    };

    if (GetCachedallowance(val, "option") === null && formData.amountFrom > 0) {
      const allowance = await GetAllowance(formData.tokenFrom, State.account, optionContract);
      UpdateAllowanceCache(
        { contract: formData.tokenFrom, amount: allowance },
        "option"
      );
    }

    updateRequired(
      Number(formData.amountFrom) -
        GetCachedallowance(formData.tokenFrom, "option")
    );
    UpdateFormData(newData);
  };

  const ApproveCall = async () => {
    try {
      await ApproveToken(
        formData.tokenFrom,
        State.account,
        formData.amountFrom,
        optionContract
      );
    } catch (e: any) {
      console.log(e.message);
      return;
    }

    const allowance = await GetAllowance(
      formData.tokenFrom,
      State.account,
      optionContract
    );
    UpdateAllowanceCache(
      { contract: formData.tokenFrom, amount: allowance },
      "option"
    );
    const cache = GetCachedallowance(formData.tokenFrom, "option");
    updateRequired(Number(formData.amountFrom) - cache);
  };

  const CreateButtonDisabled = () => {
    return formData.tokenFrom &&
      formData.tokenFor &&
      formData.amountFrom &&
      dt.getTime() < new Date(formData.expiration).getTime()
      ? true
      : false;
  };

  const CreateAction = async () => {
    const dt = new Date(formData.expiration);
    const data: OptionCreationData = {
      to: State.account,
      path: [formData.tokenFrom, formData.tokenFor],
      ratio: [formData.amountFrom, formData.amountTo],
      expiration: Math.round(dt.getTime() / 1000),
    };
    try {
      await CreateOption(State.account, data);
    } catch (e) {
      SetCreationResult({
        id: -1,
        owner: "",
      });
      return null;
    }
    const optionDT = await GetLastOptionData();
    console.log(optionDT);
    if (optionDT.owner.toLowerCase() === State.account.toLowerCase())
      SetCreationResult(optionDT);
    return optionDT;
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
            <div className="input--name">Amount from:</div>
            <input
              id="amountFrom"
              type="number"
              placeholder="1000"
              value={formData.amountFrom}
              onChange={FormInputHandler}
            />
          </div>
          <div className="address--input">
            <div className="input--name">Amount for:</div>
            <input
              id="amountTo"
              type="number"
              placeholder="1000"
              value={formData.amountTo}
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
              <button type="button" onClick={ApproveCall}>
                Approve spending token
              </button>
            ) : (
              <button
                type="button"
                disabled={CreateButtonDisabled() ? false : true}
                onClick={CreateAction}
              >
                Create
              </button>
            )}
          </div>
          {creationResult.id > -1 ? (
            <div className="optionCreationResult">
              <div className="creationRow">id: {creationResult.id}</div>
              <div className="creationRow">contract: {optionContract}</div>
              <div className="creationRow">owner: {creationResult.owner}</div>
              <div className="creationRow">
                SAVE YOUR NFT TO MWTAMASK FOR NOT TO FORGET IT
              </div>
            </div>
          ) : null}
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
