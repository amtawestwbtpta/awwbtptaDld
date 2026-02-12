import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Store";
import {
  getServiceLife,
  monthNamesWithIndex,
  months,
  readCSVFileV2,
  RoundTo,
  uniqArray,
} from "../modules/calculatefunctions";
import ServiceConfirmation from "../pdfs/ServiceConfirmation";
import BenefitProforma from "../pdfs/BenefitProforma";
import BenefitApplication from "../pdfs/BenefitApplication";
import NewTeacherArrear from "../pdfs/NewTeacherArrear";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AppServiceConfirmation from "../pdfs/AppServiceConfirmation";
import { collection, getDocs, query } from "firebase/firestore";
import Loader from "../components/Loader";
import { firestore } from "../context/FirbaseContext";

export default function DownloadBenefitForm() {
  const navigate = useNavigate();
  const { teachersState, setTeachersState } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));
  const { year } = data;
  const [loader, setLoader] = useState(false);
  const [allData, setAllData] = useState([]);
  const [benefitData, setBenefitData] = useState([]);
  const [joiningMonths, setJoiningMonths] = useState([]);
  const [monthText, setMonthText] = useState("");
  const [showProforma, setShowProforma] = useState(false);
  const getData = async () => {
    setLoader(true);
    try {
      let data = [];
      if (teachersState.length === 0) {
        const q = query(collection(firestore, "teachers"));
        const querySnapshot = await getDocs(q);
        const newData = querySnapshot.docs.map((doc) => ({
          // doc.data() is never undefined for query doc snapshots
          ...doc.data(),
          id: doc.id,
        }));
        data = newData.sort((a, b) => {
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
      } else {
        data = teachersState;
      }

      let x = [];
      let y = [];
      data
        .filter((el) => el.association === "WBTPTA")
        .map((teacher) => {
          const joiningYear = teacher.doj.split("-")[2];
          const joiningMonth = teacher.doj.split("-")[1];
          if (joiningYear == year) {
            x.push(teacher);
            monthNamesWithIndex.map((month) => {
              if (joiningMonth === month.index) {
                y.push(month);
              }
            });
          }
        });
      setJoiningMonths(uniqArray(y).sort((a, b) => a.rank - b.rank));
      setAllData(x);
      await filterTeacherData(x)
        .then(() => {
          setShowProforma(true);
          setLoader(false);
        })
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const handleMonthChange = async (month) => {
    setShowProforma(false);
    setLoader(true);
    let fData = [];
    const mData = allData.map((teacher) => {
      const { doj } = teacher;
      const joiningMonth = parseInt(doj?.split("-")[1]);

      if (joiningMonth === month?.rank) {
        fData = [...fData, teacher];
      }
    });
    await Promise.all(mData).then(async () => {
      await filterTeacherData(fData)
        .then(() => {
          setShowProforma(true);
          setLoader(false);
          setMonthText(month.monthName);
        })
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });
    });
  };

  const filterTeacherData = async (data) => {
    let fData = [];
    const mData = data.map(async (teacher) => {
      const { doj, id } = teacher;
      const joiningMonth = parseInt(doj?.split("-")[1]);
      const year = new Date().getFullYear();
      const q1 = await readCSVFileV2(`january-${year}`, year);
      const januaryMonthSalary = q1?.filter((el) => el.id === id)[0];
      teacher.mbasic = januaryMonthSalary.basic;
      const normalIncrement = RoundTo(
        januaryMonthSalary.basic + januaryMonthSalary.basic * 0.03,
        100,
      );
      if (joiningMonth < 7) {
        teacher.basic = RoundTo(normalIncrement + normalIncrement * 0.03, 100);
      } else {
        teacher.basic = normalIncrement;
      }

      fData = [...fData, teacher];
    });
    await Promise.all(mData).then(() => {
      setBenefitData(fData);
    });
  };
  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {}, [benefitData, monthText]);
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div>
          {monthText ? (
            <h3 className="text-primary my-4">
              Year {year}, {monthText}, {benefitData.length} Teachers
            </h3>
          ) : (
            <h3 className="text-primary my-4">
              Year {year}, {benefitData.length} Teachers
            </h3>
          )}
          <div className="row d-flex justify-content-center noprint">
            {joiningMonths.length > 1 && (
              <div className="col-md-8 mx-auto mb-3 noprint">
                <select
                  className="form-select"
                  id="month-select"
                  defaultValue={""}
                  onChange={async (e) => {
                    if (e.target.value) {
                      handleMonthChange(JSON.parse(e.target.value));
                    } else {
                      setMonthText("");
                      await filterTeacherData(allData);
                      if (typeof window !== undefined) {
                        document.getElementById("month-select").value = "";
                      }
                    }
                  }}
                  aria-label="Default select example"
                >
                  <option value="" className="text-center text-primary">
                    Select Joining Month
                  </option>
                  {joiningMonths.map((month, index) => {
                    return (
                      <option
                        className="text-center text-success"
                        key={index}
                        value={JSON.stringify(month)}
                      >
                        {month.monthName}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
          {benefitData.length > 0 && showProforma && (
            <div className="my-5 d-flex flex-column justify-content-center align-items-center">
              <div className="m-3">
                <PDFDownloadLink
                  document={
                    <BenefitProforma data={benefitData} year={parseInt(year)} />
                  }
                  fileName={`Benefit Proforma of Teachers.pdf`}
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
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Please Wait..." : "Download Benefit Proforma"
                  }
                </PDFDownloadLink>
              </div>
              <div className="m-3">
                <PDFDownloadLink
                  document={
                    <BenefitApplication
                      data={benefitData}
                      year={parseInt(year)}
                    />
                  }
                  fileName={`Service Confirmation Form.pdf`}
                  style={{
                    textDecoration: "none",
                    padding: 11,
                    color: "#fff",
                    backgroundColor: "navy",
                    border: "1px solid #4a4a4a",
                    width: "40%",
                    borderRadius: 10,
                    margin: 20,
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Please Wait..." : "Download Confirmation Form"
                  }
                </PDFDownloadLink>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
