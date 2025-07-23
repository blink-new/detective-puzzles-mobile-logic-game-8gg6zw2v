import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ArrowLeft, Clock, Lightbulb, Lock, Star } from 'lucide-react-native';
import { CASES } from '../data/cases';

export default function CaseSelection() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getDifficultyStars = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 1;
      case 'medium': return 2;
      case 'hard': return 3;
      default: return 1;
    }
  };

  return (
    <LinearGradient
      colors={['#0f0f23', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
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
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            Select a Case
          </Text>
          <Text style={styles.headerSubtitle}>
            Choose your mystery to solve
          </Text>
        </View>
      </Animated.View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {CASES.map((caseItem, index) => (
          <Animated.View
            key={caseItem.id}
            entering={FadeInDown.duration(600).delay(index * 100)}
            style={styles.caseContainer}
          >
            <TouchableOpacity
              onPress={() => router.push(`/puzzle/${caseItem.id}`)}
              style={styles.caseItem}
              disabled={caseItem.isPremium}
            >
              {/* Case Header */}
              <View style={styles.caseHeader}>
                <View style={styles.caseHeaderContent}>
                  <View style={styles.caseTitleRow}>
                    <Text style={styles.caseTitle}>
                      {caseItem.title}
                    </Text>
                    {caseItem.isPremium && (
                      <View style={styles.premiumBadge}>
                        <Lock size={16} color="white" />
                      </View>
                    )}
                  </View>
                  <Text style={styles.caseDescription}>
                    {caseItem.description}
                  </Text>
                </View>
              </View>

              {/* Case Stats */}
              <View style={styles.caseStats}>
                <View style={styles.caseStatsLeft}>
                  {/* Difficulty */}
                  <View style={styles.statItem}>
                    <View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(caseItem.difficulty) }]} />
                    <Text style={styles.statText}>
                      {caseItem.difficulty}
                    </Text>
                  </View>

                  {/* Time Limit */}
                  {caseItem.timeLimit && (
                    <View style={styles.statItem}>
                      <Clock size={14} color="#9CA3AF" />
                      <Text style={styles.statText}>
                        {caseItem.timeLimit}m
                      </Text>
                    </View>
                  )}

                  {/* Hints */}
                  <View style={styles.statItem}>
                    <Lightbulb size={14} color="#9CA3AF" />
                    <Text style={styles.statText}>
                      {caseItem.maxHints}
                    </Text>
                  </View>
                </View>

                {/* Difficulty Stars */}
                <View style={styles.starsContainer}>
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      color={i < getDifficultyStars(caseItem.difficulty) ? "#FCD34D" : "#374151"}
                      fill={i < getDifficultyStars(caseItem.difficulty) ? "#FCD34D" : "transparent"}
                    />
                  ))}
                </View>
              </View>

              {/* Premium Overlay */}
              {caseItem.isPremium && (
                <View style={styles.premiumOverlay}>
                  <View style={styles.premiumIcon}>
                    <Lock size={32} color="white" />
                  </View>
                  <Text style={styles.premiumTitle}>Premium Case</Text>
                  <Text style={styles.premiumSubtitle}>Unlock to play</Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 64,
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    color: '#D1D5DB',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  caseContainer: {
    marginBottom: 16,
  },
  caseItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  caseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  caseHeaderContent: {
    flex: 1,
    marginRight: 16,
  },
  caseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  premiumBadge: {
    backgroundColor: '#EAB308',
    borderRadius: 50,
    padding: 4,
    marginLeft: 8,
  },
  caseDescription: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 20,
  },
  caseStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  caseStatsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statText: {
    color: '#D1D5DB',
    fontSize: 14,
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  premiumOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumIcon: {
    backgroundColor: '#EAB308',
    borderRadius: 50,
    padding: 16,
    marginBottom: 8,
  },
  premiumTitle: {
    color: 'white',
    fontWeight: '600',
  },
  premiumSubtitle: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  bottomPadding: {
    height: 32,
  },
});