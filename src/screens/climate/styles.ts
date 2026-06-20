import { StyleSheet } from "react-native";
import {
  backgroundColor,
  cardBackgroundColor,
  cardBorderColor,
  whiteColor,
} from "../../utils/globalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
    backgroundColor,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 14,
    paddingTop: 60,
    gap: 12,
  },

  card: {
    width: "100%",
    backgroundColor: cardBackgroundColor,
    borderColor: cardBorderColor,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  weatherCard: {
    height: 240,
    paddingHorizontal: 20,
    gap: 8,
    justifyContent: "center",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  location: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
  },

  cloudIcon: {
    width: 18,
    height: 14,
    resizeMode: "contain",
  },

  linha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  temperature: {
    color: whiteColor,
    fontSize: 52,
    fontWeight: "400",
    lineHeight: 56,
    fontVariant: ["tabular-nums"],
  },

  datails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  color: {
    color: whiteColor,
    fontSize: 14,
  },

  column: {
    flex: 1,
    gap: 15,
  },

  largeCard: {
    flexDirection: "row",
    height: 180,
    gap: 10,
  },

  largeCardContent: {
    gap: 10,
    alignItems: "center",
  },

  locationDatails: {
    color: whiteColor,
    fontSize: 14,
    fontWeight: "600",
  },

  days: {
    fontSize: 16,
    paddingHorizontal: 10,
  },

  weatherIcon: {
    width: 35,
    height: 35,
  },

  CardDown: {
    gap: 15,
  },

  cardDatails: {
    width: 80,
    backgroundColor: cardBackgroundColor,
    borderColor: cardBorderColor,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  CardDay: {
    minHeight: 75,
    paddingVertical: 12,
  },

  dayCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  dayLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: 90,
  },

  dayName: {
    color: whiteColor,
    fontSize: 15,
    fontWeight: "600",
  },

  dayIcon: {
    fontSize: 22,
  },

  dayRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  dayTempMin: {
    color: "#7FB3FF",
    fontSize: 14,
    fontWeight: "700",
    width: 35,
    textAlign: "center",
  },

  dayTempMax: {
    color: "#FFB84D",
    fontSize: 14,
    fontWeight: "700",
    width: 35,
    textAlign: "center",
  },

  tempBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#303030",
    borderRadius: 999,
    overflow: "hidden",
  },

  tempBarFill: {
    width: "70%",
    height: "100%",
    backgroundColor: "#F5B942",
    borderRadius: 999,
  },
});