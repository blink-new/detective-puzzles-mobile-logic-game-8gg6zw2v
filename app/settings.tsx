import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ArrowLeft, Moon, Sun, Volume2, VolumeX, Bell, BellOff, Info, Star } from 'lucide-react-native';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const settingsGroups = [
    {
      title: 'Appearance',
      items: [
        {
          icon: darkMode ? Moon : Sun,
          title: 'Dark Mode',
          subtitle: 'Toggle dark/light theme',
          type: 'switch',
          value: darkMode,
          onToggle: setDarkMode,
        },
      ],
    },
    {
      title: 'Audio',
      items: [
        {
          icon: soundEnabled ? Volume2 : VolumeX,
          title: 'Sound Effects',
          subtitle: 'Game sounds and feedback',
          type: 'switch',
          value: soundEnabled,
          onToggle: setSoundEnabled,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: notificationsEnabled ? Bell : BellOff,
          title: 'Push Notifications',
          subtitle: 'Daily challenges and updates',
          type: 'switch',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          icon: Star,
          title: 'Rate the App',
          subtitle: 'Help us improve',
          type: 'button',
          onPress: () => {},
        },
        {
          icon: Info,
          title: 'About Detective Puzzles',
          subtitle: 'Version 1.0.0',
          type: 'button',
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <LinearGradient
      colors={['#0f0f23', '#1a1a2e', '#16213e']}
      className="flex-1"
    >
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Animated.View 
        entering={FadeInUp.duration(600)}
        className="pt-16 pb-6 px-6 flex-row items-center"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4 p-2 rounded-full bg-white/10"
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-2xl font-bold text-white">
            Settings
          </Text>
          <Text className="text-gray-300">
            Customize your experience
          </Text>
        </View>
      </Animated.View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {settingsGroups.map((group, groupIndex) => (
          <Animated.View
            key={group.title}
            entering={FadeInDown.duration(600).delay(groupIndex * 100)}
            className="mb-6"
          >
            <Text className="text-white text-lg font-bold mb-3">
              {group.title}
            </Text>
            
            <View className="bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
              {group.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <TouchableOpacity
                    onPress={item.onPress}
                    disabled={item.type === 'switch'}
                    className="p-4 flex-row items-center"
                  >
                    <View className="bg-white/10 rounded-full p-2 mr-4">
                      <item.icon size={20} color="white" />
                    </View>
                    
                    <View className="flex-1">
                      <Text className="text-white font-semibold">
                        {item.title}
                      </Text>
                      <Text className="text-gray-300 text-sm">
                        {item.subtitle}
                      </Text>
                    </View>

                    {item.type === 'switch' && (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#374151', true: '#3B82F6' }}
                        thumbColor={item.value ? '#FFFFFF' : '#9CA3AF'}
                      />
                    )}
                  </TouchableOpacity>
                  
                  {itemIndex < group.items.length - 1 && (
                    <View className="h-px bg-white/10 ml-16" />
                  )}
                </View>
              ))}
            </View>
          </Animated.View>
        ))}

        {/* App Info */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(500)}
          className="mb-8 items-center"
        >
          <Text className="text-gray-400 text-sm text-center">
            Detective Puzzles
          </Text>
          <Text className="text-gray-500 text-xs text-center mt-1">
            Made with ❤️ for puzzle lovers
          </Text>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}