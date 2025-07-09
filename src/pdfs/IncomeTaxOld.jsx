import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { IndianFormat } from "../modules/calculatefunctions";

// Register fonts
Font.register({
  family: "Algerian",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/Algerian.ttf",
});
Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});
Font.register({
  family: "TimesBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 5,
    backgroundColor: "#FFFFFF",
  },
  centeredContainer: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  borderedContainer: {
    borderWidth: 1,
    width: "100%",
  },
  titleMain: {
    fontSize: 16,
    fontFamily: "Algerian",
    textAlign: "center",
    padding: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Algerian",
    textAlign: "center",
    padding: 2,
  },
  text: {
    fontSize: 10,
    fontFamily: "Times",
    textAlign: "center",
  },
  boldText: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    width: "100%",
  },
  rowNoBorder: {
    flexDirection: "row",
    width: "100%",
  },
  col60: { width: "60%", borderRightWidth: 1 },
  col80: { width: "80%", borderRightWidth: 1 },
  col20: { width: "20%" },
  panBox: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
  },
  signatureBox: {
    width: 200,
    height: 60,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  noteText: {
    fontSize: 12,
    textAlign: "center",
    padding: 1,
    borderBottomWidth: 1,
  },
  col5: { width: "5%", borderRightWidth: 1, padding: 2 },
  col7: { width: "7%", borderRightWidth: 1, padding: 2 },
  col10: { width: "10%", borderRightWidth: 1, padding: 2 },
  col50: { width: "50%", justifyContent: "center" },
});

