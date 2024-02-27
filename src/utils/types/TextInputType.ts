import { TextInput, TextStyle } from "react-native";

// Define a TypeScript interface for props
export type CustomInputProps = {
  key?: string;
  placeholderText: string;
  onTextChange?: (text: string) => void;
  capitalizationMode?: "none" | "sentences" | "words" | "characters";
  inputType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "number-pad"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search"
    | "visible-password";
  containerStyle?: TextStyle;
  inputValue?: string;
  isEditable?: boolean;
  textMaxLength?: number;
  isSecureTextEntry?: boolean;
  hasShowPasswordOption?: boolean;
  showPasswordToggleComponent?: React.ReactNode;
  textStyle?: TextStyle;
  returnKeyLabelText?: string;
  keyboardReturnKeyType?: "done" | "go" | "next" | "search" | "send";
  onReturnKeySubmit?: () => void;
  onPressInAction?: () => void;
  labelText?: string;
  labelComponentDisplay?: React.ReactNode;
  onBlurAction?: () => void;
  onFocusAction?: () => void;
  leadingIcon?: string;
  leadingIconComponent?: React.ReactNode;
  textInputRef?: React.RefObject<TextInput>;
  shouldAutoFocus?: boolean;
  placeholderTextColor?: string;
};
