import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const Create = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    status: "",
  });

  const [validate, setValidate] = useState({
    title: false,
    description: false,
    date: false,
    time: false,
  });

  const [status, setStatus] = useState("");
  

  const [startDate, setStartDate] = useState(null);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTodo({ ...todo, [name]: value });
    setValidate((prevValidate) => ({
      ...prevValidate,
      [name]: false,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnCreate = () => {
    if (!(todo.title && todo.description && startDate && todo.time)) {
      setValidate({
        title: !todo.title,
        description: !todo.description,
        date: !startDate,
        time: !todo.time,
      });
      return;
    }
    const newTodo = {
      id: Date.now(),
      ...todo,
      date: moment(startDate).format("YYYY-MM-DD"),
      status: "pending",
    };

    const storedData = JSON.parse(localStorage.getItem("myStorage") || "[]");
    const updatedStorage = [newTodo, ...storedData];
    localStorage.setItem("myStorage", JSON.stringify(updatedStorage));
    console.log("...Create.", updatedStorage);
    setTodo({
      title: "",
      description: "",
      date: "",
      time: "",
    });
    navigate("/");
  };

  const handleOnCancel = () => {
    setTodo({
      title: "",
      description: "",
      date: "",
      time: "",
    });
    setValidate({
      title: false,
      description: false,
      date: false,
      time: false,
    });
    navigate("/");
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("myStorage") || "[]");
    let filtered = storedData.find(
      (item) => item.id.toString() === params.id
    ) || {
      title: "",
      description: "",
      date: "",
      time: "",
      status: "",
    };
    setTodo(filtered);
    setStartDate(filtered.date ? new Date(filtered.date) : null);
    setStatus(filtered.status);
  }, []);
  console.log(">>>>11>>", todo.status);

  const handleOnUpdate = () => {
    if (!(todo.title && todo.description && startDate && todo.time)) {
      setValidate({
        title: !todo.title,
        description: !todo.description,
        date: moment(!startDate).format("YYYY-MM-DD"),
        time: !todo.time,
      });
      return;
    }
    const storedData = JSON.parse(localStorage.getItem("myStorage")) || "[]";
    const updatedStorage = storedData.map((item) => {
      if (item.id.toString() === params.id) {
        return {
          ...item,
          title: todo.title,
          description: todo.description,
          date: moment(startDate).format("YYYY-MM-DD"),
          time: todo.time,
          status: status,
        };
      }
      return item;
    });
    localStorage.setItem("myStorage", JSON.stringify(updatedStorage));
    setTodo({
      title: "",
      description: "",
      date: "",
      time: "",
      status: "",
    });
    navigate("/");
  };

  return (
    <div className="container mt-5 col-sm-6">
      <h1 className="text-center mb-4">TODO App</h1>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Create a title"
            name="title"
            value={todo.title}
            onChange={handleInput}
            disabled={todo.status === "completed"}
          />
          {validate.title && (
            <span style={{ color: " red", display: "block", fontSize: "13px" }}>
              Title is required
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Enter the description"
            className="form-control"
            name="description"
            value={todo.description}
            onChange={handleInput}
            disabled={todo.status === "completed"}
          />
          {validate.description && (
            <span style={{ color: " red", display: "block", fontSize: "13px" }}>
              Description is required
            </span>
          )}
        </div>
        <div className="form-group ">
          <label htmlFor="date">Date</label>
          <br />
          <div>
            <DatePicker
              autoComplete="off"
              wrapperClassName="wrapperWidth"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              className="form-control "
              name="date"
              showIcon
              disabled={todo.status === "completed"}
            />
          </div>

          {validate.date && !startDate && (
            <span style={{ color: " red", display: "block", fontSize: "13px" }}>
              Date is required
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            className="form-control"
            name="time"
            value={todo.time}
            onChange={handleInput}
            disabled={todo.status === "completed"}
          />
          {validate.time && (
            <span style={{ color: "red", display: "block", fontSize: "13px" }}>
              Time is required
            </span>
          )}
        </div>
        {params.id && (
          <div className="form-group ">
            <label htmlFor="status">Status</label>
            <select
              class="form-select"
              aria-label="Default select example"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={todo.status === "completed"}
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        )}

        <div className="d-flex justify-content-end d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            className="btn btn-secondary mt-4 mx-2"
            onClick={handleOnCancel}
          >
            Cancel
          </button>

          <button
            className={
              params.id
                ? "btn btn-primary mt-4 mx-2"
                : "btn btn-warning mt-4 mx-2"
            }
            onClick={params.id ? handleOnUpdate : handleOnCreate}
            disabled={params.id ? todo.status === "completed" : false}
          >
            {params.id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
