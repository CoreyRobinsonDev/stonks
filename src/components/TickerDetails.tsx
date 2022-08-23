import { TickerDetails as TickerDetailsType } from "../util/types";
import TickerDetailsCSS from "../modules/TickerDetails.module.css";

type Props = {
  details: TickerDetailsType | undefined
}
const TickerDetails: React.FC<Props> = ({ details }) => {
  const result = details?.results;

  return <>
    {result ?
    <div className={TickerDetailsCSS.container}>
      <img className={TickerDetailsCSS.img} src={result?.branding?.icon_url} alt="Branding icon" />
      <h2 className={TickerDetailsCSS.ticker__price}>{details?.close} <small>{result?.currency_name}</small></h2>
      <h1 className={TickerDetailsCSS.ticker__title}>{result?.name}</h1>
      <p className={TickerDetailsCSS.ticker__tag}>{result?.sic_description}</p>
      <a className={TickerDetailsCSS.ticker__link} href={result?.homepage_url} target="_blank" rel="noreferrer">{result?.homepage_url}</a>
      <p className={TickerDetailsCSS.ticker__description}>{result?.description}</p>
      <ul className={TickerDetailsCSS.ticker__list}>
        <li><b>Ticker:</b> {result?.ticker}</li>
        <li><b>Market Cap:</b> {result?.market_cap?.toLocaleString("en-US")} <small>{result?.currency_name}</small></li>
        <li><b>Shares Outstanding:</b> {result?.share_class_shares_outstanding?.toLocaleString("en-US")}</li>
        <li><b>List Date:</b> {result?.list_date}</li>
        <li><b>Headquaters:</b> {result?.address?.postal_code} {result?.address?.address1} {result?.address?.city}, {result?.address?.state}</li>
        <li><b>Phone Number:</b> {result?.phone_number}</li>
        <li><b>Total Employees:</b> {result?.total_employees?.toLocaleString("en-US")}</li>
      </ul>
    </div>
        : ""
    }
  </>
}

export default TickerDetails;