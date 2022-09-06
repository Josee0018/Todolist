import React from "react";
import { Form,  } from "react-bootstrap";
import "./styles.scss";



const InputTodo = (props) => {
  const { handleInputChange, input, HandleOnKeyUp } = props;
  return (
    <>
      <Form className="input">
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
          <Form.Control
            type="text"
            key="name"
            name="name"
            value={input.name}
            onKeyUp={HandleOnKeyUp}
            onChange={handleInputChange}
            placeholder="Write a task you want to do"
            autoFocus
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            readOnly
            key="completed"
            hidden
            name="completed"
            value={input.completed}
          />
        </Form.Group>
      </Form>
    
    </>
  );
};

export default InputTodo;
