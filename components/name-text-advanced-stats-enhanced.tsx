'use client';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function NameTextAdvancedStatsEnhanced() {
  const [input, setInput] = useState('');
  const [stats, setStats] = useState<{
    characters: number;
    charactersNoSpaces: number;
    words: number;
    lines: number;
    sentences: number;
    paragraphs: number;
    uniqueWords: number;
    avgWordLength: number;
    avgSentenceLength: number;
    longestWord: string;
    shortestWord: string;
    readingTime: string;
    speakingTime: string;
    topWords: Array<{ word: string; count: number }>;
  } | null>(null);

  const handleAnalyze = () => {
    if (!input.trim()) {
      setStats(null);
      return;
    }

    // Characters
    const characters = input.length;
    const charactersNoSpaces = input.replace(/\s/g, '').length;

    // Words
    const words = input.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    // Lines
    const lines = input.split('\n').length;

    // Sentences (split by . ! ?)
    const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;

    // Paragraphs
    const paragraphs = input.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const paragraphCount = paragraphs.length;

    // Unique words
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;

    // Average word length
    const avgWordLength = wordCount > 0 
      ? (words.reduce((sum, word) => sum + word.length, 0) / wordCount).toFixed(2)
      : '0';

    // Average sentence length
    const avgSentenceLength = sentenceCount > 0 
      ? (wordCount / sentenceCount).toFixed(2)
      : '0';

    // Longest and shortest words
    const sortedWords = [...words].sort((a, b) => b.length - a.length);
    const longestWord = sortedWords[0] || '';
    const shortestWord = sortedWords[sortedWords.length - 1] || '';

    // Reading time (avg 200 words per minute)
    const readingMinutes = Math.ceil(wordCount / 200);
    const readingTime = readingMinutes === 1 ? '1 minute' : `${readingMinutes} minutes`;

    // Speaking time (avg 150 words per minute)
    const speakingMinutes = Math.ceil(wordCount / 150);
    const speakingTime = speakingMinutes === 1 ? '1 minute' : `${speakingMinutes} minutes`;

    // Top words frequency
    const wordFreq: { [key: string]: number } = {};
    words.forEach(word => {
      const lower = word.toLowerCase();
      wordFreq[lower] = (wordFreq[lower] || 0) + 1;
    });
    const topWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    setStats({
      characters,
      charactersNoSpaces,
      words: wordCount,
      lines,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
      uniqueWords,
      avgWordLength: parseFloat(avgWordLength),
      avgSentenceLength: parseFloat(avgSentenceLength),
      longestWord,
      shortestWord,
      readingTime,
      speakingTime,
      topWords,
    });
  };

  return (
    <ScrollView className="flex-1 p-6 bg-white dark:bg-gray-900">
      <View className="max-w-2xl w-full mx-auto">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Advanced Text Statistics
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Get comprehensive statistics about your text
        </Text>

        {/* Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </Text>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter or paste your text here"
            multiline
            numberOfLines={10}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[250px]"
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
          />
        </View>

        {/* Analyze Button */}
        <TouchableOpacity
          onPress={handleAnalyze}
          className="bg-emerald-500 py-3 px-6 rounded-lg mb-6"
        >
          <Text className="text-white text-center font-medium text-lg">
            Analyze Text
          </Text>
        </TouchableOpacity>

        {/* Results */}
        {stats && (
          <View className="space-y-4">
            {/* Basic Stats */}
            <View className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Basic Statistics
              </Text>
              <View className="grid grid-cols-2 gap-3">
                <View className="p-3 bg-white dark:bg-gray-900 rounded">
                  <Text className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {stats.characters}
                  </Text>
                  <Text className="text-xs text-gray-600 dark:text-gray-400">
                    Characters
                  </Text>
                </View>
                <View className="p-3 bg-white dark:bg-gray-900 rounded">
                  <Text className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {stats.charactersNoSpaces}
                  </Text>
                  <Text className="text-xs text-gray-600 dark:text-gray-400">
                    Characters (no spaces)
                  </Text>
                </View>
                <View className="p-3 bg-white dark:bg-gray-900 rounded">
                  <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.words}
                  </Text>
                  <Text className="text-xs text-gray-600 dark:text-gray-400">
                    Words
                  </Text>
                </View>
                <View className="p-3 bg-white dark:bg-gray-900 rounded">
                  <Text className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {stats.uniqueWords}
                  </Text>
                  <Text className="text-xs text-gray-600 dark:text-gray-400">
                    Unique Words
                  </Text>
                </View>
                <View className="p-3 bg-white dark:bg-gray-900 rounded">
                  <Text className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                    {stats.sentences}
                  </Text>
                  <Text className="text-xs text-gray-600 dark:text-gray-400">
                    Sentences
                  </Text>
                </View>
                <View className="p-3 bg-white dark:bg-gray-900 rounded">
                  <Text className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {stats.paragraphs}
                  </Text>
                  <Text className="text-xs text-gray-600 dark:text-gray-400">
                    Paragraphs
                  </Text>
                </View>
              </View>
            </View>

            {/* Advanced Stats */}
            <View className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Advanced Metrics
              </Text>
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    Average word length:
                  </Text>
                  <Text className="text-sm font-medium text-gray-900 dark:text-white">
                    {stats.avgWordLength} characters
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    Average sentence length:
                  </Text>
                  <Text className="text-sm font-medium text-gray-900 dark:text-white">
                    {stats.avgSentenceLength} words
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    Longest word:
                  </Text>
                  <Text className="text-sm font-medium text-gray-900 dark:text-white">
                    {stats.longestWord} ({stats.longestWord.length} chars)
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    Shortest word:
                  </Text>
                  <Text className="text-sm font-medium text-gray-900 dark:text-white">
                    {stats.shortestWord} ({stats.shortestWord.length} chars)
                  </Text>
                </View>
              </View>
            </View>

            {/* Reading/Speaking Time */}
            <View className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <Text className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
                Time Estimates
              </Text>
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-emerald-700 dark:text-emerald-300">
                    Reading time (200 wpm):
                  </Text>
                  <Text className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                    {stats.readingTime}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-emerald-700 dark:text-emerald-300">
                    Speaking time (150 wpm):
                  </Text>
                  <Text className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                    {stats.speakingTime}
                  </Text>
                </View>
              </View>
            </View>

            {/* Top Words */}
            {stats.topWords.length > 0 && (
              <View className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Most Frequent Words
                </Text>
                <ScrollView className="max-h-[200px]">
                  <View className="space-y-2">
                    {stats.topWords.map((item, idx) => (
                      <View key={idx} className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-900 dark:text-white font-mono">
                          {idx + 1}. {item.word}
                        </Text>
                        <View className="flex-row items-center gap-2">
                          <View className="h-2 bg-emerald-500 rounded" style={{ width: (item.count / stats.topWords[0].count) * 100 }} />
                          <Text className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8 text-right">
                            {item.count}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

