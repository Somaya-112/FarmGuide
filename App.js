import React, { useEffect, useRef, useState } from 'react';
import {
  Animated, BackHandler, Easing, Pressable, SafeAreaView, ScrollView,
  StyleSheet, Text, View, Platform, StatusBar as RNStatusBar, UIManager, LayoutAnimation,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LAYER, BROILER } from './data';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const C = {
  forest: '#0B3D2A',
  deep: '#06281B',
  leaf: '#1F8A4C',
  lime: '#8FD694',
  mint: '#E6F4EA',
  paper: '#F6FBF7',
  ink: '#10261B',
  muted: '#5B7567',
  tiger: '#F28C1E',
};

/* ---------------- Splash with roaring tiger ---------------- */
function Splash({ onDone }) {
  const roar = useRef(new Animated.Value(0)).current;
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(roar, { toValue: 1, duration: 450, easing: Easing.out(Easing.back(2)), useNativeDriver: true }),
        Animated.timing(roar, { toValue: 0, duration: 650, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.delay(250),
      ])
    ).start();
    const wave = (v, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(v, { toValue: 1, duration: 1400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: true }),
        ])
      ).start();
    wave(ring1, 0);
    wave(ring2, 700);
    const t = setTimeout(onDone, 4200);
    return () => clearTimeout(t);
  }, []);

  const scale = roar.interpolate({ inputRange: [0, 1], outputRange: [1, 1.22] });
  const shake = roar.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['0deg', '-5deg', '5deg', '-4deg', '0deg'],
  });
  const ringStyle = (v) => ({
    opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] }),
    transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.6, 2.1] }) }],
  });
  const bubble = {
    opacity: roar.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 1, 1] }),
    transform: [{ scale: roar.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.1] }) }],
  };

  return (
    <Pressable style={s.splash} onPress={onDone}>
      <View style={s.leafA} />
      <View style={s.leafB} />
      <View style={s.tigerStage}>
        <Animated.View style={[s.ring, ringStyle(ring1)]} />
        <Animated.View style={[s.ring, ringStyle(ring2)]} />
        <Animated.Text style={[s.roarText, bubble]}>ROAR!</Animated.Text>
        <Animated.Text style={[s.tiger, { transform: [{ scale }, { rotate: shake }] }]}>🐯</Animated.Text>
      </View>
      <Animated.View style={{ opacity: fade, alignItems: 'center' }}>
        <Text style={s.brand}>Farm Guide</Text>
        <Text style={s.brandSub}>Layer & broiler, simply explained</Text>
        <Text style={s.tapHint}>Tap to start</Text>
      </Animated.View>
    </Pressable>
  );
}

/* ---------------- Home: two options ---------------- */
function Home({ onOpen }) {
  return (
    <SafeAreaView style={s.screenGreen}>
      <View style={s.homeHead}>
        <Text style={s.homeEmoji}>🐯</Text>
        <Text style={s.homeTitle}>What do you want to read?</Text>
      </View>
      <View style={s.homeBody}>
        <Pressable style={({ pressed }) => [s.bigBtn, { backgroundColor: C.leaf }, pressed && s.pressed]} onPress={() => onOpen('layer')}>
          <Text style={s.bigIcon}>🥚</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.bigTitle}>Layer Management Schedule</Text>
            <Text style={s.bigSub}>Vaccines, deworming, medication, lighting, biosecurity</Text>
          </View>
        </Pressable>
        <Pressable style={({ pressed }) => [s.bigBtn, { backgroundColor: C.tiger }, pressed && s.pressed]} onPress={() => onOpen('broiler')}>
          <Text style={s.bigIcon}>🐔</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.bigTitle}>Broiler Farming Guide</Text>
            <Text style={s.bigSub}>Vaccination, brooding, biosecurity, medication, emergency</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- Answer renderer ---------------- */
