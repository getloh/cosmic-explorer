import * as React from "react";
import { useSearchParams, useLocation, useParams } from "react-router-dom";

const Info = () => {

    return (
        <div id="infopage">
            <h1>
                Welcome
            </h1>
            <h2>Thanks for visiting</h2>
            <p>This site is primarily intended as a portfolio site</p>
            <h3>Main tech Used:</h3>
            <p>React, React-Router, Typescript, <a href="https://api.spacex.land/graphql/"> SpaceX GraphQL API</a></p>
            <h4>Helper libraries Used:</h4>
            <p>Moment, Apollo, GSAP, Flickity </p>
            <h2>See my other projects at <a style={{filter: "invert(1)"}} href="https://getloh.co.uk">GetLoh.co.uk</a> </h2>

<br />
            <h4>Disclaimers</h4>
            <p>The main logo icon and site name is lovingly borrowed from Japanese pop group <a href="https://en.wikipedia.org/wiki/Cosmic_Explorer">Perfume's 'Cosmic Explorer'</a>  Tour and Album</p>
            
            <p>Logo font is <a href="https://www.fontspace.com/agelast-font-f50353">Agelast</a> under freeware license -  </p>
            <p>The homepage video is property of the <a href="https://www.youtube.com/c/SpaceX/videos"> SpaceX youtube channel</a> </p>
        </div>

    )
};

export default Info;
