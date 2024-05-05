type UserInfo = {
  name: string;
  email: string;
  id: number;
  key: string;
  secret: string;
};

type Book = {
  id: number;
  title: string;
  cover: string;
  isbn: string;
  author: string;
  pages: number;
  published: number;
};

type BookStatus = {
  book: Book;
  status: number;
};

type TypographyStyledProps = {
  fs?: string;
  color?: string;
  fw?: string;
  margin?: string;
  padding?: string;
  align?: string;
  height?: string;
  transform?: string;
  decoration?: string;
};

type TypographyProps = {
  children: React.ReactNode;
} & TypographyStyledProps;

type ButtonStyledProps = {
  color?: string;
  margin?: string;
  padding?: string;
  bg?: string;
  border?: string;
  radius?: string;
  shadow?: string;
  align?: string;
};

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
} & ButtonStyledProps;

type InputStyledProps = {
  padding?: string;
  margin?: string;
  border?: string;
  radius?: string;
  shadow?: string;
  outline?: string;
  width?: string;
};

type InputProps = {
  type: string;
  name: string;
  id?: string;
  placeholder: string;
  required?: boolean;
};
