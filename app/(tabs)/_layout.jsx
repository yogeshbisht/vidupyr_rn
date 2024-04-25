import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";

import { icons } from "../../constants";

const homeTabs = [
  {
    id: "home",
    label: "Home",
    icon: icons.home,
  },
  {
    id: "bookmark",
    label: "Bookmark",
    icon: icons.bookmark,
  },
  {
    id: "create",
    label: "Create",
    icon: icons.plus,
  },
  {
    id: "profile",
    label: "Profile",
    icon: icons.profile,
  },
];

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#9A19E6",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        {homeTabs.map((tab) => (
          <Tabs.Screen
            key={tab.id}
            name={tab.id}
            options={{
              title: tab.label,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={tab.icon}
                  color={color}
                  focused={focused}
                  name={tab.label}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
};

export default TabsLayout;
