import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ArrowLeft, Clock, Lightbulb, CheckCircle, XCircle } from 'lucide-react-native';
import { CASES } from '../../data/cases';
import { Case, GameState } from '../../types/game';

export default function PuzzleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentCase, setCurrentCase] = useState<Case | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentCase: null,
    grid: {},
    hintsUsed: 0,
    timeElapsed: 0,
    isCompleted: false,
    isSolved: false,
  });
  const [showStory, setShowStory] = useState(true);

  useEffect(() => {
    const caseData = CASES.find(c => c.id === id);
    if (caseData) {
      setCurrentCase(caseData);
      initializeGrid(caseData);
    }
  }, [id]);

  const initializeGrid = (caseData: Case) => {
    const grid: Record<string, Record<string, boolean | null>> = {};
    
    // Initialize grid with null values
    caseData.categories[0].items.forEach(suspect => {
      grid[suspect] = {};
      caseData.categories.slice(1).forEach(category => {
        category.items.forEach(item => {
          grid[suspect][item] = null;
        });
      });
    });

    setGameState(prev => ({
      ...prev,
      currentCase: caseData,
      grid,
    }));
  };

  const toggleCell = (suspect: string, item: string) => {
    setGameState(prev => {
      const newGrid = { ...prev.grid };
      const currentValue = newGrid[suspect][item];
      
      // Cycle through: null -> true -> false -> null
      if (currentValue === null) {
        newGrid[suspect][item] = true;
      } else if (currentValue === true) {
        newGrid[suspect][item] = false;
      } else {
        newGrid[suspect][item] = null;
      }

      return { ...prev, grid: newGrid };
    });
  };

  const getCellDisplay = (value: boolean | null) => {
    if (value === true) return '✓';
    if (value === false) return '✗';
    return '';
  };

  const getCellStyle = (value: boolean | null) => {
    if (value === true) return 'bg-green-500/30 border-green-400';
    if (value === false) return 'bg-red-500/30 border-red-400';
    return 'bg-white/10 border-white/30';
  };

  const checkSolution = () => {
    if (!currentCase) return;

    let isCorrect = true;
    const solution = currentCase.solution;

    // Check if the grid matches the solution
    Object.keys(solution).forEach(suspect => {
      Object.keys(solution[suspect]).forEach(item => {
        const expectedValue = solution[suspect][item];
        const actualValue = gameState.grid[suspect]?.[item];
        
        if (actualValue !== expectedValue) {
          isCorrect = false;
        }
      });
    });

    if (isCorrect) {
      setGameState(prev => ({ ...prev, isCompleted: true, isSolved: true }));
      Alert.alert(
        '🎉 Case Solved!',
        'Congratulations! You\'ve successfully solved the mystery.',
        [
          { text: 'Continue', onPress: () => router.push('/victory') }
        ]
      );
    } else {
      Alert.alert(
        '🤔 Not Quite Right',
        'Your solution doesn\'t match all the clues. Keep trying!',
        [{ text: 'OK' }]
      );
    }
  };

  const useHint = () => {
    if (!currentCase || gameState.hintsUsed >= currentCase.maxHints) return;

    // Simple hint: reveal one correct cell
    const solution = currentCase.solution;
    const suspects = Object.keys(solution);
    const randomSuspect = suspects[Math.floor(Math.random() * suspects.length)];
    const items = Object.keys(solution[randomSuspect]);
    const randomItem = items[Math.floor(Math.random() * items.length)];
    
    const correctValue = solution[randomSuspect][randomItem];
    
    setGameState(prev => {
      const newGrid = { ...prev.grid };
      newGrid[randomSuspect][randomItem] = correctValue;
      
      return {
        ...prev,
        grid: newGrid,
        hintsUsed: prev.hintsUsed + 1,
      };
    });

    Alert.alert(
      '💡 Hint Used',
      `Revealed: ${randomSuspect} ${correctValue ? 'is' : 'is not'} associated with ${randomItem}`,
      [{ text: 'OK' }]
    );
  };

  if (!currentCase) {
    return (
      <LinearGradient colors={['#0f0f23', '#1a1a2e']} className="flex-1 items-center justify-center">
        <Text className="text-white text-lg">Loading case...</Text>
      </LinearGradient>
    );
  }

  if (showStory) {
    return (
      <LinearGradient colors={['#0f0f23', '#1a1a2e', '#16213e']} className="flex-1">
        <StatusBar barStyle="light-content" />
        
        <ScrollView className="flex-1 px-6">
          <Animated.View entering={FadeInUp.duration(600)} className="pt-16 pb-8">
            <Text className="text-3xl font-bold text-white text-center mb-4">
              {currentCase.title}
            </Text>
            <Text className="text-lg text-gray-300 text-center leading-6">
              {currentCase.story}
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(300)} className="mb-8">
            <TouchableOpacity
              onPress={() => setShowStory(false)}
              className="bg-blue-500 rounded-2xl py-4 px-8 mx-8"
            >
              <Text className="text-white text-lg font-semibold text-center">
                Start Investigation
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#0f0f23', '#1a1a2e']} className="flex-1">
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Animated.View 
        entering={FadeInUp.duration(600)}
        className="pt-16 pb-4 px-4 flex-row items-center justify-between"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full bg-white/10"
        >
          <ArrowLeft size={20} color="white" />
        </TouchableOpacity>
        
        <Text className="text-lg font-bold text-white flex-1 text-center">
          {currentCase.title}
        </Text>

        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            onPress={useHint}
            disabled={gameState.hintsUsed >= currentCase.maxHints}
            className={`p-2 rounded-full ${gameState.hintsUsed >= currentCase.maxHints ? 'bg-gray-600' : 'bg-yellow-500'}`}
          >
            <Lightbulb size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-sm">
            {currentCase.maxHints - gameState.hintsUsed}
          </Text>
        </View>
      </Animated.View>

      <ScrollView className="flex-1" horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-1 flex-row">
          {/* Logic Grid */}
          <Animated.View entering={FadeInDown.duration(600).delay(200)} className="p-4">
            <View className="bg-white/10 rounded-2xl p-4 border border-white/20">
              {/* Grid Header */}
              <View className="flex-row mb-2">
                <View className="w-24" />
                {currentCase.categories.slice(1).map(category => (
                  <View key={category.id} className="mx-1">
                    <Text className="text-white text-xs font-semibold text-center mb-2">
                      {category.name}
                    </Text>
                    <View className="flex-row">
                      {category.items.map(item => (
                        <View key={item} className="w-12 mx-0.5">
                          <Text className="text-white text-xs text-center transform -rotate-45 h-8">
                            {item.length > 6 ? item.substring(0, 6) + '...' : item}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>

              {/* Grid Rows */}
              {currentCase.categories[0].items.map(suspect => (
                <View key={suspect} className="flex-row items-center mb-1">
                  <View className="w-24">
                    <Text className="text-white text-sm font-medium">
                      {suspect}
                    </Text>
                  </View>
                  
                  {currentCase.categories.slice(1).map(category => (
                    <View key={category.id} className="flex-row mx-1">
                      {category.items.map(item => (
                        <TouchableOpacity
                          key={item}
                          onPress={() => toggleCell(suspect, item)}
                          className={`w-12 h-12 mx-0.5 rounded-lg border-2 items-center justify-center ${getCellStyle(gameState.grid[suspect]?.[item])}`}
                        >
                          <Text className="text-white text-lg font-bold">
                            {getCellDisplay(gameState.grid[suspect]?.[item])}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Clues Panel */}
          <Animated.View entering={FadeInDown.duration(600).delay(400)} className="w-80 p-4">
            <View className="bg-white/10 rounded-2xl p-4 border border-white/20">
              <Text className="text-white text-lg font-bold mb-4">Clues</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {currentCase.clues.map((clue, index) => (
                  <View key={clue.id} className="mb-3 p-3 bg-white/5 rounded-lg">
                    <Text className="text-gray-300 text-sm leading-5">
                      {index + 1}. {clue.text}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <Animated.View 
        entering={FadeInUp.duration(600).delay(600)}
        className="p-4 bg-black/30"
      >
        <TouchableOpacity
          onPress={checkSolution}
          className="bg-green-500 rounded-2xl py-4 px-8 flex-row items-center justify-center"
        >
          <CheckCircle size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            Check Solution
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}