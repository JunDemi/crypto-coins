import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0 20px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 45px;
`;
const Loading = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.textColor};
  font-size: 29px;
  margin-top: 60px;
`;
const CoinsList = styled.ul`
  margin: 0 auto;
`;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin: 0 auto;
  margin-bottom: 15px;
  border-radius: 15px;
  max-width: 400px;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 13px;
    font-weight: bold;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const CoinImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const {isLoading, data} = useQuery<ICoins[]>(["allCoins"], fetchCoins)
  /*
  const [coins, set_coins] = useState<ICoins[]>([]);
  const [loading, set_loading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      set_coins(json.slice(0, 300));
      set_loading(false);
    })();
  }, []);
  */

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: {name: coin.name}
              }}>
                <CoinImg
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
