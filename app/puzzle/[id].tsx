import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert, StyleSheet } from 'react-native';
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
    if (value === true) return [styles.gridCell, styles.gridCellTrue];
    if (value === false) return [styles.gridCell, styles.gridCellFalse];
    return [styles.gridCell, styles.gridCellEmpty];
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
      <LinearGradient colors={['#0f0f23', '#1a1a2e']} style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading case...</Text>
      </LinearGradient>
    );
  }

  if (showStory) {
    return (
      <LinearGradient colors={['#0f0f23', '#1a1a2e', '#16213e']} style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        <ScrollView style={styles.storyContainer}>
          <Animated.View entering={FadeInUp.duration(600)} style={styles.storyContent}>
            <Text style={styles.storyTitle}>
              {currentCase.title}
            </Text>
            <Text style={styles.storyText}>
              {currentCase.story}
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(300)} style={styles.storyButtonContainer}>
            <TouchableOpacity
              onPress={() => setShowStory(false)}
              style={styles.startButton}
            >
              <Text style={styles.startButtonText}>
                Start Investigation
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#0f0f23', '#1a1a2e']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Animated.View 
        entering={FadeInUp.duration(600)}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={20} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>
          {currentCase.title}
        </Text>

        <View style={styles.hintContainer}>
          <TouchableOpacity
            onPress={useHint}
            disabled={gameState.hintsUsed >= currentCase.maxHints}
            style={[
              styles.hintButton,
              gameState.hintsUsed >= currentCase.maxHints ? styles.hintButtonDisabled : styles.hintButtonActive
            ]}
          >
            <Lightbulb size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.hintText}>
            {currentCase.maxHints - gameState.hintsUsed}
          </Text>
        </View>
      </Animated.View>

      <ScrollView style={styles.gameContainer} horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.gameContent}>
          {/* Logic Grid */}
          <Animated.View entering={FadeInDown.duration(600).delay(200)} style={styles.gridContainer}>
            <View style={styles.gridWrapper}>
              {/* Grid Header */}
              <View style={styles.gridHeader}>
                <View style={styles.gridHeaderSpacer} />
                {currentCase.categories.slice(1).map(category => (
                  <View key={category.id} style={styles.categoryHeader}>
                    <Text style={styles.categoryTitle}>
                      {category.name}
                    </Text>
                    <View style={styles.itemsHeader}>
                      {category.items.map(item => (
                        <View key={item} style={styles.itemHeader}>
                          <Text style={styles.itemHeaderText}>
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
                <View key={suspect} style={styles.gridRow}>
                  <View style={styles.suspectLabel}>
                    <Text style={styles.suspectText}>
                      {suspect}
                    </Text>
                  </View>
                  
                  {currentCase.categories.slice(1).map(category => (
                    <View key={category.id} style={styles.categoryRow}>
                      {category.items.map(item => (
                        <TouchableOpacity
                          key={item}
                          onPress={() => toggleCell(suspect, item)}
                          style={getCellStyle(gameState.grid[suspect]?.[item])}
                        >
                          <Text style={styles.cellText}>
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
          <Animated.View entering={FadeInDown.duration(600).delay(400)} style={styles.cluesContainer}>
            <View style={styles.cluesWrapper}>
              <Text style={styles.cluesTitle}>Clues</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {currentCase.clues.map((clue, index) => (
                  <View key={clue.id} style={styles.clueItem}>
                    <Text style={styles.clueText}>
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
        style={styles.bottomActions}
      >
        <TouchableOpacity
          onPress={checkSolution}
          style={styles.checkButton}
        >
          <CheckCircle size={24} color="white" />
          <Text style={styles.checkButtonText}>
            Check Solution
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
  storyContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  storyContent: {
    paddingTop: 64,
    paddingBottom: 32,
  },
  storyTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  storyText: {
    fontSize: 18,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 24,
  },
  storyButtonContainer: {
    marginBottom: 32,
  },
  startButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginHorizontal: 32,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hintButton: {
    padding: 8,
    borderRadius: 50,
  },
  hintButtonActive: {
    backgroundColor: '#EAB308',
  },
  hintButtonDisabled: {
    backgroundColor: '#6B7280',
  },
  hintText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  gameContainer: {
    flex: 1,
  },
  gameContent: {
    flex: 1,
    flexDirection: 'row',
  },
  gridContainer: {
    padding: 16,
  },
  gridWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  gridHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  gridHeaderSpacer: {
    width: 96,
  },
  categoryHeader: {
    marginHorizontal: 4,
  },
  categoryTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  itemsHeader: {
    flexDirection: 'row',
  },
  itemHeader: {
    width: 48,
    marginHorizontal: 2,
  },
  itemHeaderText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    height: 32,
    transform: [{ rotate: '-45deg' }],
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  suspectLabel: {
    width: 96,
  },
  suspectText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryRow: {
    flexDirection: 'row',
    marginHorizontal: 4,
  },
  gridCell: {
    width: 48,
    height: 48,
    marginHorizontal: 2,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridCellEmpty: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  gridCellTrue: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: '#22C55E',
  },
  gridCellFalse: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderColor: '#EF4444',
  },
  cellText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cluesContainer: {
    width: 320,
    padding: 16,
  },
  cluesWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    height: 400,
  },
  cluesTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  clueItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  clueText: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 20,
  },
  bottomActions: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  checkButton: {
    backgroundColor: '#22C55E',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});