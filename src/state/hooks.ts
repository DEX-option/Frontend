import { AllowanceRow, ContractsToApprove } from "types";
import store from "./store";
import { RootState, actions } from "./reducer";

export function GetCachedallowance(
  contract: string,
  option: ContractsToApprove
): number | null {
  const State: RootState = store.getState();
  const rows =
    option === "option" ? State.optionAllowance : State.swapAllowance;
  let result: number | null = null;
  rows.forEach((rw) => {
    if (rw.contract === contract) {
      result = rw.amount;
    }
  });
  return result;
}

export function UpdateAllowanceCache(
  row: AllowanceRow,
  option: ContractsToApprove
) {
  const State: RootState = store.getState();

  const rows =
    option === "option" ? State.optionAllowance : State.swapAllowance;
  const newRows: AllowanceRow[] = [];
  let isContractExists = false;
  rows.forEach((rw) => {
    if (rw.contract === row.contract) {
      isContractExists = true;
      newRows.push(row);
    } else {
      newRows.push(rw);
    }
  });
  if (!isContractExists) {
    newRows.push(row);
  }
  const action =
    option === "option"
      ? actions.CacheOptionAllowance
      : actions.CacheSwapAllowance;
  store.dispatch(action(newRows));

  return GetCachedallowance(row.contract, option);
}
