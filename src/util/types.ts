export type User = {
  id: number,
  username: string,
  password: string,
  balance: number
}

type GroupedDailyBarsResults = {
  T: string,
  c: number,
  h: number,
  l: number,
  n: number,
  o: number,
  t: number,
  v: number,
  vw: number
} 

export type GroupedDailyBars = {
  adjusted: boolean,
  queryCount: number,
  results: GroupedDailyBarsResults[],
  resultsCount: number,
  status: string
}