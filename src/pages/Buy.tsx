import { useState } from "react";
import axios from "axios";

import { useAppSelector, useAppDispatch } from "../util/hooks";
import { updateBalance } from "../features/userSlice";

const Buy = () => {
  const [symbol, setSymbol] = useState<null | string>(null);
  const [shares, setShares] = useState<null | string>(null);
  const [message, setMessage] = useState("");
  const userId = useAppSelector(state => state.user.loggedUser?.id);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("/stocks/buy", {
      user_id: userId,
      num_shares: shares,
      symbol: symbol?.toUpperCase()
    }).then((res) => {
      setMessage(res.data.message);
      dispatch(updateBalance(res.data.balance));
    })
    .catch((err) => setMessage(err.response.data))
  }
  
  return <section>
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="symbol">Ticker Symbol:</label>
      <input id="symbol" type="text" placeholder="Ticker Symbol" onChange={(e) => setSymbol(e.target.value)} />
      <label htmlFor="shares">Number of Shares:</label>
      <input id="shares" type="number" onChange={(e) => setShares(e.target.value)} />
      <input type="submit" value="Buy" />
    </form>
    <span>{message}</span>
  </section>
}
export default Buy;