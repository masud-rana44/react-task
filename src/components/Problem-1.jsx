import React, { useState } from "react";

const Problem1 = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState("all");

  const displayTasks =
    show === "all"
      ? tasks.sort((a, b) => {
          if (
            a.status.toLowerCase() === "active" &&
            b.status.toLowerCase() !== "active"
          ) {
            return -1;
          } else if (
            a.status.toLowerCase() !== "active" &&
            b.status.toLowerCase() === "active"
          ) {
            return 1;
          } else if (
            a.status.toLowerCase() === "completed" &&
            b.status.toLowerCase() !== "completed"
          ) {
            return -1;
          } else if (
            a.status.toLowerCase() !== "completed" &&
            b.status.toLowerCase() === "completed"
          ) {
            return 1;
          } else {
            return a.name.localeCompare(b.name);
          }
        })
      : tasks.filter((task) => task.status.toLowerCase() === show);

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
      status: e.target[1].value,
    };
    setTasks([...tasks, data]);
    e.target.reset();
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayTasks.map((task, idx) => (
                <tr key={idx}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
