import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { IndianFormat, roundSo } from "../modules/calculatefunctions";

const BORDER_WIDTH = 1;

const RowItem = ({ label, value, index, showNil, isTotal }) => (
  <View style={styles.rowItem}>
    <View style={styles.subIndex}>
      <Text>{isTotal ? "" : String.fromCharCode(97 + index) + ")"}</Text>
    </View>
    <View style={styles.label}>
      <Text style={styles.leftAlign}>{label}</Text>
    </View>
    <View style={styles.value}>
      <Text>
        {value > 0 ? `Rs. ${IndianFormat(value)}` : showNil ? "NIL" : ""}
      </Text>
    </View>
  </View>
);

const SalaryHeadSection = ({ TotalGross, GrossArrear, bonus, AllGross }) => (
  <>
    <View style={styles.sectionHeader}>
      <Text>INCOME FROM THE SALARY HEAD</Text>
    </View>
    <View style={styles.rowContainer}>
      <View style={styles.indexColumn}>
        <Text>1</Text>
      </View>
      <View style={styles.contentColumn}>
        {[
          {
            label: `Gross Pay & Allowances from March to February`,
            value: TotalGross,
          },
          {
            label: `Arrear Salary during Financial Year`,
            value: GrossArrear,
            showNil: true,
          },
          { label: "Bonus received", value: bonus, showNil: true },
          { label: "Honorarium/Fees/Commission", value: 0, showNil: true },
          { label: "Total Income (a + b + c + d)", value: AllGross },
          { label: "Less: any overdrawal", value: 0, showNil: true },
          {
            label: "TOTAL INCOME FROM SALARY HEAD (e - f)",
            value: AllGross,
            isTotal: true,
          },
        ].map((item, idx) => (
          <RowItem key={idx} {...item} index={idx} />
        ))}
      </View>
      <View style={styles.valueColumn}>
        <Text>Rs. {IndianFormat(AllGross)}</Text>
      </View>
    </View>
  </>
);

const OtherIncomeSection = ({ BankInterest, nscInterest }) => (
  <>
    <View style={styles.sectionHeader}>
      <Text>INCOME FROM OTHER SOURCES</Text>
    </View>
    <View style={styles.rowContainer}>
      <View style={styles.indexColumn}>
        <Text>2</Text>
      </View>
      <View style={styles.contentColumn}>
        {[
          { label: "Pension received", value: 0, showNil: true },
          { label: "Interest on NSC", value: nscInterest, showNil: true },
          { label: "Interest of KVP/MIS", value: 0, showNil: true },
          { label: "Bank's Interest (Savings)", value: BankInterest },
          { label: "Bank's Interest (Non-Savings)", value: 0, showNil: true },
          { label: "Medical Reimbursement", value: 0, showNil: true },
          { label: "Transport Allowances", value: 0, showNil: true },
          { label: "Others", value: 0, showNil: true },
          {
            label: "TOTAL INCOME FROM OTHER SOURCES",
            value: BankInterest,
            isTotal: true,
          },
        ].map((item, idx) => (
          <RowItem key={idx} {...item} index={idx} />
        ))}
      </View>
      <View style={styles.valueColumn}>
        <Text>Rs. {IndianFormat(BankInterest)}</Text>
      </View>
    </View>
  </>
);

const HRAExemptionSection = () => (
  <>
    <View style={styles.sectionHeader}>
      <Text>LESS:- HOUSE RENT EXEMPTION U/S 10 (13A) OF I.T. ACT, 1961</Text>
    </View>
    <View style={styles.rowContainer}>
      <View style={styles.indexColumn}>
        <Text>4</Text>
      </View>
      <View style={styles.contentColumn}>
        <View style={styles.rowItem}>
          <Text style={styles.leftAlign}>H. R. A. Received from Employer</Text>
        </View>
        <RowItem label="Actual House Rent Allowance" value={0} index={0} />
        <RowItem
          label="40% of Salary (For Non Metro City)"
          value={0}
          index={1}
        />
        <RowItem label="Rent Paid over 10% of salary" value={0} index={2} />
        <View style={styles.rowItem}>
          <Text style={styles.leftAlign}>
            Less: Lower of the above exempted U/S.10 (13A)
          </Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.leftAlign}>
            House Rent Allowance Exempted / Taxable House Rent Allowance
          </Text>
        </View>
      </View>
      <View style={styles.valueColumn}>
        <Text>NOT APPLICABLE</Text>
      </View>
    </View>
  </>
);

