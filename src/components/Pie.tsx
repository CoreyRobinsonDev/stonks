import { useEffect, useState } from "react";
import axios from "axios";
import { Pie as VPie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

import { useAppSelector } from "../util/hooks";
import { PortfolioType, Data } from "../util/types";

const Pie = () => {
  const user = useAppSelector(state => state.user.loggedUser);
  const [portfolio, setPortfolio] = useState<PortfolioType>();
  const [active, setActive] = useState<Data | null>(null);
  const width = 400;
  const half = width / 2;

  useEffect(() => {
    axios.post("/user/getPortfolio", { id: user?.id })
    .then((res) => setPortfolio(res.data))
  }, [user])

  console.log(active)
  return <svg width={width} height={width}>
    <Group top={half} left={half}>
      <VPie
        data={portfolio}
        pieValue={(data) => data.shares * data.price}
        outerRadius={half}
        innerRadius={({data}) => half - (active && active?.symbol === data.symbol ? 24 : 12)}
        padAngle={0.01}
      >
        {(pie) => {
          return pie.arcs.map((arc, key) => <g key={key}
            onMouseEnter={() => setActive(arc.data)}
            onMouseLeave={() => setActive(null)}
          >
            <path d={pie.path(arc)} fill={`rgba(255, 123, 12, ${Math.min(Math.max(((arc.data.shares * arc.data.price)/1000), 1))})`}></path>
          </g>)
        }}
      </VPie>
      {active
        ? <Text textAnchor="middle" fill="#333" fontSize={40}>
          {`$${(active.shares * active.price).toLocaleString("en-US")}`}
        </Text>
        :<Text textAnchor="middle" fill="#333" fontSize={40}>
        {`${portfolio?.length} assets`} 
      </Text>}
    </Group>
  </svg>
}

export default Pie;