const IncomeTaxDownload = ({ data }) => {
  const {
    tname,
    school,
    pan,
    phone,
    desig,
    thisYear,
    nextYear,
    prevYear,
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
    marchPTax,
    bonus,
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
    limitVIA,
    OtherVIA,
    TotalIncome,
    TotalRoundOffIncome,
    CalculatedIT,
    isUnderRebate,
    eduCess,
    AddedEduCess,
    BankInterest,
    hbLoanPrincipal,
    hbLoanInterest,
    lic,
    ulip,
    ppf,
    nsc,
    nscInterest,
    tutionFee,
    sukanya,
    mediclaim,
    terminalDisease,
    handicapTreatment,
    educationLoan,
    charity,
    disabilityDeduction,
    tds,
  } = data;

  // Render PAN character boxes
  const renderPanBoxes = () => (
    <View style={[styles.row, { borderBottomWidth: 0 }]}>
      <View style={[styles.col60, { flexDirection: "row", padding: 2 }]}>
        <Text style={[styles.text, { paddingRight: 30 }]}>PAN: </Text>
        {pan?.split("").map((char, i) => (
          <View key={i} style={styles.panBox}>
            <Text style={styles.boldText}>{char}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.col20, { borderRightWidth: 1 }]}></View>
      <View style={styles.col20}></View>
    </View>
  );

  // Render tax calculation rows
  const renderTaxRow = (label, value, format = true, condition = true) => (
    <View style={styles.row}>
      <View style={styles.col80}>
        <Text style={[styles.text, { textAlign: "left" }]}>{label}</Text>
      </View>
      <View style={styles.col20}>
        <Text style={styles.boldText}>
          {format ? `Rs. ${IndianFormat(value)}` : value}
        </Text>
      </View>
    </View>
  );

  return (
    <Document title={`IT Statement of ${tname} of ${school}`}>
      {/* Page 1 */}
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.centeredContainer}>
          <View style={styles.borderedContainer}>
            <View style={{ padding: 5 }}>
              <Text style={styles.titleMain}>
                HOWRAH DISTRICT PRIMARY SCHOOL COUNCIL
              </Text>
              <Text style={styles.sectionTitle}>DECLARATION OF INCOME TAX</Text>
              <Text style={[styles.sectionTitle, { fontSize: 12 }]}>
                FOR THE FINANCIAL YEAR {`${prevYear} - ${thisYear}`} RELATION TO
                ASSESMENT YEAR {finYear}
              </Text>
            </View>

            <View style={{ padding: 5 }}>
              <View style={styles.rowNoBorder}>
                <Text style={styles.text}>Name of the Teacher: </Text>
                <Text style={[styles.boldText, { marginLeft: 5 }]}>
                  {tname}
                </Text>
              </View>

              <View
                style={[
                  styles.rowNoBorder,
                  { justifyContent: "space-between" },
                ]}
              >
                <View style={styles.rowNoBorder}>
                  <Text style={styles.text}>Designation: </Text>
                  <Text style={[styles.boldText, { marginLeft: 5 }]}>
                    {desig}
                  </Text>
                </View>
                <View style={styles.rowNoBorder}>
                  <Text style={styles.text}>Circle: </Text>
                  <Text style={[styles.boldText, { marginLeft: 5 }]}>
                    AMTA WEST CIRCLE
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.rowNoBorder,
                  { justifyContent: "space-between" },
                ]}
              >
                <View style={styles.rowNoBorder}>
                  <Text style={styles.text}>School: </Text>
                  <Text style={[styles.boldText, { marginLeft: 5 }]}>
                    {school}
                  </Text>
                </View>
                <View style={styles.rowNoBorder}>
                  <Text style={styles.text}>Mobile No: </Text>
                  <Text style={[styles.boldText, { marginLeft: 5 }]}>
                    {phone}
                  </Text>
                </View>
              </View>
            </View>

            {renderPanBoxes()}

            {renderTaxRow(
              "1. GROSS SLARY INCOME (Salary +Arrear Salary +Bonus)",
              AllGross
            )}
            {renderTaxRow(
              "2. Less: Exemption of HRA under Sec 10(13A) the least of the following",
              ""
            )}
            {renderTaxRow("a) Actual HRA Received", "")}
            {renderTaxRow(
              "b) Rent Paid in excess of 10% of Salary (Basic + DA)",
              ""
            )}
            {renderTaxRow("c) 40% of Salary (Basic + DA)", "")}
            {renderTaxRow("", AllGross, true, false)}
            {renderTaxRow(
              "3. Less: P. Tax under section 16(ii/i)",
              grossPTax,
              grossPTax !== 0,
              "NIL"
            )}
            {renderTaxRow(
              "4. Less: Standard Deduction for Salaried & Pensioner (Rs.50,000)",
              50000
            )}
            {renderTaxRow(
              "5. Income chargeable under the head Salaries (1-2-3-4)",
              AllGross - grossPTax - 50000
            )}
            {renderTaxRow(
              "6. Income under any head other than salaries (From Schedule OS)",
              BankInterest
            )}
            {renderTaxRow(
              "7. Interest on House Building Loan",
              hbLoanInterest,
              hbLoanInterest !== 0,
              "NIL"
            )}
            {renderTaxRow("8. Gross Total Income [(5+6)-7)", GrossTotalIncome)}
            {renderTaxRow(
              "9. Deduction under Chapter VIA (From Schedule-VIA)\nAggregate amount of deductions admissible U/S 80C, 80CCC and 80CCD(I) (Limited to Rs.1,50,000/-)",
              limitVIA
            )}
            {renderTaxRow(
              "10. Amount deduction under section 80CCD(B)",
              0,
              false,
              "NIL"
            )}
            {renderTaxRow(
              "11. Amount deduction under any other provision(s) Chapter VI-A (From Schedule- Other VIA)",
              OtherVIA
            )}
            {renderTaxRow("12. Total Income (8-9-10-11)", TotalIncome)}
            {renderTaxRow(
              "13. Rounding Off of Total Income U/S288A (SI No 12)",
              TotalRoundOffIncome
            )}
            {renderTaxRow("14. Income Tax on Total Income", CalculatedIT)}
            {renderTaxRow(
              "15. Less: Rebate U/S 87A",
              isUnderRebate ? 0 : CalculatedIT,
              !isUnderRebate,
              "NIL"
            )}
            {renderTaxRow(
              "16. Total Tax Payable (14-15)",
              isUnderRebate ? 0 : CalculatedIT,
              !isUnderRebate,
              "NIL"
            )}
            {renderTaxRow(
              "17. Add: Health & Education Cess (4% of 16)",
              eduCess,
              !isUnderRebate,
              "N/A"
            )}
            {renderTaxRow(
              "18. Income Tax Relief U/S 89",
              0,
              false,
              isUnderRebate ? "N/A" : "NIL"
            )}
            {renderTaxRow(
              "19. Net Tax Payable [(16+17)-18]",
              AddedEduCess,
              !isUnderRebate,
              "NIL"
            )}
            {renderTaxRow(
              "20. Total amount of Tax Deducted at Source (TDS) upto Jan 2023",
              tds,
              tds !== 0 && !isUnderRebate,
              isUnderRebate ? "N/A" : "NIL"
            )}
            {renderTaxRow(
              "21. TDS Payable in Feb 2023/ Excess Tax deduction",
              AddedEduCess - tds,
              !isUnderRebate,
              "N/A"
            )}

            <View style={[styles.signatureBox, { alignSelf: "center" }]}>
              <Text style={styles.boldText}>Incumbent’s Signature</Text>
            </View>

            <Text style={styles.noteText}>
              Short Tax deduction from salary will not be allowed as per I.T.
              Rules 1961
            </Text>
            <Text style={styles.noteText}>
              HRA exemption will not be allowed without proper receipt with PAN
              of House owner
            </Text>
            <Text style={styles.noteText}>
              Without supporting documents and deduction will be allowed
            </Text>
            <Text style={[styles.noteText, { borderBottomWidth: 0 }]}>
              Last Date of submission 11/01/{thisYear}
            </Text>
          </View>
        </View>
      </Page>

      {/* Page 2 */}
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.centeredContainer}>
          <View style={styles.borderedContainer}>
            <Text style={[styles.sectionTitle, { borderBottomWidth: 1 }]}>
              DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
            </Text>

            <View style={[styles.row, { borderBottomWidth: 0 }]}>
              <View style={[styles.col80, { flexDirection: "row" }]}>
                <View style={[styles.col20, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>Name of the Teacher: </Text>
                </View>
                <View style={styles.col60}>
                  <Text style={styles.boldText}>{tname}</Text>
                </View>
              </View>
              <View style={styles.col20}>
                <Text style={styles.boldText}>{pan}</Text>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { borderWidth: 1 }]}>
              Schedule - OS (Income from Other Sources)
            </Text>

            {renderTaxRow("a) Interest from Bank (SB)", BankInterest)}
            {renderTaxRow("b) Interest from Bank (FD)", 0, false, "NIL")}
            {renderTaxRow("c) Interest from NSC", 0, false, "NIL")}
            {renderTaxRow("d) Interest from Bond", 0, false, "NIL")}
            {renderTaxRow("e) Divident from Share", 0, false, "NIL")}
            {renderTaxRow("f) ", 0, false, "")}
            {renderTaxRow("g) ", 0, false, "")}
            {renderTaxRow("h) Family Pension:", 0, false, "NIL")}
            {renderTaxRow(
              'Income under any head other than the head "Salaries"',
              BankInterest
            )}

            <Text style={[styles.sectionTitle, { borderWidth: 1 }]}>
              Schedule- VIA : (Deductions under Chapter VIA)
            </Text>

            <Text
              style={[
                styles.boldText,
                { textAlign: "left", padding: 5, borderBottomWidth: 1 },
              ]}
            >
              A) U/S 80 C:
            </Text>

            {renderTaxRow(
              "a) Contribution of GPF",
              grossGPF,
              grossGPF !== 0,
              "NIL"
            )}
            {renderTaxRow(
              "b) Deposit in Sukanya Samriddhi Account",
              sukanya,
              sukanya !== 0,
              "NIL"
            )}
            {renderTaxRow("c) NSC / Others", nsc, nsc !== 0, "NIL")}
            {renderTaxRow("d) ULIP /ELSS", ulip, ulip !== 0, "NIL")}
            {renderTaxRow(
              "e) Repayment of Housing Loan (Principal)",
              hbLoanPrincipal,
              hbLoanPrincipal !== 0,
              "NIL"
            )}
            {renderTaxRow(
              "f) Interest on NSC (upto 5th Year)",
              nscInterest,
              nscInterest !== 0,
              "NIL"
            )}
            {renderTaxRow("g) PPF", ppf, ppf !== 0, "NIL")}
            {renderTaxRow("h) LIC Premium", lic, lic !== 0, "NIL")}
            {renderTaxRow("i) UC Premium", 0, false, "NIL")}
            {renderTaxRow("j) Tution Fees", tutionFee, tutionFee !== 0, "NIL")}
            {renderTaxRow("l) GSLI", grossGSLI, grossGSLI !== 0, "NIL")}

            <Text style={[styles.boldText, { textAlign: "left", padding: 5 }]}>
              B) U/S 80 CCC:
            </Text>

            {renderTaxRow(
              "a) Annuity Plan for UC Pension Fund & 80 CCC",
              0,
              false,
              "NIL"
            )}
            {renderTaxRow(
              "Total Deduction under A & B above (Limited to Rs. 1,50,000/-)",
              limitVIA,
              limitVIA !== 0,
              "NIL"
            )}

            <Text style={[styles.sectionTitle, { borderWidth: 1 }]}>
              Schedule - Other VIA
            </Text>

            {renderTaxRow(
              "A) U/S 80CCD (18) : New Pension Scheme (Limit upto Rs.50,000/-)",
              0,
              false,
              "NIL"
            )}
            {renderTaxRow(
              "B) U/S 80D: Premium on Med. Insurance (Mediclaim) Policy",
              mediclaim,
              mediclaim !== 0,
              "NIL"
            )}
            {renderTaxRow(
              "C) U/S 80DD: Maintenance & treatment of a dependent disabled",
              handicapTreatment,
              handicapTreatment !== 0,
              "NIL"
            )}
            {renderTaxRow(
              "D) U/S 80DDB : Medical treatment of dependent person with terminal Disease",
              terminalDisease,
              terminalDisease !== 0,
              "NIL"
            )}
            {renderTaxRow(
              "E) U/S 80E : Repayment of Interest of paid on Education Loan",
              educationLoan,
              educationLoan !== 0,
              "NIL"
            )}
            {renderTaxRow(
              "F) U/S 80U : Tax-payee with disability",
              disabilityDeduction,
              disabilityDeduction !== 0,
              "NIL"
            )}
            {renderTaxRow(
              "G) U/S 80TTA: Deduction in respect of interest on Deposits in savings accounts",
              BankInterest,
              BankInterest !== 0,
              "NIL"
            )}
            {renderTaxRow(
              "H) U/S 80G : Deduction in respect of Donation to certain fund, Charitable institutions",
              charity,
              charity !== 0,
              "NIL"
            )}
            {renderTaxRow("I)", 0, false, "")}
            {renderTaxRow(
              "Total Amount deductible under any other provision (s) of Chapter VI-A",
              OtherVIA,
              OtherVIA !== 0,
              "NIL"
            )}

            <Text style={[styles.sectionTitle, { borderWidth: 1 }]}>
              Income Tax Structure: F.Y. {`${prevYear} - ${thisYear}`}
            </Text>

            {renderTaxRow(
              "a) Income upto Rs. 2,50,000/- (Rs. 3,00,000/- for Senior Citizen: @Nil",
              0,
              false,
              "NIL"
            )}
            {renderTaxRow(
              "b) Income from Rs.2,50,001/- to Rs.5,00,000/-: @5%",
              TotalRoundOffIncome > 250000 && TotalRoundOffIncome <= 500000
                ? CalculatedIT
                : 12500,
              TotalRoundOffIncome > 250000 && TotalRoundOffIncome <= 500000,
              "NIL"
            )}
            {renderTaxRow(
              "c) Income from 5,00,001/- to Rs. 10,00,000/-: @20%",
              TotalRoundOffIncome > 500000 && TotalRoundOffIncome <= 1000000
                ? Math.round(((TotalRoundOffIncome - 500000) * 20) / 100)
                : 0,
              TotalRoundOffIncome > 500000 && TotalRoundOffIncome <= 1000000,
              "NIL"
            )}
            {renderTaxRow(
              "d) Income exceeding Rs. 10,00,000/-: @30%",
              TotalRoundOffIncome > 1000000
                ? Math.round(((TotalRoundOffIncome - 1000000) * 30) / 100)
                : 0,
              TotalRoundOffIncome > 1000000,
              "NIL"
            )}

            <View
              style={[
                styles.signatureBox,
                { alignSelf: "flex-end", marginRight: 30 },
              ]}
            >
              <Text style={styles.boldText}>Incumbent’s Signature</Text>
            </View>
          </View>
        </View>
      </Page>
      {/* Page 3 - Salary Details (Landscape) */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.centeredContainer}>
          <View style={styles.borderedContainer}>
            <Text style={[styles.sectionTitle, { borderBottomWidth: 1 }]}>
              DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
            </Text>

            <View style={[styles.row, { borderBottomWidth: 0 }]}>
              <View style={[styles.col80, { flexDirection: "row" }]}>
                <Text
                  style={[styles.text, { width: "30%", borderRightWidth: 1 }]}
                >
                  NAME: {tname}
                </Text>
                <Text style={[styles.boldText, { width: "70%" }]}>
                  PAN NO.: {pan}
                </Text>
              </View>
            </View>

            {/* Table Header */}
            <View style={[styles.row, { backgroundColor: "#f0f0f0" }]}>
              <View style={[styles.col10, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>{finYear}</Text>
              </View>
              <View style={[styles.col5, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>% D.A</Text>
              </View>
              <View style={[styles.col7, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>Basic Pay</Text>
              </View>
              <View style={[styles.col7, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>HT Allow</Text>
              </View>
              <View style={[styles.col7, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>D.A.</Text>
              </View>
              <View style={[styles.col7, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>H.R.A.</Text>
              </View>
              <View style={[styles.col7, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>M.A.</Text>
              </View>
              <View style={[styles.col7, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>Arrear</Text>
              </View>
              <View style={[styles.col7, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>Conveyance</Text>
              </View>
              <View style={[styles.col7, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>BONUS</Text>
              </View>
              <View style={[styles.col7, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>GROSS</Text>
              </View>
              <View style={[styles.col7, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>GPF</Text>
              </View>
              <View style={[styles.col7, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>GSLI</Text>
              </View>
              <View style={[styles.col5, { borderRightWidth: 1 }]}>
                <Text style={styles.boldText}>P.TAX</Text>
              </View>
              <View style={styles.col5}>
                <Text style={styles.boldText}>TDS</Text>
              </View>
            </View>

            {/* Month Rows */}
            {[
              {
                name: "MAR",
                year: prevYear,
                data: {
                  daPercent: marchSalary?.daPercent * 100,
                  basic: marchBasic,
                  addl: marchAddl,
                  da: marchDA,
                  hra: marchHRA,
                  ma: marchMA,
                  gross: marchGross,
                  gpf: marchGPF,
                  gsli: marchGSLI,
                  ptax: marchPTax,
                },
              },
              {
                name: "APR",
                year: prevYear,
                data: {
                  daPercent: aprilSalary?.daPercent * 100,
                  basic: aprilBasic,
                  addl: aprilAddl,
                  da: aprilDA,
                  hra: aprilHRA,
                  ma: aprilMA,
                  gross: aprilGross,
                  gpf: aprilGPF,
                  gsli: aprilGSLI,
                  ptax: aprilPTax,
                },
              },
              {
                name: "MAY",
                year: prevYear,
                data: {
                  daPercent: maySalary?.daPercent * 100,
                  basic: mayBasic,
                  addl: mayAddl,
                  da: mayDA,
                  hra: mayHRA,
                  ma: mayMA,
                  gross: mayGross,
                  gpf: mayGPF,
                  gsli: mayGSLI,
                  ptax: mayPTax,
                },
              },
              {
                name: "JUN",
                year: prevYear,
                data: {
                  daPercent: juneSalary?.daPercent * 100,
                  basic: juneBasic,
                  addl: juneAddl,
                  da: juneDA,
                  hra: juneHRA,
                  ma: juneMA,
                  gross: juneGross,
                  gpf: juneGPF,
                  gsli: juneGSLI,
                  ptax: junePTax,
                },
              },
              {
                name: "JUL",
                year: prevYear,
                data: {
                  daPercent: julySalary?.daPercent * 100,
                  basic: julyBasic,
                  addl: julyAddl,
                  da: julyDA,
                  hra: julyHRA,
                  ma: julyMA,
                  gross: julyGross,
                  gpf: julyGPF,
                  gsli: julyGSLI,
                  ptax: julyPTax,
                },
              },
              {
                name: "AUG",
                year: prevYear,
                data: {
                  daPercent: augustSalary?.daPercent * 100,
                  basic: augustBasic,
                  addl: augustAddl,
                  da: augustDA,
                  hra: augustHRA,
                  ma: augustMA,
                  gross: augustGross,
                  gpf: augustGPF,
                  gsli: augustGSLI,
                  ptax: augustPTax,
                },
              },
              {
                name: "SEP",
                year: prevYear,
                data: {
                  daPercent: septemberSalary?.daPercent * 100,
                  basic: septemberBasic,
                  addl: septemberAddl,
                  da: septemberDA,
                  hra: septemberHRA,
                  ma: septemberMA,
                  gross: septemberGross,
                  gpf: septemberGPF,
                  gsli: septemberGSLI,
                  ptax: septemberPTax,
                },
              },
              {
                name: "OCT",
                year: prevYear,
                data: {
                  daPercent: octoberSalary?.daPercent * 100,
                  basic: octoberBasic,
                  addl: octoberAddl,
                  da: octoberDA,
                  hra: octoberHRA,
                  ma: octoberMA,
                  gross: octoberGross,
                  gpf: octoberGPF,
                  gsli: octoberGSLI,
                  ptax: octoberPTax,
                },
              },
              {
                name: "NOV",
                year: prevYear,
                data: {
                  daPercent: novemberSalary?.daPercent * 100,
                  basic: novemberBasic,
                  addl: novemberAddl,
                  da: novemberDA,
                  hra: novemberHRA,
                  ma: novemberMA,
                  gross: novemberGross,
                  gpf: novemberGPF,
                  gsli: novemberGSLI,
                  ptax: novemberPTax,
                },
              },
              {
                name: "DEC",
                year: prevYear,
                data: {
                  daPercent: decemberSalary?.daPercent * 100,
                  basic: decemberBasic,
                  addl: decemberAddl,
                  da: decemberDA,
                  hra: decemberHRA,
                  ma: decemberMA,
                  gross: decemberGross,
                  gpf: decemberGPF,
                  gsli: decemberGSLI,
                  ptax: decemberPTax,
                },
              },
              {
                name: "JAN",
                year: thisYear,
                data: {
                  daPercent: januarySalary?.daPercent * 100,
                  basic: januaryBasic,
                  addl: januaryAddl,
                  da: januaryDA,
                  hra: januaryHRA,
                  ma: januaryMA,
                  gross: januaryGross,
                  gpf: januaryGPF,
                  gsli: januaryGSLI,
                  ptax: januaryPTax,
                },
              },
              {
                name: "FEB",
                year: thisYear,
                data: {
                  daPercent: februarySalary?.daPercent * 100,
                  basic: februaryBasic,
                  addl: februaryAddl,
                  da: februaryDA,
                  hra: februaryHRA,
                  ma: februaryMA,
                  gross: februaryGross,
                  gpf: februaryGPF,
                  gsli: februaryGSLI,
                  ptax: februaryPTax,
                },
              },
              {
                name: "TOTAL",
                year: "",
                data: {
                  daPercent: "",
                  basic: grossBasic,
                  addl: grossAddl,
                  da: grossDA,
                  hra: grossHRA,
                  ma: grossMA,
                  gross: GrossPAY,
                  gpf: grossGPF,
                  gsli: grossGSLI,
                  ptax: grossPTax,
                },
              },
            ].map((month, idx) => (
              <View key={idx} style={styles.row}>
                {/* Month/Year */}
                <View
                  style={[
                    styles.col10,
                    { flexDirection: "row", borderRightWidth: 1 },
                  ]}
                >
                  <View style={[styles.col50, { borderRightWidth: 1 }]}>
                    <Text style={styles.boldText}>{month.name}</Text>
                  </View>
                  <View style={styles.col50}>
                    <Text style={styles.text}>{month.year}</Text>
                  </View>
                </View>

                {/* Data Columns */}
                <View style={[styles.col5, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>
                    {month.data.daPercent
                      ? `${Math.round(month.data.daPercent)}%`
                      : ""}
                  </Text>
                </View>
                <View style={[styles.col7, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>{month.data.basic || ""}</Text>
                </View>
                <View style={[styles.col7, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>
                    {month.data.addl
                      ? month.data.addl
                      : month.name === "TOTAL"
                      ? "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.col7, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>{month.data.da || ""}</Text>
                </View>
                <View style={[styles.col7, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>{month.data.hra || ""}</Text>
                </View>
                <View style={[styles.col7, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>
                    {month.data.ma
                      ? month.data.ma
                      : month.name === "TOTAL"
                      ? "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.col7, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>
                    {month.name === "JUL" ? aprilIR : ""}
                  </Text>
                </View>
                <View style={[styles.col7, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>NIL</Text>
                </View>
                <View style={[styles.col7, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>
                    {month.name === "TOTAL" ? bonus || "NIL" : ""}
                  </Text>
                </View>
                <View style={[styles.col7, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>{month.data.gross || ""}</Text>
                </View>
                <View style={[styles.col7, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>
                    {month.data.gpf
                      ? month.data.gpf
                      : month.name === "TOTAL"
                      ? "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.col7, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>
                    {month.data.gsli
                      ? month.data.gsli
                      : month.name === "TOTAL"
                      ? "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.col5, { borderRightWidth: 1 }]}>
                  <Text style={styles.text}>{month.data.ptax || ""}</Text>
                </View>
                <View style={styles.col5}>
                  <Text style={styles.text}>NIL</Text>
                </View>
              </View>
            ))}

            {/* Signature */}
            <View style={{ marginTop: 20, alignItems: "flex-end" }}>
              <Text style={styles.text}>SIGNATURE OF THE INCUMBENT</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default IncomeTaxDownload;
