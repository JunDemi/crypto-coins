import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0 20px;
  margin: 0 auto;
  transition: .2s ease-in;
`;
const Header = styled.header`
  height: 15vh;
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
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.cardTextColor};
  margin: 0 auto;
  margin-bottom: 15px;
  border-radius: 15px;
  max-width: 400px;
  box-shadow: 3px 3px 3px ${props => props.theme.shadow};
  transition: 0.2s ease-in;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 13px;
    font-weight: bold;
  }
  &:hover {
    opacity: 0.7;
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
interface ICoinsprops {
  themeToggle: () => void
}


function Coins({themeToggle}: ICoinsprops) {
  const {isLoading, data} = useQuery<ICoins[]>(["allCoins"], fetchCoins);
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
      <Helmet>
        <title>
          CRYPTO TRACKERS
        </title>
      </Helmet>
      <Header>
        <Title>CRYPTO TRACKERS from Jungwook</Title>
      </Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}/price`,
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
