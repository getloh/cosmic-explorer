import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql} from "@apollo/client";
import { pastLaunchesTypes, pastLaunchSingleTypes } from "../interfaces";
import { useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";


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
  const { search } = useLocation();
  let searchParam = search.slice(1);

  let graphQuery = pastLaunches;

  console.log(searchParam)

  if (search) {   // If a search term is in the URL, use the find query
      graphQuery = findLaunches
  }



  const { loading, error, data } = useQuery(graphQuery, {
        variables:{
          limit: 20,
          offset: offset,
          search: searchParam
        }
    });


    if (loading) return (
      <div id="loadscreen">
        <img src={loadinggif} alt="loading" title="loading" />
        <h3>Loading data...</h3>
      </div>
      );
    if (error) return <p>{error}</p>;
    // if (data){
    //     console.log(data)
    // }

    const handlePage = (str : "up"|"down") => {
      if (offset > 99 && str === "up"){
        setOffset(0);
      }
      else {setOffset(offset + (str === "up" ? 20 : -20))}
    }

    const handleClick = (event:any) => {
      console.log(event);
    }

    if (data.launchesPast.length === 0){
      return (

        <div id="loadscreen">
          <h1>No items found...</h1>
          <h3>Either something went wrong, or your search found no results</h3>
        </div>
      )

    }

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