import Styles from "./App.module.css";
import GiftList from "./components/GiftList/GiftList";
import InputGift from "./components/InputGift/InputGift";
import { FcCalendar } from "react-icons/fc";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { init } from "./features/gifts/giftsSlice";
import { getGifts } from "./services/gifts";
import { TEXTS } from "./assets/TEXTS";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    initGifts();
  }, []);
  const initGifts = async () => {
    const gifts = await getGifts();
    dispatch(init(gifts));
  };

  return (
    <main className={Styles.main}>
      <section className={Styles.wrapper}>
        <h1 className={Styles.title}>
          <FcCalendar />
          {TEXTS.app.title}
        </h1>
        <InputGift />
        <GiftList />
      </section>
    </main>
  );
}

export default App;
