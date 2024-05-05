import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "@components/Navbar";

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default function PrivateRoute() {
  const key = localStorage.getItem("userKey") as string;
  const secret = localStorage.getItem("userSecret") as string;

  if (!key || !secret) {
    return <Navigate to="/signup" />;
  }

  return (
    <Main>
      <Navbar />
      <Outlet />
    </Main>
  );
}
