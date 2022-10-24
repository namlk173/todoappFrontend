import { DatePicker, Space } from "antd";
import React from "react";
import moment from 'moment';

import "./TimePicker.css";

const TimePicker = (props) => { 
  const { todo, setTodo } = props;

  const onChange = (value, dateString) => {
    setTodo((prevTodo) => ({ ...prevTodo, due_to: dateString }));
  };
  
  return (
    <div>
      <Space direction="vertical" size={12}>
        <DatePicker
          showTime
          onChange={onChange}
          popupClassName="time-picker__popup"
          format={"YYYY-MM-DDTHH:mm:ss"}
          defaultValue={todo?.due_to ? moment(todo.due_to.replace("T",' ')): null}
        />
      </Space>
    </div>
  );
};

export default TimePicker;
