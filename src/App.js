import { useState } from "react";
import React from "react";
import "./App.css";
import Allalbum from "./components/AllAlbum";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { FormLabel, InputGroup } from "react-bootstrap";

export default function App() {
  const [show, setShow] = useState(false);
  const [data, setdata] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function AddAlbum() {
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify({
        title: data,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => {
      if (res.status !== 200) {
        Swal.fire({
          position: "center",
          icon: "Error",
          title: "Something went wrong try again later",
          showConfirmButton: false,
          timer: 1500,
        });
        handleClose();
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Album Added Sucessfully",
        showConfirmButton: false,
        timer: 1500,
      });
      handleClose();
    });
  }

  return (
    <>
      <div className="nav">
        <button onClick={handleShow}>Add Album</button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormLabel>Enter The Title of the Album</FormLabel>
          <input
            type="text"
            onChange={(e) => {
              setdata(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              AddAlbum();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="app">
        <Allalbum />
      </div>
    </>
  );
}