const DeductionSection = ({ title, index, items }) => (
  <>
    <View style={styles.sectionHeader}>
      <Text>{title}</Text>
    </View>
    <View style={styles.rowContainer}>
      <View style={styles.indexColumn}>
        <Text>{index}</Text>
      </View>
      <View style={styles.contentColumn}>
        {items.map((item, idx) => (
          <RowItem key={idx} {...item} index={idx} />
        ))}
      </View>
      <View style={styles.valueColumn}>
        <Text>
          Rs. {IndianFormat(items.reduce((sum, item) => sum + item.value, 0))}
        </Text>
      </View>
    </View>
  </>
);

const TaxCalculationSection = ({
  CalculatedIT,
  isUnderRebate,
  eduCess,
  AddedEduCess,
  TotalRoundOffIncome,
}) => (
  <>
    <View style={styles.sectionHeader}>
      <Text>Calculation of Tax</Text>
    </View>
    <View style={styles.taxTable}>
      <View style={styles.taxHeader}>
        <Text>Sl. No.</Text>
        <Text>Male/Female below 50 Years</Text>
        <Text>Amount</Text>
      </View>

      {[
        { slab: "Up to Rs. 2,50,000 = Nil", value: "NIL" },
        {
          slab: "Rs. 2,50,001 - 5,00,000 = 5%",
          value:
            TotalRoundOffIncome > 250000
              ? TotalRoundOffIncome > 500000
                ? 12500
                : Math.round((TotalRoundOffIncome - 250000) * 0.05)
              : 0,
        },
        {
          slab: "Rs. 5,00,001 - 10,00,000 = 20%",
          value:
            TotalRoundOffIncome > 500000
              ? Math.round(
                  (Math.min(TotalRoundOffIncome, 1000000) - 500000) * 0.2
                )
              : 0,
        },
        {
          slab: "Rs. 10,00,001 and above = 30%",
          value:
            TotalRoundOffIncome > 1000000
              ? Math.round((TotalRoundOffIncome - 1000000) * 0.3)
              : 0,
        },
      ].map((row, idx) => (
        <View key={idx} style={styles.taxRow}>
          <Text>{idx + 1}</Text>
          <Text>{row.slab}</Text>
          <Text>{row.value ? `Rs. ${IndianFormat(row.value)}` : "NIL"}</Text>
        </View>
      ))}
    </View>

    <View style={styles.summaryRow}>
      <Text>22</Text>
      <Text>Tax on Total Income</Text>
      <Text>Rs. {IndianFormat(CalculatedIT)}</Text>
    </View>

    <View style={styles.summaryRow}>
      <Text>23</Text>
      <Text>
        Less: Deduction U/S 87A (Maximum Rs. 12500 for taxable income up to Rs.
        500000)
      </Text>
      <Text>{isUnderRebate ? `Rs. ${IndianFormat(CalculatedIT)}` : "NIL"}</Text>
    </View>

    <View style={styles.summaryRow}>
      <Text>24</Text>
      <Text>Tax payable (22 - 23)</Text>
      <Text>
        {!isUnderRebate ? `Rs. ${IndianFormat(CalculatedIT)}` : "NIL"}
      </Text>
    </View>

    <View style={styles.summaryRow}>
      <Text>25</Text>
      <Text>Add Education Cess + Health Cess @ 4% on Column 24</Text>
      <Text>{!isUnderRebate ? `Rs. ${IndianFormat(eduCess)}` : "N/A"}</Text>
    </View>

    <View style={styles.summaryRow}>
      <Text>26</Text>
      <Text>Add surcharge (for taxable income over Rs. 10000000)</Text>
      <Text>N/A</Text>
    </View>

    <View style={styles.summaryRow}>
      <Text>27</Text>
      <Text>Tax Payable (24 + 25 + 26)</Text>
      <Text>
        {!isUnderRebate ? `Rs. ${IndianFormat(AddedEduCess)}` : "NIL"}
      </Text>
    </View>

    <View style={styles.summaryRow}>
      <Text>28</Text>
      <Text>Tax Payable Rounded off U/S 288B</Text>
      <Text>
        {!isUnderRebate
          ? `Rs. ${IndianFormat(roundSo(AddedEduCess, 10))}`
          : "NIL"}
      </Text>
    </View>
  </>
);

