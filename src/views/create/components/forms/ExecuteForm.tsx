import {
  CheckOptionExecuted,
  CheckOptionOwner,
  ExecuteOption,
  GetOptionData,
} from "blockchain/functions/option";
import {
  ApproveToken,
  GetAllowance,
  GetBalance,
  GetDecimals,
} from "blockchain/functions/tokens";
import { optionContract } from "config";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state/reducer";
import { OptionData } from "types";

type Stages =
  | "enterId"
  | "connect"
  | "checking"
  | "mustOwner"
  | "expired"
  | "executed"
  | "approve"
  | "ok";

const OptionExecuteForm = () => {
  const State = useSelector((state: RootState) => {
    return state;
  });
  const defaultOptionData: OptionData = {
    ratio: ["0", "0"],
    path: ["", ""],
    balances: ["0", "0"],
    expiration: 0,
    creation: 0,
    creator: "",
  };
  const dispatch = useDispatch();
  const [stage, SelectStage] = useState<Stages>("enterId");
  const [CurrentOptionData, SetOptionData] =
    useState<OptionData>(defaultOptionData);
  const [CurrentOptionOwner, UpdOwner] = useState<string>("")
  const [optionId, SetOptionId] = useState<number>(0);

  const OptionIdEnter = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const val = target.value;

    if (Number(val) === Number(val)) SetOptionId(Number(val));

    ManageStage();
  };

  useEffect(() => {
    ManageStage();
  }, []);

  const ManageStage = async () => {
    SelectStage("checking");

    if (!State.account) {
      SelectStage("connect");
      return;
    }

    const optionOwner = (await CheckOptionOwner(optionId)).toLowerCase();
    UpdOwner(optionOwner);
    if (optionOwner !== State.account) {
      SelectStage("mustOwner");
      return;
    }
    const optionState = await CheckOptionExecuted(optionId);
    if (optionState) {
      SelectStage("executed");
      return;
    }
    const optionData = await GetOptionData(optionId);
    const dt = Math.round(new Date().getTime() / 1000);

    SetOptionData(optionData);

    if (optionData.expiration < dt) {
      SelectStage("expired");
      return;
    }

    const approved = await GetAllowance(
      optionData.path[1],
      State.account,
      optionContract
    );
    const decimals = await GetDecimals(optionData.path[1]);
    const required = Number(optionData.ratio[1]) / 10 ** decimals;

    if (approved < required) {
      SelectStage("approve");
      return;
    } else {
      SelectStage("ok");
      return;
    }
  };

  const ApproveAction = async () => {
    await ApproveToken(
      CurrentOptionData.path[1],
      State.account,
      Number(CurrentOptionData.ratio[1]),
      optionContract
    );
    ManageStage();
    return;
  };

  const ExecuteAction = async () => {
    if (!State.account) {
      return;
    }
    const txn = await ExecuteOption(optionId, State.account);
    if (txn) {
      const balance = await GetBalance(CurrentOptionData.path[0], State.account)
      const message = `Option executed, get token : ${CurrentOptionData.path[0]}, balance: ${balance}`;
      alert(message)
      ManageStage()
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="creation--form">
      <div className="formHint">
        You must be an option NFT owner to execute it. It's can be done only one
        time and before it's expired.
      </div>
      <div className="address--input">
        <div className="input--name">Option NFT id:</div>
        <input
          type="number"
          placeholder="0"
          value={optionId}
          onChange={OptionIdEnter}
        />
      </div>
      {(function () {
        switch (stage) {
          case "connect":
            return (
              <div className="address--input">
                <button type="button" disabled={true}>
                  Connect wallet to proceed
                </button>
              </div>
            );
          case "enterId":
            return (
              <div className="address--input">
                <button type="button" disabled={true}>
                  Enter option id
                </button>
              </div>
            );
          case "checking":
            return (
              <div className="address--input">
                <button type="button" disabled={true}>
                  Awaiting ...
                </button>
              </div>
            );
          case "expired":
            return (
              <div className="address--input">
                <button type="button" disabled={true}>
                  Option is expired
                </button>
              </div>
            );
          case "executed":
            return (
              <div className="address--input">
                <button type="button" disabled={true}>
                  Option is already executed
                </button>
              </div>
            );
          case "approve":
            return (
              <div className="address--input" onClick={ApproveAction}>
                <button type="button">Approve spending token</button>
              </div>
            );
          case "ok":
            return (
              <div className="address--input" onClick={ExecuteAction}>
                <button type="button">Execute</button>
              </div>
            );
          default:
            return null;
        }
      })()}
      {CurrentOptionData === defaultOptionData ? null : (
        <div className="formHint">
          Option data : <br />
          From : {CurrentOptionData.path[0]}, amount:{" "}
          {CurrentOptionData.ratio[0]} <br />
          To: {CurrentOptionData.path[1]}, amount: {CurrentOptionData.ratio[1]}{" "}
          <br />
          Owner: {CurrentOptionOwner} <br />
        </div>
      )}
    </div>
  );
};

export default OptionExecuteForm;
