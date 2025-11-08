'use client';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function NameTextIndenterEnhanced() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [indentType, setIndentType] = useState<'space' | 'tab'>('space');
  const [indentSize, setIndentSize] = useState('2');
  const [applyTo, setApplyTo] = useState<'all' | 'first' | 'except-first'>('all');
  const [result, setResult] = useState('');

  const handleIndent = () => {
    if (!input) {
      setResult('');
      return;
    }

    const lines = input.split('\n');
    const indent = indentType === 'space' 
      ? ' '.repeat(parseInt(indentSize) || 2)
      : '\t';

    let processedLines: string[];

    if (mode === 'add') {
      processedLines = lines.map((line, index) => {
        if (applyTo === 'all') {
          return indent + line;
        } else if (applyTo === 'first' && index === 0) {
          return indent + line;
        } else if (applyTo === 'except-first' && index !== 0) {
          return indent + line;
        }
        return line;
      });
    } else {
      // Remove indentation
      processedLines = lines.map((line, index) => {
        const shouldProcess = 
          applyTo === 'all' || 
          (applyTo === 'first' && index === 0) ||
          (applyTo === 'except-first' && index !== 0);

        if (!shouldProcess) return line;

        if (indentType === 'space') {
          const spaces = parseInt(indentSize) || 2;
          return line.replace(new RegExp(`^ {1,${spaces}}`), '');
        } else {
          return line.replace(/^\t/, '');
        }
      });
    }

    setResult(processedLines.join('\n'));
  };

  const handleCopy = () => {
    alert('Copied to clipboard!');
  };

  return (
    <ScrollView className="flex-1 p-6 bg-white dark:bg-gray-900">
      <View className="max-w-2xl w-full mx-auto">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Text Indenter
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Add or remove indentation from text lines
        </Text>

        {/* Mode Selection */}
        <View className="flex-row gap-2 mb-4">
          <TouchableOpacity
            onPress={() => setMode('add')}
            className={`flex-1 py-3 px-4 rounded-lg ${
              mode === 'add'
                ? 'bg-indigo-500'
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
              Add Indent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMode('remove')}
            className={`flex-1 py-3 px-4 rounded-lg ${
              mode === 'remove'
                ? 'bg-indigo-500'
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
              Remove Indent
            </Text>
          </TouchableOpacity>
        </View>

        {/* Indent Type */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Indent Type
          </Text>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setIndentType('space')}
              className={`flex-1 py-2 px-4 rounded-lg border ${
                indentType === 'space'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Text
                className={`text-center ${
                  indentType === 'space'
                    ? 'text-indigo-700 dark:text-indigo-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Spaces
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIndentType('tab')}
              className={`flex-1 py-2 px-4 rounded-lg border ${
                indentType === 'tab'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Text
                className={`text-center ${
                  indentType === 'tab'
                    ? 'text-indigo-700 dark:text-indigo-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Tabs
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Indent Size (only for spaces) */}
        {indentType === 'space' && (
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Spaces
            </Text>
            <TextInput
              value={indentSize}
              onChangeText={setIndentSize}
              placeholder="2"
              keyboardType="numeric"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        )}

        {/* Apply To */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Apply To
          </Text>
          <View className="space-y-2">
            <TouchableOpacity
              onPress={() => setApplyTo('all')}
              className={`py-2 px-4 rounded-lg border ${
                applyTo === 'all'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Text
                className={`${
                  applyTo === 'all'
                    ? 'text-indigo-700 dark:text-indigo-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                All Lines
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setApplyTo('first')}
              className={`py-2 px-4 rounded-lg border ${
                applyTo === 'first'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Text
                className={`${
                  applyTo === 'first'
                    ? 'text-indigo-700 dark:text-indigo-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                First Line Only
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setApplyTo('except-first')}
              className={`py-2 px-4 rounded-lg border ${
                applyTo === 'except-first'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Text
                className={`${
                  applyTo === 'except-first'
                    ? 'text-indigo-700 dark:text-indigo-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                All Except First Line
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </Text>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter text to indent or unindent"
            multiline
            numberOfLines={8}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[200px] font-mono"
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
          />
        </View>

        {/* Process Button */}
        <TouchableOpacity
          onPress={handleIndent}
          className="bg-indigo-500 py-3 px-6 rounded-lg mb-6"
        >
          <Text className="text-white text-center font-medium text-lg">
            {mode === 'add' ? 'Add Indentation' : 'Remove Indentation'}
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
                className="bg-indigo-500 py-2 px-4 rounded"
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
      </View>
    </ScrollView>
  );
}

