import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AZUL_ESCURO = "#0B3D75";
const AZUL_BOTAO = "#2E8BE6";
const CINZA = "#555555";
const TEXTO = "#1A1A1A";

const handleFaleConosco = () => {
  Linking.openURL("mailto:petify.it@gmail.com");
};

const handlePoliticaPrivacidade = () => {
  Linking.openURL(
    "https://centropaulasouza.sharepoint.com/:b:/r/sites/InternetProtocoloseSeg.deSist.daInformacao-3B.GA.I-MTecPIDes/SiteAssets/Published/4bc56a41-20ce-40c4-86ca-d848129ae9bc/Politica%20de%20Seguran%C3%A7a%20-%20Petify%20(Published).pdf?d=wa10d20c1c8904d44a0ab649f5ecc577e&csf=1&web=1&e=tfqWJm&nav=cHVibGlzaFZpZXc%3D"
  );
};

type Subsecao = {
  subtitulo: string;
  paragrafos: string[];
  lista?: string[];
};

type Secao = {
  titulo: string;
  paragrafos?: string[];
  subsecoes?: Subsecao[];
};

const TERMOS: Secao[] = [
  {
    titulo: "1. Aceitação dos termos",
    paragrafos: [
      "Ao baixar, instalar, acessar ou usar o software Petify, você concorda em cumprir e estar legalmente vinculado aos seguintes Termos de Uso. Se você não concorda com estes termos, não deve utilizar o software.",
    ],
  },
  {
    titulo: "2. Licença de uso",
    subsecoes: [
      {
        subtitulo: "2.1 Concessão de licença",
        paragrafos: [
          "Sujeito ao cumprimento destes Termos de Uso, a Petify concede a você uma licença limitada, não exclusiva, intransferível e revogável para usar o software Petify apenas para fins pessoais e não comerciais.",
        ],
      },
      {
        subtitulo: "2.2 Restrições de uso",
        paragrafos: ["Você concorda em não:"],
        lista: [
          "copiar, modificar ou criar obras derivadas do software;",
          "realizar engenharia reversa, descompilar ou tentar extrair o código-fonte do software;",
          "alugar, arrendar, sublicenciar ou distribuir o software para terceiros.",
        ],
      },
    ],
  },
  {
    titulo: "3. Atualizações",
    paragrafos: [
      "A Petify pode fornecer atualizações, correções de bugs ou outras modificações do software periodicamente. Essas atualizações podem ser instaladas automaticamente, e você concorda em receber essas atualizações como parte do seu uso contínuo do software.",
    ],
  },
  {
    titulo: "4. Propriedade intelectual",
    paragrafos: [
      "Todos os direitos, títulos e interesses relacionados ao software, incluindo, sem limitação, todos os direitos autorais, patentes, segredos comerciais, marcas registradas e outros direitos de propriedade intelectual são de propriedade exclusiva da Petify. Estes Termos de Uso não concedem a você qualquer direito de propriedade intelectual sobre o software.",
    ],
  },
  {
    titulo: "5. Coleta de dados e privacidade",
    subsecoes: [
      {
        subtitulo: "5.1 Coleta de dados",
        paragrafos: [
          "A Petify pode coletar informações sobre o uso do software, incluindo dados técnicos e informações relacionadas ao desempenho, para melhorar a funcionalidade do software.",
        ],
      },
      {
        subtitulo: "5.2 Política de privacidade",
        paragrafos: [
          "O uso do software está sujeito à Política de Privacidade da Petify, que pode ser acessada na Política de Segurança do Petify.",
        ],
      },
    ],
  },
  {
    titulo: "6. Limitação de responsabilidade",
    paragrafos: [
      "Em nenhuma circunstância a Petify será responsável por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes do uso ou da incapacidade de usar o software, mesmo que a Petify tenha sido avisada da possibilidade de tais danos.",
    ],
  },
  {
    titulo: "7. Garantia limitada",
    paragrafos: [
      'O software é fornecido "como está", sem garantias de qualquer tipo, expressas ou implícitas, incluindo, mas não se limitando a garantias de comercialização, adequação a um propósito específico ou não violação.',
    ],
  },
  {
    titulo: "8. Rescisão",
    paragrafos: [
      "Estes Termos de Uso são efetivos até serem rescindidos. A Petify pode rescindir estes Termos de Uso a qualquer momento, sem aviso prévio, se você violar qualquer uma das disposições aqui contidas. Após a rescisão, você deve cessar todo o uso do software e destruir todas as cópias do software em sua posse.",
    ],
  },
  {
    titulo: "9. Disposições gerais",
    subsecoes: [
      {
        subtitulo: "9.1 Legislação aplicável",
        paragrafos: [
          "Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil/São Paulo, sem consideração aos conflitos de leis.",
        ],
      },
      {
        subtitulo: "9.2 Alterações aos termos",
        paragrafos: [
          "A Petify reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As modificações serão efetivas quando publicadas no site da Petify ou quando notificadas a você por qualquer outro meio.",
        ],
      },
      {
        subtitulo: "9.3 Acordo integral",
        paragrafos: [
          "Estes Termos de Uso constituem o acordo integral entre você e a Petify em relação ao uso do software e substituem todos os entendimentos ou acordos anteriores, escritos ou orais, relativos ao assunto.",
        ],
      },
    ],
  },
  {
    titulo: "10. Contato",
    paragrafos: [
      "Se você tiver dúvidas sobre estes Termos de Uso, entre em contato com a Petify em petify.it@gmail.com.",
    ],
  },
];

