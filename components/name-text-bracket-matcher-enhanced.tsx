'use client';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function NameTextBracketMatcherEnhanced() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{
    balanced: boolean;
    pairs: Array<{ type: string; open: number; close: number }>;
    unmatched: Array<{ char: string; position: number; type: 'open' | 'close' }>;
    stats: { round: number; square: number; curly: number; angle: number };
  } | null>(null);

  const bracketPairs: { [key: string]: string } = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
  };

  const closingBrackets: { [key: string]: string } = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
  };

  const handleCheck = () => {
    if (!input) {
      setResult(null);
      return;
    }

    const stack: Array<{ char: string; position: number }> = [];
    const pairs: Array<{ type: string; open: number; close: number }> = [];
    const unmatched: Array<{ char: string; position: number; type: 'open' | 'close' }> = [];
    const stats = { round: 0, square: 0, curly: 0, angle: 0 };

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (bracketPairs[char]) {
        // Opening bracket
        stack.push({ char, position: i });
      } else if (closingBrackets[char]) {
        // Closing bracket
        if (stack.length === 0) {
          unmatched.push({ char, position: i, type: 'close' });
        } else {
          const last = stack[stack.length - 1];
          if (bracketPairs[last.char] === char) {
            // Matching pair
            stack.pop();
            const type = char === ')' ? 'round' : char === ']' ? 'square' : char === '}' ? 'curly' : 'angle';
            pairs.push({ type, open: last.position, close: i });
            
            // Update stats
            if (type === 'round') stats.round++;
            else if (type === 'square') stats.square++;
            else if (type === 'curly') stats.curly++;
            else if (type === 'angle') stats.angle++;
          } else {
            unmatched.push({ char, position: i, type: 'close' });
          }
        }
      }
    }

    // Any remaining opening brackets are unmatched
    while (stack.length > 0) {
      const item = stack.pop();
      if (item) {
        unmatched.push({ char: item.char, position: item.position, type: 'open' });
      }
    }

    setResult({
      balanced: unmatched.length === 0,
      pairs,
      unmatched,
      stats,
    });
  };

  const getBracketColor = (type: string) => {
    switch (type) {
      case 'round': return 'text-blue-600 dark:text-blue-400';
      case 'square': return 'text-green-600 dark:text-green-400';
      case 'curly': return 'text-purple-600 dark:text-purple-400';
      case 'angle': return 'text-orange-600 dark:text-orange-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <ScrollView className="flex-1 p-6 bg-white dark:bg-gray-900">
      <View className="max-w-2xl w-full mx-auto">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bracket Matcher
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Check if brackets are properly balanced and matched
        </Text>

        {/* Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </Text>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter text with brackets to check"
            multiline
            numberOfLines={6}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[150px] font-mono"
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
          />
        </View>

        {/* Check Button */}
        <TouchableOpacity
          onPress={handleCheck}
          className="bg-violet-500 py-3 px-6 rounded-lg mb-6"
        >
          <Text className="text-white text-center font-medium text-lg">
            Check Brackets
          </Text>
        </TouchableOpacity>

        {/* Result */}
        {result && (
          <View className="space-y-4">
            {/* Balance Status */}
            <View className={`p-4 rounded-lg ${result.balanced ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <Text className={`text-lg font-semibold ${result.balanced ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                {result.balanced ? '✓ Balanced' : '✗ Not Balanced'}
              </Text>
              <Text className={`text-sm mt-1 ${result.balanced ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                {result.balanced 
                  ? 'All brackets are properly matched' 
                  : `Found ${result.unmatched.length} unmatched bracket(s)`}
              </Text>
            </View>

            {/* Statistics */}
            <View className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Statistics:
              </Text>
              <View className="space-y-1">
                <Text className="text-sm text-blue-600 dark:text-blue-400">
                  Round brackets ( ): {result.stats.round} pair(s)
                </Text>
                <Text className="text-sm text-green-600 dark:text-green-400">
                  Square brackets [ ]: {result.stats.square} pair(s)
                </Text>
                <Text className="text-sm text-purple-600 dark:text-purple-400">
                  Curly brackets {`{ }`}: {result.stats.curly} pair(s)
                </Text>
                <Text className="text-sm text-orange-600 dark:text-orange-400">
                  Angle brackets &lt; &gt;: {result.stats.angle} pair(s)
                </Text>
              </View>
            </View>

            {/* Matched Pairs */}
            {result.pairs.length > 0 && (
              <View className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Matched Pairs:
                </Text>
                <ScrollView className="max-h-[200px]">
                  <View className="space-y-1">
                    {result.pairs.map((pair, idx) => (
                      <Text key={idx} className={`text-sm font-mono ${getBracketColor(pair.type)}`}>
                        {pair.type.charAt(0).toUpperCase() + pair.type.slice(1)}: Position {pair.open} → {pair.close}
                      </Text>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}

            {/* Unmatched Brackets */}
            {result.unmatched.length > 0 && (
              <View className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <Text className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
                  Unmatched Brackets:
                </Text>
                <ScrollView className="max-h-[200px]">
                  <View className="space-y-1">
                    {result.unmatched.map((item, idx) => (
                      <Text key={idx} className="text-sm text-red-700 dark:text-red-300 font-mono">
                        '{item.char}' at position {item.position} ({item.type === 'open' ? 'opening' : 'closing'})
                      </Text>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        )}

        {/* Info */}
        <View className="mt-6 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
          <Text className="text-sm text-violet-800 dark:text-violet-200">
            <Text className="font-semibold">Supported brackets: </Text>
            Round ( ), Square [ ], Curly {`{ }`}, Angle &lt; &gt;
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

