import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import CompanyLogo from "../components/company-logo";

type FormData = {
  identifier: string;
  password: string;
};

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const { ...user } = data;
    try {
      const res = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const json = await res.json();
      localStorage.setItem("accessToken", json.jwt);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="form-control justify-center items-center py-16"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CompanyLogo />
      <label className="label">
        <span className="label-text">What is your email or username ?</span>
      </label>
      <input type="text" {...register("identifier")} />
      <p>{errors.identifier?.message}</p>
      <label className="label">
        <span className="label-text">What is your password?</span>
      </label>
      <input type="password" {...register("password")} />
      <p>{errors.password?.message}</p>
      <Button text="Sign in" type={"submit"} />
    </form>
  );
};
