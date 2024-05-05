import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useGetBooksQuery, useGetUserInfoQuery } from "@services/api";
import capitalize from "@lib/capitalize";
import Heading from "@components/shared/heading";
import Loading from "@components/shared/loading";
import BookCard from "@components/shared/card";
import Text from "@components/shared/text";
import Skeleton from "@components/Skeleton";

const HomeContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: 20px;
  background-color: #fff7ed;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [books, setBooks] = useState<BookStatus[]>([]);

  const {
    data: userData,
    isError: userIsError,
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
  } = useGetUserInfoQuery(undefined);

  const {
    data: booksData,
    isError: booksIsError,
    isLoading: booksIsLoading,
    isSuccess: booksIsSuccess,
  } = useGetBooksQuery(undefined);

  useEffect(() => {
    if (userData) {
      setUserInfo(userData.data);
    }
    if (booksData) {
      setBooks(booksData.data);
    }
  }, [userData, booksData]);

  useEffect(() => {
    if (userIsError) {
      toast.error("Failed to fetch user info");
      localStorage.removeItem("userKey");
      localStorage.removeItem("userSecret");
      navigate("/signup");
    }
  }, [userIsError]);

  return (
    <HomeContainer>
      {userIsLoading && <Loading />}
      {userIsSuccess && (
        <>
          <Heading>Welcome, {capitalize(userInfo?.name || "")}!</Heading>
          <>
            {booksIsLoading && <Skeleton />}
            {booksIsError && toast.error("Failed to fetch books")}
            {booksIsSuccess && (
              <>
                <Heading>My Books</Heading>
                <Grid>
                  {books?.length > 0 ? (
                    books.map((book: BookStatus) => (
                      <BookCard
                        book={book.book}
                        status={book.status}
                        key={book.book.id}
                      />
                    ))
                  ) : (
                    <Text>No books to display</Text>
                  )}
                </Grid>
              </>
            )}
          </>
        </>
      )}
    </HomeContainer>
  );
}
