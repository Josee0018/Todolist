import React from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { BsPenFill, BsXLg } from "react-icons/bs";

const ListRow = (props) => {
  const {
    
    value,
    valueDelete,
    action,
    className,
    onClick,
    children,
    hidden,
    onEjecute,
    onEjecuteDelete,
  } = props;
  return (
    <tr>
    <td></td>
      <td>
       <ListGroup.Item
          
          action={action}
          className={className}
          onClick={onClick}
        >
          {children}
        </ListGroup.Item>
      </td>
      <td>
        <Row xs={12}>
          <Col xs={5}>
            <Button
              variant="none"
              value={value}
              hidden={hidden}
              onClick={onEjecute}
            >
              <BsPenFill />
            </Button>
          </Col>
          <Col xs={6}>
            <Button variant="none" value={valueDelete} onClick={onEjecuteDelete}>
              <BsXLg />
            </Button>
          </Col>
        </Row>
      </td>
    </tr>
  );
};

export default ListRow;
