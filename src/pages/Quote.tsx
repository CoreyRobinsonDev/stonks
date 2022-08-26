import React, {useState} from "react";
import axios from "axios";

import TickerDetails from "../components/TickerDetails";
import TickerNews from "../components/TickerNews";
import QuoteCSS from "../modules/Quote.module.css";
import { is } from "immer/dist/internal";
import LoadingDots from "../components/LoadingDots";

const Quote = () => {
  const [ticker, setTicker] = useState("");
  const [tickerDetails, setTickerDetails] = useState();
  const [tickerNews, setTickerNews] = useState();
  const [alert, setAlert] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    axios.post("/stocks/tickerDetails", { ticker: ticker.trim().toUpperCase() })
      .then((res) => {
        setAlert("");
        setIsPending(false);
        setTickerDetails(res.data.tickerDetails);
        setTickerNews(res.data.tickerNews);
    })
      .catch((err) => {
        setIsPending(false);
        setAlert(err.response.data)
      })
  }
  
  return <section className={QuoteCSS.container}>
    <form className={QuoteCSS.form} onSubmit={(e) => handleSubmit(e)}>
      <input className={QuoteCSS.form__input} type="text" placeholder="Ticker Symbol" onChange={(e) => setTicker(e.target.value)} required />
      <input className={`${QuoteCSS.form__submit} hover`} type="submit" value="Enter" />
      <p className={QuoteCSS.form__alert}>{alert}</p>
    </form>
    <div className={QuoteCSS.quote__body}>
      {isPending ? <LoadingDots/> : <TickerDetails details={tickerDetails} /> }
      {isPending ? <LoadingDots/> : <TickerNews news={tickerNews} />}
    </div>
  </section>
}
export default Quote;