const SignatureSection = ({ thisYear }) => (
  <View style={styles.signatureContainer}>
    <View style={styles.dateRow}>
      <Text>Date:-</Text>
    </View>

    <View style={styles.signatureRow}>
      <View style={styles.signatureBox}>
        <Text>Signature of the Employee</Text>
        <Text>Designation:-</Text>
        <Text>Section:-</Text>
      </View>

      <View style={styles.signatureBox}>
        <Text>Signature of the DDO</Text>
        <Text>LAST DATE OF SUBMISSION:- 13/01/{thisYear}</Text>
      </View>
    </View>

    <View style={styles.verificationBox}>
      <Text>Verified</Text>
      <Text>SUB INSPECTOR OF SCHOOLS</Text>
    </View>
  </View>
);

const SalaryDetailsPage = ({
  months,
  grossBasic,
  grossAddl,
  grossDA,
  grossHRA,
  grossMA,
  GrossPAY,
  grossGPF,
  grossGSLI,
  grossPTax,
  grossNetpay,
  bonus,
}) => (
  <Page size="A4" orientation="landscape" style={styles.page}>
    <View style={styles.landscapeContainer}>
      <View style={styles.landscapeMainBorder}>
        <View style={styles.tableStartBorderView}>
          <Text style={styles.titleMain}>
            DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
          </Text>
        </View>

        <View style={styles.employeeDetails}>
          <View style={styles.employeeDetailColumn}>
            <Text>NAME OF THE EMPLOYEE</Text>
            <Text>{months[0]?.tname || ""}</Text>
          </View>
          <View style={styles.employeeDetailColumn}>
            <Text>NAME OF THE SCHOOL</Text>
            <Text>{months[0]?.school || ""}</Text>
          </View>
          <View style={styles.employeeDetailColumn}>
            <Text>DESIGNATION</Text>
            <Text>{months[0]?.desig || ""}</Text>
          </View>
          <View style={styles.employeeDetailColumn}>
            <Text>PAN NO.</Text>
            <Text>{months[0]?.pan || ""}</Text>
          </View>
        </View>

        <View style={styles.salaryHeader}>
          <View style={styles.headerColumn}>
            <Text>MONTH</Text>
          </View>
          <View style={styles.headerColumn}>
            <Text>PAY & ALLOWANCES</Text>
            <View style={styles.subHeader}>
              <Text>% D.A</Text>
              <Text>Basic Pay</Text>
              <Text>HT Allowance</Text>
              <Text>D.A.</Text>
              <Text>H.R.A.</Text>
              <Text>M.A.</Text>
              <Text>Conveyance Allowance</Text>
              <Text>BONUS</Text>
            </View>
          </View>
          <View style={styles.headerColumn}>
            <Text>GROSS</Text>
          </View>
          <View style={styles.headerColumn}>
            <Text>DEDUCTION</Text>
            <View style={styles.subHeader}>
              <Text>GPF</Text>
              <Text>GSLI</Text>
              <Text>P.TAX</Text>
              <Text>I.TAX</Text>
            </View>
          </View>
          <View style={styles.headerColumn}>
            <Text>NET</Text>
          </View>
        </View>

        {months.map((month, index) => (
          <View key={index} style={styles.salaryRow}>
            <View style={styles.monthCell}>
              <Text>{month.name.substring(0, 3).toUpperCase()}</Text>
              <Text>{month.year}</Text>
            </View>

            <View style={styles.payAllowances}>
              <Text>
                {month.daPercent ? `${Math.round(month.daPercent * 100)}%` : ""}
              </Text>
              <Text>{month.basic || ""}</Text>
              <Text>{month.addl || "NIL"}</Text>
              <Text>{month.da || ""}</Text>
              <Text>{month.hra || ""}</Text>
              <Text>{month.ma || "NIL"}</Text>
              <Text></Text>
              <Text></Text>
            </View>

            <View style={styles.grossCell}>
              <Text>{month.gross || ""}</Text>
            </View>

            <View style={styles.deductionCell}>
              <Text>{month.gpf || "NIL"}</Text>
              <Text>{month.gsli || "NIL"}</Text>
              <Text>{month.ptax || "NIL"}</Text>
              <Text>NIL</Text>
            </View>

            <View style={styles.netCell}>
              <Text>{month.netpay || ""}</Text>
            </View>
          </View>
        ))}

        <View style={styles.totalRow}>
          <View style={styles.monthCell}>
            <Text>TOTAL</Text>
          </View>

          <View style={styles.payAllowances}>
            <Text></Text>
            <Text>{grossBasic || ""}</Text>
            <Text>{grossAddl || "NIL"}</Text>
            <Text>{grossDA || ""}</Text>
            <Text>{grossHRA || ""}</Text>
            <Text>{grossMA || "NIL"}</Text>
            <Text>NIL</Text>
            <Text>{bonus || "NIL"}</Text>
          </View>

          <View style={styles.grossCell}>
            <Text>{GrossPAY || ""}</Text>
          </View>

          <View style={styles.deductionCell}>
            <Text>{grossGPF || "NIL"}</Text>
            <Text>{grossGSLI || "NIL"}</Text>
            <Text>{grossPTax || "NIL"}</Text>
            <Text></Text>
          </View>

          <View style={styles.netCell}>
            <Text>{grossNetpay || ""}</Text>
          </View>
        </View>

        <View style={styles.signatureFooter}>
          <View style={styles.verificationBox}>
            <Text>Verified and Counter Signature</Text>
            <Text>SUB INSPECTOR OF SCHOOLS</Text>
          </View>
          <View style={styles.employeeSignature}>
            <Text>SIGNATURE OF THE INCUMBENT</Text>
          </View>
        </View>
      </View>
    </View>
  </Page>
);

