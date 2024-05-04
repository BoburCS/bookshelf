import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components"
import { RootState } from "@app/store";
import { closeModal } from "@features/modal";

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default function Modal() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.modal);

  return (
    <>
      {isOpen && (
        <ModalContainer onClick={() => dispatch(closeModal())}>
          <ModalContent>
            <h1>Modal</h1>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}
