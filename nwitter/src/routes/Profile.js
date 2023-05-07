import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "fbase";
import { signOut, updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const Profile = ({ userObj, refreshUser }) => {
  /*
    Redirect component는 v6부터 지원하지 않음.
    useHistory -> useNavigate로 변경되었으며 push, replace, goBack 등의 메소드도 지원하지 않는다.
  */
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(authService);
    navigate("/");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorID", "==", userObj.uid),
      orderBy("createdAt", "desc")
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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
