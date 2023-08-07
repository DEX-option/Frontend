import React, { ChangeEvent, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/reducer";
import { MintTokens } from "blockchain/functions/tokens";
import { optionContract, testTokens } from "config";

const FaucetForm = ({ token }) => {
  const State = useSelector((state: RootState) => {
    return state;
  });
  const [amount, SetAmount] = useState<number>(0);

  const displayName = (token: string) => {
    let res = token;
    testTokens.forEach((tkn) => {
      if (tkn.address === token) {
        res = tkn.symbol;
      }
    });
    return token;
  };

  const FormInputHandler = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const val = target.value;
    SetAmount(Number(val));
  };

  const MintAction = async () => {
      const balance = await MintTokens(State.account, token, amount);
      if (balance > 0) {
          alert("Token successfully minted, check the balance")
      }
  };

  return (
    <div className="creation--form">
      <div className="formHint">Faucet for {displayName(token)}</div>
      <div className="address--input">
        <div className="input--name">Amount {displayName(token)}:</div>
        <input
          id="tokenFor"
          type="number"
          placeholder="0x"
          value={amount}
          onChange={FormInputHandler}
        />
      </div>
      {State.account ? (
        <div className="address--input" onClick={MintAction}>
          <button type="button">Get tokens</button>
        </div>
      ) : (
        <div className="address--input">
          <button type="button" disabled={true}>
            Connect wallet to proceed
          </button>
        </div>
      )}
    </div>
  );
};

export default FaucetForm;