function Answer({ blocks }) {
  return (
    <View style={s.answer}>
      {blocks.map((b, i) => {
        if (b.type === 'text') return <Text key={i} style={s.p}>{b.text}</Text>;
        if (b.type === 'list')
          return (
            <View key={i}>
              {b.items.map((t, j) => (
                <View key={j} style={s.li}>
                  <View style={s.dot} />
                  <Text style={[s.p, { flex: 1 }]}>{t}</Text>
                </View>
              ))}
            </View>
          );
        return (
          <View key={i}>
            {b.rows.map((row, r) => (
              <View key={r} style={s.rowCard}>
                <Text style={s.rowTitle}>{row[0]}</Text>
                {row.slice(1).map((cell, c) => (
                  <View key={c} style={s.kv}>
                    <Text style={s.k}>{b.cols[c + 1]}</Text>
                    <Text style={s.v}>{cell}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}

/* ---------------- Question list ---------------- */
function QuestionList({ kind, onBack }) {
  const isLayer = kind === 'layer';
  const items = isLayer ? LAYER : BROILER;
  const accent = isLayer ? C.leaf : C.tiger;
  const [open, setOpen] = useState(null);

  const toggle = (i) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(open === i ? null : i);
  };

  return (
    <SafeAreaView style={s.screenPaper}>
      <View style={[s.topBar, { backgroundColor: isLayer ? C.forest : '#B45F0A' }]}>
        <Pressable onPress={onBack} hitSlop={12} style={s.backBtn}>
          <Text style={s.backTxt}>‹</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={s.topTitle}>{isLayer ? 'Layer Management Schedule' : 'Broiler Farming Guide'}</Text>
          <Text style={s.topSub}>{items.length} topics · tap a question</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 40 }}>
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <View key={i} style={[s.qCard, isOpen && { borderColor: accent }]}>
              <Pressable onPress={() => toggle(i)} style={s.qHead} android_ripple={{ color: C.mint }}>
                <View style={[s.qBadge, { backgroundColor: accent }]}>
                  <Text style={s.qBadgeTxt}>{i + 1}</Text>
                </View>
                <Text style={s.qText}>{it.q}</Text>
                <Text style={[s.chev, { color: accent }]}>{isOpen ? '▲' : '▼'}</Text>
              </Pressable>
              {isOpen && <Answer blocks={it.a} />}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Root ---------------- */
export default function App() {
  const [screen, setScreen] = useState('splash'); // splash | home | layer | broiler

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen === 'layer' || screen === 'broiler') { setScreen('home'); return true; }
      return false;
    });
    return () => sub.remove();
  }, [screen]);

  return (
    <View style={{ flex: 1, backgroundColor: C.forest }}>
      <StatusBar style={screen === 'layer' || screen === 'broiler' ? 'light' : 'light'} />
      {screen === 'splash' && <Splash onDone={() => setScreen('home')} />}
      {screen === 'home' && <Home onOpen={setScreen} />}
      {(screen === 'layer' || screen === 'broiler') && (
        <QuestionList key={screen} kind={screen} onBack={() => setScreen('home')} />
      )}
    </View>
  );
}

const topPad = Platform.OS === 'android' ? RNStatusBar.currentHeight || 24 : 0;

const s = StyleSheet.create({
  splash: { flex: 1, backgroundColor: C.forest, alignItems: 'center', justifyContent: 'center' },
  leafA: { position: 'absolute', top: -90, left: -80, width: 260, height: 260, borderRadius: 130, backgroundColor: '#12503A' },
  leafB: { position: 'absolute', bottom: -110, right: -90, width: 300, height: 300, borderRadius: 150, backgroundColor: '#0E4631' },
  tigerStage: { width: 260, height: 260, alignItems: 'center', justifyContent: 'center', marginBottom: 28 },
  ring: { position: 'absolute', width: 190, height: 190, borderRadius: 95, borderWidth: 4, borderColor: C.lime },
  tiger: { fontSize: 130, lineHeight: 160, includeFontPadding: false },
  roarText: { position: 'absolute', top: 4, fontSize: 30, fontWeight: '900', color: C.tiger, letterSpacing: 3 },
  brand: { fontSize: 38, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  brandSub: { fontSize: 15, color: C.lime, marginTop: 6 },
  tapHint: { marginTop: 36, fontSize: 13, color: '#9CC9AE' },

  screenGreen: { flex: 1, backgroundColor: C.forest, paddingTop: topPad },
  homeHead: { alignItems: 'center', paddingTop: 36, paddingBottom: 24 },
  homeEmoji: { fontSize: 64, lineHeight: 80 },
  homeTitle: { fontSize: 24, fontWeight: '800', color: '#fff', marginTop: 6, textAlign: 'center' },
  homeBody: { flex: 1, paddingHorizontal: 18, gap: 18, paddingTop: 10 },
  bigBtn: { flexDirection: 'row', alignItems: 'center', borderRadius: 22, padding: 22, gap: 16, elevation: 5 },
  bigIcon: { fontSize: 46, lineHeight: 56 },
  bigTitle: { fontSize: 21, fontWeight: '800', color: '#fff' },
  bigSub: { fontSize: 13.5, color: 'rgba(255,255,255,0.88)', marginTop: 4, lineHeight: 19 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },

  screenPaper: { flex: 1, backgroundColor: C.paper },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingTop: topPad + 12, paddingBottom: 16, paddingHorizontal: 14 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  backTxt: { color: '#fff', fontSize: 30, lineHeight: 34, fontWeight: '700' },
  topTitle: { color: '#fff', fontSize: 19, fontWeight: '800' },
  topSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12.5, marginTop: 2 },

  qCard: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 12, borderWidth: 1.5, borderColor: '#DCEBE1', overflow: 'hidden' },
  qHead: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  qBadge: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  qBadgeTxt: { color: '#fff', fontWeight: '800', fontSize: 14 },
  qText: { flex: 1, fontSize: 15.5, fontWeight: '700', color: C.ink, lineHeight: 21 },
  chev: { fontSize: 13 },

  answer: { paddingHorizontal: 14, paddingBottom: 14, paddingTop: 2, backgroundColor: C.paper },
  p: { fontSize: 14.5, lineHeight: 21, color: C.ink, marginTop: 8 },
  li: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.leaf, marginTop: 16 },
  rowCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginTop: 10, borderLeftWidth: 5, borderLeftColor: C.leaf },
  rowTitle: { fontSize: 15, fontWeight: '800', color: C.forest, marginBottom: 6 },
  kv: { marginTop: 4 },
  k: { fontSize: 12, color: C.muted, fontWeight: '600' },
  v: { fontSize: 14.5, color: C.ink, lineHeight: 20 },
});
