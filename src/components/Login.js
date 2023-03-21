import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            onChange={onChangeName}
            value={name}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            onChange={onChangeId}
            value={id}
            placeholder="Enter ID"
          />
        </Form.Group>
        <Button variant="primary" onClick={login}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
