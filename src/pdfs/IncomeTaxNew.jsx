import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { IndianFormat, INR, titleCase } from "../modules/calculatefunctions";

const Form16NewRegime = ({ data }) => {
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

  // Derived values
  const taxableIncome = AllGross - 75000 + BankInterest;
  const netTaxPayable = !isUnderRebate ? AddedEduCess : 0;
  const totalDeduction = 75000;

  // Reusable components
  const TableRow = ({ children, border = true }) => (
    <View style={[styles.row, border && styles.borderBottom]}>{children}</View>
  );

  const TableCell = ({ width, children, borderRight = false, style }) => (
    <View
      style={[styles.cell, { width }, borderRight && styles.borderRight, style]}
    >
      {typeof children === "string" ? (
        <Text style={styles.textBold}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );

  // Salary details data
  const salaryDetails = [
    {
      label: "1. GROSS SALARY",
      sub: "(a) Salary as per provisions contained in Section 17(1)",
      value: IndianFormat(AllGross),
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
    { label: "(2) LESS : Allowance to the extent exempt under Section 10" },
    { label: "(3) BALANCE (1 – 2)", value: IndianFormat(AllGross) },
    { label: "(4) DEDUCTIONS" },
    { label: "a) Standard Deduction", value: IndianFormat(totalDeduction) },
    { label: "5) TOTAL DEDUCTION", value: IndianFormat(totalDeduction) },
    { label: "6) TAXABLE INCOME UNDER THE HEAD SALARIES (3-5)" },
    {
      label: "7) Add : Any other income reported by the employee",
      value: IndianFormat(BankInterest),
    },
    {
      label: "a) GROSS INCOME (Total above 7)",
      value: IndianFormat(taxableIncome),
    },
    {
      label: "b) LESS: Deduction under Section 57",
      value: "NIL",
    },
    {
      label: "8) TAXABLE INCOME FROM OTHER SOURCES [7(A)-7(B)]",
      value: IndianFormat(taxableIncome),
    },
    {
      label: "9) LESS: Interest paid on dwelling house Under Section 24",
      value: "NIL",
    },
    {
      label: "10) GROSS TOTAL INCOME (6+8-9)",
      value: IndianFormat(taxableIncome),
      lastCell: true,
    },
  ];

  // Tax details data
  const taxDetails = [
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
    {
      label: "15) TAX ON SURCHARGE",
      value: "NIL",
    },
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
      lastCell: true,
    },
  ];

  return (
    <Document title={`Form 16 - ${tname}`}>
      {/* Page 1 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.border}>
            {/* Header Section */}
            <View style={styles.header}>
              <Text style={styles.titleMain}>
                ORIGINAL / DUPLICATE / TRIPLICATE
              </Text>
              <Text style={styles.title}>FORM NO. 16 (PART - B)</Text>
              <Text style={styles.subtitle}>SEE RULE 31(1)</Text>
              <Text style={styles.subtitle}>
                "Certificate under section 203 of the Income-tax Act, 1961
                {"\n"}For tax deducted at source from income chargeable under
                the head “Salaries”
              </Text>
            </View>

            {/* Employer/Employee Details */}
            <TableRow>
              <TableCell width="50%" borderRight>
                Name and Designation of the Employer
              </TableCell>
              <TableCell width="50%">
                Name and designation of the Employee
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell width="50%" borderRight></TableCell>
              <TableCell width="50%">{tname}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell width="50%" borderRight style={styles.verticalPad}>
                CHAIRMAN, DPSC, HOWRAH{"\n"}
                18, N.D. MUKHERJEE ROAD{"\n"}
                HOWRAH- 1
              </TableCell>
              <TableCell width="50%">
                <View style={styles.underline}>{desig}</View>
                <View style={styles.underline}></View>
                <View></View>
              </TableCell>
            </TableRow>

            {/* PAN/TAN Section */}
            <TableRow>
              <TableCell width="33%" borderRight>
                PAN / GIR NO.
              </TableCell>
              <TableCell width="33%" borderRight>
                TAN
              </TableCell>
              <TableCell width="33%">PAN / GIR NO.</TableCell>
            </TableRow>

            <TableRow>
              <TableCell width="33%" borderRight></TableCell>
              <TableCell width="33%" borderRight>
                CALD02032C
              </TableCell>
              <TableCell width="33%">{pan}</TableCell>
            </TableRow>

            {/* Assessment Period */}
            <TableRow>
              <TableCell width="33%" borderRight style={styles.center}>
                TDS Circle where Annual Return /{"\n"}Statement Under Section
                206 is to be filled
              </TableCell>
              <TableCell width="33%" borderRight>
                <View style={styles.underline}>PERIOD RETURN</View>
                <View style={styles.splitRow}>
                  <TableCell width="50%" borderRight>
                    FROM{"\n"}
                    {thisYear}
                  </TableCell>
                  <TableCell width="50%">
                    TO{"\n"}
                    {nextYear}
                  </TableCell>
                </View>
              </TableCell>
              <TableCell width="33%">
                ASSESSMENT{"\n"}YEAR{"\n"}
                {finYear}
              </TableCell>
            </TableRow>

            {/* Salary Details Section */}
            <TableRow border={false}>
              <Text style={styles.sectionTitle}>
                DETAILS OF SALARY PAID AND ANY OTHER INCOME AND TAX DEDUCTED
              </Text>
            </TableRow>

            {salaryDetails.map((item, index) => (
              <TableRow key={index} border={index < salaryDetails.length - 1}>
                <TableCell width="40%" borderRight>
                  {item.label}
                  {item.sub && "\n" + item.sub}
                </TableCell>
                <TableCell width="20%" borderRight>
                  {item.value}
                </TableCell>
                <TableCell width="20%" borderRight>
                  {[0, 3].includes(index) && item.value}
                </TableCell>
                <TableCell width="20%">
                  {[9, 15].includes(index) && `Rs. ${item.value}`}
                </TableCell>
              </TableRow>
            ))}
          </View>
        </View>
      </Page>

      {/* Page 2 - Tax Calculation */}
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.border}>
            {taxDetails.map((item, index) => (
              <TableRow key={index} border={index < taxDetails.length - 1}>
                <TableCell width="40%" borderRight>
                  {item.label}
                </TableCell>
                <TableCell width="20%" borderRight>
                  {item.value}
                </TableCell>
                <TableCell width="20%" borderRight>
                  {index === 0 && item.value}
                </TableCell>
                <TableCell width="20%">Rs. {item.value}</TableCell>
              </TableRow>
            ))}

            {/* Tax Deposit Section */}
            <TableRow border={false}>
              <Text style={styles.sectionTitle}>
                DETAILS OF TAX DEDUCTED AND DEPOSITED INTO CENTRAL GOVERNMENT
                ACCOUNT
              </Text>
            </TableRow>

            <TableRow>
              <TableCell width="20%">Amount</TableCell>
              <TableCell width="30%">Date of Payment</TableCell>
              <TableCell width="50%">
                Name of the bank and Branch where Tax Deposited
              </TableCell>
            </TableRow>

            <TableRow>
              <View style={{ height: 80 }} />
            </TableRow>

            {/* Declaration */}
            <TableRow border={false}>
              <View style={styles.declaration}>
                <Text>I {titleCase(tname)} </Text>
                <Text>{gender === "male" ? "son" : "daughter"} of </Text>
                <Text>{titleCase(fname)} </Text>
                <Text>
                  working in the capacity of {desig}, do hereby certify that a
                  sum of{" "}
                </Text>
                <Text>
                  Rs. {isUnderRebate ? 0 : IndianFormat(AddedEduCess)}{" "}
                </Text>
                <Text>
                  [
                  {isUnderRebate
                    ? "Rupees Zero Only"
                    : `${INR(AddedEduCess)} Only`}
                  ]{" "}
                </Text>
                <Text>
                  has been deducted at source and paid to the credit of the
                  Central Government.
                </Text>
              </View>
            </TableRow>

            {/* Signature Section */}
            <View style={styles.signatureRow}>
              <View style={styles.signatureLeft}>
                <Text>Date............................................</Text>
                <Text>Designation........................................</Text>
              </View>
              <View style={styles.signatureRight}>
                <Text>Signature of the person responsible</Text>
                <Text>Place............................................</Text>
                <Text>Full Name........................................</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: "Times",
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  border: {
    borderWidth: 1,
    width: "95%",
    padding: 5,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  titleMain: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  textBold: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  borderBottom: {
    borderBottomWidth: 0.5,
  },
  borderRight: {
    borderRightWidth: 0.5,
  },
  cell: {
    padding: 2,
    justifyContent: "center",
  },
  verticalPad: {
    paddingVertical: 5,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  underline: {
    borderBottomWidth: 0.5,
    paddingVertical: 2,
  },
  splitRow: {
    flexDirection: "row",
  },
  declaration: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 9,
    textAlign: "justify",
    padding: 5,
  },
  signatureRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  signatureLeft: {
    width: "50%",
    paddingRight: 10,
  },
  signatureRight: {
    width: "50%",
    alignItems: "flex-end",
  },
});

export default Form16NewRegime;
