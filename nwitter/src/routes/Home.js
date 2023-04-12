import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid"; //개인 식별자 생성해주는 패키지
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  const fileInput = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    try {
      if (attachment !== "") {
        const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const res = await uploadString(attachmentRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(res.ref);
      }
      const nweetObj = {
        text: nweet,
        createdAt: serverTimestamp(),
        creatorID: userObj.uid,
        attachmentUrl,
      };
      await addDoc(collection(dbService, "nweets"), nweetObj);
      setNweet("");
      setAttachment("");
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
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = "";
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
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>지우기</button>
          </div>
        )}
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
