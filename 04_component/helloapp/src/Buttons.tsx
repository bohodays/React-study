import styled from 'styled-components'

export const BasicButton = styled.button`
  background-color: purple;
  color: yellow;
  padding: 5px 10px 5px 10px;
  margin: 5px;
`;

export const UnderLineButton = styled(BasicButton)`
  text-decoration: underline;
`;

export const ItalickButton = styled(BasicButton)`
  font-style: italic;
`;

export const WhiteUnderLineButton = styled(UnderLineButton)`
  color: white;
`;

