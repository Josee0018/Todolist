import React from "react";
import ImageHeader from "../../components/ImageHeader";
import InputTodo from "../../components/InputTodo";
import TitleHeader from "../../components/TitleHeader";

const TodoAdd = (props) => {
  const { handleInputChange, input, HandleOnKeyUp } = props;

  return (
    <>
      <ImageHeader />
      <div className="container">
        <TitleHeader />
        <InputTodo
          HandleOnKeyUp={HandleOnKeyUp}
          handleInputChange={handleInputChange}
          input={input}
        ></InputTodo>
      </div>
    </>
  );
};

export default TodoAdd;
