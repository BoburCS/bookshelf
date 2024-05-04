import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { useGetBooksQuery, useGetUserInfoQuery } from "@services/api";

const HomeContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: 20px;
`;

export default function Home() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const {
    data,
    isError: userIsError,
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
  } = useGetUserInfoQuery();

  const {
    data: books,
    isError: booksIsError,
    isLoading: booksIsLoading,
    isSuccess: booksIsSuccess,
  } = useGetBooksQuery();

  useEffect(() => {
    if (data) {
      setUserInfo(data.data);
    }
  }, [data]);

  return (
    <HomeContainer>
      {userIsLoading && <Typography variant="h4">Loading...</Typography>}
      {userIsError && <Typography variant="h4">Error</Typography>}
      {userIsSuccess && (
        <>
          <Typography variant="h4">Welcome {userInfo?.name}</Typography>
          <div>
            {booksIsLoading && <Typography variant="h4">Loading...</Typography>}
            {booksIsError && <Typography variant="h4">Error</Typography>}
            {booksIsSuccess && (
              <div>
                <Typography variant="h4">Books</Typography>
                <ul>
                  {books?.data?.map((book: BookStatus) => (
                    <li key={book.book.id}>
                      <Typography variant="h5">{book.book.title}</Typography>
                      <Typography variant="body1">{book.book.author}</Typography>
                      <img src={book.book.cover} alt="Cover page of book" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </HomeContainer>
  );
}
