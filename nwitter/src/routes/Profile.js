import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fbase";

const Profile = () => {
  /*
    Redirect component는 v6부터 지원하지 않음.
    useHistory -> useNavigate로 변경되었으며 push, replace, goBack 등의 메소드도 지원하지 않는다.
  */
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
