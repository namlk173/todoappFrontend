import React, { useState, useContext } from "react";
import { NotificationManager } from "react-notifications";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import DataContext from "../../context/DataContext";
import useAxios from "../../utils/useAxios";

import { TimePicker } from "../../components";
import AuthContext from "../../context/AuthContext";

import "./TodoForm.css";

const TodoForm = (props) => {
  const api = useAxios();

  const { setTodos } = useContext(DataContext);
  const { handleLogout } = useContext(AuthContext);
  const { showTodoForm, setShowTodoForm, action, data } = props;

  const [todo, setTodo] = useState({
    title: data?.title ? data.title : "",
    description: data?.description ? data.description : "",
    due_to: data?.due_to ? data.due_to : "",
  });

  const [todoNameError, setTodoNameError] = useState("");

  const createTodo = async () => {
    if (!todo.title) {
      setTodoNameError("To do name must be not null");
    } else {
      setShowTodoForm(false);
      api
        .post("/api/todos/", todo)
        .then((response) => {
          if (response.status === 201) {
            NotificationManager.success(
              "Created to do successfully.",
              "Create Todo status",
              3000
            );
            setTodos((prevTodos) => [response.data, ...prevTodos]);
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            NotificationManager.error(
              "Have some fields is invalid. Due to field",
              "Create Todo status",
              4000
            );
          } else {
            NotificationManager.error(
              "Server or network error. try again later",
              "Server",
              4000
            );
            setTimeout(() => {
              handleLogout();
            }, 1500);
          }
        });
    }

  };

  const updateTodo = async () => {
    if (!todo.title) {
      setTodoNameError("To do name must be not null");
    } else {
      setShowTodoForm(false);
      await api
        .patch(`/api/todo/${data.id}/`, todo)
        .then((response) => {
          if (response.status === 200) {
            NotificationManager.success(
              "Updated to do successfully.",
              "Update Todo status",
              3000
            );
            setTodos((prevTodos) =>
              prevTodos.map((prevTodo) =>
                prevTodo.id === data.id ? response.data : prevTodo
              )
            );
          }
        })
        .catch((error) => {
          setShowTodoForm(false);
          if (error.response.status === 400) {
            NotificationManager.error(
              "Have some field is invalid. Try again",
              "Update Todo status",
              3000
            );
          } else {
            NotificationManager.error(
              "Server or network have error. Try again later",
              "Server",
              3000
            );
            setTimeout(() => {
              handleLogout();
            }, 1500);
          }
        });
    }
  };

  return (
    <>
      <Modal show={showTodoForm} onHide={() => setShowTodoForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === "create" ? "Create To Do" : "Update To Do"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="form-todo__title">To Do Title</Form.Label>
              <Form.Control
                className="form-todo__input"
                type="text"
                placeholder="To do name..."
                autoFocus
                value={todo.title}
                onChange={(e) =>
                  setTodo((prevTodo) => ({
                    ...prevTodo,
                    title: e.target.value,
                  }))
                }
              />
              {todoNameError && (
                <small className="text-danger">{todoNameError}</small>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="form-todo__title">
                To Do Description
              </Form.Label>
              <Form.Control
                className="form-todo__input"
                as="textarea"
                rows={3}
                placeholder="To do description..."
                value={todo.description}
                onChange={(e) =>
                  setTodo((prevTodo) => ({
                    ...prevTodo,
                    description: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-todo__title">Due to</Form.Label>
              <TimePicker todo={todo} setTodo={setTodo} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTodoForm(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => (action === "create" ? createTodo() : updateTodo())}
          >
            {action === "create" ? "Create" : "Save changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoForm;
