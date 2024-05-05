import { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useGetBooksQuery, useGetUserInfoQuery } from "@services/api";
import Heading from "@components/shared/heading";
import Loading from "@components/shared/loading";
import BookCard from "@components/shared/card";
import SkeletonCard from "@components/Skeleton";

const HomeContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: 20px;
  background-color: #fff7ed;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export default function Home() {
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

  return (
    <HomeContainer>
      {userIsLoading && <Loading />}
      {userIsError && <Heading>Error</Heading>}
      {userIsSuccess && (
        <>
          <Heading>Welcome, {userInfo?.name}!</Heading>
          <>
            {booksIsLoading && (
              <Grid>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </Grid>
            )}
            {booksIsError && toast.error("Failed to fetch books")}
            {booksIsSuccess && (
              <>
                <Heading>My Books</Heading>
                <Grid>
                  {books?.map((book: BookStatus) => (
                    <BookCard
                      book={book.book}
                      status={book.status}
                      key={book.book.id}
                    />
                  ))}
                </Grid>
              </>
            )}
          </>
        </>
      )}
    </HomeContainer>
  );
}
