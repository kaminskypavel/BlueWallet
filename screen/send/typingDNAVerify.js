import React, { useCallback } from 'react';
import { BlueNavigationStyle } from '../../BlueComponents';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const TypingDNAVerify = () => {
  const { words, setScore } = useRoute().params ?? {};
  const navigation = useNavigation();

  const handleBackButton = useCallback(() => {
    navigation.pop();
    return true;
  }, [navigation]);

  console.log(navigation);
  return (
    <WebView
      source={{ uri: `http://localhost:3000/?type=verify&words=${words}` }}
      originWhitelist={['*']}
      onMessage={event => {
        const { score = 0 } = JSON.parse(event.nativeEvent.data ?? '{}');
        setScore(score);
        handleBackButton();
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
