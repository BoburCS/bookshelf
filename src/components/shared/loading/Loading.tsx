import styled from "styled-components";
import { Oval } from "react-loader-spinner";

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loading() {
  return (
    <LoadingContainer>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#6d28d9"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </LoadingContainer>
  );
}
