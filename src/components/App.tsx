import React, { useReducer, useState, useEffect } from "react";
import { STATES, ZIP_VALIDATION, validateZIPCode } from "../utils";

import Input from "./Input";
import ProductSelect from "./ProductSelect";
import AddressDisplay from "./AddressDisplay";

const INPUT_FIELDS = [
  {
    label: "Name",
    placeholder: "Please enter your full name",
    key: "NAME",
    required: true,
  },
  {
    label: "Address 1",
    placeholder: "Please enter your street address",
    key: "ADDRESS1",
    required: true,
  },
  {
    label: "Address 2",
    placeholder: "house, suite, apt #",
    key: "ADDRESS2",
    required: false,
  },
  {
    label: "City",
    placeholder: "Please enter your city",
    key: "CITY",
    required: true,
  },
  {
    label: "State",
    placeholder: "Please select your state",
    key: "STATE",
    required: true,
    selectValues: STATES,
  },
  {
    label: "ZIP Code",
    placeholder: "e.g #####",
    key: "ZIP",
    required: true,
    validation: ZIP_VALIDATION,
  },
];

const PRODUCT_LIST = [
  {
    value: "ProductA",
    text: "Product A",
    icon: "apartment",
  },
  {
    value: "ProductB",
    text: "Product B",
    icon: "house",
  },
  {
    value: "ProductC",
    text: "Product C",
    icon: "mansion",
  },
];

const reducer = (
  state: { [keys: string]: string },
  action: { key: string; value: string }
) => ({
  ...state,
  [action.key]: action.value,
});

export default () => {
  // Contains the overall form state
  const [state, dispatch] = useReducer(reducer, {});

  // Error and status variables to handle loading, and zip validation errors
  const [hasErrors, setHasErrors] = useState(true);
  const [status, setStatus] = useState<
    "NONE" | "LOADING" | "INVALID" | "VALID"
  >("NONE");

  const validateAddress = () => {
    // Sets the status to loading to indicate to the user we are doing an api call
    setStatus("LOADING");

    validateZIPCode(state["ZIP Code"], (status: number) => {
      // If the response is valid, the zip code is valid and vice versa
      if (status === 200) {
        setStatus("VALID");
      } else {
        setStatus("INVALID");
      }
    });
  };

  useEffect(() => {
    let stateHasErrors = false;

    // Maps over the input fields to check if the require fields exists and do not have errors
    INPUT_FIELDS.map(({ label, required }) => {
      const value = state[label];

      if ((required && value === undefined) || value === "ERROR") {
        stateHasErrors = true;
      }
    });

    // Checks if a product has been selected
    if (state["Product"] === undefined) {
      stateHasErrors = true;
    }

    // if the state has errors let the app know to continue disabling the validate button
    setHasErrors(stateHasErrors);
  }, [state]);

  return (
    <div className="App">
      {status !== "VALID" ? (
        <div className="App_form">
          <h1 className="App_title">Hometap Coding Challenge</h1>
          {INPUT_FIELDS.map(
            ({
              label,
              placeholder,
              key,
              required,
              selectValues,
              validation,
            }) => (
              <Input
                required={required}
                label={label}
                placeholder={placeholder}
                key={key}
                selectValues={selectValues}
                validation={validation}
                dispatch={dispatch}
              />
            )
          )}

          <ProductSelect dispatch={dispatch} productList={PRODUCT_LIST} />

          {status === "INVALID" && (
            <p className="App_errorMessage">Invalid ZIP Code entered</p>
          )}

          <button
            className={`App_submitButton`}
            onClick={validateAddress}
            disabled={!!hasErrors}
          >
            {status === "LOADING" ? "Validating ..." : "Validate Address"}
          </button>
        </div>
      ) : (
        <AddressDisplay address={state} />
      )}
    </div>
  );
};
