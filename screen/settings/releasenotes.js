import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeBlueArea, BlueCard, BlueNavigationStyle, BlueTextHooks } from '../../BlueComponents';
import { useTheme } from '@react-navigation/native';
import loc from '../../loc';
import fs from 'fs';

const ReleaseNotes = () => {
  console.log(1111111111111111, fs.existsSync('./../../release-notes'));
  // const notes = fs.existsSync('./../../release-notes') ? require('./../../release-notes') : '';
  const notes = 'notes';
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });

  return (
    <SafeBlueArea forceInset={{ horizontal: 'always' }} style={styles.root}>
      <ScrollView>
        <BlueCard>
          <BlueTextHooks>{notes}</BlueTextHooks>
        </BlueCard>
      </ScrollView>
    </SafeBlueArea>
  );
};

ReleaseNotes.navigationOptions = () => ({
  ...BlueNavigationStyle(),
  title: loc.settings.about_release_notes,
});

export default ReleaseNotes;
