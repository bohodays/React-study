import React from 'react'
import axios from 'axios'

const requestAPI = async () => {
  const url = '/api/todolist_long/gdhong';

  axios.get(url, {timeout: 900})
    .then((response) => {
      console.log('# 응답 객체 : ', response);
    })
    .catch((e) => {
      if (e instanceof Error) console.log(e.message);
      else console.log(e);
    })
};

requestAPI();

type Props = {}

const App7 = (props: Props) => {
  return (
    <h2>콘솔 로그를 확인하세요.</h2>
  )
}

export default App7