import React from 'react'

const OptionWithdrawForm = () => {

    return (
      <div className="creation--form">
        <div className="address--input">
          <div className="input--name">Option NFT id:</div>
          <input type="text" placeholder="0x" />
        </div>
        <div className="address--input">
          <button type="button">Withdraw</button>
        </div>
      </div>
    );
}

export default OptionWithdrawForm;