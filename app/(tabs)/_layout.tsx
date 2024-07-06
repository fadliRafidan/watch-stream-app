import { Redirect, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { UserInfoProps } from '@/interface/UserInfoProps';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Init } from '@/store/actions';
import { Text, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const user: UserInfoProps = useSelector((state: RootState) => state.AuthReducers.user);
  const dispatch: any = useDispatch();
  const init = async () => {
    await dispatch(Init());
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#172554', alignItems: 'center' }}>
        <Text>LOADING</Text>
      </View>
    );
  }

  if (!user?.email) {
    return <Redirect href="/login_screen" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorit"
        options={{
          title: 'Favorit',
          headerShown: true,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'star' : 'star-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
