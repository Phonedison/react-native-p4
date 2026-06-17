import React, { useState, useEffect, useRef } from "react";
import {View,Text,TextInput,TouchableOpacity,FlatList,ActivityIndicator,} from "react-native";
import { BlurView } from "expo-blur";
import { styles } from "./styles";

interface City {
  id: number;
  name: string;
  admin1: string; 
  country: string;
  latitude: number;
  longitude: number;
}

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (search.trim().length < 2) {
      setCities([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            search
          )}&count=10&language=pt&format=json`
        );
        const data = await res.json();
        setCities(data.results ?? []);
      } catch {
        setCities([]);
      } finally {
        setLoading(false);
      }
    }, 400); 
  }, [search]);

  const handleSelect = (city: City) => {
    setSelected(city.id);
    
    console.log("Cidade selecionada:", city);
  };

  const renderItem = ({ item }: { item: City }) => {
    const isSelected = selected === item.id;
    const subtitle = [item.admin1, item.country].filter(Boolean).join(", ");

    return (
      <TouchableOpacity
        style={[styles.resultItem, isSelected && styles.resultItemSelected]}
        onPress={() => handleSelect(item)}
        activeOpacity={0.85}
      >
        <View style={styles.resultTextWrapper}>
          <Text style={styles.resultName}>{item.name}</Text>
          {subtitle ? (
            <Text style={styles.resultSub}>{subtitle}</Text>
          ) : null}
        </View>
        <View
          style={[
            styles.checkWrapper,
            isSelected && styles.checkWrapperSelected,
          ]}
        >
          <Text style={styles.checkIcon}>✓</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <View style={styles.bellWrapper}>
          <Text style={styles.bellIcon}>🔔</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </View>
      </View>

      
      <BlurView intensity={50} tint="light" style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar cidade..."
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.searchIcon}>🔍</Text>
        )}
      </BlurView>

      
      <FlatList
        data={cities}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          search.trim().length >= 2 && !loading ? (
            <Text style={styles.emptyText}>Nenhuma cidade encontrada.</Text>
          ) : null
        }
      />
    </View>
  );
}
