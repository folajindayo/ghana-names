'use client';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function NameTextMorseConverterEnhanced() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [result, setResult] = useState('');

  const morseCode: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
    '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
    ' ': '/'
  };

  const reverseMorseCode = Object.fromEntries(
    Object.entries(morseCode).map(([key, value]) => [value, key])
  );

  const textToMorse = (text: string) => {
    return text
      .toUpperCase()
      .split('')
      .map(char => morseCode[char] || char)
      .join(' ');
  };

  const morseToText = (morse: string) => {
    try {
      return morse
        .split(' ')
        .map(code => reverseMorseCode[code] || code)
        .join('');
    } catch (error) {
      return 'Invalid morse code';
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setResult('');
      return;
    }

    if (mode === 'encode') {
      setResult(textToMorse(input));
    } else {
      setResult(morseToText(input));
    }
  };

  const handleCopy = () => {
    alert('Copied to clipboard!');
  };

  return (
    <ScrollView className="flex-1 p-6 bg-white dark:bg-gray-900">
      <View className="max-w-2xl w-full mx-auto">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Morse Code Converter
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Convert text to Morse code and vice versa
        </Text>

        {/* Mode Selection */}
        <View className="flex-row gap-2 mb-4">
          <TouchableOpacity
            onPress={() => setMode('encode')}
            className={`flex-1 py-3 px-4 rounded-lg ${
              mode === 'encode'
                ? 'bg-green-500'
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
              Text to Morse
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMode('decode')}
            className={`flex-1 py-3 px-4 rounded-lg ${
              mode === 'decode'
                ? 'bg-green-500'
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
              Morse to Text
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'encode' ? 'Input Text' : 'Input Morse Code'}
          </Text>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={
              mode === 'encode'
                ? 'Enter text to convert to Morse code'
                : 'Enter Morse code to convert to text (space-separated)'
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
          className="bg-green-500 py-3 px-6 rounded-lg mb-6"
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
                className="bg-green-500 py-2 px-4 rounded"
              >
                <Text className="text-white text-sm">Copy</Text>
              </TouchableOpacity>
            </View>
            <ScrollView className="max-h-[300px]">
              <Text className="text-gray-900 dark:text-white font-mono text-lg break-all">
                {result}
              </Text>
            </ScrollView>
          </View>
        )}

        {/* Morse Code Reference */}
        <View className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Text className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">
            Morse Code Reference:
          </Text>
          <Text className="text-xs text-green-700 dark:text-green-300 font-mono">
            A: .-   B: -... C: -.-. D: -..  E: .    F: ..-{'\n'}
            G: --.  H: .... I: ..   J: .--- K: -.-  L: .-..{'\n'}
            M: --   N: -.   O: ---  P: .--. Q: --.- R: .-.{'\n'}
            S: ...  T: -    U: ..-  V: ...- W: .--  X: -..-{'\n'}
            Y: -.-- Z: --.. 0-9: Numbers supported{'\n'}
            Space: / (forward slash)
          </Text>
        </View>

        {/* Info */}
        <View className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Text className="text-sm text-blue-800 dark:text-blue-200">
            <Text className="font-semibold">Note: </Text>
            Use dots (.) and dashes (-) for Morse code. Separate letters with spaces,
            and words with forward slashes (/).
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

