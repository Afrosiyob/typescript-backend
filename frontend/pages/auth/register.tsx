import { useForm } from "react-hook-form";

function RegisterPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="email"> E-mail </label>
          <input
            {...register("email")}
            type="text"
            id="email"
            placeholder="example@gmail.com"
          />
          <p>{errors.email?.message} </p>
          <button type="submit"> submit </button>
        </div>
      </form>
    </>
  );
}

export default RegisterPage;
