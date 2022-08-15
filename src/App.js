import "./App.scss";
import { uid } from "uid";
import ButtonB from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect } from "react";
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";
import TitleHeader from "./components/TitleHeader";
import { Form } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./redux/actions/task/task.actions";
import { BsPenFill, BsXLg } from "react-icons/bs";
import InputTodo from "./components/InputTodo";
import ImageHeader from "./components/ImageHeader";

const App = () => {
  const dispatch = useDispatch();
  const { list, isLoadingList, errorList } = useSelector(
    ({ taskReducer }) => taskReducer
  );
  const [showModal, setShowModal] = useState(false);
  const [taskSelect, setTaskSelect] = useState("");
  const [filterState, setFilterState] = useState("all");
  const [taskSelectName, setTaskSelectName] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [input, setInput] = useState({
    id: "",
    name: "",
    completed: "",
    checked: "",
  });
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    dispatch(getTasks());
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (list !== null && tasks === null) {
      setTasks(list);
    }
    //eslint-disable-next-line
  }, [list]);

  const filterMethods = {
    all: { method: (e) => e.id !== "" },
    active: { method: (e) => e.completed === false },
    completed: { method: (e) => e.completed === true },
  };

  const resetForm = () => {
    setInput({
      id: "",
      name: "",
      completed: "",
      checked: "",
    });
  };
  const setEditForm = (data) => {
    setInput(data);
  };
  const handleModalDelete = (data) => {
    if (data) {
      setShowModalDelete(!showModalDelete);
      setTaskSelect(data.id);
      setTaskSelectName(data.name);
    }
  };
  const handleModalEdit = (type, data) => {
    setShowModal(!showModal);
    const CONDITION = {
      reset: () => resetForm(),
      edit: () => setEditForm(data),
    };
    CONDITION[type]();
  };
  // eslint-disable-next-line
  const editTask = async () => {
    if (input.name !== "") {
      const index = tasks?.findIndex((element) => element.id === input.id);
      tasks?.splice(index, 1, {
        id: input.id,
        name: input.name,
        completed: input.completed,
        checked: input.checked,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      handleModalEdit("reset");
    } else {
      handleModalEdit("reset");
    }
  };

  const completeTask = async (e) => {
    setInput(e);
    const index = tasks?.findIndex((element) => element.id === e.id);
    tasks?.splice(index, 1, {
      id: e.id,
      name: e.name,
      completed: !e.completed,
      checked: !e.checked,
    });
    resetForm();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };



  const deleteTask = () => {
    if(tasks?.checked !== ""){
      console.log("todos los checked borrados");
    }
    let newList = tasks?.filter((e) => e.id !== taskSelect);
    setTasks(newList);
    setShowModalDelete(!showModalDelete);
    localStorage.setItem("tasks", JSON.stringify(newList));
    setTaskSelect("");
  };

  const clearCompleted = () => {
    let newList = tasks?.filter((e) => e.completed !== true);
    setTasks(newList);
    localStorage.setItem("tasks", JSON.stringify(newList));
  };

  const addTask = async () => {
    resetForm();
    const localTask = localStorage.getItem("tasks");
    if (localTask) {
      let newId = uid();
      const arrayTask = [
        ...tasks,
        {
          id: newId,
          name: input.name,
          completed: false,
          checked: false,
        },
      ];
      setTasks(arrayTask);
      localStorage.setItem("tasks", JSON.stringify(arrayTask));
    } else {
      const arrayTask = [
        {
          id: uid(),
          name: input.name,
          completed: false,
          checked: false,
        },
      ];

      setTasks(arrayTask);
      localStorage.setItem("tasks", JSON.stringify(arrayTask));
    }
  };
  const handleInputEnterAdd = (e) => {
    if ((e.key === "Enter" || e.keyCode === 13) && input.name !== "") {
      addTask();
    }
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoadingList) {
    return "loading";
  }
  if (errorList) {
    return "error";
  }
  return (
    <>
      <ImageHeader />
      <div className="container">
        <TitleHeader />
        <InputTodo
          HandleOnKeyUp={handleInputEnterAdd}
          onClick={addTask}
          handleInputChange={handleInputChange}
          input={input}
        ></InputTodo>

        <ModalEdit
          show={showModal}
          onHide={() => handleModalEdit("reset")}
          onClick={editTask}
          handleInputChange={handleInputChange}
          input={input}
        >
          {"Edit person"}
        </ModalEdit>

        <ModalDelete
          show={showModalDelete}
          onHide={() => handleModalDelete("reset")}
          personSelectName={taskSelectName}
          onClick={handleModalDelete}
          onEjecute={() => deleteTask()}
        ></ModalDelete>

        <div>
          <Table hover>
            <tbody>
              {tasks
                ?.sort((a, b) => a.completed - b.completed)
                .filter(filterMethods[filterState].method)
                .map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <ListGroup.Item action>
                          <Form>
                            <div key={item.id} className="hover-overlay">
                              <Form.Check
                                inline
                                value={input.checked}
                                type="checkbox"
                                onClick={() => completeTask(item)}
                                id={`inline-${item.id}`}
                              />
                            </div>
                          </Form>
                        </ListGroup.Item>
                      </td>
                      <td>
                        <ListGroup.Item
                          key={item.id}
                          action={item.completed ? false : true}
                          className={item.completed ? "completed" : ""}
                          onClick={() => completeTask(item)}
                        >
                          {item.name}
                        </ListGroup.Item>
                      </td>
                      <td>
                        <Row xs={12}>
                          <Col xs={5}>
                            <ButtonB
                              variant="none"
                              value={item.id}
                              hidden={item.completed}
                              onClick={() => handleModalEdit("edit", item)}
                            >
                              <BsPenFill />
                            </ButtonB>
                          </Col>
                          <Col xs={5}>
                            <ButtonB
                              variant="none"
                              value={item.id}
                              onClick={() => handleModalDelete(item)}
                            >
                              <BsXLg />
                            </ButtonB>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <div>
                    {tasks?.filter((e) => e.completed === false).length} tasks
                    left
                  </div>
                </td>
                <td>
                  <Row xs={7}>
                    <Col xs={2}>
                      <ListGroup.Item
                        action
                        className={
                          filterState !== "all"
                            ? "hoverFilters"
                            : "filterSelect"
                        }
                        onClick={() => setFilterState("all")}
                      >
                        All
                      </ListGroup.Item>
                    </Col>
                    <Col xs={3}>
                      <ListGroup.Item
                        className={
                          filterState !== "active"
                            ? "hoverFilters"
                            : "filterSelect"
                        }
                        action
                        onClick={() => setFilterState("active")}
                      >
                        Active
                      </ListGroup.Item>
                    </Col>
                    <Col>
                      <ListGroup.Item
                        action
                        disabled={
                          !tasks?.filter((e) => e.completed === true).length
                        }
                        className={
                          filterState !== "completed"
                            ? "hoverFilters"
                            : "filterSelect"
                        }
                        onClick={() => setFilterState("completed")}
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
                      disabled={
                        !tasks?.filter((e) => e.completed === true).length
                      }
                      className="hoverFilters"
                      onClick={() => clearCompleted()}
                    >
                      Clear Completed
                    </ListGroup.Item>
                  </Col>
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>
      </div>
    </>
  );
};

export default App;
