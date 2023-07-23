import { useEffect, useState } from "react";

import { Albumservice } from "../Api";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FormLabel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
function Allalbum() {
  const [allalbum, setallalbum] = useState({});
  const [isloading, setloading] = useState(true);
  const [error, seteroor] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [id, setid] = useState(0);
  const [data, setdata] = useState({});

  function Delete() {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this album having id:${id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Albumservice.DeletAlbum(id).then((res) => {
          if (res.status !== 200) {
            alert(res.message);
          }
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          handleClose();
        });
      }
      handleClose();
    });
  }

  function UpdateAlbum() {
    Albumservice.UpdateAlbum(
      id,
      JSON.stringify({
        title: data,
      })
    ).then((res) => {
      if (res.status !== 200) {
        Swal.fire({
          position: "center",
          icon: "Error",
          title: "Something went wrong try again later",
          showConfirmButton: false,
          timer: 1500,
        });
        handleClose1();
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Album Updated Sucessfully",
        showConfirmButton: false,
        timer: 1500,
      });
      handleClose1();
    });
  }

  useEffect(() => {
    Albumservice.getAllAlbum()
      .then((res) => {
        setallalbum(res.data);
        console.log(res.data);
        setloading(false);
      })
      .then((err) => {
        seteroor(err);
      });
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isloading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>What do yo want to do???</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
                handleShow1();
              }}
            >
              Update
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                Delete();
              }}
            >
              Delete
            </Button>
          </Modal.Body>
        </Modal>

        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Update the Album of having ID:{id}</Modal.Title>
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
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                UpdateAlbum();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {allalbum.map((item) => (
          <div className="card1" key={item.id}>
            <Card
              onClick={() => {
                setid(item.id);
                handleShow();
              }}
            >
              {item.title}
            </Card>
          </div>
        ))}
      </>
    );
  }
}

export default Allalbum;
