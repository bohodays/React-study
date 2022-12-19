import React from 'react'
import CountryList from './CountryList'

export type CountryType = {
  no: number;
  country: string;
  visited: boolean;
}

const App = () => {
  // let msg = '<i>World!</i>'
  let msg = (<i>World!</i>);

  const addResult = (x: number, y: number) => {
    return (
      <div className='card card-body bg-light mb-3'>
        {x} + {y} = {x + y}
      </div>
    );
  }

  let list: Array<CountryType> = [
    { no: 1, country: "이집트", visited: false },
    { no: 2, country: "일본", visited: true },
    { no: 3, country: "피지", visited: false },
    { no: 4, country: "콜롬비아", visited: false },
  ];

  return (
    <div className='container'>
      <h2>Hello {msg}</h2>
      <hr className='dash-style' />
      {addResult(3, 4)}
      <CountryList countries={list} />
    </div>
  )
}

export default App;