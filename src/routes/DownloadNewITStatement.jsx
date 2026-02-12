import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ptaxCalc,
  randBetween,
  readCSVFileV2,
  roundSo,
} from "../modules/calculatefunctions";
import { useGlobalContext } from "../context/Store";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../context/FirbaseContext";
import Loader from "../components/Loader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import IncomeTaxNew2025 from "../pdfs/IncomeTaxNew2025";

export default function DownloadNewITStatement() {
  const navigate = useNavigate();
  const { teachersState, setTeachersState } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));
  const { pan } = data;
  const finYear = data.finYear;
  const thisYear = parseInt(finYear?.split("-")[0]);
  const nextYear = parseInt(finYear?.split("-")[1]);

  const [loader, setLoader] = useState(false);
  const [showBnkInt, setShowBnkInt] = useState(true);
  const [BankInterest, setBankInterest] = useState(randBetween(500, 2000));
  const [IntFrDeposit, setIntFrDeposit] = useState(0);
  const [newITData, setNewITDa] = useState({
    tname: "",
    school: "",
    pan: "",
    desig: "",
    gender: "",
    thisYear: "",
    nextYear: "",
    finYear: "",
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
    TotalRoundOffIncome: "",
    CalculatedIT: "",
    eduCess: "",
    AddedEduCess: "",
    BankInterest: "",
    tds: "",
    GrossRelief: "",
    IncomeTaxAfterRelief: "",
    ThirtyIT: "",
    ThirtyITTax: "",
    TwentyIT: "",
    TwentyITTax: "",
    FifteenIT: "",
    FifteenITTax: "",
    TenIT: "",
    TenITTax: "",
    FiveIT: "",
    FiveITTax: "",
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
    TotalGross: "",
    GrossArrear: "",
  });

  const getSalary = async () => {
    setLoader(true);
    try {
      const january = await readCSVFileV2(`january-${nextYear}`, nextYear);
      const february = await readCSVFileV2(`february-${nextYear}`, nextYear);
      const march = await readCSVFileV2(`march-${thisYear}`, thisYear);
      const april = await readCSVFileV2(`april-${thisYear}`, thisYear);
      const may = await readCSVFileV2(`may-${thisYear}`, thisYear);
      const june = await readCSVFileV2(`june-${thisYear}`, thisYear);
      const july = await readCSVFileV2(`july-${thisYear}`, thisYear);
      const august = await readCSVFileV2(`august-${thisYear}`, thisYear);
      const september = await readCSVFileV2(`september-${thisYear}`, thisYear);
      const october = await readCSVFileV2(`october-${thisYear}`, thisYear);
      const november = await readCSVFileV2(`november-${thisYear}`, thisYear);
      const december = await readCSVFileV2(`december-${thisYear}`, thisYear);

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

      !tData?.id && navigate("/");
      await calCulateNewIT(
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
      );

      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  const calCulateNewIT = async (
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
        augustSalary?.basic * augustSalary?.daPercent,
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
        septemberSalary?.basic * septemberSalary?.daPercent,
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
        octoberSalary?.basic * octoberSalary?.daPercent,
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
        novemberSalary?.basic * novemberSalary?.daPercent,
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
        decemberSalary?.basic * decemberSalary?.daPercent,
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
        januarySalary?.basic * januarySalary?.daPercent,
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
        februarySalary?.basic * februarySalary?.daPercent,
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
        februaryArrear;
      const GrossTotalIncome = AllGross - 75000 + BankInterest + IntFrDeposit; //H36
      const TotalRoundOffIncome = roundSo(GrossTotalIncome, 10);
      let ThirtyIT = 0;
      let ThirtyITTax = 0;
      let TwentyIT = 0;
      let TwentyITTax = 0;
      let FifteenIT = 0;
      let FifteenITTax = 0;
      let TenIT = 0;
      let TenITTax = 0;
      let FiveIT = 0;
      let FiveITTax = 0;
      let CalculatedIT = 0;
      let GrossRelief = 0;
      let IncomeTaxAfterRelief = 0;
      let eduCess = 0;
      let AddedEduCess = 0;
      let TwentyFiveIT = 0;
      let TwentyFiveITTax = 0;
      if (thisYear == 2024) {
        ThirtyIT = GrossTotalIncome > 1500000 ? GrossTotalIncome - 1500000 : 0;
        ThirtyITTax = ThirtyIT * 0.3;
        TwentyIT =
          GrossTotalIncome > 1200000
            ? GrossTotalIncome - 1200000 - ThirtyIT
            : 0;
        TwentyITTax = TwentyIT * 0.2;
        FifteenIT =
          GrossTotalIncome > 1000000
            ? GrossTotalIncome - 1000000 - ThirtyIT - TwentyIT
            : 0;
        FifteenITTax = FifteenIT * 0.15;
        TenIT =
          GrossTotalIncome > 700000
            ? GrossTotalIncome - 700000 - ThirtyIT - TwentyIT - FifteenIT
            : 0;
        TenITTax = TenIT * 0.1;
        FiveIT =
          GrossTotalIncome > 300000
            ? GrossTotalIncome -
              300000 -
              ThirtyIT -
              TwentyIT -
              FifteenIT -
              TenIT
            : 0;
        FiveITTax = FiveIT * 0.05;
        CalculatedIT = Math.floor(
          ThirtyITTax + TwentyITTax + FifteenITTax + TenITTax + FiveITTax,
        ); //H46
        const cal1 = GrossTotalIncome > 700000 ? GrossTotalIncome : 0; //G67
        const cal2 = GrossTotalIncome > 700000 ? cal1 - 700000 : 0; //G68
        const cal3 =
          GrossTotalIncome < 700001 ? Math.min(CalculatedIT, 25000) : 0; //G66
        const cal4 = GrossTotalIncome > 700000 ? CalculatedIT - cal2 : 0; //H67
        const cal5 = cal4 > 0 ? true : false; //H68
        const cal6 = cal5 ? cal4 : 0; //H66
        GrossRelief = cal3 + cal6; //J66
        IncomeTaxAfterRelief = Math.floor(CalculatedIT - GrossRelief);
        eduCess = Math.floor(IncomeTaxAfterRelief * 0.04);
        AddedEduCess = IncomeTaxAfterRelief + eduCess;
      } else if (thisYear == 2025) {
        ThirtyIT = GrossTotalIncome > 2400000 ? GrossTotalIncome - 2400000 : 0;
        ThirtyITTax = ThirtyIT * 0.3;
        TwentyFiveIT =
          GrossTotalIncome > 2000000 ? GrossTotalIncome - 2000000 : 0;
        TwentyFiveITTax = TwentyFiveIT * 0.25;
        TwentyIT =
          GrossTotalIncome > 1600000
            ? GrossTotalIncome - 1600000 - ThirtyIT - TwentyFiveIT
            : 0;
        TwentyITTax = TwentyIT * 0.2;
        FifteenIT =
          GrossTotalIncome > 1200000
            ? GrossTotalIncome - 1200000 - ThirtyIT - TwentyFiveIT - TwentyIT
            : 0;
        FifteenITTax = FifteenIT * 0.15;
        TenIT =
          GrossTotalIncome > 800000
            ? GrossTotalIncome -
              800000 -
              ThirtyIT -
              TwentyFiveIT -
              TwentyIT -
              FifteenIT
            : 0;
        TenITTax = TenIT * 0.1;
        FiveIT =
          GrossTotalIncome > 400000
            ? GrossTotalIncome -
              400000 -
              ThirtyIT -
              TwentyFiveIT -
              TwentyIT -
              FifteenIT -
              TenIT
            : 0;
        FiveITTax = FiveIT * 0.05;
        CalculatedIT = Math.floor(
          ThirtyITTax +
            TwentyFiveITTax +
            TwentyITTax +
            FifteenITTax +
            TenITTax +
            FiveITTax,
        ); //H46
        const cal1 = GrossTotalIncome > 1200000 ? GrossTotalIncome : 0; //G67
        const cal2 = GrossTotalIncome > 1200000 ? cal1 - 700000 : 0; //G68
        const cal3 =
          GrossTotalIncome < 1200001 ? Math.min(CalculatedIT, 60000) : 0; //G66
        const cal4 = GrossTotalIncome > 1200000 ? CalculatedIT - cal2 : 0; //H67
        const cal5 = cal4 > 0 ? true : false; //H68
        const cal6 = cal5 ? cal4 : 0; //H66
        GrossRelief = cal3 + cal6; //J66
        IncomeTaxAfterRelief = Math.floor(CalculatedIT - GrossRelief);
        eduCess = Math.floor(IncomeTaxAfterRelief * 0.04);
        AddedEduCess = IncomeTaxAfterRelief + eduCess;
      }
      setNewITDa({
        tname,
        school,
        pan,
        desig,
        gender,
        thisYear,
        nextYear,
        finYear,
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
        TotalRoundOffIncome,
        CalculatedIT,
        eduCess,
        AddedEduCess,
        BankInterest,
        IntFrDeposit,
        GrossRelief,
        IncomeTaxAfterRelief,
        ThirtyIT,
        ThirtyITTax,
        TwentyFiveIT,
        TwentyFiveITTax,
        TwentyIT,
        TwentyITTax,
        FifteenIT,
        FifteenITTax,
        TenIT,
        TenITTax,
        FiveIT,
        FiveITTax,
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
        TotalGross,
        GrossArrear,
      });
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    !pan && navigate("/");
  }, []);
  useEffect(() => {}, [newITData]);

  return (
    <div className="container">
      {showBnkInt && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
          aria-modal="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Set Bank Interest Data
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowBnkInt(false);
                    getSalary();
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="col-md-6  mx-auto justify-content-center align-items-baseline">
                  <div className="mb-3 col-md-6 mx-auto">
                    <label htmlFor="date" className="form-label">
                      Savings Bank Interest
                    </label>
                    <input
                      type="number"
                      className="form-control mx-auto"
                      placeholder="Savings Bank Interest"
                      value={BankInterest}
                      onChange={(e) => {
                        if (e.target.value) {
                          setBankInterest(parseInt(e.target.value));
                        } else {
                          setBankInterest("");
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6 mx-auto">
                    <label htmlFor="date" className="form-label">
                      Interest from Deposit(Bank/Post Office/Cooperative
                      Society)
                    </label>
                    <input
                      type="number"
                      className="form-control mx-auto"
                      placeholder="Interest from Deposit"
                      value={IntFrDeposit}
                      onChange={(e) => {
                        if (e.target.value) {
                          setIntFrDeposit(parseInt(e.target.value));
                        } else {
                          setIntFrDeposit("");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    setShowBnkInt(false);
                    getSalary();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!showBnkInt && newITData.tname && (
        <div className="my-2">
          <button className="btn btn-success m-2" onClick={() => navigate("/")}>
            Back
          </button>
          <PDFDownloadLink
            document={<IncomeTaxNew2025 data={newITData} />}
            fileName={`IT Statement of ${newITData.tname} NEW TAX REGIME ${thisYear}.pdf`}
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
        </div>
      )}

      {/* {salary.basicpay > 0 && <WBTPTAPaySLip data={salary} />} */}

      {loader && <Loader />}
    </div>
  );
}
