import { TEXTS } from "../../assets/TEXTS";
import Styles from "./inputGift.module.css";

import { AiOutlineCheck } from "react-icons/ai";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../features/gifts/giftsSlice";
import { setGifts } from "../../services/gifts";
import AmountSelector from "../AmountSelector/AmountSelector";
import { useEffect } from "react";
import {
  restartKeyword,
  setKeyword,
} from "../../features/keyword/keywordSlice";

export default function InputGift() {
  const _initialValue = {
    title: "",
    img: "",
    amount: 1,
  };
  const inputTitle = useRef(_initialValue.title);
  const inputAmount = useRef(_initialValue.amount);
  const inputImg = useRef(_initialValue.img);
  const dispatch = useDispatch();
  const gifts = useSelector((state) => state.gifts);
  const keyword = useSelector((state) => state.keyword);

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (inputTitle.current.value.trim().length) {
      const newGift = {
        id: inputTitle.current.value + Date.now(),
        title: inputTitle.current.value,
        img: inputImg.current.value,
        amount: parseInt(inputAmount.current.value),
      };
      const response = await setGifts([...gifts, newGift]);
      if (response.status !== 200) {
        return console.error(response);
      }
      dispatch(add(newGift));
      inputTitle.current.value = _initialValue.title;
      inputAmount.current.value = _initialValue.amount;
      inputImg.current.value = _initialValue.img;
      dispatch(restartKeyword());
    }
  };

  useEffect(() => {
    inputTitle.current.focus();
  }, []);

  const addOne = () => {
    inputAmount.current.value++;
  };

  const substractOne = () => {
    if (inputAmount.current.value > 1) inputAmount.current.value--;
  };

  return (
    <form className={`${Styles.form}`} onSubmit={handlesubmit}>
      <input
        ref={inputTitle}
        name="gift_title"
        type="text"
        placeholder={TEXTS.inputGift.placeholder.add_gift}
        onChange={() => {
          if (inputTitle.current.value.trim().length)
            dispatch(setKeyword(inputTitle.current.value.trim()));
        }}
        autoComplete="off"
      />
      <input
        ref={inputImg}
        type="text"
        placeholder={TEXTS.inputGift.placeholder.add_url}
      />
      <AmountSelector
        htmlRef={inputAmount}
        currentValue={1}
        extraSize={true}
        onMinus={substractOne}
        onPlus={addOne}
      />
      <button
        title={TEXTS.inputGift.button}
        className={` ${
          keyword.length > 0 ? Styles.btnHover : Styles.unavailable
        }`}
        disabled={!keyword.length > 0}
      >
        <AiOutlineCheck />
        {/* {TEXTS.inputGift.button} */}
      </button>
    </form>
  );
}
