import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import createSign from "../../lib/createSign";

const SignupContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const key = data.key as string;
    localStorage.setItem("userKey", key);
    const secret = data.secret as string;
    localStorage.setItem("userSecret", secret);
    const method = "POST";
    const url = "/signup";
    const body = JSON.stringify(data);

    const sign = createSign(method, url, body, secret);

    try {
      const response = await fetch(`https://no23.lavina.tech${url}`, {
        method,
        headers: {
          Key: key,
          Sign: sign,
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignupContainer>
      <form onSubmit={handleSignup} className="signup-form">
        <h1>Sign Up Form</h1>

        <input name="name" type="text" placeholder="name" required />
        <input name="email" type="email" placeholder="email" required />
        <input name="key" type="text" placeholder="your secret key" required />
        <input name="secret" type="text" placeholder="your secret" required />
        <button>Sign Up</button>
      </form>
    </SignupContainer>
  );
}
