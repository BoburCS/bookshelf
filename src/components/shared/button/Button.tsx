import styled from "styled-components";

const ButtonStyled = styled.button<ButtonStyledProps>`
  color: ${({ color }) => color || "#fff"};
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "12px 24px"};
  background: ${({ bg }) => bg || "#6d28d9"};
  border: ${({ border }) => border || "none"};
  border-radius: ${({ radius }) => radius || "8px"};
  box-shadow: ${({ shadow }) => shadow || "none"};
  align-self: ${({ align }) => align || "auto"};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: #a78bfa;
  }
`;

export default function Button({ children, ...rest }: ButtonProps) {
  return <ButtonStyled {...rest}>{children}</ButtonStyled>;
}
