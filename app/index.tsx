import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Search, Trophy, Settings, Play } from 'lucide-react-native';

export default function MainMenu() {
  return (
    <LinearGradient
      colors={['#0f0f23', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          entering={FadeInUp.duration(800)}
          style={styles.header}
        >
          <Text style={styles.title}>
            Detective Puzzles
          </Text>
          <Text style={styles.subtitle}>
            Solve mysteries with logic
          </Text>
        </Animated.View>

        {/* Main Menu Options */}
        <View style={styles.menuContainer}>
          <Animated.View entering={FadeInDown.duration(600).delay(200)}>
            <TouchableOpacity
              onPress={() => router.push('/cases')}
              style={styles.menuItem}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#3B82F6' }]}>
                    <Play size={24} color="white" />
                  </View>
                  <View>
                    <Text style={styles.menuItemTitle}>
                      Play Cases
                    </Text>
                    <Text style={styles.menuItemSubtitle}>
                      Solve mystery puzzles
                    </Text>
                  </View>
                </View>
                <Text style={styles.emoji}>🕵️</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(300)}>
            <TouchableOpacity
              onPress={() => router.push('/daily-challenge')}
              style={styles.menuItem}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#F97316' }]}>
                    <Search size={24} color="white" />
                  </View>
                  <View>
                    <Text style={styles.menuItemTitle}>
                      Daily Challenge
                    </Text>
                    <Text style={styles.menuItemSubtitle}>
                      New puzzle every day
                    </Text>
                  </View>
                </View>
                <Text style={styles.emoji}>⚡</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(400)}>
            <TouchableOpacity
              onPress={() => router.push('/leaderboard')}
              style={styles.menuItem}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#EAB308' }]}>
                    <Trophy size={24} color="white" />
                  </View>
                  <View>
                    <Text style={styles.menuItemTitle}>
                      Leaderboard
                    </Text>
                    <Text style={styles.menuItemSubtitle}>
                      Compare your scores
                    </Text>
                  </View>
                </View>
                <Text style={styles.emoji}>🏆</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(500)}>
            <TouchableOpacity
              onPress={() => router.push('/settings')}
              style={styles.menuItem}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#6B7280' }]}>
                    <Settings size={24} color="white" />
                  </View>
                  <View>
                    <Text style={styles.menuItemTitle}>
                      Settings
                    </Text>
                    <Text style={styles.menuItemSubtitle}>
                      Preferences & more
                    </Text>
                  </View>
                </View>
                <Text style={styles.emoji}>⚙️</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Footer */}
        <Animated.View 
          entering={FadeInDown.duration(600).delay(600)}
          style={styles.footer}
        >
          <Text style={styles.footerText}>
            Challenge your mind with logical deduction
          </Text>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#D1D5DB',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  menuItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 50,
    padding: 12,
    marginRight: 16,
  },
  menuItemTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  menuItemSubtitle: {
    color: '#D1D5DB',
  },
  emoji: {
    fontSize: 32,
  },
  footer: {
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  footerText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
  },
});