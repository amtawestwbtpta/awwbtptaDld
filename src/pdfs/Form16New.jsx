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

export default function Form16New({ data }) {
  const {
    tname,
    school,
    pan,
    desig,
    thisYear,
    nextYear,
    finYear,
    grossPTax,
    AllGross,
    BankInterest,
  } = data;

  return (
    <Document title={`Form 16 of ${tname} of ${school}`}>
      {/* Page 1 */}
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.pageContainer}>
          <View style={styles.mainBorderView}>
            <View style={styles.headerSection}>
              <Text style={styles.titleMain}>
                ORIGINAL / DUPLICATE / TRIPLICATE
              </Text>
              <Text style={styles.title}>FORM NO. 16 (PART - B)</Text>
              <Text style={styles.titleMain}>SEE RULE 31(1)</Text>
              <Text style={styles.titleMain}>
                "Certificate under section 203 of the Income-tax Act, 1961
                {"\n"}
                For tax deducted at source from income chargeable under the head
                “Salaries”
              </Text>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.halfWidth}>
                <Text style={styles.textBold}>
                  Name and Designation of the Employer
                </Text>
              </View>
              <View style={styles.halfWidth}>
                <Text style={styles.textBold}>
                  Name and designation of the Employee
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.halfWidth}>
                <Text style={styles.textBold}>CHAIRMAN, DPSC, HOWRAH</Text>
                <Text style={styles.textBold}>18, N.D. MUKHERJEE ROAD</Text>
                <Text style={styles.textBold}>HOWRAH- 1</Text>
              </View>
              <View style={styles.halfWidth}>
                <Text style={styles.textBold}>{desig}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.thirdWidth}>
                <Text style={styles.textBold}>PAN / GIR NO.</Text>
              </View>
              <View style={styles.thirdWidth}>
                <Text style={styles.textBold}>TAN</Text>
              </View>
              <View style={styles.thirdWidth}>
                <Text style={styles.textBold}>PAN / GIR NO.</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.thirdWidth}>
                <Text style={styles.textBold}> </Text>
              </View>
              <View style={styles.thirdWidth}>
                <Text style={styles.textBold}>CALD02032C</Text>
              </View>
              <View style={styles.thirdWidth}>
                <Text style={styles.textBold}>{pan}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.thirdWidth}>
                <Text style={styles.textBold}>
                  TDS Circle where Annual Return / Statement Under Section 206
                  is to be filled
                </Text>
              </View>
              <View style={styles.thirdWidth}>
                <Text style={styles.textBold}>PERIOD RETURN</Text>
                <View style={styles.dateRange}>
                  <View style={styles.dateHalf}>
                    <Text style={styles.textBold}>FROM</Text>
                    <Text style={styles.textBold}>{thisYear}</Text>
                  </View>
                  <View style={styles.dateHalf}>
                    <Text style={styles.textBold}>TO</Text>
                    <Text style={styles.textBold}>{nextYear}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.thirdWidth}>
                <Text style={styles.textBold}>ASSESSMENT YEAR</Text>
                <Text style={styles.textBold}>{finYear}</Text>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.titleMain}>
                DETAILS OF SALARY PAID AND ANY OTHER INCOME AND TAX DEDUCTED
              </Text>
            </View>

            {/* Income Details Section */}
            <IncomeDetails
              AllGross={AllGross}
              grossPTax={grossPTax}
              BankInterest={BankInterest}
            />
          </View>
        </View>
      </Page>

      {/* Page 2 */}
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.pageContainer}>
          <View style={styles.mainBorderView}>
            <View style={styles.sectionHeader}>
              <Text style={styles.titleMain}>
                PART- B :: FIXATION (to be filled in by Circle end)
              </Text>
            </View>

            {/* Deduction Details Section */}
            <DeductionDetails
              data={data}
              AllGross={AllGross}
              teacherYear={teacherYear}
              currentYear={currentYear}
            />

            {/* Signature Section */}
            <View style={styles.signatureSection}>
              <View style={styles.signatureLeft}>
                <Text style={styles.signatureLine}>
                  Date…................................................
                </Text>
                <Text style={styles.signatureLine}>
                  Designation…................................................
                </Text>
              </View>
              <View style={styles.signatureRight}>
                <Text style={styles.signatureLabel}>
                  Signature of the person responsible for deduction of tax
                </Text>
                <Text style={styles.signatureLine}>
                  Place…...................................................
                </Text>
                <Text style={styles.signatureLabel}>
                  Full
                  Name.......................................................................
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// Sub-components for better organization
const IncomeDetails = ({ AllGross, grossPTax, BankInterest }) => (
  <>
    <TableRow>
      <TextCell width="40%">1. GROSS SALARY</TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%">Rs. {IndianFormat(AllGross)}</TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">
        (a) Salary as per provisions contained in Section 17(1)
      </TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">(b) Value of perquisites u/s 17(2)</TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">
        (c) Profits in lieu of salary under section 17(3)
      </TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">(d) Total</TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%">Rs. {IndianFormat(AllGross)}</TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">
        (2) LESS : Allowance to the extent exempt under Section 10
      </TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">(3) BALANCE (1 – 2)</TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%">Rs. {IndianFormat(AllGross)}</TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">(4) DEDUCTIONS</TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">a) Standard Deduction</TextCell>
      <TextCell width="20%">Rs. {IndianFormat(50000)}</TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">b) Tax on Employment</TextCell>
      <TextCell width="20%">Rs. {IndianFormat(grossPTax)}</TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">5) AGGREGATE OF 4 (a) to 4 (b)</TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%">Rs. {IndianFormat(50000 + grossPTax)}</TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">
        6) TAXABLE INCOME UNDER THE HEAD SALARIES (3-5)
      </TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%">
        Rs. {IndianFormat(AllGross - 50000 + grossPTax)}
      </TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">
        7) Add : Any other income reported by the employee
      </TextCell>
      <TextCell width="20%">Rs. {IndianFormat(BankInterest)}</TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">a) GROSS INCOME (Total above 7)</TextCell>
      <TextCell width="20%">
        Rs. {IndianFormat(AllGross - 50000 + grossPTax + BankInterest)}
      </TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">b) LESS: Deduction under Section 57</TextCell>
      <TextCell width="20%">NIL</TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">
        8) TAXABLE INCOME FROM OTHER SOURCES [7(A)-7(B)]
      </TextCell>
      <TextCell width="20%">
        Rs. {IndianFormat(AllGross - 50000 + grossPTax + BankInterest)}
      </TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">
        9) LESS: Interest paid on dwelling house Under Section 24
      </TextCell>
      <TextCell width="20%">NIL</TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
    </TableRow>

    <TableRow>
      <TextCell width="40%">10) GROSS TOTAL INCOME (6+8-9)</TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%"></TextCell>
      <TextCell width="20%">
        Rs. {IndianFormat(AllGross - 50000 + grossPTax + BankInterest)}
      </TextCell>
    </TableRow>
  </>
);

