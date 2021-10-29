import styled from "styled-components";

export const Form = styled.form`
  display: grid;
  grid-template-rows: 3rem 9rem 2rem;
`;

export const List = styled.li`
  color: ${(props) => props.color};
  background-color: ${props => props.bgColor}
`;
