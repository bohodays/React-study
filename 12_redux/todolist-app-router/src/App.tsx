import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { CallbacksType, StatesType } from "./AppContainer";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import TodoList from "./pages/TodoList";
import EditTodo from "./pages/EditTodo";
import AddTodo from "./pages/AddTodo";
import NotFound from "./pages/NotFound";
import HomeContainer from "./pages/Home";

type PropsType = {
  states: StatesType;
  callbacks: CallbacksType;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="todos" element={<TodoList />} />
          <Route path="todos/add" element={<AddTodo />} />
          <Route path="todos/edit/:id" element={<EditTodo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
