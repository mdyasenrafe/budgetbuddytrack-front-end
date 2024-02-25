import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { ProfileOption } from "../../utils/types/ProfileType";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../common/Text/CustomText";
import { GlobalStyles } from "../../styles/GlobalStyles";

export default function ProfileOptionItem({
  option,
  isLastItem,
}: {
  option: ProfileOption;
  isLastItem: boolean;
}) {
  return (
    <View>
      <TouchableOpacity onPress={option.onPress} style={styles.container}>
        <View style={styles.iconAndText}>
          {option.icon}
          <CustomText preset="p2_medium" style={styles.text}>
            {option.title}
          </CustomText>
        </View>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
      {!isLastItem && <View style={GlobalStyles.divider} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 16,
  },
});
