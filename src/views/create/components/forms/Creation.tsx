import React, { ChangeEvent, useMemo, useState } from "react";

interface CreationInput {
  tokenFrom: string;
  tokenFor: string;
  price: number;
  expiration: string;
}

const GenerateDefaultDate = () => {
    var curr = new Date();
    curr.setDate(curr.getDate() + 90);
    var date = curr.toISOString().substring(0, 10);
    return date
}

const OptionCreationForm = () => {

    const defaultDate = useMemo<string>(GenerateDefaultDate, []);
    const [formData, UpdateFormData] = useState<CreationInput>({
      tokenFrom: "",
      tokenFor: "",
      price: 0,
      expiration: defaultDate,
    });

    const FormInputHandler = (event: ChangeEvent) => {

        const target = event.target as HTMLInputElement;
        console.log(target.id);

    }

    return (
      <div className="creation--form">
        <div className="address--input">
          <div className="input--name">Suggest it:</div>
          <input
            id="tokenFrom"
            type="text"
            placeholder="0x"
            value={formData.tokenFrom}
            onChange={FormInputHandler}
          />
        </div>
        <div className="address--input">
          <div className="input--name">For:</div>
          <input
            id="tokenFor"
            type="text"
            placeholder="0x"
            value={formData.tokenFor}
            onChange={FormInputHandler}
          />
        </div>
        <div className="address--input">
          <div className="input--name">Target price:</div>
          <input
            id="price"
            type="number"
            placeholder="1000"
            value={formData.price}
            onChange={FormInputHandler}
          />
        </div>
        <div className="address--input">
          <div className="input--name">Expiration:</div>
          <input
            type="date"
            placeholder="2024-01-01"
            value={formData.expiration}
            onChange={FormInputHandler}
          />
        </div>
        <div className="address--input">
          <button type="button">Create</button>
        </div>
      </div>
    );
}

export default OptionCreationForm