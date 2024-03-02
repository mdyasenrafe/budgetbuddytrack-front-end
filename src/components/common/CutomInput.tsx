import React from "react";
import { View, TextInput } from "react-native";
// @ts-ignore
import { CustomInputProps } from "../../utils/types/textInputType";
import { GlobalStyles } from "../../styles/GlobalStyles";
import CustomText from "./Text/CustomText";
import { FinancialTrackingStyles } from "../../styles/FinancialTrackingStyles";

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
  placeholderTextColor,
  currencySymbol,
}: CustomInputProps) {
  return (
    <View>
      {labelText && labelComponentDisplay}
      <View style={[GlobalStyles.inputContainer, containerStyle]}>
        {leadingIcon && leadingIconComponent}
        {currencySymbol && (
          <CustomText
            style={FinancialTrackingStyles.amountInputText}
            preset="h4"
          >
            $
          </CustomText>
        )}
        <TextInput
          keyboardType={inputType}
          autoCapitalize={capitalizationMode}
          onChangeText={onTextChange}
          placeholder={placeholderText}
          defaultValue={inputValue}
          editable={isEditable}
          maxLength={textMaxLength}
          secureTextEntry={isSecureTextEntry}
          style={[GlobalStyles.input, textStyle]}
          onSubmitEditing={onReturnKeySubmit}
          returnKeyLabel={returnKeyLabelText}
          returnKeyType={keyboardReturnKeyType}
          onPressIn={onPressInAction}
          onBlur={onBlurAction}
          onFocus={onFocusAction}
          ref={textInputRef || null}
          autoFocus={shouldAutoFocus}
          placeholderTextColor={placeholderTextColor}
        />
        {hasShowPasswordOption && showPasswordToggleComponent}
      </View>
    </View>
  );
}
