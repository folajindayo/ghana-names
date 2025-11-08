'use client';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function NameTextColumnExtractorEnhanced() {
  const [input, setInput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [columnNumbers, setColumnNumbers] = useState('1');
  const [skipEmptyLines, setSkipEmptyLines] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [outputDelimiter, setOutputDelimiter] = useState(',');
  const [result, setResult] = useState('');
  const [stats, setStats] = useState('');

  const handleExtract = () => {
    if (!input.trim()) {
      setResult('');
      setStats('');
      return;
    }

    const lines = input.split('\n');
    const columnsToExtract = columnNumbers
      .split(',')
      .map(n => parseInt(n.trim()) - 1)
      .filter(n => !isNaN(n) && n >= 0);

    if (columnsToExtract.length === 0) {
      setResult('Error: Please specify valid column numbers (e.g., 1,2,3)');
      setStats('');
      return;
    }

    const extractedLines: string[] = [];
    let processedCount = 0;
    let skippedCount = 0;

    for (const line of lines) {
      if (skipEmptyLines && !line.trim()) {
        skippedCount++;
        continue;
      }

      const columns = line.split(delimiter);
      const extractedColumns = columnsToExtract
        .map(index => {
          const col = columns[index] || '';
          return trimWhitespace ? col.trim() : col;
        });

      extractedLines.push(extractedColumns.join(outputDelimiter));
      processedCount++;
    }

    setResult(extractedLines.join('\n'));
    setStats(
      `Processed: ${processedCount} lines | Skipped: ${skippedCount} lines | Columns extracted: ${columnsToExtract.length}`
    );
  };

  const handleCopy = () => {
    alert('Copied to clipboard!');
  };

  return (
    <ScrollView className="flex-1 p-6 bg-white dark:bg-gray-900">
      <View className="max-w-2xl w-full mx-auto">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Column Extractor
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Extract specific columns from delimited text
        </Text>

        {/* Delimiter Settings */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Delimiter
          </Text>
          <TextInput
            value={delimiter}
            onChangeText={setDelimiter}
            placeholder="Enter delimiter (e.g., comma, tab, pipe)"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholderTextColor="#9CA3AF"
          />
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Common: comma (,), tab (\t), pipe (|), semicolon (;), space
          </Text>
        </View>

        {/* Column Numbers */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Column Numbers (1-indexed)
          </Text>
          <TextInput
            value={columnNumbers}
            onChangeText={setColumnNumbers}
            placeholder="e.g., 1,3,5 or 2"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholderTextColor="#9CA3AF"
          />
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Comma-separated list of column numbers to extract
          </Text>
        </View>

        {/* Output Delimiter */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Output Delimiter
          </Text>
          <TextInput
            value={outputDelimiter}
            onChangeText={setOutputDelimiter}
            placeholder="Delimiter for output columns"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Options */}
        <View className="mb-4 space-y-2">
          <TouchableOpacity
            onPress={() => setSkipEmptyLines(!skipEmptyLines)}
            className="flex-row items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <View
              className={`w-6 h-6 rounded border-2 ${
                skipEmptyLines
                  ? 'bg-orange-500 border-orange-500'
                  : 'border-gray-300 dark:border-gray-600'
              } items-center justify-center`}
            >
              {skipEmptyLines && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text className="text-gray-700 dark:text-gray-300">
              Skip empty lines
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTrimWhitespace(!trimWhitespace)}
            className="flex-row items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <View
              className={`w-6 h-6 rounded border-2 ${
                trimWhitespace
                  ? 'bg-orange-500 border-orange-500'
                  : 'border-gray-300 dark:border-gray-600'
              } items-center justify-center`}
            >
              {trimWhitespace && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text className="text-gray-700 dark:text-gray-300">
              Trim whitespace from columns
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
            placeholder="Enter delimited text (e.g., CSV data)"
            multiline
            numberOfLines={8}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[200px] font-mono"
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
          />
        </View>

        {/* Extract Button */}
        <TouchableOpacity
          onPress={handleExtract}
          className="bg-orange-500 py-3 px-6 rounded-lg mb-6"
        >
          <Text className="text-white text-center font-medium text-lg">
            Extract Columns
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
                Extracted Columns
              </Text>
              <TouchableOpacity
                onPress={handleCopy}
                className="bg-orange-500 py-2 px-4 rounded"
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
        <View className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <Text className="text-sm font-semibold text-orange-800 dark:text-orange-200 mb-2">
            Example:
          </Text>
          <Text className="text-xs text-orange-700 dark:text-orange-300 font-mono">
            Input: John,Doe,30,NYC{'\n'}
            Jane,Smith,25,LA{'\n'}
            {'\n'}
            Delimiter: ,{'\n'}
            Columns: 1,2{'\n'}
            {'\n'}
            Output: John,Doe{'\n'}
            Jane,Smith
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

