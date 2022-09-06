import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalDelete = (props) => {
  const { show, onHide, onClick, onEjecute, personSelectName } = props;
  return (
    <Modal id="modal_delete" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Person</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        Are you sure you want to delete to{" "}
        {personSelectName ? personSelectName : ""}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClick}>
          Close
        </Button>
        <Button variant="primary" autoFocus onClick={onEjecute}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
