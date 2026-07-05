import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, type } from '../../theme/tokens';

interface TelemetryItemProps {
  icon: React.ReactNode;
  value: string;
  valueColor?: string;
}

export function TelemetryItem({ icon, value, valueColor = colors.text }: TelemetryItemProps) {
  return (
    <View style={styles.item}>
      {icon}
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    ...type.value,
    marginLeft: 6,
  },
});
