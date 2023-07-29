import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import * as types from '../types'
import * as config from '../config'

const account: string = ""
const defaultTab : types.MenuTabs = "home"

export const actionNames = {
    updateAccount: "UPDATE_ACCOUNT",
    selectTab: "SELECT_TAB",
    selectSubTab: "SELECT_SUB_TAB"
}

export const actions = {
  UpdateAccount: createAction<string>(actionNames.updateAccount),
  SelectTab: createAction<types.MenuTabs>(actionNames.selectTab),
  SelectSubTab: createAction<types.MenuTabs>(actionNames.selectSubTab),
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

const SelectSubTab = (state = account, action: any) => {
  const newState =
    action.type === actionNames.selectSubTab ? action.payload : state;
  return newState;
};

export const RootReducer = combineReducers ({
    account: SetAccount,
    tab: SelectTab,
    subTab: SelectSubTab
})

export type RootState = ReturnType<typeof RootReducer>