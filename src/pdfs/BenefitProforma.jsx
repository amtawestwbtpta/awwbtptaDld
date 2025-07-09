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
import ropa from "../modules/ropa";
import Check from "../images/check.png";
import { RoundTo } from "../modules/calculatefunctions";

const width = 2480;
const height = 3508;

export default function BenefitProforma({ data, year }) {
  const currentYear = new Date().getFullYear();

  return (
    <Document title="Benefit Proforma of Teachers">
      {data.map((teacher, index) => {
        const teacherYear = currentYear - year;
        const dojParts = teacher?.doj?.split("-") || [];
        const completionDate =
          dojParts.length === 3
            ? `${
                parseInt(dojParts[0]) - 1 <= 9
                  ? "0" + (parseInt(dojParts[0]) - 1)
                  : parseInt(dojParts[0]) - 1
              }-${dojParts[1]}-${parseInt(dojParts[2]) + teacherYear}`
            : "";

        return (
          <Page
            size="A4"
            orientation="portrait"
            style={styles.page}
            key={index}
          >
            <View style={styles.pageMainView}>
              <Text style={[styles.title, styles.underline]}>
                DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
              </Text>

              <Image
                src={Check.src}
                style={[
                  styles.checkImage,
                  { left: teacherYear === 20 ? 376 : 350 },
                ]}
              />

              <Text style={[styles.title2, styles.dottedUnderline]}>
                PROFORMA FOR OPTION & FIXATION OF PAY FOR CAS FOR 10 / 20 YEARS
                UNDER ROPA '19
              </Text>

              <Text style={[styles.title, styles.dotPlaceholder]}>.....</Text>

              <Text style={styles.text}>
                In terms of Memorandum, Vide No.-437-SE(P&B) SL/SS-408/19 Dt.
                13.12.2019 of the School Education Department (Planning & Budget
                Branch), Govt. of W.B.
              </Text>

              <View style={styles.sectionHeader}>
                <Text style={styles.titleMain}>
                  PART- A :: OPTION (to be filled in by incumbent)
                </Text>
              </View>

              <Text style={styles.optionText}>
                I <Text style={styles.dottedUnderline}>{teacher?.tname}</Text>{" "}
                do hereby opt to avail the benefit of Career Advancement Scheme
                for Completion of{" "}
                {teacherYear === 20 ? (
                  <>
                    <Text style={styles.strikethrough}>10 years OR </Text>20
                    years
                  </>
                ) : (
                  <>
                    10 years{" "}
                    <Text style={styles.strikethrough}>OR 20 years</Text>
                  </>
                )}{" "}
                of continuous service under ROPA'2019 with effect from{" "}
                <Text style={styles.dottedUnderline}>01/07/{currentYear}</Text>{" "}
                i.e., w.e.f. the date of my entitlement* or with effect from 1st
                Day of July {currentYear} i.e., w.e.f the date of next
                increment*
              </Text>

              <View style={styles.declarationSection}>
                <Text style={[styles.text, styles.underlineBold]}>
                  Declaration:
                </Text>{" "}
                <Text style={styles.text}>
                  I hereby undertake to refund to the Government any amount
                  which may be drawn by me in excess of what is admissible to me
                  on account of erroneous fixation of pay in the revised pay
                  structure as soon as the fact of such excess drawl comes /
                  brought to my notice.
                </Text>
              </View>

              <View style={styles.signatureContainer}>
                <View style={styles.datePlace}>
                  <Text style={styles.text}>Date: {completionDate}</Text>
                  <Text style={styles.text}>Place: JOYPUR</Text>
                </View>

                <View style={styles.teacherDetails}>
                  <Text style={styles.text}>Signature of the Teacher:</Text>
                  <Text style={styles.text}>
                    Name with designation: {teacher?.tname} (
                    {teacher?.desig === "AT" ? "A.T." : "H.T."})
                  </Text>
                  <Text style={styles.text}>
                    Name of the School: {teacher?.school}
                  </Text>
                  <Text style={styles.text}>Name of the Circle: AMTA WEST</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.sectionHeader}>
                <Text style={styles.titleMain}>
                  PART- B :: FIXATION (to be filled in by Circle end)
                </Text>
              </View>

              <DetailRow
                index="1"
                label="Name of the Teacher"
                value={teacher?.tname}
              />
              <DetailRow
                index="3"
                label="Name of the Circle"
                value="AMTA WEST"
              />
              <DetailRow
                index="4"
                label="Designation"
                value={
                  teacher?.desig === "AT" ? "Assistant Teacher" : "Head Teacher"
                }
              />
              <DetailRow
                index="5"
                label="Date of Joining into Service"
                value={teacher?.doj}
              />

              <View style={styles.detailRow}>
                <Text style={styles.indexCell}>6.</Text>
                <Text style={styles.labelCell}>
                  {teacherYear === 20 ? (
                    <>
                      Date of Completion of{" "}
                      <Text style={styles.strikethrough}>10/</Text> 20 Years
                    </>
                  ) : (
                    <>
                      Date of Completion of 10{" "}
                      <Text style={styles.strikethrough}>/20</Text> Years
                    </>
                  )}
                  <Text style={styles.smallText}>
                    (After taking LWP if any, into account)
                  </Text>
                  <Image
                    src={Check.src}
                    style={[
                      styles.smallCheck,
                      { left: teacherYear === 20 ? 145 : 125 },
                    ]}
                  />
                </Text>
                <Text style={styles.valueCell}>: {completionDate}</Text>
              </View>

              <DetailRow
                index="7"
                label="Date of OPTION for availing this benefit"
                value={completionDate}
              />

              <DetailRow
                index="8"
                label="Existing Basic Pay (With Level)"
                value={
                  parseInt(teacher?.doj?.slice(3, 5)) >= 7
                    ? `Rs. ${teacher?.basic} (${ropa(teacher?.basic).lv}, ${
                        ropa(teacher?.basic).ce
                      }) (01-07-${currentYear})`
                    : `Rs. ${teacher?.mbasic} (${ropa(teacher?.mbasic).lv}, ${
                        ropa(teacher?.mbasic).ce
                      }) (01-07-${currentYear - 1})`
                }
              />

              <DetailRow
                index="9"
                label="Next higher of the amount at serial no. 8 above in the same level"
                value={
                  parseInt(teacher?.doj?.slice(3, 5)) >= 7
                    ? `Rs. ${RoundTo(
                        teacher?.basic + teacher?.basic * 0.03,
                        100
                      )} (${ropa(teacher?.basic).lv}, ${
                        ropa(
                          RoundTo(teacher?.basic + teacher?.basic * 0.03, 100)
                        ).ce
                      })`
                    : `Rs. ${teacher?.mbasic} (${ropa(teacher?.mbasic).lv}, ${
                        ropa(teacher?.mbasic).ce
                      })`
                }
              />

              <DetailRow
                index="10"
                label="Basic Pay fixed at (as per serial no. 9)"
                value={
                  parseInt(teacher?.doj?.slice(3, 5)) >= 7
                    ? `Rs. ${RoundTo(
                        teacher?.basic + teacher?.basic * 0.03,
                        100
                      )} (${ropa(teacher?.basic).lv}, ${
                        ropa(
                          RoundTo(teacher?.basic + teacher?.basic * 0.03, 100)
                        ).ce
                      })`
                    : `Rs. ${teacher?.mbasic} (${ropa(teacher?.mbasic).lv}, ${
                        ropa(teacher?.mbasic).ce
                      })`
                }
              />

              <DetailRow
                index="11"
                label="Date of Effect"
                value={
                  parseInt(teacher?.doj?.slice(3, 5)) >= 7
                    ? `${dojParts[0]}-${dojParts[1]}-${
                        parseInt(dojParts[2]) + teacherYear
                      }`
                    : `01-07-${currentYear}`
                }
              />

              <DetailRow
                index="12"
                label="Date of Next Increment"
                value={
                  parseInt(teacher?.doj?.slice(3, 5)) >= 7
                    ? `01-07-${currentYear + 1}`
                    : `01-07-${currentYear}`
                }
              />

              <Text style={[styles.text, styles.verificationText]}>
                Checked and verified with service Book and other relevant
                records and found in order & forwarded to the DPSC, Howrah for
                its approval.
              </Text>

              <View style={styles.signatureSection}>
                <Text style={styles.signatureLine}>
                  ............................................
                </Text>
                <Text style={styles.signatureLabel}>Signature of the SI/S</Text>
              </View>

              <View style={styles.memoDate}>
                <Text style={styles.text}>Memo No-</Text>
                <Text style={styles.text}>Date</Text>
              </View>

              <View style={styles.dividerLine}>
                <Text style={styles.text}>
                  ===================================================================================
                </Text>
              </View>

              <View style={styles.officialsContainer}>
                <OfficialSection label="DA" />
                <OfficialSection label="HC" />
                <OfficialSection label="COF" />
                <OfficialSection label="Secretary" />
                <OfficialSection label="Chairman" />
              </View>
            </View>
          </Page>
        );
      })}
    </Document>
  );
}

