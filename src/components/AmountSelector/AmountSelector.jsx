import { useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Styles from "./amountSelector.module.css";

export default function AmountSelector({
  htmlRef,
  placeholder,
  currentValue,
  extraSize,
  onMinus,
  onPlus,
}) {
  return (
    <div
      className={`${Styles.amountSelector} ${
        extraSize ? Styles.extraSize : ""
      }`}
    >
      <AiOutlineMinus onClick={() => onMinus()} tabIndex="0" />
      <input
        ref={htmlRef}
        type="number"
        placeholder={placeholder ? placeholder : ""}
        readOnly={true}
        tabIndex="-1"
        value={currentValue}
      />
      <AiOutlinePlus onClick={() => onPlus()} tabIndex="0" />
    </div>
  );
}
