import { StyleSheet } from "react-native";
import {cardBorderColor,whiteColor,} from "../../utils/globalStyles";

export const styles = StyleSheet.create({
searchInput: {
    flex: 1,
    color: whiteColor,
    fontSize: 15,
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
})