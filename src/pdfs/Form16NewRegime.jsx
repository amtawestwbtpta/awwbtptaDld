import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { IndianFormat, INR, titleCase } from "../modules/calculatefunctions";

const width = 2480;
const height = 3508;

const TableRow = ({ children, borderBottom = true }) => (
  <View style={[styles.tableRow, borderBottom && styles.borderBottom]}>
    {children}
  </View>
);

const TableCell = ({ width, children, borderRight = false, style }) => (
  <View
    style={[styles.cell, { width }, borderRight && styles.borderRight, style]}
  >
    {children}
  </View>
);

export default function Form16NewRegime({ data }) {
  const {
    tname,
    pan,
    desig,
    gender,
    fname,
    thisYear,
    nextYear,
    finYear,
    AllGross,
    TotalRoundOffIncome,
    CalculatedIT,
    isUnderRebate,
    eduCess,
    AddedEduCess,
    BankInterest,
    tds,
    GrossRelief,
  } = data;

  const taxableIncome = AllGross - 75000 + BankInterest;
  const netTaxPayable = !isUnderRebate ? AddedEduCess : 0;

  return (
    <Document title={`Form 16 of ${tname}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.mainBorder}>
            <View style={styles.header}>
              <Text style={styles.titleMain}>
                ORIGINAL / DUPLICATE / TRIPLICATE
              </Text>
              <Text style={styles.title}>FORM NO. 16 (PART - B)</Text>
              <Text style={styles.titleMain}>SEE RULE 31(1)</Text>
              <Text style={styles.subtitle}>
                "Certificate under section 203 of the Income-tax Act, 1961
                {"\n"}
                For tax deducted at source from income chargeable under the head
                “Salaries”
              </Text>
            </View>

            <TableRow>
              <TableCell width="50%" borderRight>
                <Text style={styles.textBold}>
                  Name and Designation of the Employer
                </Text>
              </TableCell>
              <TableCell width="50%">
                <Text style={styles.textBold}>
                  Name and designation of the Employee
                </Text>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell width="50%" borderRight>
                <Text style={styles.textBold}></Text>
              </TableCell>
              <TableCell width="50%">
                <Text style={styles.textBold}>{tname}</Text>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell width="50%" borderRight style={styles.employerDetails}>
                <Text style={styles.textBold}>CHAIRMAN, DPSC, HOWRAH</Text>
                <Text style={styles.textBold}>18, N.D. MUKHERJEE ROAD</Text>
                <Text style={styles.textBold}>HOWRAH- 1</Text>
              </TableCell>
              <TableCell width="50%">
                <View style={styles.underline}>
                  <Text style={styles.textBold}>{desig}</Text>
                </View>
                <View style={styles.underline}>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View>
                  <Text style={styles.textBold}> </Text>
                </View>
              </TableCell>
            </TableRow>

            {/* PAN/TAN Section */}
            <TableRow>
              <TableCell width="33%" borderRight>
                <Text style={styles.textBold}>PAN / GIR NO.</Text>
              </TableCell>
              <TableCell width="33%" borderRight>
                <Text style={styles.textBold}>TAN</Text>
              </TableCell>
              <TableCell width="33%">
                <Text style={styles.textBold}>PAN / GIR NO.</Text>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell width="33%" borderRight>
                <Text style={styles.textBold}> </Text>
              </TableCell>
              <TableCell width="33%" borderRight>
                <Text style={styles.textBold}>CALD02032C</Text>
              </TableCell>
              <TableCell width="33%">
                <Text style={styles.textBold}>{pan}</Text>
              </TableCell>
            </TableRow>

            {/* Assessment Period */}
            <TableRow>
              <TableCell width="33%" borderRight style={styles.centerText}>
                <Text style={styles.textBold}>
                  TDS Circle where Annual Return /{"\n"}Statement Under Section
                  206 is to be filled
                </Text>
              </TableCell>
              <TableCell width="33%" borderRight>
                <View style={styles.underline}>
                  <Text style={styles.textBold}>PERIOD RETURN</Text>
                </View>
                <View style={styles.splitView}>
                  <TableCell width="50%" borderRight>
                    <Text style={styles.textBold}>FROM</Text>
                    <Text style={styles.textBold}>{thisYear}</Text>
                  </TableCell>
                  <TableCell width="50%">
                    <Text style={styles.textBold}>TO</Text>
                    <Text style={styles.textBold}>{nextYear}</Text>
                  </TableCell>
                </View>
              </TableCell>
              <TableCell width="33%">
                <Text style={styles.textBold}>ASSESSMENT</Text>
                <Text style={styles.textBold}>YEAR</Text>
                <Text style={styles.textBold}>{finYear}</Text>
              </TableCell>
            </TableRow>

            {/* Salary Details Section */}
            <TableRow>
              <Text style={styles.titleMain}>
                DETAILS OF SALARY PAID AND ANY OTHER INCOME AND TAX DEDUCTED
              </Text>
            </TableRow>

            {[
              {
                label: "1. GROSS SALARY",
                value: IndianFormat(AllGross),
                sub: "(a) Salary as per provisions contained in Section 17(1)",
              },
              {
                label: "(b) Value of perquisites u/s 17(2)",
                sub: "(as per Form No. 12BA, wherever applicable)",
              },
              {
                label: "(c) Profits in lieu of salary under section 17(3)",
                sub: "(as per Form No. 12BA, wherever applicable)",
              },
              { label: "(d) Total", value: IndianFormat(AllGross) },
              {
                label:
                  "(2) LESS : Allowance to the extent exempt under Section 10",
              },
              { label: "(3) BALANCE (1 – 2)", value: IndianFormat(AllGross) },
              { label: "(4) DEDUCTIONS" },
              { label: "a) Standard Deduction", value: IndianFormat(75000) },
              { label: "5) TOTAL DEDUCTION", value: IndianFormat(75000) },
              { label: "6) TAXABLE INCOME UNDER THE HEAD SALARIES (3-5)" },
              {
                label: "7) Add : Any other income reported by the employee",
                value: IndianFormat(BankInterest),
              },
              {
                label: "a) GROSS INCOME (Total above 7)",
                value: IndianFormat(taxableIncome),
              },
              { label: "b) LESS: Deduction under Section 57", value: "NIL" },
              {
                label: "8) TAXABLE INCOME FROM OTHER SOURCES [7(A)-7(B)]",
                value: IndianFormat(taxableIncome),
              },
              {
                label:
                  "9) LESS: Interest paid on dwelling house Under Section 24",
                value: "NIL",
              },
              {
                label: "10) GROSS TOTAL INCOME (6+8-9)",
                value: IndianFormat(taxableIncome),
              },
            ].map((row, index) => (
              <TableRow key={index} borderBottom={index < 15}>
                <TableCell width="40%" borderRight>
                  <Text style={styles.textBold}>{row.label}</Text>
                  {row.sub && <Text style={styles.textBold}>{row.sub}</Text>}
                </TableCell>
                <TableCell width="20%" borderRight>
                  {row.value && (
                    <Text style={styles.textBold}>{row.value}</Text>
                  )}
                </TableCell>
                <TableCell width="20%" borderRight>
                  {index === 0 && (
                    <Text style={styles.textBold}>{row.value}</Text>
                  )}
                  {index === 3 && (
                    <Text style={styles.textBold}>{row.value}</Text>
                  )}
                </TableCell>
                <TableCell width="20%">
                  {index === 9 && (
                    <Text style={styles.textBold}>
                      Rs. {IndianFormat(AllGross - 75000)}
                    </Text>
                  )}
                  {index === 15 && (
                    <Text style={styles.textBold}>Rs. {row.value}</Text>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </View>
        </View>
      </Page>

      {/* Page 2 - Tax Calculation */}
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.mainBorder}>
            {[
              {
                label: "11) TOTAL OR NET TAXABLE INCOME",
                value: IndianFormat(taxableIncome),
              },
              {
                label: "12) ROUNDED OFF",
                value: IndianFormat(TotalRoundOffIncome),
              },
              {
                label: "13) TAX ON TOTAL OR NET INCOME",
                value: IndianFormat(CalculatedIT),
              },
              {
                label: "14) LESS: REBATE U/S. 87A",
                value: GrossRelief > 0 ? IndianFormat(GrossRelief) : "NIL",
              },
              { label: "15) TAX ON SURCHARGE", value: "NIL" },
              {
                label: "16) ADD: EDUCATION CESS (4% OF TAX AND SURCHARGE)",
                value: !isUnderRebate ? IndianFormat(eduCess) : "N/A",
              },
              {
                label: "17) TOTAL TAX PAYABLE (17+18)",
                value: !isUnderRebate ? IndianFormat(AddedEduCess) : "NIL",
              },
              {
                label: "18) LESS: REBATE U/S. 89 (Attach Details)",
                value: "N/A",
              },
              {
                label: "19) NET TAX PAYABLE (19-20)",
                value: IndianFormat(netTaxPayable),
              },
              {
                label: "20) LESS: TAX DEDUCTED AT SOURCE",
                value: tds > 0 ? IndianFormat(tds) : "NIL",
              },
              {
                label: "21) TAX PAYABLE / REFUNDABLE (21-22)",
                value: IndianFormat(netTaxPayable),
              },
            ].map((row, index) => (
              <TableRow key={index} borderBottom={index < 10}>
                <TableCell width="40%" borderRight>
                  <Text style={styles.textBold}>{row.label}</Text>
                </TableCell>
                <TableCell width="20%" borderRight>
                  {row.value && (
                    <Text style={styles.textBold}>{row.value}</Text>
                  )}
                </TableCell>
                <TableCell width="20%" borderRight>
                  {index === 0 && (
                    <Text style={styles.textBold}>{row.value}</Text>
                  )}
                </TableCell>
                <TableCell width="20%">
                  <Text style={styles.textBold}>Rs. {row.value}</Text>
                </TableCell>
              </TableRow>
            ))}

            {/* Tax Deposit Details */}
            <TableRow>
              <Text style={styles.titleMain}>
                DETAILS OF TAX DEDUCTED AND DEPOSITED INTO CENTRAL GOVERNMENT
                ACCOUNT
              </Text>
            </TableRow>

            <TableRow>
              <TableCell width="20%">
                <Text style={styles.text2i}>Amount</Text>
              </TableCell>
              <TableCell width="30%">
                <Text style={styles.text2i}>Date of Payment</Text>
              </TableCell>
              <TableCell width="50%">
                <Text style={styles.text2i}>
                  Name of the bank and Branch where Tax Deposited
                </Text>
              </TableCell>
            </TableRow>

            <TableRow>
              <View style={{ height: 80 }} />
            </TableRow>

            {/* Declaration */}
            <TableRow borderBottom={false}>
              <View style={styles.declaration}>
                <Text style={styles.text}>I </Text>
                <Text style={styles.underlineDotted}>{titleCase(tname)}</Text>
                <Text style={styles.text}>
                  {gender === "male" ? " son " : " daughter "} of
                </Text>
                <Text style={styles.underlineDotted}>{titleCase(fname)}</Text>
                <Text style={styles.text}> working in the capacity of </Text>
                <Text style={styles.underlineDotted}>{desig}</Text>
                <Text style={styles.text}>
                  , do hereby certify that a sum of{" "}
                </Text>
                <Text style={styles.underlineDotted}>
                  Rs. {isUnderRebate ? 0 : IndianFormat(AddedEduCess)}
                </Text>
                <Text style={styles.underlineDotted}>
                  {isUnderRebate
                    ? "[Rupees Zero Only]"
                    : `[${INR(AddedEduCess)} Only]`}
                </Text>
                <Text style={styles.text}>
                  has been deducted at source and paid to the credit of the
                  Central Government.
                </Text>
              </View>
            </TableRow>

            {/* Signature Section */}
            <View style={styles.signatureContainer}>
              <View style={styles.signatureLeft}>
                <Text style={styles.textBold}>
                  Date…........................................
                </Text>
                <Text style={styles.textBold}>
                  Designation….................................
                </Text>
              </View>
              <View style={styles.signatureRight}>
                <Text style={styles.textBold}>
                  Signature of the person responsible for deduction of tax
                </Text>
                <Text style={styles.textBold}>
                  Place….........................................
                </Text>
                <Text style={styles.textBold}>
                  Full Name…...................................
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 5,
    backgroundColor: "#FFFFFF",
    width,
    height,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
  },
  mainBorder: {
    borderWidth: 1,
    width: "100%",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 8,
  },
  titleMain: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
    marginVertical: 8,
  },
  textBold: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  text: {
    fontSize: 11,
    fontFamily: "Times",
  },
  text2i: {
    fontSize: 8,
    fontFamily: "TimesItalic",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
  },
  borderBottom: {
    borderBottomWidth: 0.5,
  },
  cell: {
    padding: 2,
    justifyContent: "center",
  },
  borderRight: {
    borderRightWidth: 1,
  },
  employerDetails: {
    paddingVertical: 8,
  },
  underline: {
    borderBottomWidth: 1,
  },
  centerText: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  splitView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  declaration: {
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "justify",
    padding: 5,
  },
  underlineDotted: {
    textDecoration: "underline",
    textDecorationStyle: "dotted",
  },
  signatureContainer: {
    flexDirection: "row",
    padding: 5,
    marginVertical: 20,
  },
  signatureLeft: {
    width: "50%",
    paddingRight: 8,
  },
  signatureRight: {
    width: "50%",
    alignItems: "flex-end",
  },
});

// Register fonts outside component
Font.register({ family: "Times", src: "https://example.com/times.ttf" });
Font.register({
  family: "TimesItalic",
  src: "https://example.com/timesBoldItalic.ttf",
});
Font.register({
  family: "TimesBold",
  src: "https://example.com/timesBold.ttf",
});
