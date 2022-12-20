import React from 'react'
import styled from 'styled-components'

type FooterPropsType = {
  theme: string;
}

const Footer = (p1: FooterPropsType) => {
  const FooterBox = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    /* props를 받을 때, 객체 형태로 받는다. { theme: 'basic' } */
    background-color: ${(p2) => (p2.theme === "basic" ? "skyblue" : "yellow")};
    text-align: center;
  `
  console.log(p1, 11);
  
  return (
    <FooterBox theme={p1.theme}>React styled-componenets Test</FooterBox>
  )
}

export default Footer