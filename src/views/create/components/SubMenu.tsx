import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/reducer";

const TabSubMenu = () => {
    const State = useSelector((state: RootState) => {
        return state
    })
    const dispatch = useDispatch()



    return (
      <div className="tab--menu">
        <div className="tab--menu--item">
          <div className="tab--text" data-tab="create">
            Create
          </div>
        </div>
        <div className="tab--menu--item">
          <div className="tab--text" data-tab="execute">
            Execute
          </div>
        </div>
        <div className="tab--menu--item">
          <div className="tab--text" data-tab="withdraw">
            Withdraw
          </div>
        </div>
      </div>
    );
};

export default TabSubMenu;
