import React from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomText from "../../../components/common/Text/CustomText";
import { BottomTabScreenTypeProps } from "../../../utils/types/navigationType";
import { colors } from "../../../theme/colors";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken, setUser } from "../../../features/auth/authSlice";
import ProfileOptionItem from "../../../components/profile/ProfileOptionItem";
import { ProfileOption } from "../../../utils/types/ProfileType";
import { GlobalStyles } from "../../../styles/GlobalStyles";

export default function UserProfileScreen({
  navigation,
}: BottomTabScreenTypeProps<"Profile">) {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const profileOptions: ProfileOption[] = [
    {
      id: 1,
      title: "Edit Profile",
      icon: <Feather name="user" size={24} color="black" />,
      onPress: () => {},
    },
    {
      id: 2,
      title: "Change Password",
      icon: <AntDesign name="lock" size={24} color="black" />,
      onPress: () => {},
    },
    {
      id: 3,
      title: "Log out",
      icon: <MaterialIcons name="logout" size={24} color="red" />,
      onPress: () => handleLogout(),
    },
  ];

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("GetStarted");
    dispatch(setUser(null));
    dispatch(setToken(null));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          size={24}
          color={colors.white}
          onPress={() => navigation.goBack()}
        />
        <CustomText preset="p1_medium" style={styles.headerTitle}>
          Profile
        </CustomText>
        <View />
      </View>
      <View>
        <Image
          source={{ uri: user?.profilePicture }}
          style={styles.profileImage}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={{ height: 100 }} />
        <View style={styles.profileDetails}>
          <CustomText preset="h3" style={styles.userName}>
            {user?.name}
          </CustomText>
          <CustomText preset="p3" style={styles.userEmail}>
            {user?.email}
          </CustomText>
        </View>
        <View style={GlobalStyles.divider} />
        <View>
          {profileOptions.map((item, index) => (
            <ProfileOptionItem
              key={item.id}
              isLastItem={index === profileOptions.length - 1}
              option={item}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    zIndex: -2,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "white",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 130,
    alignSelf: "center",
    position: "absolute",
    top: 50,
  },
  scrollView: {
    flex: 1,
    marginTop: 120,
    backgroundColor: "white",
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24,
    zIndex: -2,
    paddingHorizontal: 16,
  },
  profileDetails: {
    alignItems: "center",
  },
  userName: {
    color: "black",
  },
  userEmail: {
    color: "#939393",
  },

  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  optionTextIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    color: "black",
    marginLeft: 16,
  },
});
