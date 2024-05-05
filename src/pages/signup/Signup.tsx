import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSignupMutation } from "@services/api";
import Input from "@components/shared/input";
import Button from "@components/shared/button";
import Heading from "@components/shared/heading";
import { Label, Div } from "@components/Modal";

const SignupContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  padding: 2rem;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  border-radius: 16px;
`;

export default function Signup() {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      await signup(data).unwrap();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SignupContainer>
      <Form onSubmit={handleSignup} className="signup-form">
        <Heading>Sign Up Form</Heading>
        <Div>
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="name"
            required
          />
        </Div>
        <Div>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="email"
            required
          />
        </Div>
        <Div>
          <Label htmlFor="key">Key</Label>
          <Input
            name="key"
            id="key"
            type="text"
            placeholder="your key"
            required
          />
        </Div>
        <Div>
          <Label htmlFor="secret">Secret</Label>
          <Input
            name="secret"
            id="secret"
            type="text"
            placeholder="your secret"
            required
          />
        </Div>
        <Button type="submit">Sign Up</Button>
      </Form>
    </SignupContainer>
  );
}