export default function IncomeTaxOld2025({ data }) {
  const {
    tname,
    school,
    pan,
    desig,
    thisYear,
    nextYear,
    prevYear,
    finYear,
    TotalGross,
    GrossArrear,
    bonus,
    AllGross,
    BankInterest,
    grossPTax,
    hbLoanInterest,
    limitVIA,
    OtherVIA,
    TotalIncome,
    TotalRoundOffIncome,
    CalculatedIT,
    isUnderRebate,
    eduCess,
    AddedEduCess,
    grossGPF,
    grossGSLI,
    lic,
    ulip,
    ppf,
    nsc,
    nscInterest,
    tutionFee,
    stampDuty,
    mediclaim,
    terminalDisease,
    handicapTreatment,
    educationLoan,
    charity,
    disabilityDeduction,
    rgSaving,
    grossBasic,
    grossAddl,
    grossDA,
    grossHRA,
    grossMA,
    GrossPAY,
    grossNetpay,
    marchSalary,
    aprilSalary,
    maySalary,
    juneSalary,
    julySalary,
    augustSalary,
    septemberSalary,
    octoberSalary,
    novemberSalary,
    decemberSalary,
    januarySalary,
    februarySalary,
  } = data;

  const section80CItems = [
    { label: "G. P. F. Subscription", value: grossGPF },
    { label: "G. S. L. I. Subscription", value: grossGSLI, showNil: true },
    {
      label: "Recovery of Principal Amount of House Building Loan",
      value: hbLoanInterest,
      showNil: true,
    },
    { label: "L. I. C. / PLI Premium", value: lic, showNil: true },
    { label: "Contribution in ULIP", value: ulip, showNil: true },
    { label: "Savings under CTD Rule 1959 / P P F", value: ppf, showNil: true },
    { label: "NSC / KVP purchase", value: nsc, showNil: true },
    {
      label: "Interest on NSC deemed reinvested",
      value: nscInterest,
      showNil: true,
    },
    {
      label: "Tution Fees Maximum Rs. 1,00,000/- (for two children)",
      value: tutionFee,
      showNil: true,
    },
    { label: "Stamp Duty / Registration Fee", value: stampDuty, showNil: true },
  ];

  const otherDeductionItems = [
    {
      label: "80 D Medical Insurance Premium",
      value: mediclaim,
      showNil: true,
    },
    {
      label: "80 DD Medical Treatment of Handicapped",
      value: handicapTreatment,
      showNil: true,
    },
    {
      label: "80DDB Deduction of Medical Treatment",
      value: terminalDisease,
      showNil: true,
    },
    {
      label: "80E Repayment of Loan of Higher Education",
      value: educationLoan,
      showNil: true,
    },
    {
      label: "80G Donation of Charitable Institution",
      value: charity,
      showNil: true,
    },
    {
      label: "80U Person with Disability",
      value: disabilityDeduction,
      showNil: true,
    },
    {
      label: "80CCG Rajiv Gandhi Equity Savings Scheme",
      value: rgSaving,
      showNil: true,
    },
    {
      label: "80 TTA Exemption of Savings Bank Interest (Maximum Rs. 10000/-)",
      value: Math.min(BankInterest, 10000),
    },
  ];

  const months = [
    { name: "March", year: prevYear - 2000, ...marchSalary },
    { name: "April", year: prevYear, ...aprilSalary },
    { name: "May", year: prevYear, ...maySalary },
    { name: "June", year: prevYear, ...juneSalary },
    { name: "July", year: prevYear, ...julySalary },
    { name: "August", year: prevYear, ...augustSalary },
    { name: "September", year: prevYear, ...septemberSalary },
    { name: "October", year: prevYear, ...octoberSalary },
    { name: "November", year: prevYear, ...novemberSalary },
    { name: "December", year: prevYear, ...decemberSalary },
    { name: "January", year: thisYear, ...januarySalary },
    { name: "February", year: thisYear, ...februarySalary },
  ];

  return (
    <Document
      title={`IT Statement of ${tname} of ${school} OLD 2025`}
      style={styles.document}
    >
      {/* Page 1 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.mainBorder}>
            <Text style={styles.mainTitle}>
              STATEMENT OF INCOME TAX (OLD TAX REGIME)
            </Text>

            <View style={styles.infoBox}>
              <Text>
                FINANCIAL YEAR {finYear} (RELEVANT TO ASSESSMENT YEAR{" "}
                {`${thisYear}-${nextYear}`})
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text>Howrah District Primary School Council</Text>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text>NAME:-</Text>
              </View>
              <View style={styles.detailItem}>
                <Text>{tname}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text>DESIGNATION:-</Text>
              </View>
              <View style={styles.detailItem}>
                <Text>{desig}</Text>
              </View>
            </View>

            <View style={styles.panRow}>
              <Text>PAN NO:- {pan}</Text>
            </View>

            <View style={styles.schoolRow}>
              <Text>NAME OF SCHOOL:- {school}</Text>
            </View>

            <SalaryHeadSection
              TotalGross={TotalGross}
              GrossArrear={GrossArrear}
              bonus={bonus}
              AllGross={AllGross}
            />

            <OtherIncomeSection
              BankInterest={BankInterest}
              nscInterest={nscInterest}
            />

            <View style={styles.summaryRow}>
              <Text>3</Text>
              <Text>GROSS INCOME</Text>
              <Text>Rs. {IndianFormat(AllGross + BankInterest)}</Text>
            </View>

            <HRAExemptionSection />

            <View style={styles.summaryRow}>
              <Text>5</Text>
              <Text>BALANCE (3 - 4)</Text>
              <Text>Rs. {IndianFormat(AllGross + BankInterest)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>6</Text>
              <Text>
                Less: Conveyance/Washing/N.G. Allowance/Other Allowance
              </Text>
              <Text>NIL</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>7</Text>
              <Text>BALANCE (5 - 6)</Text>
              <Text>Rs. {IndianFormat(AllGross + BankInterest)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>8</Text>
              <Text>Less: Standard Deduction for Salaried</Text>
              <Text>Rs. {IndianFormat(50000)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>9</Text>
              <Text>BALANCE (7 - 8)</Text>
              <Text>Rs. {IndianFormat(AllGross + BankInterest - 50000)}</Text>
            </View>

            <DeductionSection
              title="EXEMPTION U/S 16"
              index="10"
              items={[
                {
                  label: "Professional Tax (P. Tax)",
                  value: grossPTax,
                  showNil: true,
                },
                { label: "Entertainment Allowance", value: 0, showNil: true },
                { label: "Leave Travel Allowance", value: 0, showNil: true },
                {
                  label: "TOTAL EXEMPTION U/S 16",
                  value: grossPTax,
                  isTotal: true,
                },
              ]}
            />

            <View style={styles.summaryRow}>
              <Text>11</Text>
              <Text>BALANCE (9 - 10)</Text>
              <Text>
                Rs. {IndianFormat(AllGross + BankInterest - 50000 - grossPTax)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>12</Text>
              <Text>Less: House Building Loan Interest U/S 24(b)</Text>
              <Text>Rs. {IndianFormat(hbLoanInterest)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>13</Text>
              <Text>Less: Loss from House Property U/S 57</Text>
              <Text>NIL</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>14</Text>
              <Text>GROSS TOTAL INCOME</Text>
              <Text>
                Rs.{" "}
                {IndianFormat(
                  AllGross + BankInterest - 50000 - grossPTax - hbLoanInterest
                )}
              </Text>
            </View>

            <DeductionSection
              title="DEDUCTION U/S 80C, 80CCC, AND 80CCD (MAXIMUM LIMIT Rs 150000/-)"
              index="15"
              items={section80CItems}
            />

            <View style={styles.continued}>
              <Text>Contd...2</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Page 2 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.mainBorder}>
            <Text style={styles.pageNumber}>PAGE. 2</Text>

            <View style={styles.summaryRow}>
              <Text>16</Text>
              <Text>BALANCE (14 - 15)</Text>
              <Text>
                Rs.{" "}
                {IndianFormat(
                  AllGross +
                    BankInterest -
                    50000 -
                    grossPTax -
                    hbLoanInterest -
                    limitVIA
                )}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>17</Text>
              <Text>
                Less: Additional Deduction U/S 80CCD(1B) NPS (Maximum Rs.
                50000/-)
              </Text>
              <Text>NIL</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>18</Text>
              <Text>BALANCE (16 - 17)</Text>
              <Text>
                Rs.{" "}
                {IndianFormat(
                  AllGross +
                    BankInterest -
                    50000 -
                    grossPTax -
                    hbLoanInterest -
                    limitVIA
                )}
              </Text>
            </View>

            <DeductionSection
              title="DEDUCTION OF OTHER SECTION"
              index="19"
              items={otherDeductionItems}
            />

            <View style={styles.summaryRow}>
              <Text>20</Text>
              <Text>TOTAL INCOME (18 - 19)</Text>
              <Text>Rs. {IndianFormat(TotalIncome)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>21</Text>
              <Text>Total Income Rounded off U/S 288A</Text>
              <Text>Rs. {IndianFormat(TotalRoundOffIncome)}</Text>
            </View>

            <TaxCalculationSection
              CalculatedIT={CalculatedIT}
              isUnderRebate={isUnderRebate}
              eduCess={eduCess}
              AddedEduCess={AddedEduCess}
              TotalRoundOffIncome={TotalRoundOffIncome}
            />

            <View style={styles.summaryRow}>
              <Text>29</Text>
              <Text>Less: Relief U/S 89(1) [Attach Form 10E]</Text>
              <Text>NIL</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>30</Text>
              <Text>Balance Tax + Cess after relief U/S 89(1) [28 - 29]</Text>
              <Text>Rs. {IndianFormat(roundSo(AddedEduCess, 10))}</Text>
            </View>

            <SignatureSection thisYear={thisYear} />
          </View>
        </View>
      </Page>

      {/* Page 3 - Salary Details (Landscape) */}
      <SalaryDetailsPage
        months={months}
        grossBasic={grossBasic}
        grossAddl={grossAddl}
        grossDA={grossDA}
        grossHRA={grossHRA}
        grossMA={grossMA}
        GrossPAY={GrossPAY}
        grossGPF={grossGPF}
        grossGSLI={grossGSLI}
        grossPTax={grossPTax}
        grossNetpay={grossNetpay}
        bonus={bonus}
      />
    </Document>
  );
}

