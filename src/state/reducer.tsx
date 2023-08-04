import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import * as types from '../types'
import * as config from '../config'

const account: string = ""
const defaultSubTab : types.MenuTabs = "create"
const defaultTab : types.MenuTabs = "home"

export const actionNames = {
  updateAccount: "UPDATE_ACCOUNT",
  selectTab: "SELECT_TAB",
  selectSubTab: "SELECT_SUB_TAB",
  cacheOptionAllowance: "CACHE_ALLOWANCE_OPTION",
  cacheSwapAllowance: "CACHE_ALLOWANCE_SWAP",
};

export const actions = {
  UpdateAccount: createAction<string>(actionNames.updateAccount),
  SelectTab: createAction<types.MenuTabs>(actionNames.selectTab),
  SelectSubTab: createAction<types.MenuTabs>(actionNames.selectSubTab),
  CacheOptionAllowance: createAction<types.AllowanceRow[]>(
    actionNames.cacheOptionAllowance
  ),
  CacheSwapAllowance: createAction<types.AllowanceRow[]>(
    actionNames.cacheSwapAllowance
  ),
};

const SetAccount = (state = account, action: any) => {
    const newState = (action.type === actionNames.updateAccount) ? 
    action.payload : state
    return newState
}

const SelectTab = (state = account, action: any) => {
    const newState = (action.type === actionNames.selectTab) ? 
    action.payload : state
    return newState
}

const SelectSubTab = (state = defaultSubTab, action: any) => {
  const newState =
    action.type === actionNames.selectSubTab ? action.payload : state;
  return newState;
};

const CacheAllowanceOption = (state: types.AllowanceRow[] = [], action: types.AllowanceRowAction) => {
  const newState =
    action.type === actionNames.cacheOptionAllowance ? action.payload : state;
  return newState;
}

const CacheAllowanceSwap = (
  state: types.AllowanceRow[] = [],
  action: types.AllowanceRowAction
) => {
  const newState =
    action.type === actionNames.cacheSwapAllowance ? action.payload : state;
  return newState;
};

export const RootReducer = combineReducers({
  account: SetAccount,
  tab: SelectTab,
  subTab: SelectSubTab,
  optionAllowance: CacheAllowanceOption,
  swapAllowance: CacheAllowanceSwap,
});

export type RootState = ReturnType<typeof RootReducer>