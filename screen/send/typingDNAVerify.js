import React, { useCallback } from 'react';
import { BlueNavigationStyle } from '../../BlueComponents';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const TypingDNAVerify = () => {
  const { words } = useRoute().params ?? {};
  const navigation = useNavigation();

  const handleBackButton = useCallback(() => {
    navigation.dangerouslyGetParent().pop();
    return true;
  }, [navigation]);

  return (
    <WebView
      source={{ uri: `http://10.0.0.12:3000/?type=verify&words=${words}` }}
      originWhitelist={['*']}
      onMessage={event => {
        console.log(event);
      }}
    />
  );
};

TypingDNAVerify.navigationOptions = ({ navigation }) => ({
  ...BlueNavigationStyle(navigation, false),
  title: 'TypingDNA Verification',
  headerLeft: null,
});

export default TypingDNAVerify;