// Sub-components for better organization
const DetailRow = ({ index, label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.indexCell}>{index}.</Text>
    <Text style={styles.labelCell}>{label}</Text>
    <Text style={styles.valueCell}>: {value}</Text>
  </View>
);

const OfficialSection = ({ label }) => (
  <View style={styles.officialSection}>
    <Text style={styles.text}>{label}</Text>
    <Text style={styles.text}>DPSC. Howrah</Text>
  </View>
);

const styles = StyleSheet.create({
  page: {
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
  },
  pageMainView: {
    paddingRight: 15,
    margin: 5,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "98%",
  },
  title: {
    fontSize: 18,
    fontFamily: "AgencyBold",
    fontWeight: "bold",
    textAlign: "center",
  },
  title2: {
    fontSize: 16,
    fontFamily: "Agency",
    textAlign: "center",
    marginVertical: 5,
  },
  titleMain: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "AgencyBold",
    textAlign: "center",
  },
  text: {
    fontSize: 12,
    fontFamily: "Arial",
    textAlign: "left",
    fontWeight: "bold",
    padding: 2,
    lineHeight: 1.3,
  },
  smallText: {
    fontSize: 10,
    fontFamily: "Arial",
    textAlign: "left",
    fontWeight: "bold",
  },
  sectionHeader: {
    marginVertical: 10,
  },
  optionText: {
    fontSize: 12,
    fontFamily: "Arial",
    textAlign: "justify",
    fontWeight: "bold",
    padding: 2,
    lineHeight: 1.3,
    textIndent: 30,
  },
  declarationSection: {
    marginVertical: 10,
  },
  signatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  datePlace: {
    width: "40%",
  },
  teacherDetails: {
    width: "60%",
  },
  divider: {
    marginBottom: 5,
    height: 3,
    backgroundColor: "black",
  },
  detailRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 3,
  },
  indexCell: {
    width: "5%",
    fontSize: 12,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  labelCell: {
    width: "45%",
    fontSize: 12,
    fontFamily: "Arial",
    fontWeight: "bold",
    position: "relative",
  },
  valueCell: {
    width: "50%",
    fontSize: 12,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  verificationText: {
    marginTop: 10,
    textAlign: "left",
  },
  signatureSection: {
    alignItems: "flex-end",
    marginVertical: 10,
    marginLeft: 350,
  },
  signatureLine: {
    fontSize: 12,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  signatureLabel: {
    fontSize: 12,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  memoDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 50,
    marginBottom: 5,
  },
  dividerLine: {
    marginBottom: 10,
  },
  officialsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  officialSection: {
    alignItems: "center",
  },
  underline: {
    textDecoration: "underline",
  },
  dottedUnderline: {
    textDecoration: "underline",
    textDecorationStyle: "dotted",
  },
  strikethrough: {
    textDecoration: "line-through",
  },
  underlineBold: {
    textDecoration: "underline",
    fontWeight: "bold",
  },
  dotPlaceholder: {
    position: "absolute",
    marginTop: 21,
    left: 348,
  },
  checkImage: {
    width: 10,
    height: 10,
    position: "absolute",
    top: 0,
  },
  smallCheck: {
    width: 10,
    height: 10,
    position: "absolute",
    top: -5,
  },
});

Font.register({
  family: "Arial",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/arial.ttf",
});

Font.register({
  family: "AgencyBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/AgencyBold.ttf",
});

Font.register({
  family: "Agency",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/AGENCYR.TTF",
});
