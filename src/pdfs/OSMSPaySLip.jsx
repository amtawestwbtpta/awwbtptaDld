import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { INR, printDate } from "../modules/calculatefunctions";

const width = 2480;
const height = 3508;

export default function OSMSPaySLip({ data }) {
  const {
    tname,
    desig,
    school,
    empid,
    pan,
    addl,
    da,
    hra,
    ma,
    gross,
    ptax,
    gsli,
    udise,
    bank,
    account,
    ifsc,
    month,
    netpay,
    basicpay,
    pfund,
    level,
    cell,
    deduction,
    year,
    ir,
  } = data;

  return (
    <Document
      title={`PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR ${month.toUpperCase()}, ${year}`}
    >
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.pageMainView}>
          <View style={styles.headerContainer}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/awwbtpta.appspot.com/o/images%2Fiosms.png?alt=media&token=f21c8d21-ac4e-4f2e-b416-2064d91ffe4f"
              style={styles.logo}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>GOVT. OF WEST BENGAL</Text>
              <Text style={styles.title}>
                OFFICE OF THE SUB INSPECTOR OF SCHOOLS
              </Text>
              <Text style={[styles.title2, { color: "#004080" }]}>
                AMTA WEST CIRCLE, HAORA
              </Text>
              <Text style={[styles.title2, styles.monthYear]}>
                PAY SLIP FOR THE MONTH OF {month.toUpperCase()},{year}
              </Text>
            </View>
          </View>

          <View style={styles.employeeContainer}>
            <View style={styles.employeeSection}>
              <EmployeeRow label="EMPLOYEE NAME:" value={tname} />
              <EmployeeRow
                label="SCHOOL NAME:"
                value={`${school}(UDISE: ${udise})`}
                inline
              />
              <EmployeeRow
                label="LEVEL:"
                value={level}
                secondLabel="CELL:"
                secondValue={cell}
              />
            </View>
            <View style={styles.employeeSection}>
              <EmployeeRow label="Employee ID:" value={empid} />
              <EmployeeRow label="DESIGNATION:" value={desig} />
              <EmployeeRow label="PAN:" value={pan} />
            </View>
          </View>

          {/* Fixed table with explicit border widths */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.quarterWidth}>
                <Text style={styles.text2}>EARNING(Rs)</Text>
              </View>
              <View style={styles.quarterWidth}>
                <Text style={styles.text2}>DEDUCTION(Rs)</Text>
              </View>
              <View style={styles.quarterWidth}>
                <Text style={styles.text2}>RECOVERIES OF LOAN(Rs)</Text>
              </View>
              <View style={[styles.quarterWidth, styles.noRightBorder]}>
                <Text style={styles.text2}>OUT/ACCT.DED (Rs)</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.quarterWidth}>
                <EarningsSection
                  desig={desig}
                  basicpay={basicpay}
                  addl={addl}
                  da={da}
                  hra={hra}
                  ma={ma}
                  ir={ir}
                />
              </View>

              <View style={styles.quarterWidth}>
                <DeductionsSection
                  pfund={pfund}
                  ptax={ptax}
                  gsli={gsli}
                  desig={desig}
                />
              </View>

              <View style={[styles.quarterWidth, styles.emptyCell]} />
              <View
                style={[
                  styles.quarterWidth,
                  styles.emptyCell,
                  styles.noRightBorder,
                ]}
              />
            </View>

            <View style={styles.tableRow}>
              <View style={styles.quarterWidth}>
                <TotalRow label="Total:" value={gross} />
              </View>
              <View style={styles.quarterWidth}>
                <TotalRow value={deduction} />
              </View>
              <View style={[styles.quarterWidth, styles.emptyCell]} />
              <View
                style={[
                  styles.quarterWidth,
                  styles.emptyCell,
                  styles.noRightBorder,
                ]}
              />
            </View>

            <View style={[styles.tableRow, styles.noBottomBorder]}>
              <View style={styles.fullWidth}>
                <TotalRow label="GROSS PAY:" value={gross} />
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBottomBorder]}>
              <View style={styles.fullWidth}>
                <NetPayRow netpay={netpay} />
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.fullWidth}>
                <BankDetails bank={bank} account={account} ifsc={ifsc} />
              </View>
            </View>
          </View>

          <View style={styles.notesContainer}>
            <Text style={styles.noteText}>
              GP: Grade Pay, DA: Dearness Allowance, HRA: House Rent Allowance,
              MA: Medical Allowance, CA: Conveyance Allowance,
            </Text>
            <Text style={styles.noteText}>
              CPF: Contributory Provident Fund, GPF: General Provident Fund, PT:
              Professional Tax, IT: Income Tax,
            </Text>
            <Text style={styles.noteText}>
              GSLI: Group Savings Linked Insurance, IR: Interim Relief.
            </Text>
          </View>

          <View style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerLabel}>Disclaimer:</Text>
            <Text style={styles.disclaimerText}>
              This is a computer generated Pay Slip and hence does not require
              any signature.
            </Text>
          </View>

          <View style={styles.footerBreak}></View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>osms.wbsed.gov.in</Text>
            <Text style={styles.footerText}>Page-1</Text>
            <Text style={styles.footerText}>
              Date of Generation: {printDate()}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// Sub-components for better organization