export default function TermosDeUso() {
  const [aceito, setAceito] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <TouchableOpacity
          style={styles.setaVoltar}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={26} color={AZUL_BOTAO} />
        </TouchableOpacity>

        <Text style={styles.titulo}>Termos de uso</Text>
        <Text style={styles.dataAtualizacao}>
          Última alteração em 26/10/26
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollConteudo}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.boasVindas}>Boas-vindas ao Petify!</Text>
        <Text style={styles.paragrafo}>
          Antes de usar o aplicativo, leia com atenção os termos abaixo.
        </Text>

        {TERMOS.map((secao) => (
          <View key={secao.titulo} style={styles.secao}>
            <Text style={styles.tituloSecao}>{secao.titulo}</Text>

            {secao.titulo === "10. Contato" ? (
              <Text style={styles.paragrafo}>
                Se você tiver dúvidas sobre estes Termos de Uso, entre em
                contato com a Petify em{" "}
                <Text
                  style={styles.link}
                  onPress={handleFaleConosco}
                  accessibilityRole="link"
                >
                  petify.it@gmail.com
                </Text>
                .
              </Text>
            ) : (
              secao.paragrafos?.map((p, i) => (
                <Text key={i} style={styles.paragrafo}>
                  {p}
                </Text>
              ))
            )}

            {secao.subsecoes?.map((sub) => (
              <View key={sub.subtitulo} style={styles.subsecao}>
                <Text style={styles.subtitulo}>{sub.subtitulo}</Text>

                {sub.subtitulo === "5.2 Política de privacidade" ? (
                  <Text style={styles.paragrafo}>
                    O uso do software está sujeito à Política de Privacidade da
                    Petify, que pode ser acessada na{" "}
                    <Text
                      style={styles.link}
                      onPress={handlePoliticaPrivacidade}
                      accessibilityRole="link"
                    >
                      Política de Segurança do Petify
                    </Text>
                    .
                  </Text>
                ) : (
                  sub.paragrafos.map((p, i) => (
                    <Text key={i} style={styles.paragrafo}>
                      {p}
                    </Text>
                  ))
                )}

                {sub.lista?.map((item, i) => (
                  <View key={i} style={styles.itemLista}>
                    <Text style={styles.bolinha}>•</Text>
                    <Text style={[styles.paragrafo, styles.textoItem]}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.rodape}>
        <TouchableOpacity
          style={styles.linhaCheck}
          activeOpacity={0.7}
          onPress={() => setAceito(!aceito)}
        >
          <Ionicons
            name={aceito ? "checkbox" : "square-outline"}
            size={22}
            color={aceito ? AZUL_BOTAO : CINZA}
          />
          <Text style={styles.textoCheck}>
            Li e concordo com os Termos de uso e Diretrizes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topo: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 14,
    paddingHorizontal: 20,
  },
  setaVoltar: {
    position: "absolute",
    left: 20,
    top: 14,
    zIndex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: AZUL_ESCURO,
    marginTop: 2,
  },
  dataAtualizacao: {
    fontSize: 11,
    color: CINZA,
    marginTop: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollConteudo: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  boasVindas: {
    fontSize: 18,
    color: AZUL_ESCURO,
    fontWeight: "600",
    marginBottom: 4,
  },
  secao: {
    marginTop: 18,
  },
  tituloSecao: {
    fontSize: 17,
    fontWeight: "bold",
    color: AZUL_ESCURO,
    marginBottom: 4,
  },
  subsecao: {
    marginTop: 8,
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: AZUL_ESCURO,
    marginBottom: 2,
  },
  paragrafo: {
    fontSize: 15,
    lineHeight: 22,
    color: TEXTO,
  },
  itemLista: {
    flexDirection: "row",
    marginTop: 4,
    paddingRight: 8,
  },
  bolinha: {
    fontSize: 15,
    lineHeight: 22,
    color: TEXTO,
    marginRight: 8,
    marginLeft: 6,
  },
  textoItem: {
    flex: 1,
  },
  link: {
    color: AZUL_BOTAO,
    textDecorationLine: "underline",
  },
  rodape: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEF1F5",
    backgroundColor: "#FFFFFF",
  },
  linhaCheck: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  textoCheck: {
    fontSize: 12.5,
    color: TEXTO,
    marginLeft: 8,
    flexShrink: 1,
  },
  botao: {
    backgroundColor: AZUL_BOTAO,
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: "center",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
  },
});