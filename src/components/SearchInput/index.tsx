import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "./styles"

type Props = {
  value: string;
  onSearch: (text: string) => void;
  onClear: (text: string) => void; 
  minLength?: number;
};

// É um campo de busca  que decide, a cada digitação, se o texto 
// já é longo o suficiente pra buscar (onSearch) ou se deve limpar os resultados (onClear), 
// usando um limite configurável (minLength, com padrão de 3).  
export const SearchInput = ({
  value,
  onSearch,
  onClear,
  minLength = 3,
}: Props) => {
  const handleChange = (text: string) => {
  if (text.trim().length >= minLength) {
    onSearch(text);
  } else {
    onClear(text); 
  }
};

  return (
    <View style={styles.searchWrapper}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar cidade..."
        placeholderTextColor="rgba(0, 0, 0, 0.6)"
        value={value}
        onChangeText={handleChange}
      />
    </View>
  );
};