import React from 'react'
import axios from 'axios'

type TodoType = {
  id: number;
  todo: string;
  done: boolean;
  desc: string;
}

const listUrl = "/api/todolist_long/gdhong";
const todoUrlPrefix = "api/todolist_long/gdhong/";

// 4건의 목록을 조회한 후 첫 번째 일만 한 번 더 조회한다.
const requestAPI = () => {
  let todoList: Array<TodoType> = [];
  axios
    .get(listUrl)
    .then((response) => {
      todoList = response.data;
      console.log('# TodoList : ', todoList);
      return todoList[0].id;
    })
    .then((id) => {
      return axios.get(todoUrlPrefix + id);
    })
    .then((response) => {
      console.log('## 첫 번째 Todo: ', response.data);
      return todoList[1].id;
    })
    .then((id) => {
      axios.get(todoUrlPrefix + id).then((response) => {
        console.log(`## 두 번째 Todo : ${response.data}`);
      })
    })
};

requestAPI();

const App = (props: TodoType) => {
  return (
    <h3>콘솔을 확인하세요.</h3>
  )
}

export default App