import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";
import * as Joi from "joi";
import Button from "../components/button";
import CompanyLogo from "../components/company-logo";

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
  lastname: string;
  firstname: string;
  alias: string;
};

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
      )
    )
    .required(),
  repeatPassword: Joi.any().valid(Joi.ref("password")).required(),
  lastname: Joi.string().required(),
  firstname: Joi.string().required(),
  username: Joi.string().alphanum().min(3).required(),
});

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const { repeatPassword: _, ...user } = data;
    try {
      await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      useNavigate("/");
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
        <span className="label-text">What is your email?</span>
      </label>
      <input type="email" {...register("email")} />
      <p>{errors.email?.message}</p>
      <label className="label">
        <span className="label-text">What is your firstname?</span>
      </label>
      <input type="text" {...register("firstname")} />
      <p>{errors.firstname?.message}</p>
      <label className="label">
        <span className="label-text">What is your lastname?</span>
      </label>
      <input type="text" {...register("lastname")} />
      <p>{errors.lastname?.message}</p>
      <label className="label">
        <span className="label-text">What is your username?</span>
      </label>
      <input type="text" {...register("username")} />
      <p>{errors.alias?.message}</p>
      <label className="label">
        <span className="label-text">What is your password?</span>
      </label>
      <input type="password" {...register("password")} />
      <p>{errors.password?.message}</p>
      <label className="label">
        <span className="label-text">Repeat your password</span>
      </label>
      <input type="password" {...register("repeatPassword")} />
      <p>{errors.repeatPassword?.message}</p>
      <Button text="Sign up" type={"submit"} />
    </form>
  );
};
