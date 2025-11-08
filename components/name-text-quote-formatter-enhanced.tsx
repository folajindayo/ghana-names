'use client';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function NameTextQuoteFormatterEnhanced() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [quoteStyle, setQuoteStyle] = useState<'single' | 'double' | 'backtick' | 'guillemet' | 'angle'>('double');
  const [applyTo, setApplyTo] = useState<'all' | 'lines' | 'words'>('all');
  const [result, setResult] = useState('');

  const quoteTypes = {
    single: { open: "'", close: "'" },
    double: { open: '"', close: '"' },
    backtick: { open: '`', close: '`' },
    guillemet: { open: '«', close: '»' },
    angle: { open: '<', close: '>' },
  };

  const handleFormat = () => {
    if (!input.trim()) {
      setResult('');
      return;
    }

    const quotes = quoteTypes[quoteStyle];
    let output = '';

    if (mode === 'add') {
      switch (applyTo) {
        case 'all':
          output = `${quotes.open}${input}${quotes.close}`;
          break;
        case 'lines':
          output = input
            .split('\n')
            .map(line => line.trim() ? `${quotes.open}${line}${quotes.close}` : line)
            .join('\n');
          break;
        case 'words':
          output = input
            .split(/\s+/)
            .map(word => word ? `${quotes.open}${word}${quotes.close}` : word)
            .join(' ');
          break;
      }
    } else {
      // Remove quotes
      const openQuotes = ['"', "'", '`', '«', '<'];
      const closeQuotes = ['"', "'", '`', '»', '>'];
      
      output = input;
      openQuotes.forEach(q => {
        output = output.split(q).join('');
      });
      closeQuotes.forEach(q => {
        output = output.split(q).join('');
      });
    }

    setResult(output);
  };

  const handleCopy = () => {
    alert('Copied to clipboard!');
  };

  return (
    <ScrollView className="flex-1 p-6 bg-white dark:bg-gray-900">
      <View className="max-w-2xl w-full mx-auto">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Quote Formatter
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Add or remove quotes from text
        </Text>

        {/* Mode Selection */}
        <View className="flex-row gap-2 mb-4">
          <TouchableOpacity
            onPress={() => setMode('add')}
            className={`flex-1 py-3 px-4 rounded-lg ${
              mode === 'add'
                ? 'bg-cyan-500'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <Text
              className={`text-center font-medium ${
                mode === 'add'
                  ? 'text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Add Quotes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMode('remove')}
            className={`flex-1 py-3 px-4 rounded-lg ${
              mode === 'remove'
                ? 'bg-cyan-500'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <Text
              className={`text-center font-medium ${
                mode === 'remove'
                  ? 'text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Remove Quotes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quote Style (only for add mode) */}
        {mode === 'add' && (
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quote Style
            </Text>
            <View className="space-y-2">
              {[
                { value: 'single', label: "Single Quotes ('...')" },
                { value: 'double', label: 'Double Quotes ("...")' },
                { value: 'backtick', label: 'Backticks (`...)' },
                { value: 'guillemet', label: 'Guillemets («...»)' },
                { value: 'angle', label: 'Angle Brackets (<...>)' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setQuoteStyle(option.value as any)}
                  className={`py-2 px-4 rounded-lg border ${
                    quoteStyle === option.value
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <Text
                    className={`${
                      quoteStyle === option.value
                        ? 'text-cyan-700 dark:text-cyan-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Apply To (only for add mode) */}
        {mode === 'add' && (
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Apply To
            </Text>
            <View className="space-y-2">
              {[
                { value: 'all', label: 'Entire Text' },
                { value: 'lines', label: 'Each Line' },
                { value: 'words', label: 'Each Word' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setApplyTo(option.value as any)}
                  className={`py-2 px-4 rounded-lg border ${
                    applyTo === option.value
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <Text
                    className={`${
                      applyTo === option.value
                        ? 'text-cyan-700 dark:text-cyan-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </Text>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter text to format"
            multiline
            numberOfLines={6}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[150px]"
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
          />
        </View>

        {/* Format Button */}
        <TouchableOpacity
          onPress={handleFormat}
          className="bg-cyan-500 py-3 px-6 rounded-lg mb-6"
        >
          <Text className="text-white text-center font-medium text-lg">
            {mode === 'add' ? 'Add Quotes' : 'Remove Quotes'}
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
                className="bg-cyan-500 py-2 px-4 rounded"
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

        {/* Example */}
        <View className="mt-6 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
          <Text className="text-sm font-semibold text-cyan-800 dark:text-cyan-200 mb-2">
            Example:
          </Text>
          <Text className="text-xs text-cyan-700 dark:text-cyan-300">
            Input: Hello World{'\n'}
            Output (Each Word): "Hello" "World"
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

