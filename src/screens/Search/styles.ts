import { StyleSheet } from "react-native";
import {
  backgroundColor,
  cardBackgroundColor,
  cardBorderColor,
  whiteColor,
} from "../../utils/globalStyles";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backArrow: {
    color: whiteColor,
    fontSize: 22,
    fontWeight: "300",
  },
  backText: {
    color: whiteColor,
    fontSize: 18,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: backgroundColor,
    gap: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
    paddingTop: 80,
  },

  card: {
    backgroundColor: cardBackgroundColor,
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    borderColor: cardBorderColor,
    borderRadius: 16,
    borderWidth: 1,
  },

  cardPrincipal: {
    maxHeight: 300,
    padding: 16,
    justifyContent: "center",
  },

  cardsFavoritos: {
    maxHeight: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  temperature: { fontWeight: "900", fontSize: 90 },
  observation: { fontWeight: "400", fontSize: 13 },

  iconTemperature: { width: 80, height: 80 },
  iconSubInfo: { width: 30, height: 30 },

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

});