import React, { useState } from 'react'
import CountryList from './CountryList'
import styles from './styles';
import AppCssModule from './App.module.css'
import Footer from './Footer';
import { BasicButton, ItalickButton, UnderLineButton, WhiteUnderLineButton } from './Buttons';

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

  const [theme, setTheme] = useState("basic");

  return (
    <div className='container'>
      <h2 className={AppCssModule.test}>Hello {msg}</h2>
      <hr style={styles.dashStyle} />
      {addResult(3, 4)}
      <CountryList countries={list} />

      <BasicButton>기본</BasicButton>
      <ItalickButton>이탤릭</ItalickButton>
      <UnderLineButton>언더라인</UnderLineButton>
      <WhiteUnderLineButton>화이트 언더라인</WhiteUnderLineButton>

      <Footer theme={theme} />
    </div>
  )
}

export default App;