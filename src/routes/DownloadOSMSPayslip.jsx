import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { readCSVFile } from "../modules/calculatefunctions";
import { useGlobalContext } from "../context/Store";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../context/FirbaseContext";
import Loader from "../components/Loader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OSMSPaySLip from "../pdfs/OSMSPaySLip";
import Ropa from "../modules/ropa";
import bcrypt from "bcryptjs";
export default function DownloadOSMSPayslip() {
  const navigate = useNavigate();
  const { teachersState, setTeachersState } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));
  const hashedKey =
    "$2b$10$29RaD8KJZFiWh9OnKeFKt.CjgjR.h410z3DYlXUh/mJw/RGY6sL1S";
  const { pan, month, year, key } = data;

  const [teacher, setTeacher] = useState({
    id: "",
    tname: "",
    desig: "",
    school: "",
    disability: "",
    empid: "",
    pan: "",
    udise: "",
    bank: "",
    account: "",
    ifsc: "",
  });
  const [loader, setLoader] = useState(false);
  let netpay,
    basicpay,
    da,
    hra,
    addl,
    ma,
    pfund,
    gsli,
    level,
    cell,
    ir,
    ptax,
    gross;

  const [salary, setSalary] = useState({
    basic: 0,
    da: 0.14,
    pfund: 0,
    ma: 0,
    addl: 0,
    ir: 0,
    hra: 0,
    gross: 0,
    netpay: 0,
    ptax: 0,
    gsli: 0,
    level: 0,
    cell: 0,
    deduction: 0,
    id: "",
    tname: "",
    desig: "",
    school: "",
    bank: "",
    account: "",
    ifsc: "",
    disability: "",
    empid: "",
    pan: "",
    udise: "",
    basicpay: "",
    month: month,
    year: year,
  });

  const getSalary = async () => {
    setLoader(true);
    try {
      const q1 = await readCSVFile(`${month.toLowerCase()}-${year}`);
      const q2 = await readCSVFile(`april-2024`);
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
      setTeacher(tData);
      const monthSalary = q1?.filter((el) => el.id === tData.id)[0];
      const aprilSalary = q2?.filter((el) => el.id === tData.id)[0];
      getModifiedSalary(monthSalary, aprilSalary, tData);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  const checkKey = async () => {
    let match = await bcrypt.compareSync(key, hashedKey);
    return match;
  };
  useEffect(() => {
    !pan && !key && !checkKey() && navigate("/");
    getSalary();
  }, []);
  useEffect(() => {}, [salary, teacher]);

  const getModifiedSalary = async (monthSalary, aprilSalary, tData) => {
    if (
      month.toLowerCase() == "july" &&
      year == 2024 &&
      aprilSalary?.basic > 0
    ) {
      ir = Math.round(aprilSalary?.basic * 0.04);
    } else {
      ir = 0;
    }
    basicpay = monthSalary?.basic;
    da = Math.round(basicpay * monthSalary?.daPercent);
    hra =
      monthSalary?.hraPercent > 10
        ? monthSalary?.hraPercent
        : Math.round(basicpay * monthSalary?.hraPercent);
    addl = monthSalary?.addl;
    ma = monthSalary?.ma;
    pfund = monthSalary?.gpf;
    gsli = monthSalary?.gsli;
    level = Ropa(basicpay).lv;
    cell = Ropa(basicpay).ce;
    gross = basicpay + da + ir + hra + addl + ma;
    if (gross > 40000) {
      ptax = 200;
    } else if (gross > 25000) {
      ptax = 150;
    } else if (gross > 15000) {
      ptax = 130;
    } else if (gross > 10000) {
      ptax = 110;
    } else {
      ptax = 0;
    }

    if (tData.disability === "YES") {
      ptax = 0;
    }

    let deduction = gsli + pfund + ptax;

    netpay = gross - deduction;
    setSalary({
      ...salary,
      level,
      cell,
      basicpay,
      basic: basicpay,
      da,
      ir,
      hra,
      addl,
      ma,
      pfund,
      gross,
      ptax,
      netpay,
      deduction,
      gsli,
      month,
      year,
      tname: tData.tname,
      desig: tData.desig,
      school: tData.school,
      disability: tData.disability,
      empid: tData.empid,
      pan: tData.pan,
      udise: tData.udise,
      bank: tData.bank,
      account: tData.account,
      ifsc: tData.ifsc,
    });
    let timeOut = setTimeout(() => {
      let paySlip = document.getElementById("payslip");
      paySlip.click();
      setTimeout(() => {
        navigate("/");
      }, 100);
    }, 2000);

    return () => clearTimeout(timeOut);
  };

  return (
    <div className="container">
      <button className="btn btn-success" onClick={() => navigate("/")}>
        Back
      </button>
      {salary.basicpay > 0 && (
        <PDFDownloadLink
          document={<OSMSPaySLip data={salary} />}
          fileName={`PAYSLIP OF ${teacher.tname?.toUpperCase()} OF ${teacher.school?.toUpperCase()} FOR THE MONTH OF ${month.toUpperCase()}.pdf`}
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
          id="payslip"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Please Wait..." : "Download Payslip"
          }
        </PDFDownloadLink>
      )}

      {/* {salary.basicpay > 0 && <OSMSPaySLip data={salary} />} */}

      {loader && <Loader />}
    </div>
  );
}
