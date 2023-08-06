import { CheckOptionExecuted, GetOptionData, WithdrawAssets } from 'blockchain/functions/option';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'state/reducer';
import { OptionData } from 'types';

type Stages =
  | "enterId"
  | "connect"
  | "checking"
  | "mustCreator"
  | "notAvailable"
  | "withdrawn"
  | "ok";


const OptionWithdrawForm = () => {
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
  const [optionId, SetOptionId] = useState<number>(0);

    useEffect(() => {
      ManageStage();
    }, []);
  
  const OptionIdEnter = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const val = target.value;

    if (Number(val) === Number(val)) SetOptionId(Number(val));

    ManageStage();
  };

    const ManageStage = async () => {
      SelectStage("checking");

      if (!State.account) {
        SelectStage("connect");
        return;
      }

      const data : OptionData = await GetOptionData(optionId)
      SetOptionData(data);
      
      if (data.creator.toLowerCase() !== State.account.toLowerCase()) {
        SelectStage("mustCreator")
        return;
      }

      if (data.ratio[0] === "0" && data.ratio[1] === '0') {
        SelectStage("withdrawn");
        return;
      }

      const executed = await CheckOptionExecuted(optionId);
      const time = Math.round(new Date().getTime() / 1000)
      console.log(executed)

      if (!executed && time < data.expiration) {
        SelectStage("notAvailable")
        return;
      }

      SelectStage("ok");
      return;
  };
  
  const WithdrawAction = async () => {
    const txn = await WithdrawAssets(optionId, State.account);

    if (txn) {
      ManageStage()
      const message = `Assets withdrawn, check balances on ${State.account}`;
      alert(message)
    }
    return;
  }

    return (
      <div className="creation--form">
        <div className="formHint">
          May be done by creator only. Option must be expired or executed.
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
        {CurrentOptionData === defaultOptionData ? null : (
          <div className="formHint">
            Option data : <br />
            From : {CurrentOptionData.path[0]}, amount:{" "}
            {CurrentOptionData.ratio[0]} <br />
            To: {CurrentOptionData.path[1]}, amount:{" "}
            {CurrentOptionData.ratio[1]} <br />
            Creator: {CurrentOptionData.creator} <br />
          </div>
        )}
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
            case "mustCreator":
              return (
                <div className="address--input">
                  <button type="button" disabled={true}>
                    Available for option creator only, not owner!
                  </button>
                </div>
              );
            case "notAvailable":
              return (
                <div className="address--input">
                  <button type="button" disabled={true}>
                    Option is not executed and still not expired
                  </button>
                </div>
              );
            case "withdrawn":
              return (
                <div className="address--input">
                  <button type="button" disabled={true}>
                    Assets is already withdrawn
                  </button>
                </div>
              );
            case "ok":
              return (
                <div className="address--input" onClick={WithdrawAction}>
                  <button type="button">Withdraw</button>
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    );
}

export default OptionWithdrawForm;