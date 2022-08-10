import { useEffect, useState } from "react";
import axios from "axios";

import { useAppDispatch } from "../util/hooks";
import { setGroupedDailyBars } from "../features/stocksSlice";

const Home = () => {
  const currentDate = new Date().toISOString().slice(0, 10).split("-");
  const yesterday = [...currentDate];
  yesterday[2] = (+yesterday[2] - 1).toString();
  yesterday[1] = (+yesterday[1] - 1).toString();
  
  const [date, setDate] = useState(new Date(+yesterday[0], +yesterday[1], +yesterday[2]).toISOString().slice(0, 10));
  const [isAdjusted, setIsAdjusted] = useState("false");
  const [includeOTC, setIncludeOTC] = useState("false");
  const dispatch = useAppDispatch();
  console.log(currentDate)
  console.log(yesterday)
  console.log(date)
  useEffect(() => {
    axios.post("/stocks/groupedDailyBars", {
      date,
      isAdjusted,
      includeOTC
    })
    .then((res) => dispatch(setGroupedDailyBars(res.data)))
  }, [dispatch, date, isAdjusted, includeOTC])
  
  return <>
    home
  </>
}
export default Home;