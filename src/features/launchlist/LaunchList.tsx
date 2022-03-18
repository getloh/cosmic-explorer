import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql} from "@apollo/client";
import { pastLaunchesTypes, pastLaunchSingleTypes } from "../interfaces";
import { useState } from "react";

import LaunchListItem from "./LaunchListItem";

const launch = gql`
  query {
    launchesPast(limit: 10) {
      mission_name
      id
      launch_site {
        site_name_long
      }
      launch_date_local
    }
  }`
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

function Launchlist () {
  const [offset, setOffset] = useState<number>(0);
    const { loading, error, data } = useQuery(pastLaunches, {
        variables:{
          limit: 20,
          offset: offset
        }
    });


    if (loading) return <p>Loading...</p>;
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

    return (
      <section className="launchlist">
        {data.launchesPast.map((x:pastLaunchSingleTypes) => <div className="launchlist-item-single"><a href={`/launch/${x.id}`} ><LaunchListItem data={x} key={x.id}/></a></div>)}

        <div className="launchlist-controls">
          {offset === 0 ? null : <button onClick={() => handlePage("down")}>Prev Page</button>}
          <button onClick={() => handlePage("up")}>Next Page</button>
          {offset}
        </div>
      </section>
    )
}

export default Launchlist