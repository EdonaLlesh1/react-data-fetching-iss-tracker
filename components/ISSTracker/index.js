import { useEffect, useState } from "react";
import useSWR from "swr";
import Controls from "../Controls/index";
import Map from "../Map/index";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

const fetcher = async (url) =>{
  const response = await fetch (url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error");
  }
  return data;
};

export default function ISSTracker(){
const { data, error, mutate } = useSWR(URL, fetcher, {refreshInterval: 5000});

 const handleRefresh = () => {
  mutate ();
 };

 return (
  <main>
    <Map longitude={data?.longitude || 0 } latitude={data?.latitude || 0}/>
    <Controls longitude={data?.longitude || 0} latitude={data?.latitude || 0} onRefresh={handleRefresh}/>
</main>
 );
}

export async function getStaticPaths() {
 
  return {
    paths: [],
    fallback: false 
  };
}

// export default function ISSTracker() {
//   const [coords, setCoords] = useState({
//     longitude: 0,
//     latitude: 0,
//   });

//   async function getISSCoords() {
//     try {
//       const response = await fetch(URL);
//       if (response.ok) {
//         const data = await response.json();
//         setCoords({ longitude: data.longitude, latitude: data.latitude });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     const timer = setInterval(() => {
//       getISSCoords();
//     }, 5000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <main>
//       <Map longitude={coords.longitude} latitude={coords.latitude} />
//       <Controls
//         longitude={coords.longitude}
//         latitude={coords.latitude}
//         onRefresh={getISSCoords}
//       />
//     </main>
//   );
// }
