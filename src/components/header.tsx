import React from 'react';
import Menu from './menu'
import { ActionBtn } from './connectBtn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from '../state/reducer';
import { WalletString } from '../utils/stringFilter';
import { Auth, SubscribeOnAccountChanging } from '../blockchain/functions/auth';


const AppHeader = () => {

  const State = useSelector((state: RootState) => {
      return state
  })
  
  const dispatch = useDispatch()
  const btnText = State.account
    ? WalletString(State.account)
    : "Connect wallet";

    const ConnectWallet = async (event : React.MouseEvent) => {
      event.stopPropagation()
      if (State.account) {
        return;
      }
      const account = await Auth()

      if (account) {
        dispatch(actions.UpdateAccount(account));
        SubscrideChanges()
      }
  }
  
  const Disconnect = () => {
    dispatch(actions.UpdateAccount(""));
  }

  async function SubscrideChanges() {
    const account = await SubscribeOnAccountChanging()
          if (account) {
            dispatch(actions.UpdateAccount(account));
    }
    SubscrideChanges()
  }

    return (
      <header className="app--header">
        <div className="logo--section">
          <img className="logo--image" src="img/logo.png" />
        </div>
        <div className="menu--section">
          <Menu />
        </div>
        <div className="connect--section">
          <ActionBtn text={btnText} onClick={ConnectWallet} />
          {State.account ? (
            <ActionBtn text="Disconnect" onClick={Disconnect} />
          ) : null}
        </div>
      </header>
    );
}

export default AppHeader