import { StyleSheet } from "react-native";
import { backgroundColor } from "../../utils/globalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  viewContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  listContent: {
    paddingVertical: 64,
    paddingHorizontal: 16,
  },
  rowSeparator: {
    height: 16,
  },
});
