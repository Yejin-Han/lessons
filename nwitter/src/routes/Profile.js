import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "fbase";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const Profile = ({ userObj }) => {
  /*
    Redirect component는 v6부터 지원하지 않음.
    useHistory -> useNavigate로 변경되었으며 push, replace, goBack 등의 메소드도 지원하지 않는다.
  */
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(authService);
    navigate("/");
  };
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorID", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
