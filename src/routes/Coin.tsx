import { useParams } from "react-router";

interface IParam{
    coinId: string
}

function Coin(){

    const { coinId } = useParams<IParam>();
    return <h1>Coin: {coinId}</h1>;
}

export default Coin;