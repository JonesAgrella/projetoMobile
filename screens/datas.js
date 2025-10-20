import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, Pressable, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const MESES_PT = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const DIAS_SEMANA = ['seg','ter','qua','qui','sex','sab','dom'];

function DataScreen() {
  /* === estado do calendário (mês/ano atuais) === */
  const hoje = new Date();
  const [ano, setAno] = React.useState(hoje.getFullYear());
  const [mes, setMes] = React.useState(hoje.getMonth()); // 0-11

  /* === eventos de exemplo (poderia vir de API/AsyncStorage) === */
  // chave no formato AAAA-M-DA: { tipo, titulo, descricao, hora }
  const eventos = React.useMemo(() => ({
    [`${ano}-${mes}-5`]:   { tipo: 'prova',   titulo: 'Prova de Matemática',   descricao: 'Cap. 1 ao 3',      hora: '08:00' },
    [`${ano}-${mes}-12`]:  { tipo: 'evento',  titulo: 'Feira Cultural',        descricao: 'Apresentações',    hora: '14:00' },
    [`${ano}-${mes}-15`]:  { tipo: 'prova',   titulo: 'Prova de Inglês',       descricao: 'Unidades 1 e 2',   hora: '10:00' },
    [`${ano}-${mes}-20`]:  { tipo: 'feriado', titulo: 'Feriado Municipal',     descricao: 'Recesso escolar',  hora: ''     },
    [`${ano}-${mes}-22`]:  { tipo: 'evento',  titulo: 'Reunião de Pais',       descricao: 'Auditório',        hora: '19:00' },
    [`${ano}-${mes}-27`]:  { tipo: 'prova',   titulo: 'Prova de História',     descricao: 'República Velha',  hora: '09:00' },
  }), [ano, mes]);

  /* === cálculo da grade (começando na segunda-feira) === */
  const gerarDias = React.useCallback((y, m) => {
    // primeiro dia do mês (0-dom .. 6-sáb). Convertemos para 0-seg .. 6-dom
    const primeiro = new Date(y, m, 1);
    const offsetSegunda = (primeiro.getDay() + 6) % 7; // quantos vazios antes do dia 1
    const total = new Date(y, m + 1, 0).getDate();

    const cells = [];
    // adiciona células vazias antes do dia 1
    for (let i = 0; i < offsetSegunda; i++) cells.push(0);
    // adiciona dias reais do mês
    for (let d = 1; d <= total; d++) cells.push(d);
    // completa até múltiplo de 7 para fechar a grade
    while (cells.length % 7 !== 0) cells.push(0);
    return cells;
  }, []);

  const dias = React.useMemo(() => gerarDias(ano, mes), [ano, mes, gerarDias]);

  /* === modal de detalhe de evento === */
  const [eventoAtual, setEventoAtual] = React.useState(null);  // objeto de evento ou null
  const [modalVisivel, setModalVisivel] = React.useState(false);

  const abrirModalDia = (diaNumero) => {
    if (!diaNumero) return;
    const key = `${ano}-${mes}-${diaNumero}`;
    const ev = eventos[key];
    if (ev) {
      setEventoAtual({ dia: diaNumero, ...ev });
      setModalVisivel(true);
    }
  };

  /* === navegação de mês (anterior/próximo) === */
  const mudarMes = (delta) => {
    let novoMes = mes + delta;
    let novoAno = ano;
    if (novoMes < 0) { novoMes = 11; novoAno -= 1; }
    if (novoMes > 11) { novoMes = 0;  novoAno += 1; }
    setMes(novoMes);
    setAno(novoAno);
  };

  // largura dinâmica da célula (7 colunas + espaços)
  const larguraTela = Dimensions.get('window').width;
  const cell = Math.floor((larguraTela - 32 /* padding horizontal total */ - 6*6 /* gaps */) / 7);

  // utilitário para saber se é hoje
  const isHoje = (d) =>
    d &&
    d === hoje.getDate() &&
    mes === hoje.getMonth() &&
    ano === hoje.getFullYear();

  // utilitário que retorna estilo do marcador por tipo
  const estiloBadge = (tipo) => {
    if (tipo === 'prova') return styles.badgeProva;
    if (tipo === 'evento') return styles.badgeEvento;
    if (tipo === 'feriado') return styles.badgeFeriado;
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* fundo verde */}
      <View style={styles.fundoVerde}> 
        <View style={styles.boxLogo}>
            <Text style={styles.logo}>Sara</Text>
        </View>
      </View>

      {/* fundo azul */}
      <View style={styles.fundoAzul}>
        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={20} color="#fff" />
          <Text style={styles.textoTitulo}>Calendário</Text>
        </View>

        {/* cabeçalho do calendário com navegação de mês (setas) */}
        <View style={styles.headCalendario}>
          <Pressable onPress={() => mudarMes(-1)} style={styles.navBtn}>
            <Ionicons name="chevron-back" size={18} color="#fff" />
          </Pressable>

          <View style={styles.headCentro}>
            <Ionicons name="calendar" size={18} color="#fff" />
            <Text style={styles.headTitulo}>
              {MESES_PT[mes]} {ano}
            </Text>
          </View>

          <Pressable onPress={() => mudarMes(1)} style={styles.navBtn}>
            <Ionicons name="chevron-forward" size={18} color="#fff" />
          </Pressable>
        </View>

        {/* cabeçalho dos dias da semana */}
        <View style={styles.semana}>
          {DIAS_SEMANA.map((d) => (
            <Text key={d} style={[styles.semanaTexto, { width: cell }]}>{d}</Text>
          ))}
        </View>

        {/* grade dos dias (7 colunas) */}
        <View style={styles.grade}>
          {dias.map((n, i) => {
            const key = `${ano}-${mes}-${n}`;
            const ev = eventos[key];
            const badgeStyle = ev ? estiloBadge(ev.tipo) : null;

            return (
              <Pressable
                key={i}
                onPress={() => abrirModalDia(n)}
                style={[
                  styles.dia,
                  { width: cell, height: cell },
                  !n && styles.diaVazio,                     // célula vazia (fora do mês)
                  isHoje(n) && styles.diaHoje                // contorno especial para o dia atual
                ]}
              >
                {!!n && <Text style={styles.diaTexto}>{n}</Text>}
                {badgeStyle && <View style={[styles.badge, badgeStyle]} />}
              </Pressable>
            );
          })}
        </View>

        {/* legenda dos tipos de evento (prova, evento, feriado) */}
        <View style={styles.legenda}>
          <View style={styles.legendaItem}>
            <View style={[styles.legendaDot, styles.dotProva]} />
            <Text style={styles.legendaTexto}>Prova</Text>
          </View>
          <View style={styles.legendaItem}>
            <View style={[styles.legendaDot, styles.dotEvento]} />
            <Text style={styles.legendaTexto}>Evento</Text>
          </View>
          <View style={styles.legendaItem}>
            <View style={[styles.legendaDot, styles.dotFeriado]} />
            <Text style={styles.legendaTexto}>Feriado</Text>
          </View>
        </View>
      </View>

      {/* modal de detalhes do evento (abre ao tocar em um dia com evento) */}
      <Modal
        transparent
        visible={modalVisivel}
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>
                {eventoAtual?.titulo || 'Evento'}
              </Text>
              <Pressable onPress={() => setModalVisivel(false)}>
                <Ionicons name="close" size={20} color="#fff" />
              </Pressable>
            </View>

            <Text style={styles.modalSub}>
              {eventoAtual?.dia} de {MESES_PT[mes]} de {ano}
            </Text>
            {!!eventoAtual?.hora && (
              <Text style={styles.modalLinha}>Horário: {eventoAtual.hora}</Text>
            )}
            {!!eventoAtual?.descricao && (
              <Text style={styles.modalLinha}>{eventoAtual.descricao}</Text>
            )}
            {!!eventoAtual?.tipo && (
              <View style={styles.modalTagRow}>
                <View style={[
                  styles.modalTag,
                  eventoAtual.tipo === 'prova'   && { backgroundColor: '#4CAF50' },
                  eventoAtual.tipo === 'evento'  && { backgroundColor: '#2487ff' },
                  eventoAtual.tipo === 'feriado' && { backgroundColor: '#F1A208' },
                ]}/>
                <Text style={styles.modalTipo}>{eventoAtual.tipo.toUpperCase()}</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50', // base de fundo do app
  },

  fundoVerde: {
    width: '100%',
    height: 120,                 
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxLogo:{
    backgroundColor: '#1E3A5F',   // cor do retângulo
    paddingHorizontal: 20,          // largura do retângulo
    paddingVertical: 8,             // altura do retângulo
    borderRadius: 10,               // cantos arredondados
    elevation: 4,                   // sombra (Android)
    shadowColor: '#000',          // sombra (IOS)
    shadowOffset: { width: 5, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  fundoAzul: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1E3A5F',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: '#000',          
    shadowOffset: { width: 5, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,                      // espaçamento entre ícone e texto do título
  },

  textoTitulo: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },

  logo: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },

  /* === cabeçalho do calendário + navegação === */
  headCalendario: {
    // linha com botão voltar, mês/ano, botão avançar
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },

  headCentro: {
    // centro com ícone e mês/ano
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headTitulo: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'capitalize', // exibe "setembro" com inicial minúscula (pt-BR)
  },

  navBtn: {
    // área de toque das setas
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  /* === cabeçalho da semana === */
  semana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  semanaTexto: {
    color: '#cfd6e6',
    fontSize: 12,
    textAlign: 'center',
  },

  /* === grade de dias === */
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6, // espaçamento entre as células
    marginBottom: 10,
  },

  dia: {
    borderRadius: 8,
    backgroundColor: '#2f466f',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  diaVazio: {
    backgroundColor: 'transparent',
  },

  diaHoje: {
    // destaque do dia atual (contorno branco suave)
    borderWidth: 1,
    borderColor: '#fff',
  },

  diaTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  badge: {
    // marcador circular no canto inferior direito do dia
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    right: 4,
    bottom: 4,
  },

  badgeProva:   { backgroundColor: '#4CAF50' }, // verde
  badgeEvento:  { backgroundColor: '#2487ff' }, // azul
  badgeFeriado: { backgroundColor: '#F1A208' }, // amarelo

  /* === legenda === */
  legenda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  legendaDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  dotProva:   { backgroundColor: '#4CAF50' },
  dotEvento:  { backgroundColor: '#2487ff' },
  dotFeriado: { backgroundColor: '#F1A208' },

  legendaTexto: {
    color: '#e6eaf3',
    fontSize: 12,
  },

  /* === modal de evento === */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalCard: {
    width: '86%',
    backgroundColor: '#243552',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  modalTitulo: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  modalSub: {
    color: '#cfd6e6',
    marginBottom: 6,
  },

  modalLinha: {
    color: '#e6eaf3',
    marginBottom: 6,
  },

  modalTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },

  modalTag: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  modalTipo: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default DataScreen;
