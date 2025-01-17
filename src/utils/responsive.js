import { Dimensions } from "react-native";

const width =  Dimensions.get('window').width
const height =  Dimensions.get('window').height

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scaleWidth = size => width / guidelineBaseWidth * size;
const scaleHeight = size => height / guidelineBaseHeight * size;

export {scaleWidth, scaleHeight};

