import React from "react";
import { Text } from "react-native";
import { styles } from "./styles";

type Props = {
  message?: string;
  visible: boolean;
};

export const EmptyState = ({
  message = "Nenhuma cidade encontrada.",
  visible,
}: Props) => {
  if (!visible) return null;
  return <Text style={styles.emptyText}>{message}</Text>;
};