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

const width = 2480;
const height = 3508;

// Reusable components
const HeaderSection = ({ title, children }) => (
  <View style={[styles.sectionContainer, { marginTop: 5 }]}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const RowItem = ({ label, value, showIfPositive = false }) => (
  <View style={styles.rowItem}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>
      {showIfPositive
        ? value > 0
          ? `Rs. ${IndianFormat(value)}`
          : "NIL"
        : `Rs. ${IndianFormat(value)}`}
    </Text>
  </View>
);

const TaxSlabRow = ({ slab, rate, amount }) => (
  <View style={styles.taxSlabRow}>
    <Text style={styles.taxText}>{slab}</Text>
    <Text style={styles.taxText}>{rate}</Text>
    <Text style={styles.taxText}>
      {amount > 0 ? IndianFormat(Math.floor(amount * rate)) : "NIL"}
    </Text>
  </View>
);

const MonthlyRow = ({
  month,
  year,
  basic,
  addl,
  da,
  hra,
  ma,
  gross,
  gpf,
  gsli,
  ptax,
  netpay,
}) => (
  <View style={styles.monthlyRow}>
    <View style={styles.monthCell}>
      <Text>{month}</Text>
      <Text>{year}</Text>
    </View>
    <View style={styles.dataCell}>
      <Text>{basic ? Math.round((da * 100) / basic) + "%" : ""}</Text>
    </View>
    <View style={styles.dataCell}>
      <Text>{basic || ""}</Text>
    </View>
    <View style={styles.dataCell}>
      <Text>{addl > 0 ? addl : "NIL"}</Text>
    </View>
    <View style={styles.dataCell}>
      <Text>{da || ""}</Text>
    </View>
    <View style={styles.dataCell}>
      <Text>{hra || ""}</Text>
    </View>
    <View style={styles.dataCell}>
      <Text>{ma > 0 ? ma : "NIL"}</Text>
    </View>
    <View style={styles.dataCell}>
      <Text> </Text>
    </View>
    <View style={styles.dataCell}>
      <Text> </Text>
    </View>
    <View style={styles.grossCell}>
      <Text>{gross || ""}</Text>
    </View>
    <View style={styles.deductionCell}>
      <Text>{gpf > 0 ? gpf : "NIL"}</Text>
      <Text>{gsli > 0 ? gsli : "NIL"}</Text>
      <Text>{ptax > 0 ? ptax : "NIL"}</Text>
      <Text>NIL</Text>
    </View>
    <View style={styles.netCell}>
      <Text>{netpay || ""}</Text>
    </View>
  </View>
);

export default function IncomeTaxNew2025({ data }) {
  const {
    tname,
    school,
    pan,
    desig,
    prevYear,
    thisYear,
    nextYear,
    finYear,
    bonus,
    BankInterest,
    TotalGross,
    GrossArrear,
    AllGross,
    GrossTotalIncome,
    TotalRoundOffIncome,
    CalculatedIT,
    eduCess,
    GrossRelief,
    IncomeTaxAfterRelief,
    AddedEduCess,
    year,
    FiveIT,
    FiveITTax,
    TenIT,
    TenITTax,
    FifteenIT,
    FifteenITTax,
    TwentyIT,
    TwentyITTax,
    TwentyFiveIT,
    TwentyFiveITTax,
    // Monthly data
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
    marchNetpay,
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
    aprilNetpay,
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
    mayNetpay,
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
    juneNetpay,
    julySalary,
    julyBasic,
    julyAddl,
    julyDA,
    julyHRA,
    julyMA,
    julyGross,
    julyGPF,
    julyGSLI,
    julyPTax,
    julyNetpay,
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
    augustNetpay,
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
    septemberNetpay,
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
    octoberNetpay,
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
    novemberNetpay,
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
    decemberNetpay,
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
    januaryNetpay,
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
    februaryNetpay,
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
  } = data;

  return (
    <Document title={`IT Statement of ${tname} of ${school} NEW 2025`}>
      {/* Page 1 - Main IT Statement */}
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.mainBorderView}>
            <Text style={styles.mainTitle}>
              STATEMENT OF INCOME TAX (NEW TAX REGIME)
            </Text>

            <HeaderSection
              title={`FINANCIAL YEAR ${finYear} (RELEVANT TO ASSESMENT YEAR ${thisYear}-${nextYear})`}
            />
            <HeaderSection title="Howrah District Primary School Council" />

            <View style={styles.detailsRow}>
              <View style={styles.nameColumn}>
                <Text style={styles.detailLabel}>NAME:-</Text>
                <Text style={styles.detailValue}>{tname}</Text>
              </View>
              <View style={styles.designationColumn}>
                <Text style={styles.detailLabel}>DESIGNATION:-</Text>
                <Text style={styles.detailValue}>{desig}</Text>
              </View>
            </View>

            <View style={styles.panRow}>
              <Text style={styles.detailLabel}>PAN NO:- {pan}</Text>
            </View>

            <View style={styles.schoolRow}>
              <Text style={styles.detailLabel}>NAME OF SCHOOL:- {school}</Text>
            </View>

            <HeaderSection title="INCOME FROM THE SALARY HEAD">
              <RowItem
                label="a) Grass Pay & Allowances from March'XX to February, XX"
                value={TotalGross}
              />
              <RowItem
                label={`b) Arrear Salary if any during the Financial year ${prevYear} - ${thisYear}`}
                value={GrossArrear}
                showIfPositive
              />
              <RowItem
                label="c) Bonus received, if any"
                value={bonus}
                showIfPositive
              />
              <RowItem
                label="d) Honararium / Fees / Commission, if any"
                value={0}
              />
              <RowItem
                label="e) Total Income ( a + b + c + d )"
                value={AllGross}
              />
              <RowItem label="f) Less: any overdrawal" value={0} />
              <RowItem
                label="g) TOTAL INCOML FROM SALARY HEAD ( e - f )"
                value={AllGross}
              />
            </HeaderSection>

            <HeaderSection title="INCOME FROM OTHER SOURCES">
              <RowItem label="a) Pension received, if any" value={0} />
              <RowItem label="b) Interest on NSC" value={0} />
              <RowItem label="c) Interest of KVP / MIS etc" value={0} />
              <RowItem
                label="d) Bank's Interest, if any (Savings)"
                value={BankInterest}
              />
              <RowItem
                label="e) Bank's Interest, if any (Not from Savings)"
                value={0}
              />
              <RowItem label="f) Medical Reimbursement" value={0} />
              <RowItem label="g) Transport Allowances" value={0} />
              <RowItem label="h) Others, if any (Please Specify)" value={0} />
              <RowItem
                label="TOTAL INCOME FROM OTHER SOURCES"
                value={BankInterest}
              />
            </HeaderSection>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GROSS INCOME</Text>
              <Text style={styles.summaryValue}>
                Rs. {IndianFormat(AllGross + BankInterest)}
              </Text>
            </View>

            <HeaderSection title="LESS:- HOUSE RENT EXEMPTION U/S 10 ( 13 A ) OF I.T. ACT, 1961">
              <Text style={styles.notApplicable}>NOT APPLICABLE</Text>
            </HeaderSection>

            <View style={styles.balanceRow}>
              <Text style={styles.balanceLabel}>BALANCE</Text>
              <Text style={styles.balanceValue}>
                Rs. {IndianFormat(AllGross + BankInterest)}
              </Text>
            </View>

            <View style={styles.deductionRow}>
              <Text style={styles.deductionLabel}>
                Less:- Standard Deduction for Salaried
              </Text>
              <Text style={styles.deductionValue}>
                Rs. {IndianFormat(75000)}
              </Text>
            </View>

            <View style={styles.balanceRow}>
              <Text style={styles.balanceLabel}>BALANCE (5-6)</Text>
              <Text style={styles.balanceValue}>
                Rs. {IndianFormat(GrossTotalIncome)}
              </Text>
            </View>

            <View style={styles.totalIncomeRow}>
              <Text style={styles.totalLabel}>TOTAL INCOME</Text>
              <Text style={styles.totalValue}>
                Rs. {IndianFormat(GrossTotalIncome)}
              </Text>
            </View>

            <View style={styles.roundedIncomeRow}>
              <Text style={styles.roundedLabel}>
                Total Income Rounded off U/S 288A
              </Text>
              <Text style={styles.roundedValue}>
                Rs. {IndianFormat(TotalRoundOffIncome)}
              </Text>
            </View>

            <HeaderSection title="Calculation of Tax">
              <View style={styles.taxHeader}>
                <Text style={styles.taxHeaderText}>Sl. No.</Text>
                <Text style={styles.taxHeaderText}>
                  Male / Female below 50 Years
                </Text>
                <Text style={styles.taxHeaderText}>Amount</Text>
              </View>

              {year === 2024 ? (
                <>
                  <TaxSlabRow
                    slab="1"
                    rate="Up to Rs. 3,00,000 = Nil"
                    amount={0}
                  />
                  <TaxSlabRow
                    slab="2"
                    rate="Rs. 3,00,001 - 7,00,000 = 5%"
                    amount={FiveIT}
                  />
                  <TaxSlabRow
                    slab="3"
                    rate="Rs. 7,00,001/- to Rs. 10,00,000 = 10%"
                    amount={TenIT}
                  />
                  <TaxSlabRow
                    slab="4"
                    rate="Rs. 10,00,001/- to Rs. 12,00,000 = 15%"
                    amount={FifteenIT}
                  />
                  <TaxSlabRow
                    slab="5"
                    rate="Rs. 12,00,001/- to Rs. 15,00,000 = 20%"
                    amount={TwentyIT}
                  />
                  <TaxSlabRow
                    slab="6"
                    rate="Above Rs. 15,00,000 = 30%"
                    amount={0}
                  />
                </>
              ) : year === 2025 ? (
                <>
                  <TaxSlabRow
                    slab="1"
                    rate="Up to Rs. 4,00,000 = Nil"
                    amount={0}
                  />
                  <TaxSlabRow
                    slab="2"
                    rate="Rs. 4,00,001 - 8,00,000 = 5%"
                    amount={FiveIT}
                  />
                  <TaxSlabRow
                    slab="3"
                    rate="Rs. 8,00,001/- to Rs. 12,00,000 = 10%"
                    amount={TenIT}
                  />
                  <TaxSlabRow
                    slab="4"
                    rate="Rs. 12,00,001/- to Rs. 16,00,000 = 15%"
                    amount={FifteenIT}
                  />
                  <TaxSlabRow
                    slab="5"
                    rate="Rs. 16,00,001/- to Rs. 20,00,000 = 20%"
                    amount={TwentyIT}
                  />
                  <TaxSlabRow
                    slab="6"
                    rate="Rs. 20,00,001/- to Rs. 24,00,000 = 25%"
                    amount={TwentyFiveIT}
                  />
                  <TaxSlabRow
                    slab="7"
                    rate="Above Rs. 24,00,001 = 30%"
                    amount={0}
                  />
                </>
              ) : null}
            </HeaderSection>

            <View style={styles.taxCalculationRow}>
              <Text style={styles.calculationLabel}>Tax on Total Income</Text>
              <Text style={styles.calculationValue}>
                Rs. {IndianFormat(CalculatedIT)}
              </Text>
            </View>

            <View style={styles.deductionRow}>
              <Text style={styles.deductionLabel}>
                Less:- Deduction U/S 87A (REBATE U/S 87A UPTO RS. 7 LAKH OVER
                GROSS INCOME ONLY FOR NEW TAX REGIME)
              </Text>
              <Text style={styles.deductionValue}>
                {GrossRelief > 0 ? `Rs. ${IndianFormat(GrossRelief)}` : "NIL"}
              </Text>
            </View>

            <View style={styles.taxPayableRow}>
              <Text style={styles.payableLabel}>Tax payable</Text>
              <Text style={styles.payableValue}>
                {IncomeTaxAfterRelief > 0
                  ? `Rs. ${IndianFormat(IncomeTaxAfterRelief)}`
                  : "NIL"}
              </Text>
            </View>

            <View style={styles.cessRow}>
              <Text style={styles.cessLabel}>
                Add Educdtion Cess + Health Cess @ 4% on Col no.24
              </Text>
              <Text style={styles.cessValue}>
                {IncomeTaxAfterRelief > 0
                  ? `Rs. ${IndianFormat(eduCess)}`
                  : "NIL"}
              </Text>
            </View>

            <View style={styles.surchargeRow}>
              <Text style={styles.surchargeLabel}>
                Add surcharge on col. No.24 (for taxable income over Rs.
                10000000/-)
              </Text>
              <Text style={styles.surchargeValue}>N/A</Text>
            </View>

            <View style={styles.finalTaxRow}>
              <Text style={styles.finalTaxLabel}>Tax Payable</Text>
              <Text style={styles.finalTaxValue}>
                {AddedEduCess > 0 ? `Rs. ${IndianFormat(AddedEduCess)}` : "NIL"}
              </Text>
            </View>

            <View style={styles.roundedTaxRow}>
              <Text style={styles.roundedTaxLabel}>
                Tax Payable Rounded off U/S 288B
              </Text>
              <Text style={styles.roundedTaxValue}>
                {AddedEduCess > 0
                  ? `Rs. ${IndianFormat(roundSo(AddedEduCess, 10))}`
                  : "NIL"}
              </Text>
            </View>

            <View style={styles.reliefRow}>
              <Text style={styles.reliefLabel}>
                Less:- Relief U/S 89 (1) [Attach Form 10 E]
              </Text>
              <Text style={styles.reliefValue}>NIL</Text>
            </View>

            <View style={styles.finalBalanceRow}>
              <Text style={styles.finalBalanceLabel}>
                Balance Tax + Cess after relief U/S 89 (1) [16 - 17]
              </Text>
              <Text style={styles.finalBalanceValue}>
                {AddedEduCess > 0
                  ? `Rs. ${IndianFormat(roundSo(AddedEduCess, 10))}`
                  : "NIL"}
              </Text>
            </View>

            <View style={styles.continuedFooter}>
              <Text style={styles.continuedText}>Contd...2</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Page 2 - Continuation and Signatures */}
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.mainBorderView}>
            <HeaderSection title="TAX DEDUCT FROM SALARY AS FOLLOWS">
              {/* Tax deduction table would go here */}
            </HeaderSection>

            <View style={styles.taxRefundRow}>
              <Text style={styles.refundLabel}>TAX REFUNDABLE IF ANY</Text>
              <Text style={styles.refundValue}>NIL</Text>
            </View>

            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Date:-</Text>
            </View>

            <View style={styles.signatureContainer}>
              <View style={styles.signatureBox}>
                <Text style={styles.signatureLabel}>
                  Signature of the Employee
                </Text>
                <Text style={styles.signatureDesignation}>Designation:-</Text>
                <Text style={styles.signatureSection}>Section:-</Text>
              </View>
              <View style={styles.signatureBox}>
                <Text style={styles.signatureLabel}>Signature of the DDO</Text>
              </View>
            </View>

            <View style={styles.verificationContainer}>
              <View style={styles.verifiedBox}>
                <Text style={styles.verifiedText}>Verified</Text>
                <View style={styles.signatureLine} />
                <Text style={styles.verifierTitle}>
                  SUB INSPECTOR OF SCHOOLS
                </Text>
              </View>
              <View style={styles.submissionBox}>
                <Text style={styles.submissionText}>
                  LAST DATE OF SUBMISSION:- 13/01/{thisYear}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>

      {/* Page 3 - Monthly Salary Details (Landscape) */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.landscapeContainer}>
          <View style={styles.landscapeMainView}>
            <View style={styles.landscapeBorderView}>
              <Text style={styles.landscapeTitle}>
                DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
              </Text>

              <View style={styles.employeeDetails}>
                <View style={styles.employeeColumn}>
                  <Text style={styles.employeeLabel}>NAME OF THE EMPLOYEE</Text>
                  <Text style={styles.employeeLabel}>NAME OF THE SCHOOL</Text>
                </View>
                <View style={styles.employeeValueColumn}>
                  <Text style={styles.employeeValue}>{tname}</Text>
                  <Text style={styles.employeeValue}>{school}</Text>
                </View>
                <View style={styles.designationColumn}>
                  <Text style={styles.employeeLabel}>DESIGNATION</Text>
                  <Text style={styles.employeeLabel}>PAN NO.</Text>
                </View>
                <View style={styles.designationValueColumn}>
                  <Text style={styles.employeeValue}>{desig}</Text>
                  <Text style={styles.employeeValue}>{pan}</Text>
                </View>
              </View>

              <View style={styles.salaryHeader}>
                <View style={styles.monthHeader}>
                  <Text style={styles.headerText}>MONTH</Text>
                </View>
                <View style={styles.payHeader}>
                  <Text style={styles.headerText}>PAY & ALLOWANCES</Text>
                  <View style={styles.subHeader}>
                    <Text style={styles.subHeaderText}>% D.A</Text>
                    <Text style={styles.subHeaderText}>Basic Pay</Text>
                    <Text style={styles.subHeaderText}>HT Allowance</Text>
                    <Text style={styles.subHeaderText}>D.A.</Text>
                    <Text style={styles.subHeaderText}>H.R.A.</Text>
                    <Text style={styles.subHeaderText}>M.A.</Text>
                    <Text style={styles.subHeaderText}>
                      Conveyance Allowance
                    </Text>
                    <Text style={styles.subHeaderText}>BONUS</Text>
                  </View>
                </View>
                <View style={styles.grossHeader}>
                  <Text style={styles.headerText}>GROSS</Text>
                </View>
                <View style={styles.deductionHeader}>
                  <Text style={styles.headerText}>DEDUCTION</Text>
                  <View style={styles.deductionSubHeader}>
                    <Text style={styles.deductionSubText}>GPF</Text>
                    <Text style={styles.deductionSubText}>GSLI</Text>
                    <Text style={styles.deductionSubText}>P.TAX</Text>
                    <Text style={styles.deductionSubText}>I.TAX</Text>
                  </View>
                </View>
                <View style={styles.netHeader}>
                  <Text style={styles.headerText}>NET</Text>
                </View>
              </View>

              {/* Monthly Rows */}
              <MonthlyRow
                month="MAR"
                year={prevYear}
                basic={marchBasic}
                addl={marchAddl}
                da={marchDA}
                hra={marchHRA}
                ma={marchMA}
                gross={marchGross}
                gpf={marchGPF}
                gsli={marchGSLI}
                ptax={marchPTax}
                netpay={marchNetpay}
              />

              <MonthlyRow
                month="APR"
                year={prevYear}
                basic={aprilBasic}
                addl={aprilAddl}
                da={aprilDA}
                hra={aprilHRA}
                ma={aprilMA}
                gross={aprilGross}
                gpf={aprilGPF}
                gsli={aprilGSLI}
                ptax={aprilPTax}
                netpay={aprilNetpay}
              />
              <MonthlyRow
                month="MAY"
                year={prevYear}
                basic={mayBasic}
                addl={mayAddl}
                da={mayDA}
                hra={mayHRA}
                ma={mayMA}
                gross={mayGross}
                gpf={mayGPF}
                gsli={mayGSLI}
                ptax={mayPTax}
                netpay={mayNetpay}
              />
              <MonthlyRow
                month="JUN"
                year={prevYear}
                basic={juneBasic}
                addl={juneAddl}
                da={juneDA}
                hra={juneHRA}
                ma={juneMA}
                gross={juneGross}
                gpf={juneGPF}
                gsli={juneGSLI}
                ptax={junePTax}
                netpay={juneNetpay}
              />
              <MonthlyRow
                month="JUL"
                year={prevYear}
                basic={julyBasic}
                addl={julyAddl}
                da={julyDA}
                hra={julyHRA}
                ma={julyMA}
                gross={julyGross}
                gpf={julyGPF}
                gsli={julyGSLI}
                ptax={julyPTax}
                netpay={julyNetpay}
              />
              <MonthlyRow
                month="AUG"
                year={prevYear}
                basic={augustBasic}
                addl={augustAddl}
                da={augustDA}
                hra={augustHRA}
                ma={augustMA}
                gross={augustGross}
                gpf={augustGPF}
                gsli={augustGSLI}
                ptax={augustPTax}
                netpay={augustNetpay}
              />
              <MonthlyRow
                month="SEP"
                year={prevYear}
                basic={septemberBasic}
                addl={septemberAddl}
                da={septemberDA}
                hra={septemberHRA}
                ma={septemberMA}
                gross={septemberGross}
                gpf={septemberGPF}
                gsli={septemberGSLI}
                ptax={septemberPTax}
                netpay={septemberNetpay}
              />
              <MonthlyRow
                month="OCT"
                year={prevYear}
                basic={octoberBasic}
                addl={octoberAddl}
                da={octoberDA}
                hra={octoberHRA}
                ma={octoberMA}
                gross={octoberGross}
                gpf={octoberGPF}
                gsli={octoberGSLI}
                ptax={octoberPTax}
                netpay={octoberNetpay}
              />
              <MonthlyRow
                month="NOV"
                year={prevYear}
                basic={novemberBasic}
                addl={novemberAddl}
                da={novemberDA}
                hra={novemberHRA}
                ma={novemberMA}
                gross={novemberGross}
                gpf={novemberGPF}
                gsli={novemberGSLI}
                ptax={novemberPTax}
                netpay={novemberNetpay}
              />
              <MonthlyRow
                month="DEC"
                year={prevYear}
                basic={decemberBasic}
                addl={decemberAddl}
                da={decemberDA}
                hra={decemberHRA}
                ma={decemberMA}
                gross={decemberGross}
                gpf={decemberGPF}
                gsli={decemberGSLI}
                ptax={decemberPTax}
                netpay={decemberNetpay}
              />
              <MonthlyRow
                month="JAN"
                year={thisYear}
                basic={januaryBasic}
                addl={januaryAddl}
                da={januaryDA}
                hra={januaryHRA}
                ma={januaryMA}
                gross={januaryGross}
                gpf={januaryGPF}
                gsli={januaryGSLI}
                ptax={januaryPTax}
                netpay={januaryNetpay}
              />
              <MonthlyRow
                month="FEB"
                year={thisYear}
                basic={februaryBasic}
                addl={februaryAddl}
                da={februaryDA}
                hra={februaryHRA}
                ma={februaryMA}
                gross={februaryGross}
                gpf={februaryGPF}
                gsli={februaryGSLI}
                ptax={februaryPTax}
                netpay={februaryNetpay}
              />

              {/* Total Row */}
              <View style={styles.totalRow}>
                <View style={styles.totalMonthCell}>
                  <Text>TOTAL</Text>
                </View>
                <View style={styles.totalDataCell} />
                <View style={styles.totalDataCell}>
                  <Text>{grossBasic}</Text>
                </View>
                <View style={styles.totalDataCell}>
                  <Text>{grossAddl > 0 ? grossAddl : "NIL"}</Text>
                </View>
                <View style={styles.totalDataCell}>
                  <Text>{grossDA}</Text>
                </View>
                <View style={styles.totalDataCell}>
                  <Text>{grossHRA}</Text>
                </View>
                <View style={styles.totalDataCell}>
                  <Text>{grossMA > 0 ? grossMA : "NIL"}</Text>
                </View>
                <View style={styles.totalDataCell}>
                  <Text>NIL</Text>
                </View>
                <View style={styles.totalDataCell}>
                  <Text>{bonus > 0 ? bonus : "NIL"}</Text>
                </View>
                <View style={styles.totalGrossCell}>
                  <Text>{GrossPAY}</Text>
                </View>
                <View style={styles.totalDeductionCell}>
                  <Text>{grossGPF > 0 ? grossGPF : "NIL"}</Text>
                  <Text>{grossGSLI > 0 ? grossGSLI : "NIL"}</Text>
                  <Text>{grossPTax > 0 ? grossPTax : "NIL"}</Text>
                  <Text> </Text>
                </View>
                <View style={styles.totalNetCell}>
                  <Text>{grossNetpay}</Text>
                </View>
              </View>
            </View>

            <View style={styles.verificationFooter}>
              <View style={styles.verificationBox}>
                <Text style={styles.verificationLabel}>
                  Verified and Counter Signature
                </Text>
                <View style={styles.footerSignatureLine} />
                <Text style={styles.footerTitle}>SUB INSPECTOR OF SCHOOLS</Text>
              </View>
              <View style={styles.incumbentBox}>
                <View style={styles.incumbentSignatureLine} />
                <Text style={styles.incumbentLabel}>
                  SIGNATURE OF THE INCUMBENT
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// Styles
const styles = StyleSheet.create({
  // Global
  page: {
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    width,
    height,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
  },
  mainBorderView: {
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
    padding: 5,
  },

  // Typography
  mainTitle: {
    fontSize: 14,
    textAlign: "center",
    textDecoration: "underline",
    marginVertical: 5,
    fontFamily: "Arial",
  },
  sectionTitle: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "ArialItalic",
    padding: 2,
  },
  detailLabel: {
    fontSize: 9,
    fontFamily: "ArialItalic",
  },
  detailValue: {
    fontSize: 9,
    fontFamily: "Arial",
  },
  rowLabel: {
    fontSize: 9,
    fontFamily: "ArialItalic",
    textAlign: "left",
    paddingLeft: 2,
    flex: 3,
  },
  rowValue: {
    fontSize: 9,
    fontFamily: "Arial",
    textAlign: "right",
    paddingRight: 5,
    flex: 1,
  },

  // Layout
  sectionContainer: {
    borderWidth: 1,
    borderColor: "#000",
    width: "95%",
    padding: 3,
    marginBottom: 5,
  },
  detailsRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    marginVertical: 3,
  },
  nameColumn: {
    width: "60%",
    flexDirection: "row",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  designationColumn: {
    width: "40%",
    flexDirection: "row",
    padding: 2,
  },
  panRow: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
    marginVertical: 3,
  },
  schoolRow: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
    marginVertical: 3,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingVertical: 2,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  deductionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  totalIncomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  roundedIncomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  taxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 3,
  },
  taxHeaderText: {
    fontSize: 9,
    fontFamily: "Arial",
    textAlign: "center",
    flex: 1,
  },
  taxSlabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 3,
  },
  taxText: {
    fontSize: 9,
    fontFamily: "Arial",
    textAlign: "center",
    flex: 1,
  },
  taxCalculationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  taxPayableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  cessRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  surchargeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  finalTaxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  roundedTaxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  reliefRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  finalBalanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  continuedFooter: {
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  continuedText: {
    fontSize: 9,
    textAlign: "right",
    paddingRight: 20,
    fontFamily: "Arial",
  },

  // Page 2 styles
  taxRefundRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginVertical: 3,
  },
  dateRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    height: 20,
    marginVertical: 10,
    padding: 2,
  },
  signatureContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50,
  },
  signatureBox: {
    width: "50%",
    alignItems: "center",
  },
  signatureLabel: {
    fontSize: 9,
    fontFamily: "Arial",
  },
  signatureDesignation: {
    fontSize: 9,
    fontFamily: "Arial",
    marginTop: 5,
  },
  signatureSection: {
    fontSize: 9,
    fontFamily: "Arial",
    marginTop: 5,
  },
  verificationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginTop: 50,
    marginBottom: 30,
  },
  verifiedBox: {
    width: "50%",
    borderWidth: 1,
    padding: 5,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  verifiedText: {
    fontSize: 9,
    fontFamily: "Arial",
  },
  signatureLine: {
    height: 3,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    width: "100%",
    marginTop: 40,
  },
  verifierTitle: {
    fontSize: 9,
    fontFamily: "Arial",
    marginTop: 5,
  },
  submissionBox: {
    width: "40%",
    borderWidth: 1,
    marginBottom: 20,
  },
  submissionText: {
    fontSize: 9,
    fontFamily: "Arial",
    textAlign: "center",
    padding: 2,
  },

  // Page 3 (Landscape) styles
  landscapeContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    marginTop: 50,
  },
  landscapeMainView: {
    padding: 2,
    margin: 2,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "100%",
    height: "98%",
  },
  landscapeBorderView: {
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
    padding: 5,
  },
  landscapeTitle: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "Arial",
    textAlign: "center",
    marginBottom: 10,
  },
  employeeDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  employeeColumn: {
    width: "20%",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  employeeValueColumn: {
    width: "30%",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  designationColumn: {
    width: "20%",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  designationValueColumn: {
    width: "30%",
    padding: 2,
  },
  employeeLabel: {
    fontSize: 9,
    fontFamily: "Arial",
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  employeeValue: {
    fontSize: 9,
    fontFamily: "Arial",
    textAlign: "center",
  },
  salaryHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  monthHeader: {
    width: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    height: 50,
  },
  payHeader: {
    width: "45%",
    borderRightWidth: 1,
    borderColor: "#000",
    height: 50,
  },
  headerText: {
    fontSize: 9,
    fontFamily: "Arial",
    textAlign: "center",
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#000",
  },
  subHeaderText: {
    fontSize: 8,
    fontFamily: "Arial",
    textAlign: "center",
    width: "12.5%",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  grossHeader: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    height: 50,
  },
  deductionHeader: {
    width: "30%",
    borderRightWidth: 1,
    borderColor: "#000",
    height: 50,
  },
  deductionSubHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#000",
  },
  deductionSubText: {
    fontSize: 9,
    fontFamily: "Arial",
    textAlign: "center",
    width: "25%",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  netHeader: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  monthlyRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  monthCell: {
    width: "5%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  dataCell: {
    width: "5.625%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  grossCell: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  deductionCell: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  netCell: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  totalMonthCell: {
    width: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  totalDataCell: {
    width: "5.625%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  totalGrossCell: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  totalDeductionCell: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  totalNetCell: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  verificationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 90,
    marginBottom: 20,
  },
  verificationBox: {
    width: "30%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    height: 90,
    justifyContent: "flex-end",
  },
  verificationLabel: {
    fontSize: 9,
    fontFamily: "Arial",
  },
  footerSignatureLine: {
    height: 3,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    marginTop: 40,
  },
  footerTitle: {
    fontSize: 9,
    fontFamily: "Arial",
    marginTop: 5,
  },
  incumbentBox: {
    width: "30%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    height: 90,
    justifyContent: "flex-end",
  },
  incumbentSignatureLine: {
    height: 3,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    marginTop: 30,
  },
  incumbentLabel: {
    fontSize: 9,
    fontFamily: "Arial",
    marginTop: 5,
    textAlign: "center",
  },
});

// Font registration
Font.register({
  family: "Arial",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/arial.ttf",
});
Font.register({
  family: "ArialItalic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/ariali.ttf",
});
