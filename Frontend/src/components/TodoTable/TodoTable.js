import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";

const TodoTable = (props) => {
  const {
    children,
    tasksLeft,
    FilterAll,
    FilterActive,
    FilterCompleted,
    onClick,
    onEjecute,
    onEjecuteCompleted,
    onEjecuteClear,
    disabledCompleted,
    disabledClear,
  } = props;
  return (
    <div>
      <Table hover className="container">
        <tbody>{children}</tbody>
        <tfoot>
          <tr>
            <td>
              <div className="text-md-center">{tasksLeft}</div>
            </td>
            <td>
              <Row >
                <Col xs={2}>
                  <ListGroup.Item
                    action
                    className={FilterAll}
                    onClick={onClick}
                  >
                    All
                  </ListGroup.Item>
                </Col>
                <Col xs={3}>
                  <ListGroup.Item
                    className={FilterActive}
                    action
                    onClick={onEjecute}
                  >
                    Active
                  </ListGroup.Item>
                </Col>
                <Col>
                  <ListGroup.Item
                    action
                    disabled={disabledCompleted}
                    className={FilterCompleted}
                    onClick={onEjecuteCompleted}
                  >
                    Completed
                  </ListGroup.Item>
                </Col>
              </Row>
            </td>
            <td>
              <Col>
                <ListGroup.Item
                  action
                  disabled={disabledClear}
                  className="hoverFilters"
                  onClick={onEjecuteClear}
                >
                  Clear Completed
                </ListGroup.Item>
              </Col>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default TodoTable;