const DeductionDetails = ({ data }) => {
  const {
    grossGPF,
    grossGSLI,
    lic,
    nsc,
    ppf,
    mediclaim,
    disabilityDeduction,
    BankInterest,
    limitVIA,
    TotalIncome,
    TotalRoundOffIncome,
    CalculatedIT,
    isUnderRebate,
    eduCess,
    AddedEduCess,
    tds,
  } = data;

  return (
    <>
      <TableRow>
        <TextCell width="40%">
          11) DEDUCTION UNDER CHAPTER VI A (80C TO 80U)
        </TextCell>
        <TextCell width="20%">GROSS AMOUNT</TextCell>
        <TextCell width="20%">QUALIFYING AMOUNT</TextCell>
        <TextCell width="20%">DEDUCTION AMOUNT</TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">G.P.F. SUBSCRIPTION</TextCell>
        <TextCell width="20%">Rs. {IndianFormat(grossGPF)}</TextCell>
        <TextCell width="20%">Rs. {IndianFormat(grossGPF)}</TextCell>
        <TextCell width="20%">Rs. {IndianFormat(grossGPF)}</TextCell>
      </TableRow>

      {grossGSLI > 0 && (
        <TableRow>
          <TextCell width="40%">G.S.L.I. Subscription</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(grossGSLI)}</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(grossGSLI)}</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(grossGSLI)}</TextCell>
        </TableRow>
      )}

      {lic > 0 && (
        <TableRow>
          <TextCell width="40%">L.I.C. / PLI Premium</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(lic)}</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(lic)}</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(lic)}</TextCell>
        </TableRow>
      )}

      {nsc > 0 && (
        <TableRow>
          <TextCell width="40%">NSC / KVP Purchase</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(nsc)}</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(nsc)}</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(nsc)}</TextCell>
        </TableRow>
      )}

      {ppf > 0 && (
        <TableRow>
          <TextCell width="40%">P.P.F.</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(ppf)}</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(ppf)}</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(ppf)}</TextCell>
        </TableRow>
      )}

      {mediclaim > 0 && (
        <TableRow>
          <TextCell width="40%">80 D Medical Insurance Premium</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(mediclaim)}</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(mediclaim)}</TextCell>
          <TextCell width="20%">Rs. {IndianFormat(mediclaim)}</TextCell>
        </TableRow>
      )}

      {disabilityDeduction > 0 && (
        <TableRow>
          <TextCell width="40%">80U Person with Disability</TextCell>
          <TextCell width="20%">
            Rs. {IndianFormat(disabilityDeduction)}
          </TextCell>
          <TextCell width="20%">
            Rs. {IndianFormat(disabilityDeduction)}
          </TextCell>
          <TextCell width="20%">
            Rs. {IndianFormat(disabilityDeduction)}
          </TextCell>
        </TableRow>
      )}

      <TableRow>
        <TextCell width="40%">
          80 TTA Exemption of Savings Bank Interest (Maximum Rs. 10000/-)
        </TextCell>
        <TextCell width="20%">Rs. {IndianFormat(BankInterest)}</TextCell>
        <TextCell width="20%">Rs. {IndianFormat(BankInterest)}</TextCell>
        <TextCell width="20%">Rs. {IndianFormat(BankInterest)}</TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">
          12) AGGREATE OF DEDUCTABLE AMOUNT UNDER CHAPTER V1A
        </TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%">
          Rs.{" "}
          {IndianFormat(
            limitVIA + disabilityDeduction + BankInterest + mediclaim
          )}
        </TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">13) TOTAL OR NET TAXABLE INCOME (10-12)</TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%">Rs. {IndianFormat(TotalIncome)}</TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">14) ROUNDED OFF</TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%">Rs. {IndianFormat(TotalRoundOffIncome)}</TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">15) TAX ON TOTAL OR NET INCOME</TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%">Rs. {IndianFormat(CalculatedIT)}</TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">16) LESS: REBATE U/S. 87A</TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%">
          {isUnderRebate ? `Rs. ${IndianFormat(CalculatedIT)}` : `NIL`}
        </TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">17) TAX ON SURCHARGE</TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%">NIL</TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">
          18) ADD: EDUCATION CESS (4% OF TAX AND SURCHARGE)
        </TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%">
          {!isUnderRebate ? `Rs. ${IndianFormat(eduCess)}` : `N/A`}
        </TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">19) TOTAL TAX PAYABLE (17+18)</TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%">
          {!isUnderRebate ? `Rs. ${IndianFormat(AddedEduCess)}` : `NIL`}
        </TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">
          20) LESS: REBATE U/S. 89 (Attach Details)
        </TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%">N/A</TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">21) NET TAX PAYABLE (19-20)</TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%">
          {!isUnderRebate ? `Rs. ${IndianFormat(AddedEduCess)}` : `NIL`}
        </TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">22) LESS: TAX DEDUCTED AT SOURCE</TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%">
          {tds > 0 ? `Rs. ${IndianFormat(tds)}` : `NIL`}
        </TextCell>
      </TableRow>

      <TableRow>
        <TextCell width="40%">23) TAX PAYABLE / REFUNDABLE (21-22)</TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%"></TextCell>
        <TextCell width="20%">
          {!isUnderRebate ? `Rs. ${IndianFormat(AddedEduCess)}` : `NIL`}
        </TextCell>
      </TableRow>

      <View style={styles.sectionHeader}>
        <Text style={styles.titleMain}>
          DETAILS OF TAX DEDUCTED AND DEPOSITED INTO CENTRAL GOVERNMENT ACCOUNT
        </Text>
      </View>

      <TableRow>
        <TextCell width="20%">Amount</TextCell>
        <TextCell width="30%">Date of Payment</TextCell>
        <TextCell width="50%">
          Name of the bank and Branch where Tax Deposited
        </TextCell>
      </TableRow>

      <View style={styles.emptyRow}></View>

      <View style={styles.declaration}>
        <DeclarationSection data={data} />
      </View>
    </>
  );
};

