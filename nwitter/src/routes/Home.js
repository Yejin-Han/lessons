import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { authService, dbService } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc") //시간별 정렬
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });

    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
  }, []);

  /*
  getDocs를 활용한다면
  const getNweets = async () = {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc") //시간별 정렬
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      }
      setNweets((prev) => [nweetObj, ...prev]);
    });
  };
  */

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet, idx) => (
          <Nweet
            key={idx}
            nweetObj={nweet}
            isOwner={nweet.creatorID === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
