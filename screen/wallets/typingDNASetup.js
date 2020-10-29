import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, Platform, StyleSheet, useWindowDimensions, View, TextInput } from 'react-native';
import { BlueNavigationStyle, BlueSpacing20, BlueText, SafeBlueArea } from '../../BlueComponents';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import tdna from 'typingdnarecorder-react-native';

// @todo : remove this after building initial demo
const DEMO_WORDS = [
  'silent',
  'fantasy',
  'patrol',
  'predict',
  'session',
  'pledge',
  'urban',
  'galaxy',
  'fitness',
  'myth',
  'output',
  'awful',
  'dash',
  'umbrella',
  'silver',
  'duty',
  'away',
  'damage',
  'already',
  'camp',
  'credit',
  'explain',
  'ride',
  'market',
];
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    paddingTop: 20,
  },
  root: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  activeQrcode: { borderWidth: 6, borderRadius: 8, borderColor: '#ffffff' },
  type: {
    fontSize: 17,
    fontWeight: '700',
  },
  secret: {
    alignItems: 'center',
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
  },
});

const TypingDNASetup = () => {
  useEffect(() => {
    console.log(1111111, tdna);
    tdna.initialize();
    console.log(222222222, tdna);
  }, []);

  const { words } = useRoute().params ?? DEMO_WORDS;
  console.log(1, useRoute().params);
  // const { wallets, saveToDisk } = useContext(BlueStorageContext);
  // const { walletID } = useRoute().params;
  // const wallet = wallets.find(w => w.getID() === walletID);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const { goBack } = useNavigation();
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();

  let targetId;
  const stylesHook = {
    ...styles,
    loading: {
      ...styles.loading,
      backgroundColor: colors.elevated,
    },
    root: {
      ...styles.root,
      backgroundColor: colors.elevated,
    },
    type: { ...styles.type, color: colors.foregroundColor },
    secret: { ...styles.secret, color: colors.foregroundColor },
  };

  return isLoading ? (
    <View style={stylesHook.loading}>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeBlueArea style={stylesHook.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          <BlueText style={stylesHook.type}>{JSON.stringify(words)}</BlueText>
        </View>

        <BlueSpacing20 />

        <TextInput
          ref={ref => {
            if (!targetId && ref && ref._inputRef && ref._inputRef._nativeTag) {
              if (Platform.OS === 'ios') {
                targetId = ref.props.placeholder;
              } else {
                targetId = ref._inputRef._nativeTag;
              }
            }
          }}
          placeholder="Enter text"
          onChangeText={setText}
          value={text}
        />
      </ScrollView>
    </SafeBlueArea>
  );
};

TypingDNASetup.navigationOptions = ({ navigation }) => ({
  ...BlueNavigationStyle(navigation, true),
  title: 'TypingDNA setup',
  headerLeft: null,
});

export default TypingDNASetup;
