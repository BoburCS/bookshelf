import { useDispatch } from "react-redux";
import { openModal } from "@features/modal";
import styled from "styled-components";
import Heading from "@components/shared/heading";
import Text from "@components/shared/text";
import Button from "@components/shared/button";
import { NavLink } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 70px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <Nav>
      <NavLink to={"/"} style={{ textDecoration: "none" }}>
        <Heading fs="24px" height="1">
          BookShelf
        </Heading>
      </NavLink>
      <Button onClick={() => dispatch(openModal())}>
        <Text color="#fff">Create New Book</Text>
      </Button>
    </Nav>
  );
}
