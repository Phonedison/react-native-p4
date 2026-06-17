import { Header } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBlock: 20,
    width: 330
  },
  iconeContainer: {
    padding: 8,
    backgroundColor: "orange",
    opacity: 0.5,
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 10
  },
  icone: {
    width: 20,
    height: 20,
    tintColor: "#ffffff",
  },
  cardPrincipal: {
    backgroundColor: "grey",
    opacity: 0.5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 330,
    height: 330
  },  
});
