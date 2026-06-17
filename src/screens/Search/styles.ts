import { StyleSheet } from "react-native";

const whiteColor: string = "#fff";

const cardBorderColor: string = "rgba(217, 217, 217, 0.55)";
const backgroundColor: string = "rgb(5, 102, 141)";

const cardAlertBackgroundColor: string = "rgba(204, 88, 3,0.8)";
const cardBackgroundColor: string = "rgba(217, 217, 217, 0.13)";

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

  text: { letterSpacing: 0.3, textAlign: "center", color: whiteColor },

  local: { fontWeight: "600", fontSize: 16 },
  description: { opacity: 0.9, fontWeight: "200", fontSize: 13 },
  temperature: { fontWeight: "900", fontSize: 90 },
  subInfoText: { fontWeight: "600", fontSize: 16 },
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

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 14,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: cardBorderColor,
  },

  searchInput: {
    flex: 1,
    color: whiteColor,
    fontSize: 15,
  },

  searchIcon: {
    fontSize: 18,
    opacity: 0.8,
  },

  emptyText: {
    color: cardBorderColor,
    textAlign: "center",
    marginTop: 24,
    fontSize: 14,
  },
});
