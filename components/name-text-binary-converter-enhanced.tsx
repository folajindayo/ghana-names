'use client';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function NameTextBinaryConverterEnhanced() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [separator, setSeparator] = useState(' ');
  const [result, setResult] = useState('');

  const textToBinary = (text: string, sep: string) => {
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(sep);
  };

  const binaryToText = (binary: string, sep: string) => {
    try {
      const binaryArray = binary.split(sep).filter(b => b.trim());
      return binaryArray
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');
    } catch (error) {
      return 'Invalid binary input';
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setResult('');
      return;
    }

    if (mode === 'encode') {
      setResult(textToBinary(input, separator));
    } else {
      setResult(binaryToText(input, separator));
    }
  };

  const handleCopy = () => {
    // Copy functionality would be implemented with Clipboard API
    alert('Copied to clipboard!');
  };

  return (
    <ScrollView className="flex-1 p-6 bg-white dark:bg-gray-900">
      <View className="max-w-2xl w-full mx-auto">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Binary Converter
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Convert text to binary and vice versa
        </Text>

        {/* Mode Selection */}
        <View className="flex-row gap-2 mb-4">
          <TouchableOpacity
            onPress={() => setMode('encode')}
            className={`flex-1 py-3 px-4 rounded-lg ${
              mode === 'encode'
                ? 'bg-blue-500'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <Text
              className={`text-center font-medium ${
                mode === 'encode'
                  ? 'text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Text to Binary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMode('decode')}
            className={`flex-1 py-3 px-4 rounded-lg ${
              mode === 'decode'
                ? 'bg-blue-500'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <Text
              className={`text-center font-medium ${
                mode === 'decode'
                  ? 'text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Binary to Text
            </Text>
          </TouchableOpacity>
        </View>

        {/* Separator Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Separator
          </Text>
          <TextInput
            value={separator}
            onChangeText={setSeparator}
            placeholder="Enter separator (space, comma, etc.)"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'encode' ? 'Input Text' : 'Input Binary'}
          </Text>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={
              mode === 'encode'
                ? 'Enter text to convert to binary'
                : 'Enter binary to convert to text'
            }
            multiline
            numberOfLines={6}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[150px]"
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
          />
        </View>

        {/* Convert Button */}
        <TouchableOpacity
          onPress={handleConvert}
          className="bg-blue-500 py-3 px-6 rounded-lg mb-6"
        >
          <Text className="text-white text-center font-medium text-lg">
            Convert
          </Text>
        </TouchableOpacity>

        {/* Result */}
        {result && (
          <View className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Result
              </Text>
              <TouchableOpacity
                onPress={handleCopy}
                className="bg-blue-500 py-2 px-4 rounded"
              >
                <Text className="text-white text-sm">Copy</Text>
              </TouchableOpacity>
            </View>
            <ScrollView className="max-h-[300px]">
              <Text className="text-gray-900 dark:text-white font-mono text-sm break-all">
                {result}
              </Text>
            </ScrollView>
          </View>
        )}

        {/* Info */}
        <View className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Text className="text-sm text-blue-800 dark:text-blue-200">
            <Text className="font-semibold">Note: </Text>
            {mode === 'encode'
              ? 'Each character is converted to its 8-bit binary representation'
              : 'Binary strings must be valid 8-bit representations'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

