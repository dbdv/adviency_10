import { useSelector, useDispatch } from "react-redux";
import { BiSad } from "react-icons/bi";
import Styles from "./giftsList.module.css";
import { TEXTS } from "../../assets/TEXTS";
import GiftItem from "../GiftItem/GiftItem";
import { init } from "../../features/gifts/giftsSlice";
import { setGifts } from "../../services/gifts";
import { useState } from "react";

export default function GiftList() {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.keyword);
  const gifts = useSelector((state) => state.gifts);
  const [deleting, setDeleting] = useState(false);
  const sortedGifts =
    gifts.length > 1
      ? Array.from(gifts).sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        })
      : gifts;

  const handleClear = async () => {
    const response = await setGifts([]);
    if (response.status !== 200) {
      return console.error(response);
    }
    dispatch(init([]));
    setDeleting(false);
  };

  return (
    <section className={Styles["list-section"]}>
      {gifts.length ? (
        <div className={Styles.subtitle}>
          <h3>{TEXTS.giftList.subtitle}</h3>
          <button
            onClick={() => setDeleting(true)}
            className={Styles.btnClearList}
          >
            {TEXTS.giftList.btnClearList}
          </button>
          {deleting ? (
            <div className={Styles.modalConfirm}>
              <span>{TEXTS.giftList.confirmClearDialog}</span>
              <div>
                <button onClick={() => handleClear()}>
                  {TEXTS.giftList.btnYesClear}
                </button>
                <button onClick={() => setDeleting(false)}>
                  {TEXTS.giftList.btnNotClear}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <h3 className={Styles["no-gifts"]}>
          {TEXTS.giftList.noGifts}
          <BiSad />
        </h3>
      )}
      <ul>
        {keyword.length && gifts.length
          ? sortedGifts
              .filter((gf) =>
                gf.title.toLowerCase().includes(keyword.trim().toLowerCase())
              )
              .map((gf) => <GiftItem key={gf.id} gf={gf}></GiftItem>)
          : gifts.length > 0
          ? sortedGifts.map((gf) => <GiftItem key={gf.id} gf={gf}></GiftItem>)
          : null}
      </ul>
    </section>
  );
}
