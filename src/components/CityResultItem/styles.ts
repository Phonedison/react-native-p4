import { StyleSheet } from "react-native";
import {
  backgroundColor,
  cardBackgroundColor,
  cardBorderColor,
  whiteColor,
} from "../../utils/globalStyles";

export const styles = StyleSheet.create({

text: { letterSpacing: 0.3, textAlign: "center", color: whiteColor },

local: { fontWeight: "600", fontSize: 16 },
description: { opacity: 0.9, fontWeight: "200", fontSize: 13 },
subInfoText: { fontWeight: "600", fontSize: 16 },

checkWrapper: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  checkWrapperSelected: {
    backgroundColor: "#2ecc71",
  },
  checkIcon: {
    color: backgroundColor,
    fontSize: 16,
    fontWeight: "bold",
  },
resultItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    minHeight: 56,
    alignSelf: "stretch",
  },
  resultItemSelected: {
    backgroundColor: "rgba(255,255,255,0.22)",
    borderColor: "rgba(255,255,255,0.45)",
  },
  resultTextWrapper: {
    flex: 1,
  },
  resultName: {
    color: whiteColor,
    fontSize: 15,
    fontWeight: "600",
  },
  resultSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    marginTop: 2,
  },
})