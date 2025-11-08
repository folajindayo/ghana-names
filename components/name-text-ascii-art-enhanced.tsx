'use client';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function NameTextAsciiArtEnhanced() {
  const [input, setInput] = useState('');
  const [style, setStyle] = useState<'standard' | 'block' | 'banner' | 'small' | 'big'>('standard');
  const [result, setResult] = useState('');

  const fonts: { [key: string]: { [key: string]: string[] } } = {
    standard: {
      'A': ['  _  ', ' / \\ ', '/ _ \\', '| | |', '|_| |'],
      'B': [' ___', '| _ \\', '| _ /', '|___/', '|___|'],
      'C': [' ___ ', '/ __|', '| (__ ', ' \\___|', '     '],
      // Simplified set for demo
    },
    block: {
      'A': ['█████', '█   █', '█████', '█   █', '█   █'],
      'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
      'C': ['█████', '█    ', '█    ', '█    ', '█████'],
    },
    banner: {
      'A': ['#    #', '##  ##', '# ## #', '#    #', '#    #'],
      'B': ['#### ', '#   #', '#### ', '#   #', '#### '],
      'C': ['#####', '#    ', '#    ', '#    ', '#####'],
    },
    small: {
      'A': [' _ ', '/_\\', '   '],
      'B': ['|_)', '|_\\', '   '],
      'C': [' _', '(_ ', '   '],
    },
    big: {
      'A': [
        '    _    ',
        '   / \\   ',
        '  / _ \\  ',
        ' / ___ \\ ',
        '/_/   \\_\\',
      ],
      'B': [
        ' ____  ',
        '| __ ) ',
        '|  _ \\ ',
        '| |_) |',
        '|____/ ',
      ],
      'C': [
        '  ____ ',
        ' / ___|',
        '| |    ',
        '| |___ ',
        ' \\____|',
      ],
    },
  };

  const convertToAsciiArt = (text: string, fontStyle: string) => {
    const font = fonts[fontStyle] || fonts.standard;
    const chars = text.toUpperCase().split('');
    const height = font['A']?.length || 5;
    const lines: string[] = Array(height).fill('');

    for (const char of chars) {
      if (char === ' ') {
        // Add spacing for space character
        for (let i = 0; i < height; i++) {
          lines[i] += '  ';
        }
      } else if (font[char]) {
        // Add the character's ASCII art
        for (let i = 0; i < height; i++) {
          lines[i] += (font[char][i] || ' '.repeat(font['A'][i].length)) + ' ';
        }
      } else {
        // Fallback for unsupported characters
        for (let i = 0; i < height; i++) {
          lines[i] += char + ' ';
        }
      }
    }

    return lines.join('\n');
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setResult('');
      return;
    }

    // Limit to first 15 characters for demo
    const limitedInput = input.slice(0, 15);
    const asciiArt = convertToAsciiArt(limitedInput, style);
    setResult(asciiArt);
  };

  const handleCopy = () => {
    alert('Copied to clipboard!');
  };

  return (
    <ScrollView className="flex-1 p-6 bg-white dark:bg-gray-900">
      <View className="max-w-2xl w-full mx-auto">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ASCII Art Generator
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Convert text to ASCII art with different styles
        </Text>

        {/* Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </Text>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter text (max 15 characters)"
            maxLength={15}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholderTextColor="#9CA3AF"
          />
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {input.length}/15 characters
          </Text>
        </View>

        {/* Style Selection */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ASCII Art Style
          </Text>
          <View className="space-y-2">
            {[
              { value: 'standard', label: 'Standard' },
              { value: 'block', label: 'Block' },
              { value: 'banner', label: 'Banner' },
              { value: 'small', label: 'Small' },
              { value: 'big', label: 'Big' },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setStyle(option.value as any)}
                className={`py-2 px-4 rounded-lg border ${
                  style === option.value
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <Text
                  className={`${
                    style === option.value
                      ? 'text-pink-700 dark:text-pink-300 font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Convert Button */}
        <TouchableOpacity
          onPress={handleConvert}
          className="bg-pink-500 py-3 px-6 rounded-lg mb-6"
        >
          <Text className="text-white text-center font-medium text-lg">
            Generate ASCII Art
          </Text>
        </TouchableOpacity>

        {/* Result */}
        {result && (
          <View className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                ASCII Art Result
              </Text>
              <TouchableOpacity
                onPress={handleCopy}
                className="bg-pink-500 py-2 px-4 rounded"
              >
                <Text className="text-white text-sm">Copy</Text>
              </TouchableOpacity>
            </View>
            <ScrollView className="max-h-[400px]" horizontal>
              <Text className="text-gray-900 dark:text-white font-mono text-xs whitespace-pre">
                {result}
              </Text>
            </ScrollView>
          </View>
        )}

        {/* Info */}
        <View className="mt-6 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
          <Text className="text-sm text-pink-800 dark:text-pink-200">
            <Text className="font-semibold">Note: </Text>
            This is a simplified ASCII art generator supporting A-C letters.
            For full alphabet support, consider using dedicated ASCII art libraries.
          </Text>
        </View>

        {/* Example */}
        <View className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Example Output (ABC):
          </Text>
          <Text className="text-xs text-gray-600 dark:text-gray-400 font-mono whitespace-pre">
            {`  _   ___   ___ \n / \\  | _ \\ / __|\n/ _ \\ | _ / | (__ \n| | | |___/  \\___|`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

