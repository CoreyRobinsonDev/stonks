import axios from "axios";
import { useState, useEffect } from "react";

import { useAppSelector } from "../util/hooks";
import { History } from "../util/types";
import RecentActivityCSS from "../modules/RecentActivity.module.css";

const { container, list, title } = RecentActivityCSS;

const RecentActivity = () => {
  const user = useAppSelector(state => state.user.loggedUser);
  const [history, setHistory] = useState<History[] | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    axios.post("/user/getRecentHistory", { user_id: user?.id })
    .then((res) => {
      setIsPending(false);
      setHistory(res.data);
    })
  }, [user])

  return <section className={container}>
    <h2 className={title}>Recent activity</h2>
    {isPending ? <em>Loading...</em> : history?.map((item, key) => <ul key={key} className={list}>
      <li>
        <p>{item.symbol}</p>
        <p>{item.transaction_type === "SELL" ? "+" : "-"} ${(item.num_shares * item.price).toLocaleString("en-US")}</p>
      </li>
    </ul>)}
  </section>
}

export default RecentActivity;