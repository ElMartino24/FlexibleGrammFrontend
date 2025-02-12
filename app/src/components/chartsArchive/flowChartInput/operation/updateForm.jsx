import React, { useContext } from "react";
import axios from "../../../axios-instance";
import { authContext } from "../../../../../authContext";

export default function UpdateForm(props) {
  const filteredState = props.allPosts.filter(
    (charts) => charts._id !== props.charts._id
  );
  const context = useContext(authContext);
  const userIdF = JSON.parse(localStorage.getItem("userId")); 

  async function deleteHandler(e) {
    e.preventDefault();
    try {
      await axios.post("/flowCharts/delete", {
        id: props.charts._id,
        userId: props.charts.userId,
      });
      props.setAllPosts([...filteredState]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {context.authState && (
        <div className="mb-4">
          {props.charts.userId === userIdF && (
            <div>
              <button
                onClick={(e) => deleteHandler(e)}
                className="px-4 py-2 bg-[red] text-white rounded hover:bg-red-950">
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}