import axios from "axios";
import { useState, useEffect } from "react";

import { useAppSelector } from "../util/hooks";
import { History } from "../util/types";
import RecentActivityCSS from "../modules/RecentActivity.module.css";

const { container, list, title, list__time, btn } = RecentActivityCSS;

const RecentActivity = () => {
  const user = useAppSelector(state => state.user.loggedUser);
  const [history, setHistory] = useState<History[] | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    axios.post("/user/getRecentHistory", { user_id: user?.id })
    .then((res) => {
      setIsPending(false);
      setHistory(res.data?.reverse());
    })
  }, [user])

  const fetchAll = (e: any) => {
    setIsPending(true);
    e.target.style.display = "none";

    axios.post("/user/getAllHistory", { user_id: user?.id })
      .then((res) => {
        setIsPending(false);
        setHistory(res.data?.reverse());
    })
  }

  return <section className={container}>
    <h2 className={title}>Recent activity</h2>
    <button className={btn} onClick={(e) => fetchAll(e)} title="Load previous history">^</button>
    {isPending ? <em>Loading...</em> : history?.map((item, key) => <ul key={key} className={list}>
      <li>
        <p style={{color: item.transaction_type === "SELL" ? "green" : "red"}}>{item.transaction_type === "SELL" ? "+" : "-"} ${(item.num_shares * item.price).toLocaleString("en-US")}</p>
        <p>{item.symbol}</p>
        <p className={list__time}>{`${new Date(item.time)}`}</p>
      </li>
    </ul>)}
  </section>
}

export default RecentActivity;