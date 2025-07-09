import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../context/FirbaseContext";
import { useGlobalContext } from "../context/Store";
import Loader from "./Loader";

export default function GetTeachers() {
  const { teachersState, setTeachersState } = useGlobalContext();
  const [loader, setLoader] = useState(false);
  const getData = async () => {
    setLoader(true);
    const q = query(collection(firestore, "teachers"));
    const querySnapshot = await getDocs(q);
    const newData = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    const data = newData.sort((a, b) => {
      // First, compare the "school" keys
      if (a.school < b.school) {
        return -1;
      }
      if (a.school > b.school) {
        return 1;
      }
      // If "school" keys are equal, compare the "rank" keys
      return a.rank - b.rank;
    });
    setTeachersState(data);
    setLoader(false);
  };
  useEffect(() => {
    teachersState.length === 0 && getData();
    //eslint-disable-next-line
  }, []);
  return <div>{loader && <Loader />}</div>;
}
