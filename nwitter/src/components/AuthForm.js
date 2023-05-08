import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "fbase";

const AuthForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;
  const [newAccount, setNewAccount] = useState(true);
  const [err, setErr] = useState("");

  const onChange = ({ target: { name, value } }) =>
    setForm({ ...form, [name]: value });
  /* 위 onChange는 비구조화 할당(구조 분해)과 Computed property names(객체의 key 값에 변수 활용)를 활용한 것
  이를 풀어서 설명하면
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
      setErr(err.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="text"
          className="authInput"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          className="authInput"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "회원가입" : "로그인"}
        />
        {err && <span className="authError">{err}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "로그인" : "회원가입"}
      </span>
    </>
  );
};

export default AuthForm;
