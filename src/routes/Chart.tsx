import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
    time_open: number,
    time_close: number,
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string,
    market_cap: number,
    error: string
}
interface ChartProps {
    coinId: string;
    islight: boolean
}


function Chart({ coinId, islight }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 5000
        }
    );

    return <div>{
        isLoading ? "Data not found..." :
            <ApexChart
                type="line"
                series={[
                    {
                        name: "sales",
                        data: data?.map((price) => parseFloat(price.close)) ?? []
                    },
                ]}
                options={{
                    theme: {
                        mode: islight ? "light" : "dark"
                    },
                    chart: {
                        height: 500,
                        width: 500,
                        toolbar: {
                            show: false
                        },
                        background: "transparent"
                    },
                    grid: {
                        show: false
                    },
                    stroke: {
                        curve: "smooth",
                        width: 4
                    },
                    yaxis: {
                        show: false
                    },
                    xaxis: {
                        labels: { show: false },
                        axisTicks: { show: false },
                        axisBorder: { show: false },
                        type: "datetime",
                        categories: data?.map((price) => price.time_close) ?? []
                    },
                    fill: {
                        type: "gradient",
                        gradient: { gradientToColors: ["#0be881"], stops: [0, 100] }
                    },
                    colors: ["#0fbcf9"],
                    tooltip: {
                        y: {
                            formatter: (value) => `$ ${value.toFixed(2)}`
                        }
                    }
                }} />}</div>
}

export default Chart;