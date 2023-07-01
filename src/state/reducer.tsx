import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import * as types from '../types'
import * as config from '../config'

const account: string = ""
const defaultTab : types.MenuTabs = "home"

export const actionNames = {
    updateAccount: "UPDATE_ACCOUNT",
    selectTab: "SELECT_TAB"
}

export const actions = {
    UpdateAccount: createAction<string>(actionNames.updateAccount),
    SelectTab: createAction<types.MenuTabs>(actionNames.selectTab)
}

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

export const RootReducer = combineReducers ({
    account: SetAccount,
    tab: SelectTab
})

export type RootState = ReturnType<typeof RootReducer>