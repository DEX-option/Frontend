import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import * as types from '../types'
import * as config from '../config'

const defaultValue: string = ""

export const actionNames = {
    updateDefaultValue: "UPDATE_DEFAULT_VALUE"
}

export const actions = {
    UpdateDefaultValue: createAction<string>(actionNames.updateDefaultValue)
}

const DefaultValue = (state = defaultValue, action: any) => {
    const newState = (action.type === actionNames.updateDefaultValue) ? 
    action.payload : state
    return newState
}

export const RootReducer = combineReducers ({
    default: DefaultValue
})

export type RootState = ReturnType<typeof RootReducer>