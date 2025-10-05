// components/DialInput.tsx

import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

// --- Component Props ---
type DialInputProps = {
  radius?: number;
  minValue?: number;
  maxValue?: number;
  initialValue?: number;
  onValueChange: (value: number) => void;
  label: string;
  unit: string;
};

// --- Main Component ---
export default function DialInput({
  radius = 120,
  minValue = 0,
  maxValue = 200,
  initialValue = 100,
  onValueChange,
  label,
  unit,
}: DialInputProps) {
  const [value, setValue] = useState(initialValue);
  const rotation = useSharedValue(0);

  const dialSize = radius * 2;
  const dimpleSize = radius / 5;

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      // Calculate angle from center of the dial
      const x = e.x - radius;
      const y = e.y - radius;
      const angle = Math.atan2(y, x);

      // Convert angle to a value between 0 and 1
      let normalizedAngle = (angle + Math.PI / 2) / (2 * Math.PI);
      if (normalizedAngle < 0) {
        normalizedAngle += 1;
      }
      
      // Map the angle to our min/max value range
      const newValue = Math.round(normalizedAngle * (maxValue - minValue) + minValue);
      setValue(newValue);
      onValueChange(newValue);

      // Rotate the dimple to follow the finger
      rotation.value = angle * (180 / Math.PI) + 90;
    })
    .onEnd(() => {
        // You could add snapping logic here if desired
    });

  const animatedRotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.dial, { width: dialSize, height: dialSize, borderRadius: radius }]}>
        <GestureDetector gesture={panGesture}>
          <View style={styles.touchArea}>
            <View style={styles.centerCircle}>
              <Text style={styles.valueText}>{value}</Text>
              <Text style={styles.unitText}>{unit}</Text>
            </View>
            <Animated.View style={[
                styles.dimpleContainer,
                { top: -dimpleSize / 2 },
                animatedRotationStyle
            ]}>
                <View style={[styles.dimple, { width: dimpleSize, height: dimpleSize, borderRadius: dimpleSize/2 }]} />
            </Animated.View>
          </View>
        </GestureDetector>
      </View>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: '300',
    color: '#34495e',
    marginBottom: 20,
  },
  dial: {
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: '#bdc3c7',
  },
  touchArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCircle: {
    width: '70%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  valueText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  unitText: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  dimpleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  dimple: {
    backgroundColor: '#3498db',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});