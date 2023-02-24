import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
  islight: boolean;
}

const ChartDiv = styled.div`
    margin-bottom: 30px;
`;

function Chart({ coinId, islight }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      //refetchInterval: 5000,
    }
  );

  return (
    <ChartDiv>
      {isLoading ? (
        "Data not found..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "sales",
              data:
                data?.map(
                  (price) =>
                    [
                      price.time_close,
                      price.open,
                      price.high,
                      price.low,
                      price.close,
                    ] as number[]
                ) ?? [],
            },
          ]}
          options={{
            
            theme: {
                mode: islight ? "light" : "dark"
            },
            chart: {
              type: "candlestick",
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close) ?? [],
            },
            yaxis: {
              show: false,
              tooltip: {
                enabled: true,
              },
            },
            tooltip: {
                y: {
                    formatter: (value) => `$ ${value.toFixed(2)}`
                }
            },
            plotOptions:{
                candlestick:{
                    colors:{
                        upward: '#fb5e46',
                        downward: '#27a0f0'
                    }
                }
            }
          }}
        />
      )}
    </ChartDiv>
  );
}

export default Chart;
