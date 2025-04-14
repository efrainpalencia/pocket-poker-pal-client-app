import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

type TabBarIconProps = {
  focused: boolean;
  color: string;
};

export default function TabsLayout() {

  return (
    <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FFDE59',
          headerStyle: {
            backgroundColor: '#1F1F1F',
          },
          headerShadowVisible: false,
          headerTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: '#1F1F1F',
          },
          headerTitleAlign: 'center',
          headerShown: false,
        }}
    >

      <Tabs.Screen
          name="index"
          options={{
            headerTitle: "Pocket Poker Pal",
              tabBarShowLabel: false,
            tabBarIcon: ({ focused, color }: TabBarIconProps ) => (<Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24} />),
          }}
      />
        <Tabs.Screen
            name="ai-chat"
            options={{
                headerTitle: "AI Poker Assistant",
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color }: TabBarIconProps ) => (<Ionicons name={focused ? "chatbubble-ellipses-sharp" : "chatbubble-ellipses-outline"} color={color} size={24} />),
            }}
        />
      <Tabs.Screen
          name="about"
          options={{
            headerTitle: "About",
              tabBarShowLabel: false,
            tabBarIcon: ({focused, color}: TabBarIconProps) => (<Ionicons name={focused ? "information-circle-sharp" : "information-circle-outline"} color={color} size={24} /> )
          }}
      />
    </Tabs>
  );
}
