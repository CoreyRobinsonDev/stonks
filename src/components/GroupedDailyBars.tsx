import { useEffect } from "react";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../util/hooks";
import { advanceGroupedDailyBarsLimited, setGroupedDailyBars, sortBy } from "../app/features/stocksSlice";
import GDBarsCSS from "../modules/GroupedDailyBars.module.css";

const { container, table, table__head, table__body, btn } = GDBarsCSS;

const GroupedDailyBars = () => {
  const results = useAppSelector(state => state.stocks.groupedDailyBars?.limitedResults);
  const dispatch = useAppDispatch();
 
  useEffect(() => {
    axios.get("/stocks/groupedDailyBars")
    .then((res) => dispatch(setGroupedDailyBars(res.data)))
  }, [dispatch])

  
  const handleClick = (e: any, sort: string) => {
    e.target.parentNode.childNodes.forEach((node: any) => node.style.color = "#333");
    e.target.style.color = "#ED992A";
    dispatch(sortBy(sort));
  }

  return <section className={container}>
    <table className={table}>
      <thead className={table__head}>
        <tr>
          <th className="hover" onClick={(e) => handleClick(e, "ticker")}>Ticker</th>
          <th className="hover" onClick={(e) => handleClick(e, "open")}>Open</th>
          <th className="hover" onClick={(e) => handleClick(e, "close")}>Close</th>
          <th className="hover" onClick={(e) => handleClick(e, "high")}>High</th>
          <th className="hover" onClick={(e) => handleClick(e, "low")}>Low</th>
          <th className="hover" onClick={(e) => handleClick(e, "transactions")}># of Transactions</th>
          <th className="hover" onClick={(e) => handleClick(e, "volume")}>Trading Volume</th>
          <th className="hover" onClick={(e) => handleClick(e, "price")}>Volume Weighted Price</th>
        </tr>
      </thead>
      <tbody className={table__body}>
        {results ? results?.map((result, key) => <tr key={key}>
          <td>{result.symbol}</td>
          <td>${result.open.toLocaleString("en-US")}</td>
          <td>${result.close.toLocaleString("en-US")}</td>
          <td>${result.high.toLocaleString("en-US")}</td>
          <td>${result.low.toLocaleString("en-US")}</td>
          <td>{result.num_transactions}</td>
          <td>{result.volume}</td>
          <td>${result.volume_weighted_price.toLocaleString("en-US")}</td>
        </tr>)
        : <tr><td><em>Loading...</em></td></tr>}
      </tbody>
    </table>
    <button className={btn} onClick={() => dispatch(advanceGroupedDailyBarsLimited())}>+</button>
  </section>
}
export default GroupedDailyBars; 