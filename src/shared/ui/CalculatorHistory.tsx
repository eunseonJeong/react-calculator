'use client'
import React from 'react';
import { CalculatorHistoryItem } from '../lib/types';

interface CalculatorHistoryProps {
  history: CalculatorHistoryItem[];
  onUseValue: (value: string) => void;
  onRemoveItem: (id: string) => void;
  onClearHistory: () => void;
  onCopyToClipboard: (text: string) => void;
  className?: string;
}

export const CalculatorHistory: React.FC<CalculatorHistoryProps> = ({
  history,
  onUseValue,
  onRemoveItem,
  onClearHistory,
  onCopyToClipboard,
  className = '',
}) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (history.length === 0) {
    return (
      <div className={`p-4 text-center text-gray-500 ${className}`}>
        <p>계산 기록이 없습니다</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border w-full ${className}`}>
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="text-base font-semibold text-gray-800">계산 기록</h3>
        <button
          onClick={onClearHistory}
          className="px-2 py-1 text-xs text-red-600 border-red-600 border hover:text-red-800 hover:bg-red-50 rounded transition-colors"
        >
          전체 삭제
        </button>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-600 mb-1 break-words">
                  {item.expression}
                </div>
                <div className="text-lg font-semibold text-gray-800 break-words">
                  {item.result}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatTime(item.timestamp)}
                </div>
              </div>
              
              <div className="flex gap-1 ml-3 flex-shrink-0">
                <button
                  onClick={() => onUseValue(item.result)}
                  className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  title="값 사용"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button
                  onClick={() => onCopyToClipboard(item.result)}
                  className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                  title="복사"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                  title="삭제"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
