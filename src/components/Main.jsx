import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index"
import Show from "../pages/Show"

const Main = (props) => {

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route
                path="/people/:id"
                render={(rp) => (<Show {...rp} />
                    // render props or RP for short
                    //includes 3 objects, location, match and history
                )}
                />
            </Switch>
        </main>
    )
}

export default Main