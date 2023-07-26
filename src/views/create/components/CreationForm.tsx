import React from 'react'

const OptionCreationForm = () => {

    return(
        <div className="creation--form">
            <div className="address--input">
                <div className="input--name">
                    Suggest it:
                </div>
                <input type="text" placeholder="0x" />
            </div>
            <div className="address--input">
                <div className="input--name">
                    For:
                </div>
                <input type="text" placeholder="0x" />
            </div>
            <div className="address--input">
                <div className="input--name">
                    Target price:
                </div>
                <input type="text" placeholder="0x" />
            </div>
            <div className="address--input">
                <div className="input--name">
                    Expiration:
                </div>
                <input type="date" placeholder="0x" />
            </div>
            <div className="иетs--input">
                <button type="button">
                    Create
                </button>
            </div>
        </div>
    )
}

export default OptionCreationForm