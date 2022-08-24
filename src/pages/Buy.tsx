import { useState } from "react";
import axios from "axios";

import { useAppSelector, useAppDispatch } from "../util/hooks";
import { updateBalance } from "../app/features/userSlice";
import BuyCSS from "../modules/Buy.module.css";
import AccountDetails from "../components/AccountDetails";

const Buy = () => {
  const [symbol, setSymbol] = useState<null | string>(null);
  const [shares, setShares] = useState<null | string>(null);
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const userId = useAppSelector(state => state.user.loggedUser?.id);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    axios.post("/stocks/buy", {
      user_id: userId,
      num_shares: shares,
      symbol: symbol?.trim().toUpperCase()
    }).then((res) => {
      setIsPending(false);
      setMessage(res.data.message);
      dispatch(updateBalance(res.data.balance));
    }).catch((err) => {
      setIsPending(false);
      setMessage(err.response.data)
    })
  }
  
  return <section className={BuyCSS.container}>
    <AccountDetails/>
    <form className={BuyCSS.form} onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="symbol">Ticker Symbol:
        <input
          style={{border: message === "Invalid ticker symbol" ? "1px solid red" : "1px solid"}}
          className={BuyCSS.input} id="symbol" type="text" onChange={(e) => setSymbol(e.target.value)} required />
      </label>
      <label htmlFor="shares">Number of Shares:
        <input
          style={{border: message === "Shares must be in positive integer amounts" ? "1px solid red" : "1px solid"}}
          className={BuyCSS.input} id="shares" type="number" min="1" onChange={(e) => setShares(e.target.value)} required />
      </label>
      <small className={`${BuyCSS.message} ${message === "Invalid ticker symbol" || message === "Shares must be in positive integer amounts" ? BuyCSS.alert : ""}`}>{isPending ? <em>Processing...</em> : message}</small>
      <input className={BuyCSS.btn} type="submit" value="Buy" />
    </form>
  </section>
}
export default Buy;