import { StyleSheet } from "react-native";
import {
  cardBackgroundColor,
  cardBorderColor,
  cardRemoveBackgroundColor,
  whiteColor,
} from "../../utils/globalStyles";

export const styles = StyleSheet.create({
  loading: { padding: 20, justifyContent: "center" },
  card: {
    backgroundColor: cardBackgroundColor,
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: cardBorderColor,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  conteudo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    gap: 24,
  },
  cidadeTexto: {
    color: whiteColor,
    fontWeight: "300",
    fontSize: 14,
    flexShrink: 1,
  },
  tempTexto: {
    fontSize: 22,
    fontWeight: "600",
    color: whiteColor,
  },
  botaoRemover: {
    backgroundColor: cardRemoveBackgroundColor,
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  botaoRemoverTexto: {
    color: whiteColor,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
});
