import { useForm } from "react-hook-form";

function UserForm({ preloadedData }) {
  const { register, handleSubmit } = useForm({
    defaultValues: preloadedData,
  });

  const submitHandler = (data) => {
    alert("Passed Values: " + JSON.stringify(data));
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          type="text"
          placeholder="First Name"
          {...register("firstName")}
        />
        <input type="text" placeholder="Last Name" {...register("lastName")} />
        <button type="Submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
