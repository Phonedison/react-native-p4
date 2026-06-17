import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View, TextInput, FlatList } from "react-native";
import { styles } from "./styles";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import iconeAlerta from "../../../assets/Siren.png";
import { useBuscarClima } from "../../hooks";

export const SearchScreen = () => {
  const [notificacao, setNotificacao] = useState(true);
  const [search, setSearch] = useState("");
  const [favoritos, setFavoritos] = useState<Set<number>>(new Set());

  const { locaisEncontrados, loading, buscarCidade, limparResultados } = useBuscarClima();

  const handleFavoritar = (id: number) => {
    setFavoritos(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  

  const renderItem = ({ item }: { item: any }) => {
    const isFavorito = favoritos.has(item.id);
    const subtitle = [item.admin1, item.country].filter(Boolean).join(", ");

    return (
      <TouchableOpacity
        style={[styles.resultItem, isFavorito && styles.resultItemSelected]}
        onPress={() => console.log("navegar para detalhes de", item.name)}
        activeOpacity={0.85}
      >
        <View style={styles.resultTextWrapper}>
          <Text style={[styles.text, styles.local]}>{item.name}</Text>
          {subtitle ? <Text style={[styles.text, styles.description]}>{subtitle}</Text> : null}
        </View>

        <TouchableOpacity
          onPress={() => handleFavoritar(item.id)}
          style={[styles.checkWrapper, isFavorito && styles.checkWrapperSelected]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.checkIcon}>✓</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn}>
            <Text style={styles.backArrow}>← <Text style={styles.backText}>Voltar</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            {notificacao && (
              <View style={styles.iconeContainer}>
                <Image source={iconeAlerta} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar cidade..."
            placeholderTextColor="rgba(26, 25, 25, 0.6)"
            value={search}
            onChangeText={(text) => {
            setSearch(text);
            if (text.trim().length >= 3) {
            buscarCidade(text); 
            } else {
            limparResultados(); 
            }
           }}
          />
          
        </View>

        <FlatList
          data={locaisEncontrados}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          ListEmptyComponent={
            search.trim().length >= 3 && !loading
              ? <Text style={styles.emptyText}>Nenhuma cidade encontrada.</Text>
              : null
          }
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};
        
      
      
        

