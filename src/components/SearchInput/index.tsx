import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "./styles"

type Props = {
  value: string;
  onSearch: (text: string) => void;
  onClear: (text: string) => void; 
  minLength?: number;
};

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