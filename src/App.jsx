import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import { GlobalContextProvider } from "./context/Store";
import GetTeachers from "./components/GetTeachers";
import { ToastContainer } from "react-toastify";

import DownloadWBTPTAPayslip from "./routes/DownloadWBTPTAPayslip";
import DownloadOSMSPayslip from "./routes/DownloadOSMSPayslip";
import LeaveProposal from "./routes/LeaveProposal";
import YearWiseTeachers from "./routes/YearWiseTeachers";
import HRA from "./routes/HRA";
const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
        exact
        path="/DownloadWBTPTAPayslip"
        element={<DownloadWBTPTAPayslip />}
      />
      <Route
        exact
        path="/DownloadOSMSPayslip"
        element={<DownloadOSMSPayslip />}
      />
      <Route exact path="/LeaveProposal" element={<LeaveProposal />} />
      <Route exact path="/YearWiseTeachers" element={<YearWiseTeachers />} />
      <Route exact path="/HRA" element={<HRA />} />
    </Routes>
  );
};

export default function App() {
  return (
    <HashRouter>
      <GlobalContextProvider>
        <GetTeachers />
        <Routing />
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
      </GlobalContextProvider>
    </HashRouter>
  );
}
