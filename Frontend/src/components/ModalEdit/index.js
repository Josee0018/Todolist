import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdit = (props) => {
  const { show, onHide, onClick, children, input } = props;
  const [name, setName] = useState(input?.name);
  const handleInputChange = (e) => {
    setName(e.target.value);
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              key="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Write a task you want to do"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" disabled={name===''} onClick={() => onClick(name)}>
          {children}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdit;
