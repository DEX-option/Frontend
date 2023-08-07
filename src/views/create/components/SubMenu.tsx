import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, actions } from "../../../state/reducer";
import { MenuTabs } from "types";

const TabSubMenu = () => {
  const State = useSelector((state: RootState) => {
    return state;
  });
  const dispatch = useDispatch();
  const ActiveTab = State.subTab;

  const SelectTab = (event: React.MouseEvent) => {
    const item = event.target as HTMLDivElement;
    let tab: MenuTabs = "create";
    switch (item.dataset.tab) {
      case "create":
        tab = "create";
        break;
      case "execute":
        tab = "execute";
        break;
      case "withdraw":
        tab = "withdraw";
        break;
      case "faucet":
        tab = "faucet";
        break;
    }
    dispatch(actions.SelectSubTab(tab));
  };

  return (
    <div className="tab--menu">
      <div
        className={`tab--menu--item${ActiveTab === "create" ? " active" : ""}`}
      >
        <div className="tab--text" data-tab="create" onClick={SelectTab}>
          Create
        </div>
      </div>
      <div
        className={`tab--menu--item${ActiveTab === "execute" ? " active" : ""}`}
      >
        <div className="tab--text" data-tab="execute" onClick={SelectTab}>
          Execute
        </div>
      </div>
      <div
        className={`tab--menu--item${
          ActiveTab === "withdraw" ? " active" : ""
        }`}
      >
        <div className="tab--text" data-tab="withdraw" onClick={SelectTab}>
          Withdraw
        </div>
      </div>
      <div
        className={`tab--menu--item${ActiveTab === "execute" ? " active" : ""}`}
      >
        <div className="tab--text" data-tab="faucet" onClick={SelectTab}>
          Faucet
        </div>
      </div>
    </div>
  );
};

export default TabSubMenu;
