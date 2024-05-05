import styled from "styled-components";

const InputStyled = styled.input<InputStyledProps>`
  padding: ${({ padding }) => padding || "8px 16px"};
  margin: ${({ margin }) => margin || "0"};
  border: ${({ border }) => border || "1px solid #ccc"};
  border-radius: ${({ radius }) => radius || "8px"};
  box-shadow: ${({ shadow }) => shadow || "none"};
  outline: ${({ outline }) => outline || "none"};
  width: ${({ width }) => width || "100%"};
`;

export default function Input({
  type,
  name,
  placeholder,
  required,
  ...rest
}: InputProps) {
  return (
    <InputStyled
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      {...rest}
    />
  );
}
