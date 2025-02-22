import React, { useContext } from "react";
import axios from "../../../axios-instance";
import { authContext } from "../../../../../authContext";

function DeleteChart(props) {
  const filteredState = props.allPosts.filter(
    (charts) => charts._id !== props.charts._id
  );
  const context = useContext(authContext);
  const userIdF = JSON.parse(localStorage.getItem("userId"));

  const deleteHandler = async (e) => {
    e.preventDefault();
    alert("Are you Sure you want to delete it this chart??");
    try {
      await axios.post("/flowCharts/delete", {
        id: props.charts._id,
        userId: props.charts.userId,
      });
      props.setAllPosts([...filteredState]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {context.authState && (
        <div className="mb-4">
          {props.charts.userId === userIdF && (
            <div>
              <button
                onClick={(e) => deleteHandler(e)}
                className="bg-red-400 hover:bg-red-500 text-black font-bold py-2 px-4 transition h-10 rounded mr-1"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DeleteChart;
