import { FlatList, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CardMembros } from "../../components/CardMembros";
import { styles } from "./styles";

export type Members = {
  id: number;
  nome: string;
  github?: string;
  fotoUrl?: string;
};

const membros: Members[] = [
  {
    id: 1,
    nome: "Igor Brian",
    github: "Bryanxrt",
    fotoUrl: "https://github.com/Bryanxrt.png",
  },
  {
    id: 2,
    nome: "João Vitor Clemente Ferreira",
    github: "JClemente-web",
    fotoUrl: "https://github.com/JClemente-web.png",
  },
  {
    id: 3,
    nome: "João Pedro Motta",
    github: "joaopedrobr3",
    fotoUrl: "https://github.com/joaopedrobr3.png",
  },
  {
    id: 4,
    nome: "Lucas Leal da Silva",
    github: "Phonedison",
    fotoUrl: "https://github.com/Phonedison.png",
  },
  {
    id: 5,
    nome: "Matheus",
    github: "zMatheus77",
    fotoUrl: "https://github.com/zMatheus77.png",
  },
  {
    id: 6,
    nome: "Yan Martins de Oliveira",
    github: "YanYMO",
    fotoUrl: "https://github.com/YanYMO.png",
  },
];

export const MembersScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "top", "bottom"]}
      >
        <View style={styles.viewContainer}>
          <FlatList
            data={membros}
            renderItem={({ item }) => <CardMembros pessoa={item} />}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
