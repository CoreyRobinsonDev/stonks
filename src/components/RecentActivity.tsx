import axios from "axios";
import { useState, useEffect } from "react";

import { useAppSelector } from "../util/hooks";
import { History } from "../util/types";
import RecentActivityCSS from "../modules/RecentActivity.module.css";
import LoadingDots from "./LoadingDots";

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

    axios.post("/user/getAllHistory", { user_id: user?.id })
      .then((res) => {
        setIsPending(false);
        setHistory(res.data?.reverse());
    })
  }

  if (isPending) return <LoadingDots />;

  return <section className={RecentActivityCSS.container}>
    <h2 className={RecentActivityCSS.title}>Recent activity</h2>
    {history?.length ? <button className={RecentActivityCSS.btn} onClick={(e) => fetchAll(e)} title="Load previous history">+</button> : <em>No transaction history...</em>}
    {isPending ? <em>Loading...</em> : history?.map((item, key) => <ul key={key} className={RecentActivityCSS.list}>
      <li>
        <p className={RecentActivityCSS.list__money} style={{ color: item.transaction_type === "SELL" ? "green" : "red" }}>{item.transaction_type === "SELL" ? "+" : "-"} ${(item.num_shares * item.price).toLocaleString("en-US")}</p>
          <p>{item.transaction_type}</p>
          <p>{item.symbol}</p>
        <p className={RecentActivityCSS.list__time}>{`${new Date(item.time)}`}</p>
      </li>
    </ul>)}
  </section>
}

export default RecentActivity;