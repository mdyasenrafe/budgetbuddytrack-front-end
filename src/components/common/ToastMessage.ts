import Toast from "react-native-toast-message";

export function showMessage({
  type,
  message,
}: {
  type: string;
  message: string;
}) {
  Toast.show({
    type: type,
    text1: type,
    text2: message || "Something went wrong",
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
}
