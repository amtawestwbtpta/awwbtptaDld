import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../context/Store";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../context/FirbaseContext";
import Loader from "../components/Loader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import HRADeclaration from "../pdfs/HRADeclaration";
import { readCSVFile } from "../modules/calculatefunctions";

export default function HRA() {
  const navigate = useNavigate();
  const { teachersState, setTeachersState } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));
  const { pan } = data;
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const salaryMonth = month < 5 ? "january" : "july";

  const [loader, setLoader] = useState(false);

  const [salary, setSalary] = useState({
    tname: "",
    school: "",
    basic: 0,
    hra: 0,
    salaryMonth,
    year,
  });

  const getSalary = async () => {
    setLoader(true);
    try {
      const q1 = await readCSVFile(`${salaryMonth}-${year}`);
      let tData = [];
      if (teachersState.length === 0) {
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
        tData = data.filter((item) => item.pan === pan)[0];
      } else {
        tData = teachersState.filter((item) => item.pan === pan)[0];
      }
      !tData?.id && navigate("/");
      const monthSalary = q1?.filter((el) => el.id === tData.id)[0];

      getModifiedSalary(monthSalary, tData);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  const getModifiedSalary = async (monthSalary, tData) => {
    const basicpay = monthSalary?.basic;
    const hra =
      monthSalary?.hraPercent > 10
        ? monthSalary?.hraPercent
        : Math.round(basicpay * monthSalary?.hraPercent);

    setSalary({
      ...salary,
      basic: basicpay,
      hra,
      tname: tData.tname,
      school: tData.school,
    });
    let timeOut = setTimeout(() => {
      let hraForm = document.getElementById("hraForm");
      hraForm.click();
      setTimeout(() => {
        navigate("/");
      }, 100);
    }, 1000);

    return () => clearTimeout(timeOut);
  };
  useEffect(() => {
    !pan && navigate("/");
    getSalary();
  }, []);
  useEffect(() => {}, [salary]);

  return (
    <div className="container">
      <button className="btn btn-success" onClick={() => navigate("/")}>
        Back
      </button>

      {salary.tname && (
        <PDFDownloadLink
          document={<HRADeclaration data={salary} />}
          fileName={`HRA Declaration OF ${salary.tname}.pdf`}
          style={{
            textDecoration: "none",
            padding: 11,
            color: "#fff",
            backgroundColor: "darkgreen",
            border: "1px solid #4a4a4a",
            width: "40%",
            borderRadius: 10,
            margin: 20,
          }}
          id="hraForm"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Please Wait..." : `Download HRA Declaration`
          }
        </PDFDownloadLink>
      )}

      {/* {<HRADeclaration data={salary} />} */}

      {loader && <Loader />}
    </div>
  );
}
