import React, {useState} from "react";
import axios from "axios";

import TickerDetails from "../components/TickerDetails";
import TickerNews from "../components/TickerNews";
import QuoteCSS from "../modules/Quote.module.css";
import LoadingDots from "../components/LoadingDots";
import { setTickerDetails, setTickerNews } from "../app/features/stocksSlice";
import { useAppDispatch } from "../util/hooks";

const Quote = () => {
  const [ticker, setTicker] = useState("");
  const [alert, setAlert] = useState("");
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    axios.post("https://stonks-crd.herokuapp.com/stocks/tickerDetails", { ticker: ticker.trim().toUpperCase() })
      .then((res) => {
        setAlert("");
        setIsPending(false);
        dispatch(setTickerDetails(res.data.tickerDetails));
        dispatch(setTickerNews(res.data.tickerNews));
    })
      .catch((err) => {
        setIsPending(false);
        setAlert(err.response.data)
      })
  }
  
  return <section className={QuoteCSS.container}>
    <form className={QuoteCSS.form} onSubmit={(e) => handleSubmit(e)}>
      <input
        style={{border: alert === "Invalid Ticker" ? "1px solid red" : "1px solid"}}
        className={QuoteCSS.form__input} type="text" placeholder="Ticker Symbol" onChange={(e) => setTicker(e.target.value)} required />
      <input className={`${QuoteCSS.form__submit} hover`} type="submit" value="Enter" />
      <p className={QuoteCSS.form__alert}>{alert}</p>
    </form>
    <div className={QuoteCSS.quote__body}>
      {isPending ? <LoadingDots/> : <TickerDetails/> }
      {isPending ? <LoadingDots/> : <TickerNews/>}
    </div>
  </section>
}
export default Quote;