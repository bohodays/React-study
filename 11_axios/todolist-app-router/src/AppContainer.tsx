import App from './App';
import produce from 'immer'
import axios from 'axios';
import { useEffect, useState } from 'react';

export type TodoItemType = {
  id: number;
  todo: string;
  desc: string;
  done: boolean;
}

export type StatesType = {
  todoList: Array<TodoItemType>;
  isLoading: boolean;
}

export type CallbacksType = {
  fetchTodoList: () => void;
  addTodo: (todo: string, desc: string, callback: () => void) => void;
  deleteTodo: (id: number) => void;
  toggleDone: (id: number) => void;
  updateTodo: (id: number, todo: string, desc: string, done: boolean, callback: () => void) => void;
}

// 다른 사용자명을 사용하려면 다음 경로로 요청하여 사용자 데이터를 만드세요.
// --> https://todosvc.vercel.app/todolist/[user명]/create
const USER = 'gdhong';
// const BASEURL = '/api/todolist/' + USER;
const BASEURL = "/api/todolist_long/" + USER;

const AppContainer = () => {
  let [todoList, setTodoList] = useState<Array<TodoItemType>>([]);
  let [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTodoList();
  }, []);

  // 할 일 목록 조회 기능을 제공하는 함수
  const fetchTodoList = async () => {
    setTodoList([]);
    setIsLoading(true);
    try {
      const response = await axios.get(BASEURL);
      setTodoList(response.data);
    } catch (e) {
      if (e instanceof Error) alert("조회 실패 :" + e.message);
      else alert("조회 실패" + e);
    }
    setIsLoading(false);
  };

  // 할 일 추가 기능을 제공하는 함수
  // 할 일 추가가 성공하면 마지막 인자로 전달된 callback을 호출한다.
  const addTodo = async (todo: string, desc: string, callbacks: () => void) => {
    setIsLoading(true);
    try {
      const response = await axios.post(BASEURL, { todo, desc });   // 객체로 전달해야 하기 때문에 중괄호 사용!
      if (response.data.status === "success") {
        // 한 건의 할 일 추가가 성공이라면 전체 할 일 목록을 다시 조회하는 것이 아니라 추가된 한 건의 정보만 state에 추가한다.
        let newTodoList = produce(todoList, (draft) => {
          draft.push({ ...response.data.item, done: false });
        });
        setTodoList(newTodoList);
        callbacks();
      } else {
        alert("할 일 추가 실패 : " + response.data.message);
      }
    } catch (e) {
      if (e instanceof Error) alert("할 일 추가 실패:" + e.message);
      else alert("할 일 추가 실패" + e);
    }
    setIsLoading(false);
  };

  // 할 일 한 건을 삭제하는 기능을 제공하는 함수
  const deleteTodo = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${BASEURL}/${id}`);
      if (response.data.status === "success") {
        let index = todoList.findIndex((todo) => todo.id === id);
        let newTodoList = produce(todoList, (draft) => {
          draft.splice(index, 1);
        });
        setTodoList(newTodoList);
      } else {
        alert("할 일 삭제 실패 : " + response.data.message);
      }
    } catch (e) {
      if (e instanceof Error) alert("할 일 삭제 실패 : " + e.message);
      else alert("할 일 삭제 실패 : " + e);
    }
    setIsLoading(false);
  };

  // 할 일의 완료 여부를 토글하는 기능을 제공하는 함수
  const toggleDone = async (id: number) => {
    setIsLoading(true);
    try {
      let todoItem = todoList.find((todo) => todo.id === id);
      const response = await axios.put(`${BASEURL}/${id}`, { ...todoItem, done: !todoItem?.done });
      if (response.data.status === "success") {
        let index = todoList.findIndex((todo) => todo.id === id);
        let newTodoList = produce(todoList, (draft) => {
          draft[index].done = !draft[index].done;
        });
        setTodoList(newTodoList);
      } else {
        alert("완료 토글 실패 : " + response.data.message);
      }
    } catch (e) {
      if (e instanceof Error) alert("완료 토글 실패 : " + e.message);
      else alert("완료 토글 실패 : " + e);
    }
    setIsLoading(false);
  };

  // 할 일 수정 기능을 제공하는 함수
  // 할 일 수정이 성공하면 마지막 인자로 전달된 callback을 호출한다.
  const updateTodo = async (id: number, todo: string, desc: string, done: boolean, callback: () => void) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${BASEURL}/${id}`, { todo, desc, done });
      if (response.data.status === "success") {
        let index = todoList.findIndex((todo) => todo.id === id);
        let newTodoList = produce(todoList, (draft) => {
          draft[index] = { ...draft[index], todo, desc, done };
        });
        setTodoList(newTodoList);
        callback();
      } else {
        alert("할 일 수정 실패 : " + response.data.message);
      }
    } catch (e) {
      if (e instanceof Error) alert("할 일 수정 실패 : " + e.message);
      else alert("할 일 수정 실패 : " + e);
    }
    setIsLoading(false);
  };
  
  const callbacks: CallbacksType = { fetchTodoList, addTodo, deleteTodo, updateTodo, toggleDone };
  const states: StatesType = { todoList, isLoading };

  return <App callbacks={callbacks} states={states} />;
};

export default AppContainer;