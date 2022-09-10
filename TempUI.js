// import React, {useState} from 'react';
// import {
//   Button,
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {
//   getSensorList,
//   isAvailable,
//   getData,
//   startUpdates,
//   stopUpdates,
// } from './lib/sensor/sensor';

// export default function TempUI() {
//   const [sensorAvailable, setSensorAvailable] = useState(
//     Array.from({length: 11}, (v, i) => false),
//   );

//   const checkAvailable = async () => {
//     const promises = getSensorList().map(sensorName => isAvailable(sensorName));
//     const results = await Promise.all(promises);
//     setSensorAvailable(results);
//   };

//   const onPress2 = async () => {
//     startUpdates('accelerometer');
//     startUpdates('rotationVector');
//   };

//   const onPress3 = async () => {
//     stopUpdates('accelerometer');
//     stopUpdates('rotationVector');
//   };

//   const onPress4 = async () => {
//     // getData('accelerometer');
//     getData('rotationVector');
//   };

//   return (
//     <SafeAreaView style={styles.block}>
//       <Button
//         title="check acc"
//         onPress={() => {
//           checkAvailable('accelerometer');
//         }}
//       />
//       <Button title="start update acc" onPress={onPress2} />
//       <Button title="stop update acc" onPress={onPress3} />
//       <Button title="acc stream" onPress={onPress4} />
//       <FlatList
//         data={sensorAvailable}
//         ItemSeparatorComponent={() => <View />}
//         renderItem={({item}) => {
//           return <Text>{item === false ? 'false' : 'true'}</Text>;
//         }}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   marginTop: {
//     marginTop: 50,
//     paddingTop: 20,
//   },
//   block: {
//     flex: 1,
//   },
//   textWrapper: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   },
//   text: {
//     fontSize: 64,
//   },
// });
