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
}

type BookStatus = {
  book: Book;
  status: number;
}
