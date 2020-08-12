import React from "react";

// Display component for outputting address and product info to the user

interface AddressDisplayStyle {
  address: {
    [keys: string]: string;
  };
}

export default ({ address }: AddressDisplayStyle) => (
  <div className="AddressDisplay">
    <h3 className="AddressDisplay_heading">Thank you for entering:</h3>
    <br />
    <br />
    <h3 className="AddressDisplay_name">{address["Name"]}</h3>
    <p className="AddressDisplay_address">
      {address["Address 1"]}
      <br />
      {address["Address 2"]}
    </p>
    <p className="AddressDisplay_city">
      {address["City"]}, {address["State"]}, {address["ZIP Code"]}
    </p>
    <div className="AddressDisplay_product">Selected: {address["Product"]}</div>
  </div>
);
