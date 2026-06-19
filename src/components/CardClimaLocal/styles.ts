import { StyleSheet } from "react-native";
import { whiteColor } from "../../utils/globalStyles";

export const styles = StyleSheet.create({
  containerCard: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  infoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  text: {
    letterSpacing: 0.3,
    textAlign: "center",
    color: whiteColor,
  },
  local: {
    fontWeight: "600",
    fontSize: 16,
  },
  description: {
    opacity: 0.9,
    fontWeight: "200",
    fontSize: 13,
  },
  temperature: {
    fontWeight: "900",
    fontSize: 90,
  },
  subInfoText: {
    fontWeight: "600",
    fontSize: 16,
  },
  observation: {
    fontWeight: "400",
    fontSize: 13,
  },
  iconTemperature: {
    width: 80,
    height: 80,
  },
  iconSubInfo: {
    width: 30,
    height: 30,
  },
  loading: {
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
