import { CheckOptionExecuted, CheckOptionOwner, GetOptionData } from "blockchain/functions/option";
import React, { ChangeEvent, useState } from "react";

type Stages =
  | "enterId"
  | "checking"
  | "mustOwner"
  | "expired"
  | "executed"
  | "approve"
  | "ok";

const OptionExecuteForm = () => {
  const [stage, SelectStage] = useState<Stages>("enterId");
  const [optionId, SetOptionId] = useState<number>(0)

  const OptionIdEnter = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const val = target.value;
    
    if (Number(val) === Number(val)) SetOptionId(Number(val));

    if (stage === "enterId") {
       ManageStage();
    }
  }

  const ManageStage = async () => {
    SelectStage("checking");
    const optionData = await GetOptionData(optionId)
    const optionOwner = await CheckOptionOwner(optionId);
    const optionState = await CheckOptionExecuted(optionId);
    console.log(optionData);
    console.log(optionOwner);
    console.log(optionState);
  }

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
          case "ok":
            return (
              <div className="address--input">
                <button type="button">Execute</button>
              </div>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default OptionExecuteForm;
