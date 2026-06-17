import { StyleSheet } from "react-native";

const whiteColor: string = "#fff";

const cardBorderColor: string = "rgba(217, 217, 217, 0.55)";
const backgroundColor: string = "rgb(5, 102, 141)";

const cardAlertBackgroundColor: string = "rgba(204, 88, 3,0.8)";
const cardBackgroundColor: string = "rgba(217, 217, 217, 0.13)";

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
    fontSize: 16
  },
  tempTexto: {
    fontSize: 30,
    fontWeight: "600",
    color: whiteColor,
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
    color: whiteColor,
    fontSize: 24,
    fontWeight: 800,
    textAlign: "center",
  },
});
