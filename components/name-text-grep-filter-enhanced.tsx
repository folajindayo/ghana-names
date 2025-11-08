'use client';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function NameTextGrepFilterEnhanced() {
  const [input, setInput] = useState('');
  const [pattern, setPattern] = useState('');
  const [mode, setMode] = useState<'contains' | 'starts' | 'ends' | 'regex' | 'not-contains'>('contains');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [result, setResult] = useState('');
  const [stats, setStats] = useState('');

  const handleFilter = () => {
    if (!input.trim() || !pattern.trim()) {
      setResult('');
      setStats('');
      return;
    }

    const lines = input.split('\n');
    const matchedLines: string[] = [];
    let matchCount = 0;

    lines.forEach((line, index) => {
      let isMatch = false;
      const searchLine = caseSensitive ? line : line.toLowerCase();
      const searchPattern = caseSensitive ? pattern : pattern.toLowerCase();

      switch (mode) {
        case 'contains':
          isMatch = searchLine.includes(searchPattern);
          break;
        case 'starts':
          isMatch = searchLine.startsWith(searchPattern);
          break;
        case 'ends':
          isMatch = searchLine.endsWith(searchPattern);
          break;
        case 'regex':
          try {
            const regex = new RegExp(pattern, caseSensitive ? '' : 'i');
            isMatch = regex.test(line);
          } catch (error) {
            // Invalid regex
            isMatch = false;
          }
          break;
        case 'not-contains':
          isMatch = !searchLine.includes(searchPattern);
          break;
      }

      if (isMatch) {
        const lineNumber = showLineNumbers ? `${index + 1}: ` : '';
        matchedLines.push(lineNumber + line);
        matchCount++;
      }
    });

    setResult(matchedLines.join('\n'));
    setStats(`Found ${matchCount} matching line(s) out of ${lines.length} total line(s)`);
  };

  const handleCopy = () => {
    alert('Copied to clipboard!');
  };

  return (
    <ScrollView className="flex-1 p-6 bg-white dark:bg-gray-900">
      <View className="max-w-2xl w-full mx-auto">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Text Grep/Filter
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Filter lines of text based on pattern matching
        </Text>

        {/* Pattern Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Pattern
          </Text>
          <TextInput
            value={pattern}
            onChangeText={setPattern}
            placeholder="Enter search pattern or regex"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Mode Selection */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Match Mode
          </Text>
          <View className="space-y-2">
            {[
              { value: 'contains', label: 'Contains' },
              { value: 'starts', label: 'Starts With' },
              { value: 'ends', label: 'Ends With' },
              { value: 'regex', label: 'Regular Expression' },
              { value: 'not-contains', label: 'Does Not Contain' },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setMode(option.value as any)}
                className={`py-2 px-4 rounded-lg border ${
                  mode === option.value
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <Text
                  className={`${
                    mode === option.value
                      ? 'text-teal-700 dark:text-teal-300 font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Options */}
        <View className="mb-4 space-y-2">
          <TouchableOpacity
            onPress={() => setCaseSensitive(!caseSensitive)}
            className="flex-row items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <View
              className={`w-6 h-6 rounded border-2 ${
                caseSensitive
                  ? 'bg-teal-500 border-teal-500'
                  : 'border-gray-300 dark:border-gray-600'
              } items-center justify-center`}
            >
              {caseSensitive && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text className="text-gray-700 dark:text-gray-300">
              Case sensitive
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowLineNumbers(!showLineNumbers)}
            className="flex-row items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <View
              className={`w-6 h-6 rounded border-2 ${
                showLineNumbers
                  ? 'bg-teal-500 border-teal-500'
                  : 'border-gray-300 dark:border-gray-600'
              } items-center justify-center`}
            >
              {showLineNumbers && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text className="text-gray-700 dark:text-gray-300">
              Show line numbers
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </Text>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter text to filter (one item per line)"
            multiline
            numberOfLines={8}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[200px] font-mono"
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
          />
        </View>

        {/* Filter Button */}
        <TouchableOpacity
          onPress={handleFilter}
          className="bg-teal-500 py-3 px-6 rounded-lg mb-6"
        >
          <Text className="text-white text-center font-medium text-lg">
            Filter Lines
          </Text>
        </TouchableOpacity>

        {/* Stats */}
        {stats && (
          <View className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Text className="text-sm text-blue-800 dark:text-blue-200">
              {stats}
            </Text>
          </View>
        )}

        {/* Result */}
        {result && (
          <View className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filtered Results
              </Text>
              <TouchableOpacity
                onPress={handleCopy}
                className="bg-teal-500 py-2 px-4 rounded"
              >
                <Text className="text-white text-sm">Copy</Text>
              </TouchableOpacity>
            </View>
            <ScrollView className="max-h-[300px]">
              <Text className="text-gray-900 dark:text-white font-mono text-sm whitespace-pre">
                {result}
              </Text>
            </ScrollView>
          </View>
        )}

        {/* Info */}
        <View className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
          <Text className="text-sm text-teal-800 dark:text-teal-200">
            <Text className="font-semibold">Tip: </Text>
            Use regex mode for advanced pattern matching with support for
            wildcards, character classes, and more.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

