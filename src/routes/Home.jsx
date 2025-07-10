import React from "react";
import { useNavigate } from "react-router";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <img
        src="https://raw.githubusercontent.com/ultimate365/jsondata/main/logo.png"
        alt="logo"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      {/* <button
        type="button"
        className="btn btn-primary m-2"
        onClick={() => {
          navigate(
            `/DownloadWBTPTAPayslip?data={"pan":"ACPPI7856P","month":"july","year":"2025"}`
          );
        }}
      >
        Go to WBTPTA Payslip
      </button> */}
      {/* <button
        type="button"
        className="btn btn-success m-2"
        onClick={() => {
          navigate(`/LeaveProposal?data={"pan":"DZZPR9226Q"}`);
        }}
      >
        Go to Leave Proposal
      </button> */}
      <button
        type="button"
        className="btn btn-success m-2"
        onClick={() => {
          navigate(`/HRA?data={"pan":"DZZPR9876Q"}`);
        }}
      >
        Go to HRA
      </button>
      {/* <button
        type="button"
        className="btn btn-success m-2"
        onClick={() => {
          navigate(`/YearWiseTeachers`);
        }}
      >
        Year Wise Teachers
      </button> */}
    </div>
  );
}
