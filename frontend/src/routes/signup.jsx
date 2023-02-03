import Input from "../components/input";
import Button from "../components/button";
import CompanyLogo from "../components/company-logo";

export default () => {
  return (
    <form className="form-control justify-center items-center py-16">
      <CompanyLogo />
      <Input label="Alias" />
      <Input label="Email" />
      <Input label="Firstname" />
      <Input label="Lastname" />
      <Input label="Password" />
      <Input label="Repeat Password" />
      <Button text="Sign up" />
    </form>
  );
};