const DeclarationSection = ({ data }) => {
  const { tname, gender, fname, desig, CalculatedIT, isUnderRebate } = data;

  return (
    <>
      <Text style={styles.text}>I </Text>
      <Text style={styles.dottedUnderline}>{titleCase(tname)}</Text>
      {gender === "male" ? (
        <Text style={styles.text}>
          {" "}
          son <Text style={styles.strikethrough}>/daughter</Text> of{" "}
        </Text>
      ) : (
        <Text style={styles.text}>
          {" "}
          <Text style={styles.strikethrough}>son/</Text> daughter of{" "}
        </Text>
      )}
      <Text style={styles.dottedUnderline}>{titleCase(fname)}</Text>
      <Text style={styles.text}> working in the capacity of </Text>
      <Text style={styles.dottedUnderline}>{desig}</Text>
      <Text style={styles.text}>
        {" "}
        , (designation) do hereby certify that a sum of{"  "}
      </Text>
      <Text style={styles.dottedUnderline}>
        Rs. {isUnderRebate ? 0 : IndianFormat(CalculatedIT)}
      </Text>
      <Text style={styles.dottedUnderline}>
        {isUnderRebate
          ? "[Rupees Zero Only (in words)]"
          : "[ " + INR(CalculatedIT) + " Only (in words)]"}
      </Text>
      <Text style={styles.text}>
        {" "}
        has been deducted at source and paid to the credit of the Central
        Government. I further certify that the information given above is true
        and correct based on the books of account documents and other available
        records.
      </Text>
    </>
  );
};

