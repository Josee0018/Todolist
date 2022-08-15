import React from "react";
import { Modal, Form, Button } from "react-bootstrap";




const ModalEdit = (props) => {
  const { show, onHide, onClick, children, handleInputChange, input } = props;
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group>
                <Form.Control
                  type="text"
                  key="id"
                  name="id"
                  hidden
                  value={input.id}
                  onChange={handleInputChange}
                />
              </Form.Group>
          <Form.Group>
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              key="name"
              name="name"
              value={input.name}
              onChange={handleInputChange}
              placeholder='Write a task you want to do'
              autoFocus
            />
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClick}>
          {children}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdit;
