import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

import { useAppSelector } from "../util/hooks";
import { PortfolioType, Data } from "../util/types";
import LoadingDots from "./LoadingDots";

const Doughnut = () => {
  const user = useAppSelector(state => state.user.loggedUser);
  const [portfolio, setPortfolio] = useState<PortfolioType>();
  const [active, setActive] = useState<Data | null>(null);
  const [isPending, setIsPending] = useState(false);
  let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  width = width > 1400 ? width / 3 : width / 1.2;
  const half = width / 2;

  useEffect(() => {
    setIsPending(true);
    axios.post("https://stonks-crd.herokuapp.com/user/getPortfolio", { id: user?.id })
      .then((res) => {
        setIsPending(false);
        setPortfolio(res.data);
      })
  }, [user])

  if (isPending) return <LoadingDots />;
  
  return <svg width={width} height={width} style={{backgroundColor: "#fff", borderRadius: "50%"}}>
    <Group top={half} left={half}>
      <Pie
        data={portfolio}
        pieValue={(data) => data.shares * data.price}
        outerRadius={half}
        innerRadius={({data}) => half - (active && active?.symbol === data.symbol ? (width / 8) : (width / 16))}
        padAngle={0.01}
      >
        {(pie) => {
          return pie.arcs.map((arc, key) => <g key={key}
            onMouseEnter={() => setActive(arc.data)}
            onMouseLeave={() => setActive(null)}
          >
            <path d={pie.path(arc)!} fill={arc.data.color}></path>
          </g>)
        }}
      </Pie>
      {active
        ? <>
          <Text textAnchor="middle" fill="#333" fontSize={width / 8} dy={-(width / 50)}>
            {`$${(active.shares * active.price).toLocaleString("en-US")}`}
          </Text>
          <Text textAnchor="middle" fill={active.color} fontSize={width / 16} dy={width / 10}>
            {`${active.shares} ${active.symbol}`}
          </Text>
        </>
        : <>
          <Text textAnchor="middle" fill="#333" fontSize={width / 8} dy={-(width / 50)}>
            {`$${portfolio?.reduce((acc, stock) => acc + (stock.price * stock.shares), 0).toLocaleString("en-US")}`} 
          </Text>
          <Text textAnchor="middle" fill="#333" fontSize={width / 16} dy={width / 10}>
            {`${portfolio?.length} Assets`}
          </Text>
        </>
      }
    </Group>
  </svg>
}

export default Doughnut;