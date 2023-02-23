import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";


interface IRouterprops {
    islight: boolean,
    themeToggle: () => void
}

function Router({themeToggle, islight}: IRouterprops){
    return <BrowserRouter>
        <Switch>
            <Route path="/:coinId">
                <Coin islight={islight}/>
            </Route>
            <Route path="/">
                <Coins themeToggle={themeToggle}/>
            </Route>
        </Switch>
    </BrowserRouter>;
}

export default Router;