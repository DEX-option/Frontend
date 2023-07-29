import React from 'react'
import Maintenace from '../../components/maintenace'
import OptionCreationForm from './components/forms/Creation'
import TabSubMenu from './components/SubMenu'

const CreateOptionPage = () => {
    return(
        <div className="page">
                <TabSubMenu />
                <OptionCreationForm />
            </div>
    )
}

export default CreateOptionPage