const styles = StyleSheet.create({
  document: {
    margin: 5,
    padding: 5,
  },
  page: {
    padding: 2,
    margin: 2,
    backgroundColor: "#FFFFFF",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "95%",
  },
  mainBorder: {
    borderWidth: BORDER_WIDTH,
    width: "100%",
    padding: 5,
  },
  mainTitle: {
    fontSize: 14,
    textAlign: "center",
    textDecoration: "underline",
    fontFamily: "Arial",
    padding: 5,
  },
  infoBox: {
    borderWidth: BORDER_WIDTH,
    marginTop: 5,
    padding: 2,
    textAlign: "center",
  },
  detailsRow: {
    flexDirection: "row",
    borderWidth: BORDER_WIDTH,
    marginTop: 5,
  },
  detailItem: {
    width: "25%",
    borderRightWidth: BORDER_WIDTH,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  panRow: {
    textAlign: "right",
    paddingRight: 10,
    paddingBottom: 2,
    fontFamily: "Arial",
  },
  schoolRow: {
    borderWidth: BORDER_WIDTH,
    paddingLeft: 10,
    padding: 2,
  },
  sectionHeader: {
    borderWidth: BORDER_WIDTH,
    borderBottomWidth: 0,
    marginTop: 2,
    justifyContent: "center",
    paddingLeft: 5,
    padding: 2,
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: "row",
    borderLeftWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
  },
  indexColumn: {
    width: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: BORDER_WIDTH,
  },
  contentColumn: {
    width: "70%",
    borderRightWidth: BORDER_WIDTH,
  },
  valueColumn: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  rowItem: {
    width: "100%",
    borderBottomWidth: BORDER_WIDTH,
    flexDirection: "row",
    minHeight: 12,
  },
  subIndex: {
    width: "10%",
    borderRightWidth: BORDER_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    width: "70%",
    borderRightWidth: BORDER_WIDTH,
    justifyContent: "center",
    paddingLeft: 2,
  },
  value: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  leftAlign: {
    textAlign: "left",
  },
  summaryRow: {
    flexDirection: "row",
    borderLeftWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    padding: 2,
  },
  continued: {
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "right",
    paddingRight: 20,
  },
  pageNumber: {
    marginTop: 5,
    textAlign: "center",
  },
  taxTable: {
    width: "100%",
    borderWidth: BORDER_WIDTH,
    marginBottom: 5,
  },
  taxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: BORDER_WIDTH,
    padding: 2,
    fontWeight: "bold",
  },
  taxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: BORDER_WIDTH,
    padding: 2,
  },
  signatureContainer: {
    marginTop: 20,
  },
  dateRow: {
    borderWidth: BORDER_WIDTH,
    padding: 2,
    flexDirection: "row",
  },
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  signatureBox: {
    width: "45%",
    alignItems: "center",
  },
  verificationBox: {
    borderWidth: BORDER_WIDTH,
    padding: 5,
    height: 90,
    justifyContent: "flex-end",
    marginTop: 30,
    width: "50%",
    marginLeft: 50,
  },
  // Landscape page styles
  landscapeContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "95%",
    marginTop: 50,
  },
  landscapeMainBorder: {
    borderWidth: BORDER_WIDTH,
    width: "100%",
    padding: 5,
  },
  tableStartBorderView: {
    borderBottomWidth: BORDER_WIDTH,
    width: "100%",
    justifyContent: "center",
    padding: 5,
  },
  titleMain: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Arial",
  },
  employeeDetails: {
    flexDirection: "row",
    borderWidth: BORDER_WIDTH,
    marginTop: 5,
  },
  employeeDetailColumn: {
    width: "25%",
    borderRightWidth: BORDER_WIDTH,
    padding: 2,
    textAlign: "center",
  },
  salaryHeader: {
    flexDirection: "row",
    borderWidth: BORDER_WIDTH,
    borderTopWidth: 0,
  },
  headerColumn: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: BORDER_WIDTH,
    padding: 2,
  },
  subHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  salaryRow: {
    flexDirection: "row",
    borderWidth: BORDER_WIDTH,
    borderTopWidth: 0,
  },
  monthCell: {
    width: "10%",
    borderRightWidth: BORDER_WIDTH,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  payAllowances: {
    width: "50%",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRightWidth: BORDER_WIDTH,
  },
  grossCell: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: BORDER_WIDTH,
  },
  deductionCell: {
    width: "20%",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRightWidth: BORDER_WIDTH,
  },
  netCell: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  totalRow: {
    flexDirection: "row",
    borderWidth: BORDER_WIDTH,
    borderTopWidth: 0,
  },
  signatureFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
  },
  employeeSignature: {
    width: "40%",
    borderWidth: BORDER_WIDTH,
    padding: 5,
    height: 90,
    justifyContent: "flex-end",
  },
});

Font.register({
  family: "Arial",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/arial.ttf",
});
Font.register({
  family: "ArialItalic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/ariali.ttf",
});
