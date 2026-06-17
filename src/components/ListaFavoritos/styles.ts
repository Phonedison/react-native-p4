import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* estilização padrão dos cards */
  card: {
    backgroundColor: "cardBackgroundColor",
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    borderColor: "cardBorderColor",
    borderRadius: 16,
    borderWidth: 1,
    maxHeight: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  conteudo: {
    padding: 16,
  },
  botaoRemover: {
    padding: 16,
    backgroundColor: "#ff0800",
    width: 60,
    height: "100%",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
  },
  botaoRemoverTexto: {
    color: "white",
    fontSize: 24,
    fontWeight: 800,
    textAlign: "center",
  },
});
