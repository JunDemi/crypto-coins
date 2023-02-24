import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface IPriceInformation {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h?: number;
      percent_change_1y?: number;
      percent_change_6h?: number;
      percent_change_7d?: number;
      percent_change_12h?: number;
      percent_change_15m?: number;
      percent_change_24h?: number;
      percent_change_30d?: number;
      percent_change_30m?: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface PriceProps {
  coinId: string;
}

const PriceLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 15px;
`;
const PriceItems = styled.div`
  border-radius: 15px;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px 30px 15px;
  box-shadow: 2px 2px 4px ${(props) => props.theme.shadow};
  p {
    font-size: 12px;
    margin: 10px 0 20px 0;
  }
  span {
    font-size: 30px;
  }
`;
const Ath = styled(PriceItems)`
  max-width: 450px;
  margin: 20px 0;
  h5{
    font-weight: lighter;
    font-size: 12px;
    margin-top: 20px;
  }
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IPriceInformation>(
    ["prices", coinId],
    () => fetchCoinTickers(coinId),
    {
        refetchInterval: 5000,
    }
  );

  const money = data?.quotes.USD;
  const AthDate = new Date(String(data?.quotes.USD.ath_date)).toDateString();

  return (
    <>
      {isLoading ? (
        "Data Loading..."
      ) : (
        <>
          <PriceLayout>
            <PriceItems>
              <p>1 Hour ago: </p>
              <span>
                {Number(money?.percent_change_1h) > 0 ? (
                  <span style={{ color: "#fb5e46" }}>
                    {money?.percent_change_1h + "%"} &uarr;
                  </span>
                ) : (
                  <span style={{ color: "#27a0f0" }}>
                    {money?.percent_change_1h + "%"} &darr;
                  </span>
                )}
              </span>
            </PriceItems>
            <PriceItems>
              <p>6 Hours ago: </p>
              <span>
                {Number(money?.percent_change_6h) > 0 ? (
                  <span style={{ color: "#fb5e46" }}>
                    {money?.percent_change_6h + "%"} &uarr;
                  </span>
                ) : (
                  <span style={{ color: "#27a0f0" }}>
                    {money?.percent_change_6h + "%"} &darr;
                  </span>
                )}
              </span>
            </PriceItems>
            <PriceItems>
              <p>1 Day ago: </p>
              <span>
                {Number(money?.percent_change_24h) > 0 ? (
                  <span style={{ color: "#fb5e46" }}>
                    {money?.percent_change_24h + "%"} &uarr;
                  </span>
                ) : (
                  <span style={{ color: "#27a0f0" }}>
                    {money?.percent_change_24h + "%"} &darr;
                  </span>
                )}
              </span>
            </PriceItems>
            <PriceItems>
              <p>1 Week ago: </p>
              <span>
                {Number(money?.percent_change_7d) > 0 ? (
                  <span style={{ color: "#fb5e46" }}>
                    {money?.percent_change_7d + "%"} &uarr;
                  </span>
                ) : (
                  <span style={{ color: "#27a0f0" }}>
                    {money?.percent_change_7d + "%"} &darr;
                  </span>
                )}
              </span>
            </PriceItems>
            <PriceItems>
              <p>1 Month ago: </p>
              <span>
                {Number(money?.percent_change_30d) > 0 ? (
                  <span style={{ color: "#fb5e46" }}>
                    {money?.percent_change_30d + "%"} &uarr;
                  </span>
                ) : (
                  <span style={{ color: "#fb5e46" }}>
                    {money?.percent_change_30d + "%"} &darr;
                  </span>
                )}
              </span>
            </PriceItems>
            <PriceItems>
              <p>1 Year ago: </p>
              <span>
                {Number(money?.percent_change_1y) > 0 ? (
                  <span style={{ color: "#fb5e46" }}>
                    {money?.percent_change_1y + "%"} &uarr;
                  </span>
                ) : (
                  <span style={{ color: "#27a0f0" }}>
                    {money?.percent_change_1y + "%"} &darr;
                  </span>
                )}
              </span>
            </PriceItems>
          </PriceLayout>
          <Ath>
            <p>All-Time High</p>
            <span>${money?.ath_price.toFixed(3)}</span>
            <h5>at {AthDate}</h5>
          </Ath>
        </>
      )}
    </>
  );
}

export default Price;
