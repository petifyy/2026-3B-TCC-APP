
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TipoAlerta = "Temperatura" | "Som" | "Local" | "Movimentação";
type Detalhamento = "Tudo" | "Só preocupantes";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function AlertPreferencesModal({ visible, onClose }: Props) {
  const [tipos, setTipos] = useState<TipoAlerta[]>([
    "Temperatura",
    "Som",
    "Local",
    "Movimentação",
  ]);
  const [detalhamento, setDetalhamento] = useState<Detalhamento>("Tudo");

  const translateY = useRef(new Animated.Value(700)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      translateY.setValue(700);
      overlayOpacity.setValue(0);

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 25,
          stiffness: 180,
          mass: 0.9,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, overlayOpacity]);

  const fechar = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 700,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onClose();
      }
    });
  };

  const alternarTipo = (tipo: TipoAlerta) => {
    setTipos((atuais) =>
      atuais.includes(tipo)
        ? atuais.filter((item) => item !== tipo)
        : [...atuais, tipo]
    );
  };

  const azul = "#2E98FE";
  const texto = "#003C75";
  const secundario = "#6F7E8D";
  const borda = "#DFEAF3";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={fechar}
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.overlay,
            { opacity: overlayOpacity },
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={fechar}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            { transform: [{ translateY }] },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text style={[styles.title, { color: texto }]}>
                Alertas
              </Text>
              <Text style={[styles.subtitle, { color: secundario }]}>
                Personalize os alertas do seu pet.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={fechar}
              activeOpacity={0.7}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.divider, { backgroundColor: borda }]} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            <Text style={[styles.sectionTitle, { color: texto }]}>
              Tipo
            </Text>

            <Text style={[styles.description, { color: secundario }]}>
              Selecione os tipos de alerta que deseja visualizar.
            </Text>

            <View style={styles.choices}>
              {(["Temperatura", "Som", "Local", "Movimentação"] as TipoAlerta[]).map(
                (item) => {
                  const ativo = tipos.includes(item);

                  return (
                    <TouchableOpacity
                      key={item}
                      activeOpacity={0.7}
                      style={[
                        styles.choice,
                        {
                          borderColor: ativo ? azul : borda,
                          backgroundColor: ativo ? "#E5F3FF" : "#FFFFFF",
                        },
                      ]}
                      onPress={() => alternarTipo(item)}
                    >
                      <Text
                        style={[
                          styles.choiceText,
                          { color: ativo ? azul : texto },
                        ]}
                      >
                        {ativo ? "✓  " : ""}
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </View>

            <View style={[styles.sectionDivider, { backgroundColor: borda }]} />

            <Text style={[styles.sectionTitle, { color: texto }]}>
              Detalhamento
            </Text>

            <Text style={[styles.description, { color: secundario }]}>
              Escolha o nível de detalhamento dos alertas.
            </Text>

            <View style={styles.details}>
              {(["Tudo", "Só preocupantes"] as Detalhamento[]).map((item) => {
                const ativo = detalhamento === item;

                return (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.7}
                    style={[
                      styles.detailOption,
                      {
                        borderColor: ativo ? azul : borda,
                        backgroundColor: ativo ? "#E5F3FF" : "#FFFFFF",
                      },
                    ]}
                    onPress={() => setDetalhamento(item)}
                  >
                    <View
                      style={[
                        styles.radio,
                        { borderColor: ativo ? azul : "#AABAC8" },
                      ]}
                    >
                      {ativo && <View style={styles.radioInner} />}
                    </View>

                    <Text
                      style={[
                        styles.choiceText,
                        { color: ativo ? azul : texto },
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.doneButton}
              onPress={fechar}
              activeOpacity={0.8}
            >
              <Text style={styles.doneButtonText}>Concluir</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 15, 35, 0.62)",
    justifyContent: "flex-end",
  },
  card: {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    paddingTop: 22,
    paddingBottom: 20,
    elevation: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingBottom: 18,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "Nunito-Bold",
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Nunito-Regular",
    marginTop: 5,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EDF5FC",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  closeText: {
    color: "#003C75",
    fontSize: 16,
  },
  divider: {
    height: 1,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: "Nunito-Bold",
  },
  description: {
    fontSize: 12,
    fontFamily: "Nunito-Regular",
    marginTop: 7,
    lineHeight: 18,
  },
  choices: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
    marginTop: 16,
  },
  choice: {
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
  },
  choiceText: {
    fontSize: 13,
    fontFamily: "Nunito-SemiBold",
  },
  sectionDivider: {
    height: 1,
    marginVertical: 25,
  },
  details: {
    gap: 10,
    marginTop: 16,
  },
  detailOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 12,
    gap: 10,
  },
  radio: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#2E98FE",
  },
  doneButton: {
    backgroundColor: "#2E98FE",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginTop: 26,
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Nunito-Bold",
  },
});
