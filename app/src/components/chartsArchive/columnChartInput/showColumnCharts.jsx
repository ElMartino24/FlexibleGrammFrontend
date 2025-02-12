import React, { useState, useEffect } from "react";
import axios from "../../axios-instance";
import MapCharts from "./operation/mapCharts";
import "../sharedComponendStyle.css";


function ShowColumnCharts() {

  const [allPosts, setAllPosts] = useState([]);
  
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "/columnCharts"
        );
        const charts = data.content;
        setAllPosts(charts);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="mb-[12%]">
      <MapCharts allPosts={allPosts} setAllPosts={setAllPosts}/>
    </div>
  );
};

export default ShowColumnCharts;