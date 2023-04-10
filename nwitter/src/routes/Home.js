import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: serverTimestamp(),
        creatorID: userObj.uid,
      });
      setNweet("");
    } catch (err) {
      console.log(err);
    }
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc") //시간별 정렬
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
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
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
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
