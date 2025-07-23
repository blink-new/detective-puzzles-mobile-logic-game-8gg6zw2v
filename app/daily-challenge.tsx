import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ArrowLeft, Calendar, Clock, Star, Play } from 'lucide-react-native';

export default function DailyChallenge() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

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
            Daily Challenge
          </Text>
          <Text className="text-gray-300">
            {today}
          </Text>
        </View>
      </Animated.View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Today's Challenge */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          className="mb-6"
        >
          <View className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-400/30">
            <View className="flex-row items-center mb-4">
              <View className="bg-orange-500 rounded-full p-3 mr-4">
                <Calendar size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-white text-xl font-bold">
                  Today's Mystery
                </Text>
                <Text className="text-orange-200">
                  Special daily puzzle
                </Text>
              </View>
              <Text className="text-2xl">🔥</Text>
            </View>

            <Text className="text-white text-lg font-semibold mb-2">
              The Midnight Burglary
            </Text>
            <Text className="text-gray-300 mb-4 leading-5">
              A jewelry store was robbed at midnight. Three suspects were seen in the area, each with different alibis and motives. Can you solve today's challenge?
            </Text>

            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center space-x-4">
                <View className="flex-row items-center">
                  <Clock size={16} color="#9CA3AF" />
                  <Text className="text-gray-300 text-sm ml-1">20m limit</Text>
                </View>
                <View className="flex-row items-center">
                  <Star size={16} color="#FCD34D" />
                  <Text className="text-gray-300 text-sm ml-1">Hard</Text>
                </View>
              </View>
              <Text className="text-orange-300 font-semibold">
                +500 bonus points
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/puzzle/daily-midnight-burglary')}
              className="bg-orange-500 rounded-xl py-3 px-6 flex-row items-center justify-center"
            >
              <Play size={20} color="white" />
              <Text className="text-white font-semibold ml-2">
                Start Challenge
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Challenge Stats */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(400)}
          className="mb-6"
        >
          <View className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <Text className="text-white text-lg font-bold mb-4">
              Your Challenge Stats
            </Text>
            
            <View className="space-y-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-300">Challenges Completed</Text>
                <Text className="text-white font-semibold">7/30</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-300">Current Streak</Text>
                <Text className="text-white font-semibold">3 days 🔥</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-300">Best Streak</Text>
                <Text className="text-white font-semibold">12 days</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-300">Bonus Points Earned</Text>
                <Text className="text-white font-semibold">3,500</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Previous Challenges */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(600)}
          className="mb-8"
        >
          <Text className="text-white text-lg font-bold mb-4">
            Previous Challenges
          </Text>
          
          <View className="space-y-3">
            {[
              { title: 'The Library Murder', date: 'Yesterday', completed: true, score: 450 },
              { title: 'Casino Heist', date: '2 days ago', completed: true, score: 380 },
              { title: 'Art Gallery Theft', date: '3 days ago', completed: false, score: 0 },
            ].map((challenge, index) => (
              <View
                key={index}
                className={`p-4 rounded-xl border ${challenge.completed ? 'bg-green-500/10 border-green-400/30' : 'bg-red-500/10 border-red-400/30'}`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-white font-semibold">
                      {challenge.title}
                    </Text>
                    <Text className="text-gray-300 text-sm">
                      {challenge.date}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className={`font-semibold ${challenge.completed ? 'text-green-400' : 'text-red-400'}`}>
                      {challenge.completed ? 'Completed' : 'Missed'}
                    </Text>
                    {challenge.completed && (
                      <Text className="text-gray-300 text-sm">
                        +{challenge.score} pts
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}