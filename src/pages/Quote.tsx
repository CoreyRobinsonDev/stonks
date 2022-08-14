import React, {useState} from "react";
import axios from "axios";

import TickerDetails from "../components/TickerDetails";
import TickerNews from "../components/TickerNews";

const Quote = () => {
  const [ticker, setTicker] = useState("");
  const [tickerDetails, setTickerDetails] = useState();
  const [tickerNews, setTickerNews] = useState();
  const [alert, setAlert] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("/stocks/tickerDetails", { ticker: ticker.toUpperCase() })
      .then((res) => {
        setTickerDetails(res.data.tickerDetails);
        setTickerNews(res.data.tickerNews);
    })
      .catch((err) => setAlert(err.response.data))
  }
  
  return <section>
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="ticker">Enter Ticker:</label>
      <input id="ticker" type="text" onChange={(e) => setTicker(e.target.value)} required />
      <input type="submit" value="Enter" />
    </form>
    {alert}
    <TickerDetails details={tickerDetails} />
    <TickerNews news={tickerNews} />
  </section>
}
export default Quote;