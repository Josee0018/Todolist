import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  getOneTask,
  getTasks,
  resetSuccess,
  updateTask,
} from "../../redux/actions/task/task.actions";
import ListRow from "../../components/ListRow";
import TodoAdd from "../../components/TodoAdd/TodoAdd";
import TodoTable from "../../components/TodoTable/TodoTable";
import "./styles.scss";
import ModalEdit from "../../components/ModalEdit";
import ModalDelete from "../../components/ModalDelete";

const TodoList = () => {
  const dispatch = useDispatch();
  const { list, listOne, isLoadingList, errorList, success } = useSelector(
    ({ taskReducer }) => taskReducer
  );
  const [showModal, setShowModal] = useState(false);
  const [taskSelect, setTaskSelect] = useState("");
  const [filterState, setFilterState] = useState("all");
  const [taskSelectName, setTaskSelectName] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [input, setInput] = useState({
    name: "",
    completed: "",
    checked: "",
  });
 

  useEffect(() => {
    dispatch(getTasks());
    //eslint-disable-next-line
  }, []);


  useEffect(() => {
    if (success !== null && success !== undefined) {
     
     
    }
    //eslint-disable-next-line
  }, [listOne]);

  useEffect(() => {
    if (success !== null && success !== undefined) {
      dispatch(getTasks());
      dispatch(resetSuccess());
    }
    //eslint-disable-next-line
  }, [success]);

  const filterMethods = {
    all: { method: (e) => e._id !== "" },
    active: { method: (e) => e.completed === false },
    completed: { method: (e) => e.completed === true },
  };
  const addTask = async () => {
    const formData = { name: input.name, completed: false, checked: false };
    dispatch(createTask(formData));
    resetForm();
  };
  const editTask = async (name) => {
    const formData = {
      name,
    }
    dispatch(updateTask(formData, listOne._id));
  };
  const resetForm = () => {
    setInput({
      name: "",
      completed: "",
      checked: "",
    });
  };
  const handleModalDelete = (data) => {
    if (data) {
      setShowModalDelete(!showModalDelete);
      setTaskSelect(data._id);
      setTaskSelectName(data.name);
    }
  };
  const setEditForm = (data) => {
    dispatch(getOneTask(data));
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

  const completeTask = async (e) => {
    setInput(e);
    const index = list?.findIndex((element) => element._id === e._id);
    list?.splice(index, 1, {
      _id: e._id,
      name: e.name,
      completed: !e.completed,
      checked: !e.checked,
    });
    resetForm();
    localStorage.setItem("tasks", JSON.stringify(list));
  };

  const deleteTask = () => {
    if (list?.checked !== "") {
      console.log("todos los checked borrados");
    }
    let newList = list?.filter((e) => e._id !== taskSelect);
  
    setShowModalDelete(!showModalDelete);
    localStorage.setItem("tasks", JSON.stringify(newList));
    setTaskSelect("");
  };

  const clearCompleted = () => {
    let newList = list?.filter((e) => e.completed !== true);
    
    localStorage.setItem("tasks", JSON.stringify(newList));
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
    return "error2";
  }
console.log('holi',list);
  return (
    <>
      <TodoAdd
        className="container"
        HandleOnKeyUp={handleInputEnterAdd}
        onClick={addTask}
        handleInputChange={handleInputChange}
        input={input}
      ></TodoAdd>
      <ModalEdit
        show={showModal}
        onHide={() => handleModalEdit("reset")}
        onClick={editTask}
        handleInputChange={handleInputChange}
        input={listOne}
      >
        {" "}
        {"Edit person"}
      </ModalEdit>
      <ModalDelete
        show={showModalDelete}
        onHide={() => handleModalDelete("reset")}
        personSelectName={taskSelectName}
        onClick={handleModalDelete}
        onEjecute={() => deleteTask()}
      ></ModalDelete>
      <TodoTable
        tasksLeft={`${
          list?.filter((e) => e.completed === false).length
        } tasks left`}
        FilterAll={filterState !== "all" ? "hoverFilters" : "filterSelect"}
        FilterActive={
          filterState !== "active" ? "hoverFilters" : "filterSelect"
        }
        FilterCompleted={
          filterState !== "completed" ? "hoverFilters" : "filterSelect"
        }
        onClick={() => setFilterState("all")}
        onEjecute={() => setFilterState("active")}
        onEjecuteCompleted={() => setFilterState("completed")}
        onEjecuteClear={() => clearCompleted()}
        disabledCompleted={!list?.filter((e) => e.completed === true).length}
        disabledClear={!list?.filter((e) => e.completed === true).length}
      >
        {list
          ?.sort((a, b) => a.completed - b.completed)
          .filter(filterMethods[filterState].method)
          .map((item) => {
            return (
              <ListRow
                key={item._id}
                action={item.completed ? false : true}
                className={item.completed ? "completed" : ""}
                onClick={() => completeTask(item)}
                hidden={item.completed}
                onEjecute={() => handleModalEdit("edit", item)}
                onEjecuteDelete={() => handleModalDelete(item)}
                value={item._id}
                valueDelete={item.name}
              >
                {item.name}
              </ListRow>
            );
          })}
      </TodoTable>
    </>
  );
};

export default TodoList;
