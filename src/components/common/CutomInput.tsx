import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Typography } from "../../theme/typography";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { CustomInputProps } from "../../utils/types/TextInputType";

export default function CustomInput({
  placeholderText,
  capitalizationMode = "none",
  onTextChange,
  inputType = "default",
  containerStyle,
  inputValue,
  isEditable = true,
  textMaxLength,
  isSecureTextEntry = false,
  hasShowPasswordOption,
  showPasswordToggleComponent,
  textStyle,
  returnKeyLabelText,
  keyboardReturnKeyType,
  onReturnKeySubmit,
  onPressInAction,
  labelText,
  labelComponentDisplay,
  onBlurAction,
  onFocusAction,
  leadingIcon,
  leadingIconComponent,
  textInputRef,
  shouldAutoFocus = false,
}: CustomInputProps) {
  return (
    <View>
      {labelText && labelComponentDisplay}
      <View style={[styles.inputContainer, containerStyle]}>
        {leadingIcon && leadingIconComponent}
        <TextInput
          keyboardType={inputType}
          autoCapitalize={capitalizationMode}
          onChangeText={onTextChange}
          placeholder={placeholderText}
          defaultValue={inputValue}
          editable={isEditable}
          maxLength={textMaxLength}
          secureTextEntry={isSecureTextEntry}
          style={[styles.input, textStyle]}
          onSubmitEditing={onReturnKeySubmit}
          returnKeyLabel={returnKeyLabelText}
          returnKeyType={keyboardReturnKeyType}
          onPressIn={onPressInAction}
          onBlur={onBlurAction}
          onFocus={onFocusAction}
          ref={textInputRef || null}
          autoFocus={shouldAutoFocus}
        />
        {hasShowPasswordOption && showPasswordToggleComponent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "95%",
    height: 50,
    fontSize: 14,
    fontFamily: Typography.regular,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    borderColor: "lightgrey",
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
});
