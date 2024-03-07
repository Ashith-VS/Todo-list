import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const Listing = () => {
  const [myStorage, setMyStorage] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setMyStorage(JSON.parse(localStorage.getItem("myStorage") || "[]"));
  }, []);

  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalsOpen, setModalsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalContents, setModalContents] = useState("");
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [modalEdit,setModalEdit] = useState("")

  const handleOnEdit = (id,status) => {
    if (status === "completed") {
      console.log("edit>>>>", status);
      setModalEdit("You can't Edit this.");
      setModalsOpen(true);
    } else {
    const editedTodo = myStorage.find((item) => item.id === id);
    editedTodo && navigate(`/update/${id}`);
  }}

  const handleOnDelete = (id, status) => {
    if (status === "completed") {
      console.log("hgjstatus>>>>", status);
      setModalContent("You can't delete this.");
      setModalOpen(true);
    } else {
      setDeleteItemId(id);
      setModalContents("Are you sure you want to delete this?");
      setModalIsOpen(true);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const confirmDelete = () => {
    if (deleteItemId) {
      const updatedStorage = myStorage.filter(
        (item) => item.id !== deleteItemId
      );
      localStorage.setItem("myStorage", JSON.stringify(updatedStorage));
      setMyStorage(updatedStorage);
      setModalIsOpen(false);
      setDeleteItemId(null);
      navigate("/");
    }
  };

  const closeModal = () => {
    setDeleteItemId(null);
    setModalIsOpen(false);
    setModalOpen(false);
   setModalsOpen(false)
  };

  const handleOnCreate = () => {
    navigate("/create");
  };

  return (
    <div className="container text-center pb-4 col-sm-6">
      <h1 className="my-4">Todo Listing</h1>
      {myStorage.length === 0 ? (
        <div>
          <p className=" text-center pt-4">No items Found</p>
          <button
            className="btn btn-primary mt-4 mx-2"
            onClick={handleOnCreate}
          >
            create
          </button>
        </div>
      ) : (
        <div>
          <button
            className="btn btn-primary mt-4 mx-2 mb-3"
            onClick={handleOnCreate}
          >
            create
          </button>
          <table className="table table-striped table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
              {myStorage.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.date || ""}</td>
                  <td>
                    {item.status === "completed" ? "completed" : "pending"}
                  </td>
                  {console.log(">>>444>>>.", myStorage)}

                  <td>
                    <button
                      className="btn btn-secondary mt-2"
                      onClick={() => handleOnEdit(item.id,item.status)}
                    >
                      Edit
                    </button>
                    &ensp;
                    <button
                      className="btn btn-warning mt-2 "
                      onClick={() => handleOnDelete(item.id, item.status)}
                    >
                      Delete
                    </button>
                    <Modal isOpen={item.status === "completed" ? modalOpen : modalIsOpen} style={customStyles}>
                      <div className="modal-content align-items-center justify-content-center">
                        <div className="modal-body text-center">
                          <h5 className="modal-title">{item.status === "completed" ? modalContent : modalContents}</h5>
                          <div className="modal-footer mt-3">
                            {item.status === "completed" ?
                            (<button
                              className="btn btn-danger mx-2"
                              onClick={closeModal}
                            >
                              OK
                            </button>):(
                              <>
                               <button
                               className="btn btn-danger mx-2"
                               onClick={confirmDelete}
                             >
                               OK
                             </button>
                             <button
                               className="btn btn-secondary mx-2"
                               onClick={closeModal}
                             >
                               Cancel
                             </button></>
                            )}
                          </div>
                        </div>
                      </div>
                    </Modal>
                    <Modal isOpen={ modalsOpen} style={customStyles}>
                      <div className="modal-content align-items-center justify-content-center">
                        <div className="modal-body text-center">
                          <h5 className="modal-title">{modalEdit}</h5>
                          <div className="modal-footer mt-3">
                            <button
                              className="btn btn-danger mx-2"
                              onClick={closeModal}
                            >
                              OK
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Listing;
