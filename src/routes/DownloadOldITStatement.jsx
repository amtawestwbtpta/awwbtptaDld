import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CalculateIncomeTax,
  ptaxCalc,
  randBetween,
  readCSVFile,
  roundSo,
} from "../modules/calculatefunctions";
import { useGlobalContext } from "../context/Store";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../context/FirbaseContext";
import Loader from "../components/Loader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import IncomeTaxOld2025 from "../pdfs/IncomeTaxOld2025";

export default function DownloadOldITStatement() {
  const navigate = useNavigate();
  const { teachersState, setTeachersState, deductionState, setDeductionState } =
    useGlobalContext();
  const [searchParams] = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));
  const { pan } = data;
  const finYear = data.finYear;
  const thisYear = parseInt(finYear?.split("-")[0]);
  const nextYear = parseInt(finYear?.split("-")[1]);

  const [loader, setLoader] = useState(false);
  const [oldITData, setOldITDa] = useState({
    tname: "",
    school: "",
    pan: "",
    disability: "",
    desig: "",
    gender: "",
    thisYear: "",
    nextYear: "",
    finYear: "",
    BankInterest: "",
    teacherDeduction: "",
    hbLoanPrincipal: "",
    hbLoanInterest: "",
    lic: "",
    ulip: "",
    ppf: "",
    nsc: "",
    nscInterest: "",
    tutionFee: "",
    sukanya: "",
    stampDuty: "",
    mediclaim: "",
    terminalDisease: "",
    handicapTreatment: "",
    educationLoan: "",
    charity: "",
    disabilityDeduction: "",
    rgSaving: "",
    otherIncome: "",
    fd: "",
    tds: "",
    marchSalary: "",
    marchBasic: "",
    marchAddl: "",
    marchDA: "",
    marchHRA: "",
    marchMA: "",
    marchGross: "",
    marchGPF: "",
    marchGSLI: "",
    bonus: "",
    marchPTax: "",
    aprilSalary: "",
    aprilBasic: "",
    aprilAddl: "",
    aprilDA: "",
    aprilHRA: "",
    aprilMA: "",
    aprilGross: "",
    aprilGPF: "",
    aprilGSLI: "",
    aprilPTax: "",
    maySalary: "",
    mayBasic: "",
    mayAddl: "",
    mayDA: "",
    mayHRA: "",
    mayMA: "",
    mayGross: "",
    mayGPF: "",
    mayGSLI: "",
    mayPTax: "",
    juneSalary: "",
    juneBasic: "",
    juneAddl: "",
    juneDA: "",
    juneHRA: "",
    juneMA: "",
    juneGross: "",
    juneGPF: "",
    juneGSLI: "",
    junePTax: "",
    julySalary: "",
    julyBasic: "",
    julyAddl: "",
    julyDA: "",
    aprilIR: "",
    julyHRA: "",
    julyMA: "",
    julyGross: "",
    julyGPF: "",
    julyGSLI: "",
    julyPTax: "",
    augustSalary: "",
    augustBasic: "",
    augustAddl: "",
    augustDA: "",
    augustHRA: "",
    augustMA: "",
    augustGross: "",
    augustGPF: "",
    augustGSLI: "",
    augustPTax: "",
    septemberSalary: "",
    septemberBasic: "",
    septemberAddl: "",
    septemberDA: "",
    septemberHRA: "",
    septemberMA: "",
    septemberGross: "",
    septemberGPF: "",
    septemberGSLI: "",
    septemberPTax: "",
    octoberSalary: "",
    octoberBasic: "",
    octoberAddl: "",
    octoberDA: "",
    octoberHRA: "",
    octoberMA: "",
    octoberGross: "",
    octoberGPF: "",
    octoberGSLI: "",
    octoberPTax: "",
    novemberSalary: "",
    novemberBasic: "",
    novemberAddl: "",
    novemberDA: "",
    novemberHRA: "",
    novemberMA: "",
    novemberGross: "",
    novemberGPF: "",
    novemberGSLI: "",
    novemberPTax: "",
    decemberSalary: "",
    decemberBasic: "",
    decemberAddl: "",
    decemberDA: "",
    decemberHRA: "",
    decemberMA: "",
    decemberGross: "",
    decemberGPF: "",
    decemberGSLI: "",
    decemberPTax: "",
    januarySalary: "",
    januaryBasic: "",
    januaryAddl: "",
    januaryDA: "",
    januaryHRA: "",
    januaryMA: "",
    januaryGross: "",
    januaryGPF: "",
    januaryGSLI: "",
    januaryPTax: "",
    februarySalary: "",
    februaryBasic: "",
    februaryAddl: "",
    februaryDA: "",
    februaryHRA: "",
    februaryMA: "",
    februaryGross: "",
    februaryGPF: "",
    februaryGSLI: "",
    februaryPTax: "",
    grossBasic: "",
    grossAddl: "",
    grossDA: "",
    grossHRA: "",
    grossMA: "",
    GrossPAY: "",
    grossGPF: "",
    grossGSLI: "",
    grossPTax: "",
    AllGross: "",
    GrossTotalIncome: "",
    deductionVIA: "",
    limitVIA: "",
    OtherVIA: "",
    TotalIncome: "",
    TotalRoundOffIncome: "",
    CalculatedIT: "",
    isUnderRebate: "",
    eduCess: "",
    AddedEduCess: "",
    TotalGross: "",
    GrossArrear: "",
    marchNetpay: "",
    aprilNetpay: "",
    mayNetpay: "",
    juneNetpay: "",
    julyNetpay: "",
    augustNetpay: "",
    septemberNetpay: "",
    octoberNetpay: "",
    novemberNetpay: "",
    decemberNetpay: "",
    januaryNetpay: "",
    februaryNetpay: "",
    grossNetpay: "",
  });

  const getSalary = async () => {
    setLoader(true);
    try {
      const january = await readCSVFile(`january-${nextYear}`);
      const february = await readCSVFile(`february-${nextYear}`);
      const march = await readCSVFile(`march-${thisYear}`);
      const april = await readCSVFile(`april-${thisYear}`);
      const may = await readCSVFile(`may-${thisYear}`);
      const june = await readCSVFile(`june-${thisYear}`);
      const july = await readCSVFile(`july-${thisYear}`);
      const august = await readCSVFile(`august-${thisYear}`);
      const september = await readCSVFile(`september-${thisYear}`);
      const october = await readCSVFile(`october-${thisYear}`);
      const november = await readCSVFile(`november-${thisYear}`);
      const december = await readCSVFile(`december-${thisYear}`);

      let tData = [];
      if (teachersState.length == 0) {
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
        tData = data.filter((item) => item.pan == pan)[0];
      } else {
        tData = teachersState.filter((item) => item.pan == pan)[0];
      }
      const deductionData = await getDeduction();
      setDeductionState(deductionData);
      !tData?.id && navigate("/");
      await calCulateOldIT(
        tData,
        thisYear,
        january,
        february,
        march,
        april,
        may,
        june,
        july,
        august,
        september,
        october,
        november,
        december,
        deductionData
      );

      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const getDeduction = async () => {
    if (deductionState.length === 0) {
      setLoader(true);
      const q = query(collection(firestore, "deduction"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));
      setLoader(false);
      return data;
    } else {
      return deductionState;
    }
  };

  const calCulateOldIT = async (
    data,
    thisYear,
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
    deductionState
  ) => {
    const { id, tname, school, pan, disability, desig, gender } = data;
    try {
      const marchSalary = march.filter((el) => el.id == id)[0];
      const marchArrear = marchSalary?.arrear;
      const marchBasic = marchSalary?.basic;
      const marchAddl = marchSalary?.addl;
      const marchDA = Math.round(marchSalary?.basic * marchSalary?.daPercent);
      const marchHRA =
        marchSalary?.hraPercent > 10
          ? marchSalary?.hraPercent
          : Math.round(marchSalary?.basic * marchSalary?.hraPercent);
      const marchMA = marchSalary?.ma;
      const marchGross = marchBasic + marchDA + marchHRA + marchAddl + marchMA;
      const marchGPF = marchSalary?.gpf;
      const marchGSLI = marchSalary?.gsli;
      const bonus = marchSalary?.bonus;
      const marchPTax = disability == "YES" ? 0 : ptaxCalc(marchGross);
      const marchNetpay = marchGross - marchGPF - marchGSLI - marchPTax;
      const aprilSalary = april.filter((el) => el.id == id)[0];
      const aprilArrear = aprilSalary?.arrear;
      const aprilBasic = aprilSalary?.basic;
      const aprilAddl = aprilSalary?.addl;
      const aprilDA = Math.round(aprilSalary?.basic * aprilSalary?.daPercent);
      const aprilHRA =
        aprilSalary?.hraPercent > 10
          ? aprilSalary?.hraPercent
          : Math.round(aprilSalary?.basic * aprilSalary?.hraPercent);
      const aprilMA = aprilSalary?.ma;
      const aprilGross = aprilBasic + aprilDA + aprilHRA + aprilAddl + aprilMA;
      const aprilGPF = aprilSalary?.gpf;
      const aprilGSLI = aprilSalary?.gsli;
      const aprilPTax = disability == "YES" ? 0 : ptaxCalc(aprilGross);
      const aprilNetpay = aprilGross - aprilGPF - aprilGSLI - aprilPTax;
      const maySalary = may.filter((el) => el.id == id)[0];
      const mayArrear = maySalary?.arrear;
      const mayBasic = maySalary?.basic;
      const mayAddl = maySalary?.addl;
      const mayDA = Math.round(maySalary?.basic * maySalary?.daPercent);
      const mayHRA =
        maySalary?.hraPercent > 10
          ? maySalary?.hraPercent
          : Math.round(maySalary?.basic * maySalary?.hraPercent);
      const mayMA = maySalary?.ma;
      const mayGross = mayBasic + mayDA + mayHRA + mayAddl + mayMA;
      const mayGPF = maySalary?.gpf;
      const mayGSLI = maySalary?.gsli;
      const mayPTax = disability == "YES" ? 0 : ptaxCalc(mayGross);
      const mayNetpay = mayGross - mayGPF - mayGSLI - mayPTax;
      const juneSalary = june.filter((el) => el.id == id)[0];
      const juneArrear = juneSalary?.arrear;
      const juneBasic = juneSalary?.basic;
      const juneAddl = juneSalary?.addl;
      const juneDA = Math.round(juneSalary?.basic * juneSalary?.daPercent);
      const juneHRA =
        juneSalary?.hraPercent > 10
          ? juneSalary?.hraPercent
          : Math.round(juneSalary?.basic * juneSalary?.hraPercent);
      const juneMA = juneSalary?.ma;
      const juneGross = juneBasic + juneDA + juneHRA + juneAddl + juneMA;
      const juneGPF = juneSalary?.gpf;
      const juneGSLI = juneSalary?.gsli;
      const junePTax = disability == "YES" ? 0 : ptaxCalc(juneGross);
      const juneNetpay = juneGross - juneGPF - juneGSLI - junePTax;
      const julySalary = july.filter((el) => el.id == id)[0];
      const julyArrear = julySalary?.arrear;
      const julyBasic = julySalary?.basic;
      const julyAddl = julySalary?.addl;
      const julyDA = Math.round(julySalary?.basic * julySalary?.daPercent);
      const aprilIR =
        thisYear == 2024 ? Math.round(aprilSalary?.basic * 0.04) : 0;
      const julyHRA =
        julySalary?.hraPercent > 10
          ? julySalary?.hraPercent
          : Math.round(julySalary?.basic * julySalary?.hraPercent);
      const julyMA = julySalary?.ma;
      const julyGross =
        julyBasic + julyDA + julyHRA + julyAddl + julyMA + aprilIR;
      const julyGPF = julySalary?.gpf;
      const julyGSLI = julySalary?.gsli;
      const julyPTax = disability == "YES" ? 0 : ptaxCalc(julyGross);
      const julyNetpay = julyGross - julyGPF - julyGSLI - julyPTax;
      const augustSalary = august.filter((el) => el.id == id)[0];
      const augustArrear = augustSalary?.arrear;
      const augustBasic = augustSalary?.basic;
      const augustAddl = augustSalary?.addl;
      const augustDA = Math.round(
        augustSalary?.basic * augustSalary?.daPercent
      );
      const augustHRA =
        augustSalary?.hraPercent > 10
          ? augustSalary?.hraPercent
          : Math.round(augustSalary?.basic * augustSalary?.hraPercent);
      const augustMA = augustSalary?.ma;
      const augustGross =
        augustBasic + augustDA + augustHRA + augustAddl + augustMA;
      const augustGPF = augustSalary?.gpf;
      const augustGSLI = augustSalary?.gsli;
      const augustPTax = disability == "YES" ? 0 : ptaxCalc(augustGross);
      const augustNetpay = augustGross - augustGPF - augustGSLI - augustPTax;
      const septemberSalary = september.filter((el) => el.id == id)[0];
      const septemberArrear = septemberSalary?.arrear;
      const septemberBasic = septemberSalary?.basic;
      const septemberAddl = septemberSalary?.addl;
      const septemberDA = Math.round(
        septemberSalary?.basic * septemberSalary?.daPercent
      );
      const septemberHRA =
        septemberSalary?.hraPercent > 10
          ? septemberSalary?.hraPercent
          : Math.round(septemberSalary?.basic * septemberSalary?.hraPercent);
      const septemberMA = septemberSalary?.ma;
      const septemberGross =
        septemberBasic +
        septemberDA +
        septemberHRA +
        septemberAddl +
        septemberMA;
      const septemberGPF = septemberSalary?.gpf;
      const septemberGSLI = septemberSalary?.gsli;
      const septemberPTax = disability == "YES" ? 0 : ptaxCalc(septemberGross);
      const septemberNetpay =
        septemberGross - septemberGPF - septemberGSLI - septemberPTax;
      const octoberSalary = october.filter((el) => el.id == id)[0];
      const octoberArrear = octoberSalary?.arrear;
      const octoberBasic = octoberSalary?.basic;
      const octoberAddl = octoberSalary?.addl;
      const octoberDA = Math.round(
        octoberSalary?.basic * octoberSalary?.daPercent
      );
      const octoberHRA =
        octoberSalary?.hraPercent > 10
          ? octoberSalary?.hraPercent
          : Math.round(octoberSalary?.basic * octoberSalary?.hraPercent);
      const octoberMA = octoberSalary?.ma;
      const octoberGross =
        octoberBasic + octoberDA + octoberHRA + octoberAddl + octoberMA;
      const octoberGPF = octoberSalary?.gpf;
      const octoberGSLI = octoberSalary?.gsli;
      const octoberPTax = disability == "YES" ? 0 : ptaxCalc(octoberGross);
      const octoberNetpay =
        octoberGross - octoberGPF - octoberGSLI - octoberPTax;
      const novemberSalary = november.filter((el) => el.id == id)[0];
      const novemberArrear = novemberSalary?.arrear;
      const novemberBasic = novemberSalary?.basic;
      const novemberAddl = novemberSalary?.addl;
      const novemberDA = Math.round(
        novemberSalary?.basic * novemberSalary?.daPercent
      );
      const novemberHRA =
        novemberSalary?.hraPercent > 10
          ? novemberSalary?.hraPercent
          : Math.round(novemberSalary?.basic * novemberSalary?.hraPercent);
      const novemberMA = novemberSalary?.ma;
      const novemberGross =
        novemberBasic + novemberDA + novemberHRA + novemberAddl + novemberMA;
      const novemberGPF = novemberSalary?.gpf;
      const novemberGSLI = novemberSalary?.gsli;
      const novemberPTax = disability == "YES" ? 0 : ptaxCalc(novemberGross);
      const novemberNetpay =
        novemberGross - novemberGPF - novemberGSLI - novemberPTax;
      const decemberSalary = december.filter((el) => el.id == id)[0];
      const decemberArrear = decemberSalary?.arrear;
      const decemberBasic = decemberSalary?.basic;
      const decemberAddl = decemberSalary?.addl;
      const decemberDA = Math.round(
        decemberSalary?.basic * decemberSalary?.daPercent
      );
      const decemberHRA =
        decemberSalary?.hraPercent > 10
          ? decemberSalary?.hraPercent
          : Math.round(decemberSalary?.basic * decemberSalary?.hraPercent);
      const decemberMA = decemberSalary?.ma;
      const decemberGross =
        decemberBasic + decemberDA + decemberHRA + decemberAddl + decemberMA;
      const decemberGPF = decemberSalary?.gpf;
      const decemberGSLI = decemberSalary?.gsli;
      const decemberPTax = disability == "YES" ? 0 : ptaxCalc(decemberGross);
      const decemberNetpay =
        decemberGross - decemberGPF - decemberGSLI - decemberPTax;
      const januarySalary = january.filter((el) => el.id == id)[0];
      const januaryArrear = januarySalary?.arrear;
      const januaryBasic = januarySalary?.basic;
      const januaryAddl = januarySalary?.addl;
      const januaryDA = Math.round(
        januarySalary?.basic * januarySalary?.daPercent
      );
      const januaryHRA =
        januarySalary?.hraPercent > 10
          ? januarySalary?.hraPercent
          : Math.round(januarySalary?.basic * januarySalary?.hraPercent);
      const januaryMA = januarySalary?.ma;
      const januaryGross =
        januaryBasic + januaryDA + januaryHRA + januaryAddl + januaryMA;
      const januaryGPF = januarySalary?.gpf;
      const januaryGSLI = januarySalary?.gsli;
      const januaryPTax = disability == "YES" ? 0 : ptaxCalc(januaryGross);
      const januaryNetpay =
        januaryGross - januaryGPF - januaryGSLI - januaryPTax;
      const februarySalary = february.filter((el) => el.id == id)[0];
      const februaryArrear = februarySalary?.arrear;
      const februaryBasic = februarySalary?.basic;
      const februaryAddl = februarySalary?.addl;
      const februaryDA = Math.round(
        februarySalary?.basic * februarySalary?.daPercent
      );
      const februaryHRA =
        februarySalary?.hraPercent > 10
          ? februarySalary?.hraPercent
          : Math.round(februarySalary?.basic * februarySalary?.hraPercent);
      const februaryMA = februarySalary?.ma;
      const februaryGross =
        februaryBasic + februaryDA + februaryHRA + februaryAddl + februaryMA;
      const februaryGPF = februarySalary?.gpf;
      const februaryGSLI = februarySalary?.gsli;
      const februaryPTax = disability == "YES" ? 0 : ptaxCalc(februaryGross);
      const februaryNetpay =
        februaryGross - februaryGPF - februaryGSLI - februaryPTax;
      const grossBasic =
        marchBasic +
        aprilBasic +
        mayBasic +
        juneBasic +
        julyBasic +
        augustBasic +
        septemberBasic +
        octoberBasic +
        novemberBasic +
        decemberBasic +
        januaryBasic +
        februaryBasic;
      const grossAddl =
        marchAddl +
        aprilAddl +
        mayAddl +
        juneAddl +
        julyAddl +
        augustAddl +
        septemberAddl +
        octoberAddl +
        novemberAddl +
        decemberAddl +
        januaryAddl +
        februaryAddl;
      const grossDA =
        marchDA +
        aprilDA +
        mayDA +
        juneDA +
        julyDA +
        augustDA +
        septemberDA +
        octoberDA +
        novemberDA +
        decemberDA +
        januaryDA +
        februaryDA;
      const grossHRA =
        marchHRA +
        aprilHRA +
        mayHRA +
        juneHRA +
        julyHRA +
        augustHRA +
        septemberHRA +
        octoberHRA +
        novemberHRA +
        decemberHRA +
        januaryHRA +
        februaryHRA;
      const grossMA =
        marchMA +
        aprilMA +
        mayMA +
        juneMA +
        julyMA +
        augustMA +
        septemberMA +
        octoberMA +
        novemberMA +
        decemberMA +
        januaryMA +
        februaryMA;
      const TotalGross =
        marchGross +
        aprilGross +
        mayGross +
        juneGross +
        julyGross +
        augustGross +
        septemberGross +
        octoberGross +
        novemberGross +
        decemberGross +
        januaryGross +
        februaryGross;
      const GrossArrear =
        marchArrear +
        aprilArrear +
        mayArrear +
        juneArrear +
        julyArrear +
        augustArrear +
        septemberArrear +
        octoberArrear +
        novemberArrear +
        decemberArrear +
        januaryArrear +
        februaryArrear;
      const GrossPAY =
        marchGross +
        aprilGross +
        mayGross +
        juneGross +
        julyGross +
        augustGross +
        septemberGross +
        octoberGross +
        novemberGross +
        decemberGross +
        januaryGross +
        februaryGross +
        bonus;
      const grossGPF =
        marchGPF +
        aprilGPF +
        mayGPF +
        juneGPF +
        julyGPF +
        augustGPF +
        septemberGPF +
        octoberGPF +
        novemberGPF +
        decemberGPF +
        januaryGPF +
        februaryGPF;
      const grossGSLI =
        marchGSLI +
        aprilGSLI +
        mayGSLI +
        juneGSLI +
        julyGSLI +
        augustGSLI +
        septemberGSLI +
        octoberGSLI +
        novemberGSLI +
        decemberGSLI +
        januaryGSLI +
        februaryGSLI;
      const grossPTax =
        marchPTax +
        aprilPTax +
        mayPTax +
        junePTax +
        julyPTax +
        augustPTax +
        septemberPTax +
        octoberPTax +
        novemberPTax +
        decemberPTax +
        januaryPTax +
        februaryPTax;
      const grossNetpay =
        marchNetpay +
        aprilNetpay +
        mayNetpay +
        juneNetpay +
        julyNetpay +
        augustNetpay +
        septemberNetpay +
        octoberNetpay +
        novemberNetpay +
        decemberNetpay +
        januaryNetpay +
        februaryNetpay +
        bonus;
      const BankInterest = randBetween(500, 2000);

      const teacherDeduction = deductionState?.filter((el) => el.id === id)[0];
      const hbLoanPrincipal = teacherDeduction?.hbLoanPrincipal;
      const hbLoanInterest = teacherDeduction?.hbLoanInterest;
      const lic = teacherDeduction?.lic;
      const ulip = teacherDeduction?.ulip;
      const ppf = teacherDeduction?.ppf;
      const nsc = teacherDeduction?.nsc;
      const nscInterest = teacherDeduction?.nscInterest;
      const tutionFee = teacherDeduction?.tutionFee;
      const sukanya = teacherDeduction?.sukanya;
      const stampDuty = teacherDeduction?.stampDuty;
      const mediclaim = teacherDeduction?.mediclaim;
      const terminalDisease = teacherDeduction?.terminalDisease;
      const handicapTreatment = teacherDeduction?.handicapTreatment;
      const educationLoan = teacherDeduction?.educationLoan;
      const charity = teacherDeduction?.charity;
      const disabilityDeduction = teacherDeduction?.disability;
      const rgSaving = teacherDeduction?.rgSaving;
      const otherIncome = teacherDeduction?.otherIncome;
      const fd = teacherDeduction?.fd;
      const tds = teacherDeduction?.tds;
      const AllGross =
        GrossPAY +
        marchArrear +
        aprilArrear +
        mayArrear +
        juneArrear +
        julyArrear +
        augustArrear +
        septemberArrear +
        octoberArrear +
        novemberArrear +
        decemberArrear +
        januaryArrear +
        februaryArrear +
        otherIncome;

      const GrossTotalIncome =
        AllGross - grossPTax - 50000 + BankInterest - hbLoanInterest;
      const deductionVIA =
        grossGPF +
        sukanya +
        nsc +
        ulip +
        hbLoanPrincipal +
        nsc +
        ppf +
        lic +
        tutionFee +
        fd +
        grossGSLI +
        nscInterest;
      const limitVIA = deductionVIA >= 150000 ? 150000 : deductionVIA;
      const OtherVIA =
        BankInterest +
        mediclaim +
        disabilityDeduction +
        terminalDisease +
        educationLoan +
        charity +
        handicapTreatment;
      const TotalIncome = GrossTotalIncome - limitVIA - OtherVIA;
      const TotalRoundOffIncome = roundSo(TotalIncome, 10);
      const CalculatedIT = CalculateIncomeTax(TotalRoundOffIncome);
      const isUnderRebate = CalculatedIT >= 12500 ? false : true;
      const eduCess = CalculatedIT * 0.04;
      const AddedEduCess = CalculatedIT + CalculatedIT * 0.04;
      setOldITDa({
        id,
        tname,
        school,
        pan,
        disability,
        desig,
        gender,
        thisYear,
        nextYear,
        finYear,
        BankInterest,
        teacherDeduction,
        hbLoanPrincipal,
        hbLoanInterest,
        lic,
        ulip,
        ppf,
        nsc,
        nscInterest,
        tutionFee,
        sukanya,
        stampDuty,
        mediclaim,
        terminalDisease,
        handicapTreatment,
        educationLoan,
        charity,
        disabilityDeduction,
        rgSaving,
        otherIncome,
        fd,
        tds,
        marchSalary,
        marchBasic,
        marchAddl,
        marchDA,
        marchHRA,
        marchMA,
        marchGross,
        marchGPF,
        marchGSLI,
        bonus,
        marchPTax,
        aprilSalary,
        aprilBasic,
        aprilAddl,
        aprilDA,
        aprilHRA,
        aprilMA,
        aprilGross,
        aprilGPF,
        aprilGSLI,
        aprilPTax,
        maySalary,
        mayBasic,
        mayAddl,
        mayDA,
        mayHRA,
        mayMA,
        mayGross,
        mayGPF,
        mayGSLI,
        mayPTax,
        juneSalary,
        juneBasic,
        juneAddl,
        juneDA,
        juneHRA,
        juneMA,
        juneGross,
        juneGPF,
        juneGSLI,
        junePTax,
        julySalary,
        julyBasic,
        julyAddl,
        julyDA,
        aprilIR,
        julyHRA,
        julyMA,
        julyGross,
        julyGPF,
        julyGSLI,
        julyPTax,
        augustSalary,
        augustBasic,
        augustAddl,
        augustDA,
        augustHRA,
        augustMA,
        augustGross,
        augustGPF,
        augustGSLI,
        augustPTax,
        septemberSalary,
        septemberBasic,
        septemberAddl,
        septemberDA,
        septemberHRA,
        septemberMA,
        septemberGross,
        septemberGPF,
        septemberGSLI,
        septemberPTax,
        octoberSalary,
        octoberBasic,
        octoberAddl,
        octoberDA,
        octoberHRA,
        octoberMA,
        octoberGross,
        octoberGPF,
        octoberGSLI,
        octoberPTax,
        novemberSalary,
        novemberBasic,
        novemberAddl,
        novemberDA,
        novemberHRA,
        novemberMA,
        novemberGross,
        novemberGPF,
        novemberGSLI,
        novemberPTax,
        decemberSalary,
        decemberBasic,
        decemberAddl,
        decemberDA,
        decemberHRA,
        decemberMA,
        decemberGross,
        decemberGPF,
        decemberGSLI,
        decemberPTax,
        januarySalary,
        januaryBasic,
        januaryAddl,
        januaryDA,
        januaryHRA,
        januaryMA,
        januaryGross,
        januaryGPF,
        januaryGSLI,
        januaryPTax,
        februarySalary,
        februaryBasic,
        februaryAddl,
        februaryDA,
        februaryHRA,
        februaryMA,
        februaryGross,
        februaryGPF,
        februaryGSLI,
        februaryPTax,
        grossBasic,
        grossAddl,
        grossDA,
        grossHRA,
        grossMA,
        GrossPAY,
        grossGPF,
        grossGSLI,
        grossPTax,
        AllGross,
        GrossTotalIncome,
        deductionVIA,
        limitVIA,
        OtherVIA,
        TotalIncome,
        TotalRoundOffIncome,
        CalculatedIT,
        isUnderRebate,
        eduCess,
        AddedEduCess,
        TotalGross,
        GrossArrear,
        marchNetpay,
        aprilNetpay,
        mayNetpay,
        juneNetpay,
        julyNetpay,
        augustNetpay,
        septemberNetpay,
        octoberNetpay,
        novemberNetpay,
        decemberNetpay,
        januaryNetpay,
        februaryNetpay,
        grossNetpay,
      });
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    !pan && navigate("/");
    getSalary();
  }, []);
  useEffect(() => {}, [oldITData]);

  return (
    <div className="container">
      <button className="btn btn-success m-2" onClick={() => navigate("/")}>
        Back
      </button>
      {oldITData.tname && (
        <PDFDownloadLink
          document={<IncomeTaxOld2025 data={oldITData} />}
          fileName={`IT Statement of ${oldITData.tname} Old TAX REGIME ${thisYear}.pdf`}
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "#fff",
            backgroundColor: "purple",
            border: "1px solid #4a4a4a",
            width: "40%",
            borderRadius: 10,
          }}
          className="m-2"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Please Wait..." : "Download IT Statement"
          }
        </PDFDownloadLink>
      )}

      {/* {salary.basicpay > 0 && <WBTPTAPaySLip data={salary} />} */}

      {loader && <Loader />}
    </div>
  );
}
