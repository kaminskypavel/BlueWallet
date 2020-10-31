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
      source={{ uri: `http://localhost:3000/?type=record&words=${words}` }}
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
  ...BlueNavigationStyle(navigation, false),
  title: 'TypingDNA setup',
  headerLeft: null,
});

export default TypingDNASetup;
