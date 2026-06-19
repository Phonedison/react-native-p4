import { StyleSheet } from "react-native";
import {
  backgroundColor,
  backgroundColorNavegation,
  cardAlertBackgroundColor,
  cardBackgroundColor,
  cardBorderColor,
  whiteColor,
} from "../../utils/globalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: backgroundColor,
    gap: 16,
    paddingVertical: 32,
    paddingBottom: 20,
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

  card: {
    backgroundColor: cardBackgroundColor,
    width: "100%",
    alignItems: "center",
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

  text: {
    letterSpacing: 0.3,
    textAlign: "center",
    color: whiteColor,
  },

  local: {
    fontWeight: "600",
    fontSize: 16,
  },

  textInfo: { textAlign: "center", marginTop: 20 },
  containerFlatList: {
    gap: 16,
    width: "100%",
    paddingBottom: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  buttonAdd: {
    backgroundColor: backgroundColorNavegation,
    width: "100%",
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: "center",
  },
});
