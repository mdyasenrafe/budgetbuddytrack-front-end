import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const DemoImage = (name: string) => {
  return `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`;
};
