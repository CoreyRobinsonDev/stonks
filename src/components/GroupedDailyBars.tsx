import { useEffect, useState } from "react";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../util/hooks";
import { advanceGroupedDailyBarsLimited, setGroupedDailyBars, sortBy } from "../features/stocksSlice";

const GroupedDailyBars = () => {
  const currentDate = new Date().toISOString().slice(0, 10).split("-");
  const yesterday = [...currentDate];
  yesterday[2] = (+yesterday[2] - 3).toString();
  yesterday[1] = (+yesterday[1] - 1).toString();
  const yesterdayDate = new Date(+yesterday[0], +yesterday[1], +yesterday[2]).toISOString().slice(0, 10);
  
  const [date, setDate] = useState(yesterdayDate);
  const [isAdjusted, setIsAdjusted] = useState(false);
  const [includeOTC, setIncludeOTC] = useState(false);
  const results = useAppSelector(state => state.stocks.groupedDailyBars?.limitedResults);
  const dispatch = useAppDispatch();
 
  useEffect(() => {
    axios.post("/stocks/groupedDailyBars", {
      date,
      isAdjusted,
      includeOTC
    })
    .then((res) => dispatch(setGroupedDailyBars(res.data)))
  }, [dispatch, date, isAdjusted, includeOTC])
  return <section>
    <div>
      <input type="date" max={yesterdayDate} onChange={(e) => setDate(e.target.value)} />
      <button onClick={() => setIsAdjusted(a => !a)}>Adjust for splits</button>
      <button onClick={() => setIncludeOTC(i => !i)}>Include OTC securities</button>
    </div>
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
          <td>{result.T}</td>
          <td>{result.o}</td>
          <td>{result.c}</td>
          <td>{result.h}</td>
          <td>{result.l}</td>
          <td>{result.n}</td>
          <td>{result.v}</td>
          <td>{result.vw}</td>
        </tr>)
        : <tr><td><em>Loading...</em></td></tr>}
      </tbody>
    </table>
    <button onClick={() => dispatch(advanceGroupedDailyBarsLimited())}>Show More</button>
  </section>
}
export default GroupedDailyBars; 