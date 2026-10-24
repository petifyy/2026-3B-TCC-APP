
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type ThemeColors = {
  fundo: string;
  card: string;
  texto: string;
  secundario: string;
  borda: string;
  primario: string;
  destaque: string;
  input: string;
  tabBar: string;
};

type ThemeContextType = {
  modoNoturno: boolean;
  alternarModoNoturno: (valor: boolean) => Promise<void>;
  cores: ThemeColors;
};

const coresClaras: ThemeColors = {
  fundo: "#F4F8FB",
  card: "#FFFFFF",
  texto: "#004468",
  secundario: "#647985",
  borda: "#DCE7EE",
  primario: "#004468",
  destaque: "#66BDEA",
  input: "#FFFFFF",
  tabBar: "#FFFFFF",
};

const coresEscuras: ThemeColors = {
  fundo: "#101D2A",
  card: "#1D3040",
  texto: "#F0F6FA",
  secundario: "#B0C3D2",
  borda: "#344B5C",
  primario: "#66BDEA",
  destaque: "#66BDEA",
  input: "#182A38",
  tabBar: "#142533",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [modoNoturno, setModoNoturno] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("@petify/modoNoturno")
      .then((valor) => {
        if (valor !== null) {
          setModoNoturno(valor === "true");
        }
      })
      .catch((erro) => {
        console.error("Erro ao carregar o tema:", erro);
      });
  }, []);

  const alternarModoNoturno = useCallback(async (valor: boolean) => {
    setModoNoturno(valor);

    try {
      await AsyncStorage.setItem("@petify/modoNoturno", String(valor));
    } catch (erro) {
      console.error("Erro ao salvar o tema:", erro);
    }
  }, []);

  const cores = modoNoturno ? coresEscuras : coresClaras;

  return (
    <ThemeContext.Provider
      value={{ modoNoturno, alternarModoNoturno, cores }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const contexto = useContext(ThemeContext);

  if (!contexto) {
    throw new Error("useTheme deve ser usado dentro de ThemeProvider.");
  }

  return contexto;
}
