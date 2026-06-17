import { StyleSheet } from "react-native";

const whiteColor: string = "#fff";

const cardBorderColor: string = "rgba(217, 217, 217, 0.55)";
const backgroundColor: string = "rgb(5, 102, 141)";

const cardAlertBackgroundColor: string = "rgba(204, 88, 3,0.8)";
const cardBackgroundColor: string = "rgba(217, 217, 217, 0.13)";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: backgroundColor,
    gap: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },

  notification: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },

  iconeContainer: {
    padding: 16,
    backgroundColor: cardAlertBackgroundColor,
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "flex-end",
  },

  /* estilização padrão dos cards */
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

  /* estilização dos texto */

  text: { letterSpacing: 0.3, textAlign: "center", color: whiteColor },

  local: { fontWeight: "600", fontSize: 16 },
  description: { opacity: 0.9, fontWeight: "200", fontSize: 13 },
  temperature: { fontWeight: "900", fontSize: 90 },
  subInfoText: { fontWeight: "600", fontSize: 16 },
  observation: { fontWeight: "400", fontSize: 13 },

  /* imgs */
  iconTemperature: { width: 80, height: 80 },
  iconSubInfo: { width: 30, height: 30 },

  /* estilização dos conntúdo no card principal */
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
