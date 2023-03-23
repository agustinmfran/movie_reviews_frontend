import { useState } from "react";

function Login(props) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangeId = (e) => {
    const id = e.target.value;
    setId(id);
  };
  const login = () => {
    props.login({ name: name, id: id });
    props.history.push("/");
  };

  return (
    <section id="home">
      <form className="flex flex-col justify-center items-center h-screen ">
        <div className="flex-row pb-4">
          <label className="font-bold text-2xl pr-6">Username</label>
          <input
            className="outline-none"
            type="text"
            onChange={onChangeName}
            value={name}
            placeholder="Enter username"
          />
        </div>
        <div className="flex-row pb-4">
          <label className="font-bold text-2xl pr-28">ID</label>
          <input
            className="outline-none"
            type="text"
            onChange={onChangeId}
            value={id}
            placeholder="Enter ID"
          />
        </div>
        <button
          className="text-black font-semibold px-2 py-1 bg-yellow-300 rounded-sm shadow hover:bg-yellow-200 cursor-pointer"
          onClick={login}
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default Login;
