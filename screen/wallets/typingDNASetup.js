import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, StatusBar, StyleSheet, useWindowDimensions, View} from 'react-native';
import {BlueNavigationStyle, BlueSpacing20, BlueText, SafeBlueArea} from '../../BlueComponents';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';

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
  const { words } = useRoute().params;
  console.log(1,useRoute().params);
  // const { wallets, saveToDisk } = useContext(BlueStorageContext);
  // const { walletID } = useRoute().params;
  // const wallet = wallets.find(w => w.getID() === walletID);
  const [isLoading, setIsLoading] = useState(false);
  const { goBack } = useNavigation();
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
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
        <BlueText style={stylesHook.secret}>Hello2</BlueText>

      </ScrollView>
    </SafeBlueArea>
  );
};

TypingDNASetup.navigationOptions = ({ navigation }) => ({
  ...BlueNavigationStyle(navigation, true),
  title: "TypingDNA setup",
  headerLeft: null,
});

export default TypingDNASetup;
