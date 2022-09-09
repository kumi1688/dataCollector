import {NativeModules} from 'react-native';

const {BrightnessModule} = NativeModules;

export const getBrightness = () => BrightnessModule.getBrightness();
export const setBrightness = bri => BrightnessModule.setBrightness(bri);
