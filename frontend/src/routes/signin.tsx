import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import CompanyLogo from "../components/company-logo";
import useAuth from "../hooks/useAuth";

type FormData = {
  identifier: string;
  password: string;
};

export default () => {
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      setLoginError("");
      navigate("/");
    }
  }, [user]);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    if (!data.identifier || !data.password) {
      setLoginError("Please complete your credential before sigin in");
      return;
    }
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

      if (res.ok) {
        setLoginError("");
        const json = await res.json();
        localStorage.setItem("accessToken", json.jwt);
        await login(json.user);
        navigate("/");
      } else {
        setLoginError("Incorrect credentials, please retry");
      }
    } catch (error) {
      setLoginError("Connection error, please retry in 5 minutes");
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
      {loginError && <p>{loginError}</p>}
    </form>
  );
};
