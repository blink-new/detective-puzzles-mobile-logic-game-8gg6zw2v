import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, BounceIn } from 'react-native-reanimated';
import { Trophy, Star, Clock, Lightbulb, Home, RotateCcw } from 'lucide-react-native';

export default function VictoryScreen() {
  // Mock data - in real app this would come from game state
  const victoryData = {
    caseTitle: 'The Diamond Heist',
    timeElapsed: '8:42',
    hintsUsed: 1,
    maxHints: 3,
    score: 850,
    stars: 3,
    culprit: 'Alice',
    solution: 'Alice was in the Gallery with the Crowbar'
  };

  return (
    <LinearGradient
      colors={['#0f0f23', '#1a1a2e', '#16213e']}
      className="flex-1"
    >
      <StatusBar barStyle="light-content" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Victory Animation */}
        <Animated.View 
          entering={BounceIn.duration(1000)}
          className="pt-20 pb-8 items-center"
        >
          <View className="bg-yellow-500 rounded-full p-6 mb-4">
            <Trophy size={48} color="white" />
          </View>
          <Text className="text-4xl font-bold text-white text-center mb-2">
            Case Solved! 🎉
          </Text>
          <Text className="text-lg text-gray-300 text-center">
            Excellent detective work!
          </Text>
        </Animated.View>

        {/* Case Info */}
        <Animated.View 
          entering={FadeInUp.duration(800).delay(300)}
          className="px-6 mb-6"
        >
          <View className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <Text className="text-2xl font-bold text-white text-center mb-4">
              {victoryData.caseTitle}
            </Text>
            
            {/* Stars */}
            <View className="flex-row justify-center mb-6">
              {[...Array(3)].map((_, i) => (
                <Animated.View
                  key={i}
                  entering={FadeInDown.duration(600).delay(500 + i * 100)}
                >
                  <Star
                    size={32}
                    color={i < victoryData.stars ? "#FCD34D" : "#374151"}
                    fill={i < victoryData.stars ? "#FCD34D" : "transparent"}
                    style={{ marginHorizontal: 4 }}
                  />
                </Animated.View>
              ))}
            </View>

            {/* Solution */}
            <View className="bg-green-500/20 rounded-xl p-4 border border-green-400/30 mb-4">
              <Text className="text-green-300 font-semibold text-center mb-2">
                The Culprit:
              </Text>
              <Text className="text-white text-lg font-bold text-center">
                {victoryData.culprit}
              </Text>
              <Text className="text-gray-300 text-center mt-2">
                {victoryData.solution}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Stats */}
        <Animated.View 
          entering={FadeInUp.duration(800).delay(600)}
          className="px-6 mb-6"
        >
          <View className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <Text className="text-xl font-bold text-white text-center mb-4">
              Your Performance
            </Text>
            
            <View className="space-y-4">
              {/* Score */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="bg-purple-500 rounded-full p-2 mr-3">
                    <Trophy size={20} color="white" />
                  </View>
                  <Text className="text-white font-medium">Score</Text>
                </View>
                <Text className="text-white text-lg font-bold">
                  {victoryData.score.toLocaleString()}
                </Text>
              </View>

              {/* Time */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="bg-blue-500 rounded-full p-2 mr-3">
                    <Clock size={20} color="white" />
                  </View>
                  <Text className="text-white font-medium">Time</Text>
                </View>
                <Text className="text-white text-lg font-bold">
                  {victoryData.timeElapsed}
                </Text>
              </View>

              {/* Hints */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="bg-yellow-500 rounded-full p-2 mr-3">
                    <Lightbulb size={20} color="white" />
                  </View>
                  <Text className="text-white font-medium">Hints Used</Text>
                </View>
                <Text className="text-white text-lg font-bold">
                  {victoryData.hintsUsed}/{victoryData.maxHints}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Actions */}
        <Animated.View 
          entering={FadeInUp.duration(800).delay(900)}
          className="px-6 space-y-4"
        >
          <TouchableOpacity
            onPress={() => router.push('/cases')}
            className="bg-blue-500 rounded-2xl py-4 px-8 flex-row items-center justify-center"
          >
            <RotateCcw size={24} color="white" />
            <Text className="text-white text-lg font-semibold ml-2">
              Play Another Case
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/')}
            className="bg-white/10 backdrop-blur-sm rounded-2xl py-4 px-8 flex-row items-center justify-center border border-white/20"
          >
            <Home size={24} color="white" />
            <Text className="text-white text-lg font-semibold ml-2">
              Main Menu
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom Padding */}
        <View className="h-12" />
      </ScrollView>
    </LinearGradient>
  );
}