const EmployeeRow = ({ label, value, secondLabel, secondValue, inline }) => (
  <View style={styles.employeeRow}>
    <Text style={styles.text2}>{label}&nbsp;</Text>
    {inline ? (
      <Text style={styles.text}>{value}</Text>
    ) : (
      <>
        <Text style={styles.text}>{value}</Text>
        {secondLabel && (
          <>
            <Text style={styles.text2}>{secondLabel}&nbsp;</Text>
            <Text style={styles.text}>{secondValue}</Text>
          </>
        )}
      </>
    )}
  </View>
);

const EarningsSection = ({ desig, basicpay, addl, da, hra, ma, ir }) => (
  <View style={styles.sectionContent}>
    <SalaryRow label="BASIC" value={basicpay} />
    {desig === "HT" && <SalaryRow label="ADDL. REMUN." value={addl} />}
    <SalaryRow label="DA" value={da} />
    <SalaryRow label="HRA" value={hra} />
    <SalaryRow label="MA" value={ma} />
    <SalaryRow label="CA" value={0} />
    <SalaryRow label="CPF" value={0} />
    <SalaryRow label="IR" value={ir > 0 ? ir : 0} />
  </View>
);

const DeductionsSection = ({ pfund, ptax, gsli, desig }) => (
  <View style={styles.sectionContent}>
    {desig === "HT" && <View style={styles.emptyDeductionRow} />}
    <SalaryRow label="GPF" value={pfund} />
    <SalaryRow label="PF LOAN" value={0} />
    <SalaryRow label="CPF DEDUCT" value={0} />
    <SalaryRow label="PT" value={ptax} />
    <SalaryRow label="IT" value={0} />
    <SalaryRow label="GSLI" value={gsli} />
    <SalaryRow label="OVERDRAWN" value={0} />
  </View>
);

const SalaryRow = ({ label, value }) => (
  <View style={styles.salaryRow}>
    <Text style={styles.text2}>{label}</Text>
    <Text style={styles.text}>{value}</Text>
  </View>
);

const TotalRow = ({ label, value }) => (
  <View style={styles.salaryRow}>
    {label && <Text style={styles.text2}>{label}</Text>}
    <Text style={styles.text2}>{value}</Text>
  </View>
);

const NetPayRow = ({ netpay }) => (
  <View style={styles.salaryRow}>
    <Text style={styles.text2}>NET PAY:</Text>
    <Text style={[styles.text2, styles.netPayValue]}>
      {netpay} ({INR(netpay)})
    </Text>
  </View>
);

const BankDetails = ({ bank, account, ifsc }) => (
  <View style={styles.salaryRow}>
    <Text style={styles.text2}>
      Transferred to {bank} Account no {account} &emsp; IFS Code {ifsc}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  page: {
    padding: 5,
    margin: 5,
    width: width,
    height: height,
  },
  pageMainView: {
    padding: 30,
    margin: 5,
    width: "100%",
    height: "98%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 70,
    marginTop: -45,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "DejaVu",
    textAlign: "center",
  },
  title2: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "DejaVu",
    textAlign: "center",
  },
  monthYear: {
    marginTop: 10,
  },
  text: {
    fontSize: 8,
    fontFamily: "DejaVuNormal",
    textAlign: "center",
    padding: 2,
  },
  text2: {
    fontSize: 8,
    fontFamily: "DejaVu",
    textAlign: "center",
    padding: 2,
  },
  employeeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    alignItems: "flex-start",
  },
  employeeSection: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  employeeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tableContainer: {
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
  },
  quarterWidth: {
    width: "25%",
    borderRightWidth: 0.5,
    padding: 2,
  },
  fullWidth: {
    width: "100%",
    padding: 2,
  },
  noRightBorder: {
    borderRightWidth: 0,
  },
  noBottomBorder: {
    borderBottomWidth: 0,
  },
  noBorder: {
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  sectionContent: {
    width: "100%",
  },
  salaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 5,
    marginBottom: 2,
  },
  emptyCell: {
    minHeight: 20,
  },
  emptyDeductionRow: {
    height: 15,
  },
  netPayValue: {
    marginLeft: 13,
  },
  notesContainer: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  noteText: {
    fontSize: 8,
    fontFamily: "DejaVuNormal",
    textAlign: "left",
  },
  disclaimerContainer: {
    marginTop: 200,
    flexDirection: "row",
    alignItems: "center",
  },
  disclaimerLabel: {
    fontSize: 8,
    fontFamily: "DejaVu",
    textAlign: "left",
    padding: 2,
  },
  disclaimerText: {
    fontSize: 8,
    fontFamily: "DejaVuNormal",
    textAlign: "left",
    padding: 2,
  },
  footerBreak: {
    borderBottomWidth: 0.5,
    width: "100%",
    height: 5,
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  footerText: {
    fontSize: 8,
    fontFamily: "DejaVuItalic",
    padding: 2,
  },
});

// Font registrations remain the same
Font.register({
  family: "DejaVu",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/DejaVuSerif-Bold.ttf",
});
Font.register({
  family: "DejaVuNormal",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/DejaVuSerif.ttf",
});
Font.register({
  family: "DejaVuItalic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/DejaVuSerif-BoldItalic.ttf",
});
