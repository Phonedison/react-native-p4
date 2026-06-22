import React from "react";
import { Text } from "react-native";
import { styles } from "./styles";

type Props = {
  message?: string;
  visible: boolean;
};

// Componente reutilizável que mostra uma mensagem de "lista vazia" 
// mas só quando a prop visible for true; caso contrário, não renderiza nada.
export const EmptyState = ({
  message = "Nenhuma cidade encontrada.",
  visible,
}: Props) => {
  if (!visible) return null;
  return <Text style={styles.emptyText}>{message}</Text>;
};