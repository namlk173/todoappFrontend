import React, { useContext } from "react";
import { NotificationManager } from "react-notifications";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import DataContext from "../../context/DataContext";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";

import "./DeleteForm.css";

const DeleteForm = (props) => {
  const api = useAxios();

  const { setTodos } = useContext(DataContext);
  const { handleLogout } = useContext(AuthContext);

  const { todo, showDeleteTodoForm, setshowDeleteTodoForm } = props;

  const handleDeleteTodo = async () => {
    try {
      const response = await api.delete(`/api/todo/${todo.id}/`);
      if (response.status === 204) {
        setshowDeleteTodoForm(false);
        setTodos((prevTodos) =>
          prevTodos.filter((oldTodo) => oldTodo.id !== todo.id)
        );
        NotificationManager.success(
          "Delete Todo successfully",
          "Delete Todo status",
          3000
        );
      }
    } catch {
      setshowDeleteTodoForm(false);
      NotificationManager.error(
        "Have an occur when excute. Please try again later or reload page",
        "Delete Todo status",
        4000
      );
      setTimeout(() => {
        handleLogout();
      }, 1000);
    }
  };

  return (
    <>
      <Modal
        show={showDeleteTodoForm}
        onHide={() => setshowDeleteTodoForm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete To Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you want to delete to do:{" "}
          <span className="delete-form-todo__title">{todo.title} ?</span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setshowDeleteTodoForm(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteTodo}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteForm;
