import React, {useState} from "react";
import axios from "axios";

import TickerDetails from "../components/TickerDetails";
import TickerNews from "../components/TickerNews";
import QuoteCSS from "../modules/Quote.module.css";

const Quote = () => {
  const [ticker, setTicker] = useState("");
  const [tickerDetails, setTickerDetails] = useState();
  const [tickerNews, setTickerNews] = useState();
  const [alert, setAlert] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("/stocks/tickerDetails", { ticker: ticker.trim().toUpperCase() })
      .then((res) => {
        setAlert("");
        setTickerDetails(res.data.tickerDetails);
        setTickerNews(res.data.tickerNews);
    })
      .catch((err) => setAlert(err.response.data))
  }
  
  return <section className={QuoteCSS.container}>
    <form className={QuoteCSS.form} onSubmit={(e) => handleSubmit(e)}>
      <input className={QuoteCSS.form__input} type="text" placeholder="Ticker Symbol" onChange={(e) => setTicker(e.target.value)} required />
      <input className={`${QuoteCSS.form__submit} hover`} type="submit" value="Enter" />
      <p className={QuoteCSS.form__alert}>{alert}</p>
    </form>
    <div className={QuoteCSS.quote__body}>
      <TickerDetails details={tickerDetails} /> 
      <TickerNews news={tickerNews} />
    </div>
  </section>
}
export default Quote;