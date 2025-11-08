'use client';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function NameTextCharacterMapEnhanced() {
  const [input, setInput] = useState('');
  const [showDetails, setShowDetails] = useState(true);
  const [result, setResult] = useState<Array<{
    char: string;
    code: number;
    hex: string;
    binary: string;
    index: number;
  }>>([]);

  const handleAnalyze = () => {
    if (!input) {
      setResult([]);
      return;
    }

    const chars = input.split('').map((char, index) => ({
      char,
      code: char.charCodeAt(0),
      hex: char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0'),
      binary: char.charCodeAt(0).toString(2).padStart(8, '0'),
      index,
    }));

    setResult(chars);
  };

  const handleCopy = () => {
    const text = result
      .map(c => `${c.char} | ${c.code} | 0x${c.hex} | ${c.binary}`)
      .join('\n');
    alert('Copied to clipboard!');
  };

  const getCharacterCategory = (code: number) => {
    if (code >= 48 && code <= 57) return 'Digit';
    if (code >= 65 && code <= 90) return 'Uppercase Letter';
    if (code >= 97 && code <= 122) return 'Lowercase Letter';
    if (code === 32) return 'Space';
    if (code === 9) return 'Tab';
    if (code === 10) return 'Newline';
    if (code === 13) return 'Carriage Return';
    if (code < 32) return 'Control Character';
    if (code >= 33 && code <= 47) return 'Punctuation';
    if (code >= 58 && code <= 64) return 'Symbol';
    if (code >= 91 && code <= 96) return 'Symbol';
    if (code >= 123 && code <= 126) return 'Symbol';
    if (code >= 128) return 'Extended ASCII/Unicode';
    return 'Other';
  };

  return (
    <ScrollView className="flex-1 p-6 bg-white dark:bg-gray-900">
      <View className="max-w-2xl w-full mx-auto">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Character Map
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Analyze each character with Unicode codes
        </Text>

        {/* Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </Text>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter text to analyze characters"
            multiline
            numberOfLines={4}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[100px]"
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
          />
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {input.length} character(s)
          </Text>
        </View>

        {/* Options */}
        <View className="mb-4">
          <TouchableOpacity
            onPress={() => setShowDetails(!showDetails)}
            className="flex-row items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <View
              className={`w-6 h-6 rounded border-2 ${
                showDetails
                  ? 'bg-lime-500 border-lime-500'
                  : 'border-gray-300 dark:border-gray-600'
              } items-center justify-center`}
            >
              {showDetails && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text className="text-gray-700 dark:text-gray-300">
              Show detailed information
            </Text>
          </TouchableOpacity>
        </View>

        {/* Analyze Button */}
        <TouchableOpacity
          onPress={handleAnalyze}
          className="bg-lime-500 py-3 px-6 rounded-lg mb-6"
        >
          <Text className="text-white text-center font-medium text-lg">
            Analyze Characters
          </Text>
        </TouchableOpacity>

        {/* Result */}
        {result.length > 0 && (
          <View className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Character Analysis ({result.length} characters)
              </Text>
              <TouchableOpacity
                onPress={handleCopy}
                className="bg-lime-500 py-2 px-4 rounded"
              >
                <Text className="text-white text-sm">Copy</Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="max-h-[400px]">
              <View className="space-y-3">
                {result.map((char, idx) => (
                  <View
                    key={idx}
                    className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    {/* Character Display */}
                    <View className="flex-row items-center mb-2">
                      <View className="w-12 h-12 bg-lime-100 dark:bg-lime-900/30 rounded flex items-center justify-center mr-3">
                        <Text className="text-2xl text-gray-900 dark:text-white">
                          {char.char === ' ' ? '␣' : char.char === '\n' ? '↵' : char.char}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                          Position: {char.index + 1}
                        </Text>
                        {showDetails && (
                          <Text className="text-xs text-gray-600 dark:text-gray-400">
                            {getCharacterCategory(char.code)}
                          </Text>
                        )}
                      </View>
                    </View>

                    {/* Details */}
                    {showDetails && (
                      <View className="space-y-1">
                        <View className="flex-row">
                          <Text className="text-xs text-gray-600 dark:text-gray-400 w-20">
                            Decimal:
                          </Text>
                          <Text className="text-xs text-gray-900 dark:text-white font-mono">
                            {char.code}
                          </Text>
                        </View>
                        <View className="flex-row">
                          <Text className="text-xs text-gray-600 dark:text-gray-400 w-20">
                            Hex:
                          </Text>
                          <Text className="text-xs text-gray-900 dark:text-white font-mono">
                            0x{char.hex}
                          </Text>
                        </View>
                        <View className="flex-row">
                          <Text className="text-xs text-gray-600 dark:text-gray-400 w-20">
                            Binary:
                          </Text>
                          <Text className="text-xs text-gray-900 dark:text-white font-mono">
                            {char.binary}
                          </Text>
                        </View>
                        <View className="flex-row">
                          <Text className="text-xs text-gray-600 dark:text-gray-400 w-20">
                            HTML Entity:
                          </Text>
                          <Text className="text-xs text-gray-900 dark:text-white font-mono">
                            &amp;#{char.code};
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Info */}
        <View className="mt-6 p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg">
          <Text className="text-sm text-lime-800 dark:text-lime-200">
            <Text className="font-semibold">Info: </Text>
            This tool displays the Unicode character code, hexadecimal, binary,
            and HTML entity for each character in your text.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

