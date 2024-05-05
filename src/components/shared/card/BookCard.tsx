import React from "react";
import styled from "styled-components";
import { useEditBookMutation, useDeleteBookMutation } from "@services/api";
import { toast } from "react-toastify";
import Heading from "../heading";
import Text from "../text";
import Button from "../button";

const Card = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  img {
    width: 130px;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const Select = styled.select`
  border-radius: 4px;
  outline: none;
`;

export default function BookCard({ book, status: initialStatus }: BookStatus) {
  const { title, author, cover, isbn, pages, published } = book;
  const [status, setStatus] = React.useState(initialStatus);
  const [useEditBook, { data: editBookData, error: editBookError }] = useEditBookMutation();
  const [useDeleteBook, { data: deleteBookData, error: deleteBookError }] = useDeleteBookMutation();

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = Number(e.target.value);
    setStatus(newStatus);
    useEditBook({ ...book, status: newStatus });
  };

  if (editBookData) {
    toast.success("Book status updated successfully");
  }

  if (editBookError) {
    toast.error("Failed to update book status");
  }

  const handleDeleteBook = () => {
    useDeleteBook(book.id);
  }

  if (deleteBookData) {
    toast.success("Book deleted successfully");
  }

  if (deleteBookError) {
    toast.error("Failed to delete book");
  }

  return (
    <Card>
      <img src={cover} alt={title} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Heading fs="18px" height="1" margin="8px 0">
          {title}
        </Heading>
        <Text fs="14px">Author: {author}</Text>
        <Text fs="14px">{pages} pages</Text>
        <Text fs="14px">Published in {published}</Text>
        <Text fs="14px">
          Status &nbsp;
          <Select value={status} onChange={handleChangeStatus}>
            <option value={0}>New</option>
            <option value={1}>Reading</option>
            <option value={2}>Finished</option>
          </Select>
        </Text>
        <Text fs="14px">Isbn: {isbn}</Text>
        <Button onClick={handleDeleteBook} align="end" padding="6px 12px" margin="8px 0">
          Delete
        </Button>
      </div>
    </Card>
  );
}
