import styled from "styled-components";

const HeadingStyled = styled.h1<TypographyStyledProps>`
  font-size: ${({ fs }) => fs || "2rem"};
  color: ${({ color }) => color || "#000"};
  font-weight: ${({ fw }) => fw || "700"};
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};
  text-align: ${({ align }) => align || "left"};
  line-height: ${({ height }) => height || "2"};
  text-transform: ${({ transform }) => transform || "none"};
  text-decoration: ${({ decoration }) => decoration || "none"};

  @media (max-width: 768px) {
    font-size: 1.25rem;
    height: 1.5;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.5rem;
  }
`;

export default function Heading({ children, ...rest }: TypographyProps) {
  return <HeadingStyled {...rest}>{children}</HeadingStyled>;
}
