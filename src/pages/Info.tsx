import * as React from "react";
import { useSearchParams, useLocation, useParams } from "react-router-dom";

const Info = () => {
    const { search } = useLocation();

    let searchParam = search.slice(1)
    console.log(searchParam)

    if (search) {
        console.log("Triggered")
    }

    const setThing = () => {

    }

    return (
        <div id="infopage">
            <h1>
                The search parameters are! {search}
                <button onClick={setThing}>test</button>
            </h1>
        </div>

    )
};

export default Info;
