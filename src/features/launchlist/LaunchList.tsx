import { useQuery, gql} from "@apollo/client";
import { pastLaunchSingleTypes } from "../interfaces";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { randomLoadGen } from "../utility/utility";

import LaunchListItem from "./LaunchListItem";
import loadinggif from '../../images/loadingripple.svg'


const pastLaunches = gql`
query pastLaunchesList ($limit: Int!, $offset: Int){
    launchesPast(limit: $limit, offset: $offset) {
    mission_name
    id
    launch_site {
      site_name
      site_name_long
    }
    launch_date_local
    links {
      flickr_images
      mission_patch_small
    }
    launch_success
  }
}`

const findLaunches = gql`

query findLaunchesList ($search: String!){
  launchesPast(find: {mission_name: $search}) {
    mission_name
    id
    launch_site {
      site_name
      site_name_long
    }
    launch_date_local
    links {
      flickr_images
      mission_patch_small
    }
    launch_success
  }
}`



function Launchlist () {
  const [offset, setOffset] = useState<number>(0);
  const { search } = useLocation();   // finds search term if any
  let searchParam = search.slice(1);

  let graphQuery = pastLaunches;

  if (search) {   //? If a search term is in the URL, use the find query
      graphQuery = findLaunches
  }

  const { loading, error, data } = useQuery(graphQuery, { //? Apollo gql query
        variables:{
          limit: 20,
          offset: offset,
          search: searchParam
        }
    });

    const handlePage = (str : "up"|"down") => {   //? Changes page via the offset (state)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

      if (offset > 99 && str === "up"){   // Edge case to prevent offsetting too high
        setOffset(0);
      }
      else {  
        setOffset(offset + (str === "up" ? 20 : -20))
      }
    }

//* Loading screen
  if (loading) return (   
    <div id="loadscreen">
      <img src={loadinggif} alt="loading" title="loading" />
      <h3>{randomLoadGen()}</h3>
    </div>
    );
//* Error screen
  if (error) return (
    <div id="loadscreen">
      <h1>A problem occured while fetching data from the spaceX server</h1>
      <h3>This may resolve on a refresh, or the external server may be down.</h3>
      <h4>Either way, I blame Elon</h4>
      <br /> <br />
      <p>{error}</p>
  </div>
  );

//* Page if no items found in the data array (bad search or strange server response)
    if (data.launchesPast.length === 0){
      return (
        <div id="loadscreen">
          <h1>No items found...</h1>
          <h3>Either something went wrong, or your search found no results</h3>
        </div>
      )
    }

//* Main Return - does a .map on the data array
    return (
      <section className="launchlist">
        {data.launchesPast.map((x:pastLaunchSingleTypes) => <div className="launchlist-item-single" key={x.id} ><a href={`/launch/${x.id}`} ><LaunchListItem data={x} key={x.id}/></a></div>)}

        <div className="launchlist-controls">
          {offset === 0 ? <button style={{opacity: 0.5}}onClick={() => handlePage("down")} disabled>Prev Page</button> : <button onClick={() => handlePage("down")}>Prev Page</button>}
          <button style={{cursor: "auto", backgroundColor: "black", border:"1px solid rgb(50, 50, 50)"}}>Page {offset / 20 +1}</button>
          {offset > 99 ? <button style={{opacity: 0.5}}onClick={() => handlePage("up")} disabled>Next Page</button> : <button onClick={() => handlePage("up")}>Next Page</button>}
        </div>
      </section>
    )
}

export default Launchlist