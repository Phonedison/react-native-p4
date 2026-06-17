import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, TextInput} from "react-native";
import { styles } from "./styles";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import iconeAlerta from "../../../assets/Siren.png";

export const Search = () => {
  const [notificacao, setNotificacao] = useState(true);
  const [search, setSearch] = useState("");
 
return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
        <View style={styles.header}>
  <TouchableOpacity style={styles.backBtn}>
    <Text style={styles.backArrow}>← <Text style= {styles.backText}> Voltar</Text></Text>
    
  </TouchableOpacity>

  <TouchableOpacity activeOpacity={0.8}>
    {notificacao && (
      <View style={styles.iconeContainer}>
        <Image source={iconeAlerta} />
      </View>
    )}
  </TouchableOpacity>
</View>
      <View  style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar cidade..."
          placeholderTextColor="rgba(26, 25, 25, 0.6)"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
         />
       </View>
       </SafeAreaView>
    </SafeAreaProvider>
      );
    };
        
        
      
      
        

