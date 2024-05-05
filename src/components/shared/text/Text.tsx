import styled from "styled-components";

const TextStyled = styled.p<TypographyStyledProps>`
  font-size: ${({ fs }) => fs || "1rem"};
  color: ${({ color }) => color || "#000"};
  font-weight: ${({ fw }) => fw || "400"};
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};
  text-align: ${({ align }) => align || "left"};
  line-height: ${({ height }) => height || "1.5"};
  text-transform: ${({ transform }) => transform || "none"};
  text-decoration: ${({ decoration }) => decoration || "none"};
`;

export default function Text({ children, ...rest }: TypographyProps) {
  return <TextStyled {...rest}>{children}</TextStyled>;
}
