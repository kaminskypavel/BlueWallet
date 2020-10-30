import React, { useCallback } from 'react';
import { BlueNavigationStyle } from '../../BlueComponents';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const TypingDNASetup = () => {
  const { words } = useRoute().params ?? {};
  const navigation = useNavigation();

  const handleBackButton = useCallback(() => {
    navigation.dangerouslyGetParent().pop();
    return true;
  }, [navigation]);

  return (
    <WebView
      source={{ uri: `http://10.0.0.12:3000/?words=${words}` }}
      originWhitelist={['*']}
      onMessage={event => {
        if (event.nativeEvent.data === 'finish') {
          handleBackButton();
        }
      }}
    />
  );
};

TypingDNASetup.navigationOptions = ({ navigation }) => ({
  ...BlueNavigationStyle(navigation, true),
  title: 'TypingDNA setup',
  headerLeft: null,
});

export default TypingDNASetup;
