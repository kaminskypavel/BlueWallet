import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, View, BackHandler, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { BlueSpacing20, SafeBlueArea, BlueNavigationStyle, BlueText, BlueButton, TypingDNAButton } from '../../BlueComponents';
import Privacy from '../../Privacy';
import loc from '../../loc';
import {Chain} from "../../models/bitcoinUnits";

const PleaseBackup = () => {
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const words = route.params.secret.split(' ');
  const {walletType} = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();

  const isExtraLayerWalletType =  walletType ===Chain.ONCHAINEXTRALAYER;
  const styles = StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.elevated,
    },
    loading: {
      flex: 1,
      paddingTop: 20,
    },
    word: {
      width: 'auto',
      marginRight: 8,
      marginBottom: 8,
      backgroundColor: colors.inputBackgroundColor,
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 4,
    },
    wortText: {
      color: colors.labelText,
      fontWeight: 'bold',
    },
    scrollViewContent: {
      justifyContent: 'space-between',
    },
    please: {
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    successText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: colors.foregroundColor,
    },
    pleaseText: {
      paddingBottom: 10,
      paddingRight: 0,
      paddingLeft: 0,
      color: colors.foregroundColor,
    },
    secret: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 14,
    },
  });

  const handleBackButton = useCallback(() => {
    navigation.dangerouslyGetParent().pop();
    return true;
  }, [navigation]);

  const handleTypingDNAButton = useCallback(() => {
    navigation.navigate('TypingDNASetup', {
      screen: 'TypingDNASetup',
      words
    });
    return true;
  }, [navigation]);

  useEffect(() => {
    // @todo : bring back the blur after debugging
    // Privacy.enableBlur();
    setIsLoading(false);
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      Privacy.disableBlur();
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [handleBackButton, words]);

  const renderSecret = () => {
    const component = [];
    console.log(words);
    for (const [index, secret] of words.entries()) {
      component.push(
        <View style={styles.word} key={`${secret}${index}`}>
          <Text style={styles.wortText}>
            {`${index + 1}`}. {secret}
          </Text>
        </View>,
      );
    }
    return component;
  };

  return isLoading ? (
    <View style={styles.loading}>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeBlueArea style={styles.flex}>
      <StatusBar barStyle="default" />
      <ScrollView contentContainerStyle={styles.scrollViewContent} testID="PleaseBackupScrollView">
        <View style={styles.please}>
          <BlueText style={styles.successText}>{loc.pleasebackup.success}</BlueText>
          <BlueText style={styles.pleaseText}>{loc.pleasebackup.text}</BlueText>

          <View style={styles.secret}>{renderSecret()}</View>

          <BlueSpacing20 />
          {!isExtraLayerWalletType && <BlueButton testID="PleasebackupOk" onPress={handleBackButton} title={loc.pleasebackup.ok} />}
          {isExtraLayerWalletType && <TypingDNAButton testID="TypeDNAOk" onPress={handleTypingDNAButton} title="Recording Biometrics 🔴" />}
        </View>
      </ScrollView>
    </SafeBlueArea>
  );
};

PleaseBackup.navigationOptions = ({ navigation }) => ({
  ...BlueNavigationStyle(navigation, true),
  title: loc.pleasebackup.title,
  headerLeft: null,
  headerRight: null,
  gestureEnabled: false,
  swipeEnabled: false,
});

export default PleaseBackup;
