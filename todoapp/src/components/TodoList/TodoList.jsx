import React, { useEffect, useState, useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { TbArrowsSort } from "react-icons/tb";
import { Tooltip } from "antd";

import { PropagateLoader } from "react-spinners";

import useAxios from "../../utils/useAxios";
import { TodoDetail, TodoForm } from "../../components";
import DataContext from "../../context/DataContext";

import "./TodoList.css";

const TodoList = () => {
  const api = useAxios();
  const { todos, setTodos } = useContext(DataContext);
  const [showTodoForm, setShowTodoForm] = useState(false);

  const [sortDue, setSortDue] = useState(false);
  const [sortCompleted, setSortCompleted] = useState(false);

  const handleSortByDue = () => {
    if (sortDue === true) {
      setTodos((prevTodos) =>
        prevTodos.sort((todo1, todo2) =>
          todo1.due_to > todo2.due_to ? 1 : todo1.due_to < todo2.due_to ? -1 : 0
        )
      );
    } else {
      setTodos((prevTodos) =>
        prevTodos.sort((todo1, todo2) =>
          todo1.due_to < todo2.due_to ? 1 : todo1.due_to > todo2.due_to ? -1 : 0
        )
      );
    }
  };

  const handleSortByCompleted = () => {
    if (sortCompleted === true) {
      setTodos((prevTodos) =>
        prevTodos.sort((todo1, todo2) =>
          todo1.completed > todo2.completed
            ? 1
            : todo1.completed < todo2.completed
            ? -1
            : 0
        )
      );
    } else {
      setTodos((prevTodos) =>
        prevTodos.sort((todo1, todo2) =>
          todo1.completed > todo2.completed
            ? -1
            : todo1.completed < todo2.completed
            ? 1
            : 0
        )
      );
    }
  };

  useEffect(() => {
    getTodos();

    return () => {};
  }, []);

  const getTodos = async () => {
    let response = await api.get("/api/todos/");
    if (response.status === 200) {
      setTodos(response.data);
    }
  };

  return (
    <>
      {showTodoForm && (
        <TodoForm
          showTodoForm={showTodoForm}
          setShowTodoForm={setShowTodoForm}
          action={"create"}
          setTodos={setTodos}
        />
      )}
      <div className="todo-list__swapper">
        <div className="create___todo">
          <Tooltip title="Create todo" placement="right" color="#13bf2a">
            <div className="create__todo_icon">
              <AiFillPlusCircle
                onClick={() => setShowTodoForm(true)}
                color="#13bf2a"
              />
            </div>
          </Tooltip>
        </div>
        <div className="d-flex justify-content-end align-items-center mb-2">
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-2 gap-lg-5">
            <div
              className="d-flex justify-content-start justify-content-lg-end align-items-center gap-2 cursor-pointer text__font-family__custom"
              onClick={() => {
                setSortDue((prev) => !prev);
                handleSortByDue();
              }}
            >
              <span className="text-color">Sort by due</span>
              <div className="sort__todo__icon">
                <TbArrowsSort size={18} color={"var(--primary-color)"} />
              </div>
            </div>
            <div
              className="d-flex justify-content-end align-items-center gap-2 cursor-pointer text__font-family__custom"
              onClick={() => {
                setSortCompleted((prev) => !prev);
                handleSortByCompleted();
              }}
            >
              <span className="text-color">Sort by completed</span>
              <div className="sort__todo__icon">
                <TbArrowsSort size={18} color={"var(--primary-color)"} />
              </div>
            </div>
          </div>
        </div>
        {todos?.length !== 0 ? (
          todos?.map((todo) => <TodoDetail todo={todo} key={todo.id} />)
        ) : (
          <div className="d-flex flex-column align-items-center">
            <PropagateLoader color="#2489b5" />
            <p className="mt-3 text-success">You are not have any To Do.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TodoList;
