import React, {
  ChangeEvent,
  useRef,
  useState,
  Dispatch,
  FocusEvent,
} from "react";

interface InputTypes {
  label: string;
  placeholder?: string;
  key: string;
  required: boolean;
  validation?: (
    v: string
  ) => {
    valid: boolean;
    message?: string;
  };
  selectValues?: string[];
  dispatch: Dispatch<{ key: string; value: string }>;
}

const Input = ({
  label,
  placeholder = "",
  key,
  required = false,
  selectValues = [],
  validation,
  dispatch,
}: InputTypes) => {
  const timerRef = useRef<number>(0);
  const [errors, setErrors] = useState<{ valid: boolean; message?: string }>({
    valid: true,
  });

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const inputValue = e.target.value;

    setErrors({ valid: true });

    // Debounces the user input by 800 seconds to avoid triggering an error while they are typing
    window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      if (validation) {
        const validations = validation(inputValue);
        if (!validations.valid) {
          setErrors(validation(inputValue));
          dispatch({
            key: label,
            value: "ERROR",
          });
          return;
        }
      }
      dispatch({
        key: label,
        value: inputValue,
      });
    }, 800);
  };

  const onBlurHandler = (
    e: FocusEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    // if the user clicked or interacted with the input but it is blank,
    // and the input is required, set an error
    if (e.target.value === "" && required) {
      setErrors({
        valid: false,
        message: "This field is required*",
      });
      dispatch({
        key: label,
        value: "ERROR",
      });
    }
  };

  return (
    <div className={`Input ${!errors.valid ? "Input__hasError" : ""}`}>
      <label className="Input_label" htmlFor={label}>
        {label} {required && "*"}
      </label>
      {selectValues?.length > 0 ? (
        <select
          className="Input_select"
          id={label}
          required={required}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
        >
          <option value="">{placeholder}</option>
          {selectValues.map((sv) => (
            <option value={sv} key={sv}>
              {sv}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="Input_input"
          id={label}
          type="text"
          onBlur={onBlurHandler}
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
      )}
      {!errors.valid && <p className="Input_errorMessage">{errors?.message}</p>}
    </div>
  );
};

export default Input;
