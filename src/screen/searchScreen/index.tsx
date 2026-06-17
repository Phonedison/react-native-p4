import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity} from "react-native";
import {styles} from './styles'

 
export default function SearchScreen() {
  
  const [search, setSearch] = useState("");
 
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
 
        
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder=""
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={search}
            onChangeText={setSearch}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>
 
</View>
   
  );
}