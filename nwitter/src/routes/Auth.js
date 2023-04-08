import React, { useState } from "react";
import { authService } from "fbase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;
  const onChange = ({ target: { name, value } }) =>
    setForm({ ...form, [name]: value });
  /* 풀어서 설명하면
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  */

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        // create account
        const data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        console.log(data);
      } else {
        // log in
        const data = await signInWithEmailAndPassword(
          authService,
          email,
          password
        );
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={form.email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
