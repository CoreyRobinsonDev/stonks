import { useState } from "react";
import axios from "axios";

import { useAppSelector, useAppDispatch } from "../util/hooks";
import { updateBalance } from "../app/features/userSlice";
import SellCSS from "../modules/Sell.module.css";
import AccountDetails from "../components/AccountDetails";

const Sell = () => {
  const user = useAppSelector(state => state.user.loggedUser);
  const [symbol, setSymbol] = useState<string | null>(null);
  const [shares, setShares] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    axios.post("/stocks/sell", {
      user_id: user?.id,
      symbol: symbol?.trim().toUpperCase(),
      shares: shares
    }).then((res) => {
      setIsPending(false);
      setMessage(res.data.message);
      dispatch(updateBalance(res.data.balance));
    }).catch((err) => {
      setIsPending(false);
      setMessage(err.response.data);
    })
  }

  return <section className={SellCSS.container}>
    <AccountDetails/>
    <form className={SellCSS.form} onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="symbol">Ticker Symbol:
        <input
          style={{border: message === "Invalid ticker symbol" ? "1px solid red" : "1px solid"}}
          className={SellCSS.input} id="symbol" type="text" onChange={(e) => setSymbol(e.target.value)} required />
      </label>
      <label htmlFor="shares">Number of Shares:
        <input
          style={{border: message === "Shares must be in positive integer amounts" || message === "Insufficient shares" ? "1px solid red" : "1px solid"}}
          className={SellCSS.input} id="shares" type="number" min="1" onChange={(e) => setShares(e.target.value)} required />
      </label>
      <small className={`${SellCSS.message} ${message === "Invalid ticker symbol" || message === "Insufficient shares" || message === "Shares must be in positive integer amounts" ? SellCSS.alert : ""}`}>{isPending ? <em>Processing...</em> : message}</small>
      <input className={`${SellCSS.btn} hover`} type="submit" value="Sell" />
    </form>
  </section>
}
export default Sell;