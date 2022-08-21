import { useEffect } from "react";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../util/hooks";
import { advanceGroupedDailyBarsLimited, setGroupedDailyBars, sortBy } from "../app/features/stocksSlice";

const GroupedDailyBars = () => {
  const results = useAppSelector(state => state.stocks.groupedDailyBars?.limitedResults);
  const dispatch = useAppDispatch();
 
  useEffect(() => {
    axios.get("/stocks/groupedDailyBars")
    .then((res) => dispatch(setGroupedDailyBars(res.data)))
  }, [dispatch])
  return <section>
    <table>
      <thead>
        <tr>
          <th onClick={() => dispatch(sortBy("ticker"))}>Ticker</th>
          <th onClick={() => dispatch(sortBy("open"))}>Open</th>
          <th onClick={() => dispatch(sortBy("close"))}>Close</th>
          <th onClick={() => dispatch(sortBy("high"))}>High</th>
          <th onClick={() => dispatch(sortBy("low"))}>Low</th>
          <th onClick={() => dispatch(sortBy("transactions"))}># of Transactions</th>
          <th onClick={() => dispatch(sortBy("volume"))}>Trading Volume</th>
          <th onClick={() => dispatch(sortBy("price"))}>Volume Weighted Price</th>
        </tr>
      </thead>
      <tbody>
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
    <button onClick={() => dispatch(advanceGroupedDailyBarsLimited())}>Show More</button>
  </section>
}
export default GroupedDailyBars; 