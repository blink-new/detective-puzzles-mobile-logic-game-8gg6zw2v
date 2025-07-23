import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ArrowLeft, Trophy, Medal, Crown } from 'lucide-react-native';

export default function Leaderboard() {
  const mockLeaderboard = [
    { rank: 1, name: 'Detective Holmes', score: 2450, cases: 12 },
    { rank: 2, name: 'Agent Smith', score: 2180, cases: 10 },
    { rank: 3, name: 'Inspector Clue', score: 1950, cases: 9 },
    { rank: 4, name: 'Mystery Solver', score: 1720, cases: 8 },
    { rank: 5, name: 'Logic Master', score: 1580, cases: 7 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={24} color="#FFD700" />;
      case 2: return <Medal size={24} color="#C0C0C0" />;
      case 3: return <Medal size={24} color="#CD7F32" />;
      default: return <Trophy size={20} color="#9CA3AF" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-500/20 border-yellow-400/30';
      case 2: return 'bg-gray-400/20 border-gray-300/30';
      case 3: return 'bg-orange-500/20 border-orange-400/30';
      default: return 'bg-white/10 border-white/20';
    }
  };

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
            Leaderboard
          </Text>
          <Text className="text-gray-300">
            Top detective rankings
          </Text>
        </View>
      </Animated.View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {mockLeaderboard.map((player, index) => (
          <Animated.View
            key={player.rank}
            entering={FadeInDown.duration(600).delay(index * 100)}
            className="mb-4"
          >
            <View className={`rounded-2xl p-4 border ${getRankColor(player.rank)}`}>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="mr-4">
                    {getRankIcon(player.rank)}
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-lg font-semibold">
                      {player.name}
                    </Text>
                    <Text className="text-gray-300 text-sm">
                      {player.cases} cases solved
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-white text-xl font-bold">
                    {player.score.toLocaleString()}
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    points
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        ))}

        {/* Your Rank */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(600)}
          className="mt-6 mb-8"
        >
          <View className="bg-blue-500/20 rounded-2xl p-4 border border-blue-400/30">
            <Text className="text-blue-300 font-semibold text-center mb-2">
              Your Rank
            </Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="bg-blue-500 rounded-full p-2 mr-3">
                  <Text className="text-white font-bold">#15</Text>
                </View>
                <View>
                  <Text className="text-white text-lg font-semibold">
                    You
                  </Text>
                  <Text className="text-gray-300 text-sm">
                    3 cases solved
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-white text-xl font-bold">
                  750
                </Text>
                <Text className="text-gray-400 text-sm">
                  points
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}