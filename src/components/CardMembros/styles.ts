import { StyleSheet } from "react-native";
import {
  cardBackgroundColor,
  cardBorderColor,
  whiteColor,
} from "../../utils/globalStyles";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: cardBackgroundColor,
    borderColor: cardBorderColor,
    borderRadius: 16,
    borderWidth: 1,
    width: "100%",
  },

  cardPrincipal: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    gap: 16,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  containerCard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
  },

  text: {
    letterSpacing: 0.3,
    textAlign: "left",
    color: whiteColor,
  },

  memberName: {
    fontWeight: "900",
    fontSize: 18,
    flexShrink: 1,
  },

  memberNickname: {
    fontWeight: "600",
    fontSize: 14,
    opacity: 0.8,
  },
});
