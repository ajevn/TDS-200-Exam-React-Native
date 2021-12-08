import * as React from 'react';
// @ts-ignore
import { Text, TextProps } from './Themed';
export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
