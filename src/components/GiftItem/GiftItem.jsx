import Styles from "./giftItem.module.css";
import { GoGift } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import { deleteGift, updateGift } from "../../services/gifts";
import { remove, update } from "../../features/gifts/giftsSlice";
import { useDispatch } from "react-redux";
import { TEXTS } from "../../assets/TEXTS";
import AmountSelector from "../AmountSelector/AmountSelector";
import { useSelector } from "react-redux";
import { useRef } from "react";

export default function GiftItem({ gf }) {
  const gifts = useSelector((state) => state.gifts);

  const dispatch = useDispatch();
  const amountRef = useRef(gf.amount);
  const handleDelete = async (gift_id) => {
    const gift_to_delete = gifts.find((gf) => gf.id === gift_id);

    if (gift_to_delete) {
      const response = await deleteGift(gifts, gift_to_delete);
      if (response.status !== 200) {
        return console.error(response);
      }
      dispatch(remove(gift_id));
    } else {
      location.reload();
    }
  };

  const handleAmountChange = async (value) => {
    let gift_to_update = gifts.find((gfAux) => gfAux.id === gf.id);

    if (gift_to_update) {
      if (value === 1 || parseInt(amountRef.current.value) > 1) {
        const newAmount = parseInt(amountRef.current.value) + value;
        gift_to_update = { ...gift_to_update, amount: newAmount };
        const response = await updateGift(gifts, gift_to_update);
        if (response.status !== 200) {
          return console.error(response);
        }
        amountRef.current.value = newAmount;
        dispatch(update(gift_to_update));
      }
    } else {
      location.reload();
    }
  };

  return (
    <div className={Styles.item}>
      {gf.img?.length ? (
        <img src={gf.img} />
      ) : (
        <GoGift className={Styles.extraSize} />
      )}
      <li>{gf.title}</li>
      <AmountSelector
        htmlRef={amountRef}
        currentValue={gf.amount}
        onMinus={() => handleAmountChange(-1)}
        onPlus={() => handleAmountChange(1)}
      />
      <div className={Styles.deleteGift}>
        <BsTrash
          className={Styles.trash}
          onClick={() => handleDelete(gf.id)}
          tabIndex="0"
        />
        <span className="">{TEXTS.giftList.deleteIconHover}</span>
      </div>
    </div>
  );
}
