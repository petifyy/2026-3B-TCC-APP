
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

type Aba = "Geral" | "Alertas";
type Idioma = "Português" | "English" | "Español";
type TipoAlerta = "Temperatura" | "Som" | "Local" | "Movimentação";
type Detalhamento = "Tudo" | "Só preocupantes";

export default function Preferences() {
  const [aba, setAba] = useState<Aba>("Geral");
  const [idioma, setIdioma] = useState<Idioma>("Português");
  const [idiomaAberto, setIdiomaAberto] = useState(false);
  const [modoNoturno, setModoNoturno] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);
  const [tipos, setTipos] = useState<TipoAlerta[]>([
    "Temperatura",
    "Som",
    "Local",
    "Movimentação",
  ]);
  const [detalhamento, setDetalhamento] = useState<Detalhamento>("Tudo");
  const [loading, setLoading] = useState(true);

  const carregarPreferencias = useCallback(async () => {
    try {
      const dados = await AsyncStorage.multiGet([
        "@petify/idioma",
        "@petify/modoNoturno",
        "@petify/notificacoes",
      ]);

      const valores = Object.fromEntries(dados);

      if (valores["@petify/idioma"]) {
        setIdioma(valores["@petify/idioma"] as Idioma);
      }
      if (valores["@petify/modoNoturno"] !== null) {
        setModoNoturno(valores["@petify/modoNoturno"] === "true");
      }
      if (valores["@petify/notificacoes"] !== null) {
        setNotificacoes(valores["@petify/notificacoes"] === "true");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as preferências.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarPreferencias();
    }, [carregarPreferencias])
  );

  const salvar = async (chave: string, valor: string) => {
    try {
      await AsyncStorage.setItem(chave, valor);
    } catch {
      Alert.alert("Erro", "Não foi possível salvar essa preferência.");
    }
  };

  const alterarIdioma = async (valor: Idioma) => {
    setIdioma(valor);
    setIdiomaAberto(false);
    await salvar("@petify/idioma", valor);
  };

  const alterarModoNoturno = async (valor: boolean) => {
    setModoNoturno(valor);
    await salvar("@petify/modoNoturno", String(valor));
  };

  const alterarNotificacoes = async (valor: boolean) => {
    setNotificacoes(valor);
    await salvar("@petify/notificacoes", String(valor));
  };

  const alternarTipo = (tipo: TipoAlerta) => {
    setTipos((atuais) =>
      atuais.includes(tipo)
        ? atuais.filter((item) => item !== tipo)
        : [...atuais, tipo]
    );
  };

  const escuro = modoNoturno;
  const fundo = escuro ? "#101B29" : "#FFFFFF";
  const card = escuro ? "#1B2A3B" : "#F5F9FC";
  const texto = escuro ? "#FFFFFF" : "#003C75";
  const secundario = escuro ? "#C1CDDA" : "#6F7E8D";
  const borda = escuro ? "#35475A" : "#DFEAF3";

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: fundo }]}>
        <ActivityIndicator size="large" color="#2E98FE" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: fundo }}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>‹ Voltar</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: texto }]}>Preferências</Text>
      <Text style={[styles.subtitle, { color: secundario }]}>
        Personalize sua experiência no Petify.
      </Text>

      <View style={[styles.card, { backgroundColor: card, borderColor: borda }]}>
        <View style={[styles.tabs, { borderBottomColor: borda }]}>
          {(["Geral", "Alertas"] as Aba[]).map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.tab,
                aba === item && styles.tabActive,
                aba === item && { borderBottomColor: "#2E98FE" },
              ]}
              onPress={() => setAba(item)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: aba === item ? "#2E98FE" : secundario },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {aba === "Geral" ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: texto }]}>
              Geral
            </Text>

            <TouchableOpacity
              style={styles.row}
              onPress={() => setIdiomaAberto(!idiomaAberto)}
            >
              <View style={styles.info}>
                <Text style={[styles.label, { color: texto }]}>Idioma</Text>
                <Text style={[styles.description, { color: secundario }]}>
                  {idioma}
                </Text>
              </View>
              <Text style={styles.actionText}>
                {idiomaAberto ? "Fechar" : "Alterar"}⌄
              </Text>
            </TouchableOpacity>

            {idiomaAberto && (
              <View style={styles.choices}>
                {(["Português", "English", "Español"] as Idioma[]).map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.choice,
                      { borderColor: borda },
                      idioma === item && styles.choiceActive,
                    ]}
                    onPress={() => alterarIdioma(item)}
                  >
                    <Text
                      style={[
                        styles.choiceText,
                        { color: idioma === item ? "#2E98FE" : texto },
                      ]}
                    >
                      {item} {idioma === item ? "✓" : ""}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={[styles.row, { borderTopWidth: 1, borderTopColor: borda }]}>
              <View style={styles.info}>
                <Text style={[styles.label, { color: texto }]}>
                  Modo Noturno
                </Text>
                <Text style={[styles.description, { color: secundario }]}>
                  Usar uma aparência escura nesta tela.
                </Text>
              </View>
              <Switch
                value={modoNoturno}
                onValueChange={alterarModoNoturno}
                trackColor={{ false: "#C8D5E0", true: "#2E98FE" }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={[styles.row, { borderTopWidth: 1, borderTopColor: borda }]}>
              <View style={styles.info}>
                <Text style={[styles.label, { color: texto }]}>
                  Notificações
                </Text>
                <Text style={[styles.description, { color: secundario }]}>
                  Ativar ou desativar as notificações do app.
                </Text>
              </View>
              <Switch
                value={notificacoes}
                onValueChange={alterarNotificacoes}
                trackColor={{ false: "#C8D5E0", true: "#2E98FE" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: texto }]}>
              Tipo
            </Text>
            <Text style={[styles.description, { color: secundario }]}>
              Selecione os tipos de alerta que deseja visualizar.
            </Text>

            <View style={styles.choices}>
              {(["Temperatura", "Som", "Local", "Movimentação"] as TipoAlerta[]).map((item) => {
                const ativo = tipos.includes(item);
                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.choice,
                      { borderColor: borda },
                      ativo && styles.choiceActive,
                    ]}
                    onPress={() => alternarTipo(item)}
                  >
                    <Text
                      style={[
                        styles.choiceText,
                        { color: ativo ? "#2E98FE" : texto },
                      ]}
                    >
                      {ativo ? "✓  " : ""}{item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.sectionTitle, { color: texto, marginTop: 28 }]}>
              Detalhamento
            </Text>
            <Text style={[styles.description, { color: secundario }]}>
              Escolha o nível de detalhamento dos alertas.
            </Text>

            <View style={styles.choices}>
              {(["Tudo", "Só preocupantes"] as Detalhamento[]).map((item) => {
                const ativo = detalhamento === item;
                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.choice,
                      { borderColor: borda },
                      ativo && styles.choiceActive,
                    ]}
                    onPress={() => setDetalhamento(item)}
                  >
                    <Text
                      style={[
                        styles.choiceText,
                        { color: ativo ? "#2E98FE" : texto },
                      ]}
                    >
                      {ativo ? "◉  " : "○  "}{item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 50,
  },
  back: {
    fontSize: 16,
    color: "#2E98FE",
    fontFamily: "Nunito-SemiBold",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Nunito-Bold",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Nunito-Regular",
    marginTop: 5,
    marginBottom: 24,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 15,
    fontFamily: "Nunito-Bold",
  },
  section: {
    padding: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: "Nunito-Bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    gap: 12,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontFamily: "Nunito-Bold",
  },
  description: {
    fontSize: 12,
    fontFamily: "Nunito-Regular",
    marginTop: 4,
    lineHeight: 18,
  },
  actionText: {
    color: "#2E98FE",
    fontSize: 13,
    fontFamily: "Nunito-Bold",
  },
  choices: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
    marginTop: 12,
  },
  choice: {
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  choiceActive: {
    backgroundColor: "#E5F3FF",
    borderColor: "#2E98FE",
  },
  choiceText: {
    fontSize: 13,
    fontFamily: "Nunito-SemiBold",
  },
});

