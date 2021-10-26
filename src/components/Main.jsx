import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index"
import Show from "../pages/Show"

const Main = (props) => {
    const [ people, setPeople ] = useState(null);

    const URL = 'https://infinite-hollows-03570.herokuapp.com/people/';

    const getPeople = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setPeople(data);
    };

    const createPeople = async (person) => {
//make post reqeust to create people
        await fetch(URL, {
            method: "POST", 
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person),
        });
        // update list of people
        getPeople();
    };

    const updatePeople = async (person, id) => {
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person),
        })
        getPeople(); 
    };

    const deletePeople = async id => {
        await fetch(URL + id, { method: "DELETE" });
        getPeople();
    }

//make sure to get people when app loads
// in other words we need a side-effect to occur as a result of the page
// loading. We will use teh useEffect fnctn run on page load
    useEffect(() => getPeople(), []);

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index people={people} createPeople={createPeople}/>
                </Route>
                <Route
                path="/people/:id"
                render={(rp) => (
                    <Show
                        people={people} 
                        updatePeople={updatePeople}
                        deletePeople={deletePeople}
                        {...rp}
                    />
                    // render props or RP for short
                    //includes 3 objects, location, match and history
                )}
                />
            </Switch>
        </main>
    )
}

export default Main