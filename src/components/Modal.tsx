import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import { RootState } from "@app/store";
import { useCreateBookMutation } from "@services/api";
import { closeModal } from "@features/modal";
import Button from "@components/shared/button";
import Input from "@components/shared/input";
import Heading from "@components/shared/heading";
import Loading from "./shared/loading";

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 400px;
  height: auto;
  background-color: white;
  border-radius: 10px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function Modal() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const [createBook, { isLoading }] = useCreateBookMutation();

  const handleCreateBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const response = await createBook(data).unwrap();
      console.log(response);
      toast.success("Book created successfully");
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      toast.error("Failed to create book");
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {isOpen && (
        <ModalContainer onClick={() => dispatch(closeModal())}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Heading>New Book Form</Heading>
            <Form onSubmit={handleCreateBook}>
              <Div>
                <Label htmlFor="title">Title</Label>
                <Input
                  name="title"
                  id="title"
                  type="text"
                  placeholder="Title"
                  required
                />
              </Div>
              <Div>
                <Label htmlFor="author">Author</Label>
                <Input
                  name="author"
                  id="author"
                  type="text"
                  placeholder="Author"
                  required
                />
              </Div>
              <Div>
                <Label htmlFor="cover">Cover</Label>
                <Input
                  name="cover"
                  id="cover"
                  type="text"
                  placeholder="https://..."
                  required
                />
              </Div>
              <Div>
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  name="isbn"
                  id="isbn"
                  type="text"
                  placeholder="ISBN"
                  required
                />
              </Div>
              <Div>
                <Label htmlFor="pages">Pages</Label>
                <Input
                  name="pages"
                  id="pages"
                  type="number"
                  placeholder="Pages"
                  required
                />
              </Div>
              <Div>
                <Label htmlFor="published">Published</Label>
                <Input
                  name="published"
                  id="published"
                  type="number"
                  placeholder="Published"
                  required
                />
              </Div>
              <Button type="submit">Create New Book</Button>
            </Form>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}
