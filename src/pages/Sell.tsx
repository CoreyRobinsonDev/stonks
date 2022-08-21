import { useState } from "react";
import axios from "axios";

import { useAppSelector, useAppDispatch } from "../util/hooks";
import { updateBalance } from "../app/features/userSlice";
import { is } from "immer/dist/internal";

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

  return <section>
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="symbol">Ticker Symbol: </label>
      <input id="symbol" type="text" onChange={(e) => setSymbol(e.target.value)} required />
      <label htmlFor="shares">Number of Shares: </label>
      <input id="shares" type="number" min="1" onChange={(e) => setShares(e.target.value)} required />
      <input type="submit" value="Sell" />
    </form>
    <span>{isPending ? <em>Processing...</em> : message}</span>
  </section>
}
export default Sell;