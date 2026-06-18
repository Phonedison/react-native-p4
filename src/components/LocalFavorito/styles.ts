import { StyleSheet } from "react-native";
import {
  cardBackgroundColor,
  cardBorderColor,
  cardRemoveBackgroundColor,
  whiteColor,
} from "../../utils/globalStyles";
export const styles = StyleSheet.create({
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
    maxHeight: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  conteudo: {
    padding: 16,
  },
  cidadeTexto: {
    color: whiteColor,
    fontWeight: "600",
    fontSize: 16,
  },
  tempTexto: {
    fontSize: 30,
    fontWeight: "600",
    color: whiteColor,
  },
  botaoRemover: {
    padding: 16,
    backgroundColor: cardRemoveBackgroundColor,
    width: 60,
    height: "100%",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
  },
  botaoRemoverTexto: {
    color: whiteColor,
    fontSize: 24,
    fontWeight: 800,
    textAlign: "center",
  },
});
