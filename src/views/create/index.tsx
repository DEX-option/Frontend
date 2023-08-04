import React from 'react'
import Maintenace from '../../components/maintenace'
import OptionCreationForm from './components/forms/Creation'
import TabSubMenu from './components/SubMenu'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'state/reducer'
import OptionExecuteForm from './components/forms/ExecuteForm'
import OptionWithdrawForm from './components/forms/Withdraw'

const CreateOptionPage = () => {

      const State = useSelector((state: RootState) => {
        return state;
      });
      const dispatch = useDispatch();
    const ActiveTab = State.subTab;
    
    return (
      <div className="page">
        <TabSubMenu />
        {ActiveTab === "create" ? <OptionCreationForm /> : null}
        {ActiveTab === "execute" ? <OptionExecuteForm /> : null}
        {ActiveTab === "withdraw" ? <OptionWithdrawForm /> : null}
      </div>
    );
}

export default CreateOptionPage