const TableRow = ({ children }) => (
  <View style={styles.tableRow}>{children}</View>
);

const TextCell = ({ width, children }) => (
  <View style={[styles.tableCell, { width }]}>
    <Text style={styles.textBold}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  page: {
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    width: width,
    height: height,
  },
  pageContainer: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  pageMainView: {
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  mainBorderView: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    width: "100%",
  },
  headerSection: {
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
    marginVertical: 3,
  },
  textBold: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
    padding: 1,
  },
  titleMain: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
    marginVertical: 3,
  },
  text: {
    fontSize: 11,
    fontFamily: "Times",
    textAlign: "justify",
  },
  sectionHeader: {
    padding: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    minHeight: 20,
  },
  tableCell: {
    padding: 2,
    justifyContent: "center",
  },
  halfWidth: {
    width: "50%",
    padding: 5,
  },
  thirdWidth: {
    width: "33.33%",
    padding: 5,
    justifyContent: "center",
  },
  dateRange: {
    flexDirection: "row",
    width: "100%",
  },
  dateHalf: {
    width: "50%",
    alignItems: "center",
  },
  dottedUnderline: {
    textDecoration: "underline",
    textDecorationStyle: "dotted",
    fontSize: 11,
    fontFamily: "Times",
  },
  strikethrough: {
    textDecoration: "line-through",
    fontSize: 11,
    fontFamily: "Times",
  },
  emptyRow: {
    height: 80,
    borderBottomWidth: 1,
  },
  declaration: {
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "justify",
  },
  signatureSection: {
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
  },
  signatureLine: {
    fontSize: 11,
    fontFamily: "Times",
    paddingVertical: 2,
  },
  signatureLabel: {
    fontSize: 11,
    fontFamily: "Times",
    textAlign: "right",
  },
});

Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});

Font.register({
  family: "TimesBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
