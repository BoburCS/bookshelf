import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "@services/api";
import { toast } from "react-toastify";
import SignupForm from "./SignupForm";

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
      toast.error("Signup failed! Please try again.");
    }
  };

  return <SignupForm handleSignup={handleSignup} />;
}
