import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type Props = {
  item: {
    id: number;
    name: string;
    admin1?: string;
    country?: string;
  };
  isFavorito: boolean;
  temperatura: number | null | undefined;
  onPress: () => void;
  onFavoritar: () => void;
};

// Monta um card com nome + temperatura da cidade, subtítulo com estado/país, 
// e um botão de favoritar com área de toque ampliada — 
// tudo com aparência condicional (cores/estilos) baseada em se a cidade já é favorita ou não.
export const CityResultItem = ({
  item,
  isFavorito,
  temperatura,
  onPress,
  onFavoritar,
}: Props) => {
  const subtitle = [item.admin1, item.country].filter(Boolean).join(", ");

  return (
    <TouchableOpacity
      style={[styles.resultItem, isFavorito && styles.resultItemSelected]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.resultTextWrapper}>
        <Text style={[styles.text, styles.local]}>
          {item.name} /{" "}
          <Text style={[styles.text, styles.subInfoText]}>
            {temperatura !== undefined && temperatura !== null
              ? `${temperatura}°`
              : "..."}
          </Text>
        </Text>
        {subtitle ? (
          <Text style={[styles.text, styles.description]}>{subtitle}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={onFavoritar}
        style={[styles.checkWrapper, isFavorito && styles.checkWrapperSelected]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.checkIcon}>✓</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};