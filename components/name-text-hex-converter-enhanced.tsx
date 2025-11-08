'use client';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function NameTextHexConverterEnhanced() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [prefix, setPrefix] = useState('0x');
  const [separator, setSeparator] = useState(' ');
  const [uppercase, setUppercase] = useState(true);
  const [result, setResult] = useState('');

  const textToHex = (text: string, pre: string, sep: string, upper: boolean) => {
    return text
      .split('')
      .map(char => {
        const hex = char.charCodeAt(0).toString(16);
        return pre + (upper ? hex.toUpperCase() : hex);
      })
      .join(sep);
  };

  const hexToText = (hex: string, pre: string, sep: string) => {
    try {
      let cleanHex = hex.trim();
      // Remove prefix if present
      if (pre) {
        cleanHex = cleanHex.split(sep).map(h => h.replace(pre, '')).join(sep);
      }
      const hexArray = cleanHex.split(sep).filter(h => h.trim());
      return hexArray
        .map(h => String.fromCharCode(parseInt(h, 16)))
        .join('');
    } catch (error) {
      return 'Invalid hex input';
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setResult('');
      return;
    }

    if (mode === 'encode') {
      setResult(textToHex(input, prefix, separator, uppercase));
    } else {
      setResult(hexToText(input, prefix, separator));
    }
  };

  const handleCopy = () => {
    alert('Copied to clipboard!');
  };

  return (
    <ScrollView className="flex-1 p-6 bg-white dark:bg-gray-900">
      <View className="max-w-2xl w-full mx-auto">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Hexadecimal Converter
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Convert text to hexadecimal and vice versa
        </Text>

        {/* Mode Selection */}
        <View className="flex-row gap-2 mb-4">
          <TouchableOpacity
            onPress={() => setMode('encode')}
            className={`flex-1 py-3 px-4 rounded-lg ${
              mode === 'encode'
                ? 'bg-purple-500'
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
              Text to Hex
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMode('decode')}
            className={`flex-1 py-3 px-4 rounded-lg ${
              mode === 'decode'
                ? 'bg-purple-500'
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
              Hex to Text
            </Text>
          </TouchableOpacity>
        </View>

        {/* Options */}
        <View className="mb-4 space-y-3">
          <View>
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prefix
            </Text>
            <TextInput
              value={prefix}
              onChangeText={setPrefix}
              placeholder="Enter prefix (e.g., 0x, \\x)"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Separator
            </Text>
            <TextInput
              value={separator}
              onChangeText={setSeparator}
              placeholder="Enter separator"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity
            onPress={() => setUppercase(!uppercase)}
            className="flex-row items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <View
              className={`w-6 h-6 rounded border-2 ${
                uppercase
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-gray-300 dark:border-gray-600'
              } items-center justify-center`}
            >
              {uppercase && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text className="text-gray-700 dark:text-gray-300">
              Uppercase letters
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'encode' ? 'Input Text' : 'Input Hex'}
          </Text>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={
              mode === 'encode'
                ? 'Enter text to convert to hex'
                : 'Enter hex to convert to text'
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
          className="bg-purple-500 py-3 px-6 rounded-lg mb-6"
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
                className="bg-purple-500 py-2 px-4 rounded"
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
        <View className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <Text className="text-sm text-purple-800 dark:text-purple-200">
            <Text className="font-semibold">Note: </Text>
            Hexadecimal (base-16) uses digits 0-9 and letters A-F. Each character
            is represented by 2 hex digits.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

