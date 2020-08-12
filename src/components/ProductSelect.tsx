import React, { Dispatch, useState, KeyboardEvent } from "react";

interface ProductSelectProps {
  dispatch: Dispatch<{ key: string; value: string }>;
  productList: {
    value: string;
    text: string;
    icon: string;
  }[];
}

// Displays three products that can be tabbed through and selected by the user

export default ({ dispatch, productList }: ProductSelectProps) => {
  const [selectedProduct, setSelectedProduct] = useState("");

  const onKeyUpHandler = (e: KeyboardEvent, value: string) => {
    if (e.keyCode === 13) {
      selectHandler(value);
    }
  };

  const selectHandler = (value: string) => {
    setSelectedProduct(value);
    dispatch({
      key: "Product",
      value,
    });
  };

  return (
    <div className="ProductSelect">
      <h4 className="ProductSelect_title">Please select a product*</h4>
      {productList.map(({ value, text, icon }) => (
        <div
          className={`ProductSelect_${value} ${
            value === selectedProduct ? `ProductSelect_${value}__selected` : ""
          }`}
          onClick={() => selectHandler(value)}
          onKeyUp={(e) => onKeyUpHandler(e, value)}
          tabIndex={0}
        >
          <svg className="ProductSelect_icon">
            <use xlinkHref={`#${icon}`} />
          </svg>
          {text}
        </div>
      ))}
    </div>
  );
};
