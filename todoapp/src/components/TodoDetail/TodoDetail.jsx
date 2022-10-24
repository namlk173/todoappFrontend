import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Tooltip } from "antd";
import { ClipLoader } from "react-spinners";
import { NotificationManager } from "react-notifications";
import moment from "moment";

import useAxios from "../../utils/useAxios";
import { TodoForm, DeleteForm } from "../../components";
import "./TodoDetail.css";

const TodoDetail = (props) => {
  const api = useAxios();

  const { todo } = props;

  const [checked, setChecked] = useState(todo.completed);
  const [showDeleteTodoForm, setshowDeleteTodoForm] = useState(false);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [loadingChecked, setLoadingChecked] = useState(false);

  const handleUpdateCheckedTodo = async () => {
    setLoadingChecked(true);
    todo.completed = !todo.completed;

    const response = await api.patch(`/api/todo/${todo.id}/`, todo);
    if (response.status === 200) {
      setChecked(!checked);
      NotificationManager.success(
        "Update Todo status successfully.",
        "Update status Todo",
        3000
      );
    } else {
      NotificationManager.error(
        "Have a occur when excute. Please try again later.",
        'Update status Todo',
        4000
      );
    }
    setLoadingChecked(false);
  };

  return (
    <>
      {showDeleteTodoForm && (
        <DeleteForm
          showDeleteTodoForm={showDeleteTodoForm}
          setshowDeleteTodoForm={setshowDeleteTodoForm}
          todo={todo}
        />
      )}
      {showTodoForm && (
        <TodoForm
          showTodoForm={showTodoForm}
          setShowTodoForm={setShowTodoForm}
          action={"update"}
          data={todo}
        />
      )}
      <div className="todo-detail__swapper">
        <div className="todo__detail">
          {loadingChecked ? (
            <div className="mt-2">
              <ClipLoader color="#2489b5" size={28} speedMultiplier={1} />
            </div>
          ) : (
            <div className="todo__checkbox mt-3">
              <input
                type="checkbox"
                name="checkbox"
                id={`todo-${todo.id}`}
                defaultChecked={checked}
                onChange={handleUpdateCheckedTodo}
              />
            </div>
          )}
          <div className={checked ? "todo__completed" : ""}>
            <div className="todo__title">
              {todo.title.length < 30
                ? todo.title
                : `${todo.title.slice(0, 30)}...`}
            </div>
            <div className="todo__description text__font-family__custom">
              {todo.description.length < 40
                ? todo.description
                : `${todo.description.slice(0, 40)}...`}
            </div>
          </div>
        </div>
        <div
          className={`d-flex flex-lg-column align-items-start justify-content-lg-center gap-3 gap-lg-0 ${
            todo.completed
              ? "text-primary"
              : moment(todo.due_to.replace("T", " ")) > moment()
              ? "text-success"
              : "text-danger"
          }`}
        >
          <div className="fs-6 margin-left-40">
            {todo.completed
              ? "Completed"
              : moment(todo.due_to.replace("T", " ")) > moment()
              ? "Due" 
              : "Expired"}
          </div>
          <div className="text-center fs-6 text__font-family__custom">
            {todo.due_to.replace("T", ", ").slice(0, 20)}
          </div>
        </div>
        <div className="todo__actions margin-left-40">
          <Tooltip title="Update todo" placement="bottom" color="#2489b5">
            <div className="todo__update">
              <AiFillEdit onClick={() => setShowTodoForm(true)} />
            </div>
          </Tooltip>
          <Tooltip title="Delete todo" placement="bottom" color="#f26d60">
            <div className="todo__delete">
              <AiFillDelete onClick={() => setshowDeleteTodoForm(true)} />
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default TodoDetail;
