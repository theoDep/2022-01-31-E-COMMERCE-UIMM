import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default ({ options }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => navigate(`/products/${data.category}`);
  return (
    <div className="flex justify-center items-center mt-5">
      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <select className="select select-bordered" {...register("category")}>
            <option selected={!category ? true : false} value={""}>
              Pick category
            </option>
            {options.map((option) => (
              <option
                selected={category === option.attributes.name ? true : false}
                key={crypto.randomUUID()}
                value={option.attributes.name}
              >
                {option.attributes.name}
              </option>
            ))}
          </select>
          <button className="btn">Go</button>
        </div>
      </form>
    </div>
  );
};
