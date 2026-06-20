import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {createContext, useContext, useEffect, useState} from "react";
import { Favorito } from "../components/LocalFavorito";

type FavoritosContextData = {
  favoritos: Favorito[];
  adicionarFavorito: (cidade: any) => Promise<void>;
  removerFavorito: (id: string) => Promise<void>;
};

const FavoritosContext = createContext({} as FavoritosContextData);

export function FavoritosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);

  async function carregarFavoritos() {
    const json = await AsyncStorage.getItem("@favoritos");

    if (json) {
      setFavoritos(JSON.parse(json));
    }
  }

  useEffect(() => {
    carregarFavoritos();
  }, []);

  async function adicionarFavorito(cidade: any) {
    const existe = favoritos.some(
      (item) => item.id === String(cidade.id)
    );

    if (existe) return;

    const novaLista = [
      ...favoritos,
      {
        id: String(cidade.id),
        nomeCidade: `${cidade.name}, ${cidade.country}`,
        latitude: cidade.latitude,
        longitude: cidade.longitude,
      },
    ];

    setFavoritos(novaLista);

    await AsyncStorage.setItem(
      "@favoritos",
      JSON.stringify(novaLista)
    );
  }

  async function removerFavorito(id: string) {
    const novaLista = favoritos.filter(
      (item) => item.id !== id
    );

    setFavoritos(novaLista);

    await AsyncStorage.setItem(
      "@favoritos",
      JSON.stringify(novaLista)
    );
  }

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        adicionarFavorito,
        removerFavorito,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}