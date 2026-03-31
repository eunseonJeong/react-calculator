'use client'
import React from 'react';
import { CalculatorHistoryItem } from '../lib/types';
import { formatInputDisplay, stripDisplayFormatting } from '../lib/calculator';

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
  const formatHistoryValue = (value: string) => {
    const normalizedValue = stripDisplayFormatting(value);
    return /^-?\d+(\.\d+)?$/.test(normalizedValue)
      ? formatInputDisplay(normalizedValue)
      : value;
  };

  const formatHistoryExpression = (expression: string) =>
    expression
      .split(' ')
      .map((token) => formatHistoryValue(token))
      .join(' ');

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (history.length === 0) {
    return (
      <div className={`rounded-3xl border border-dashed border-stone-300 bg-white/60 p-6 text-center text-stone-500 backdrop-blur-sm ${className}`}>
        <p>계산 기록이 없습니다</p>
      </div>
    );
  }

  return (
    <div className={`w-full rounded-3xl border border-stone-200 bg-white/85 shadow-xl shadow-stone-200/60 backdrop-blur-sm ${className}`}>
      <div className="flex items-center justify-between border-b border-stone-200 p-4">
        <h3 className="text-base font-semibold text-slate-800">계산 기록</h3>
        <button
          onClick={onClearHistory}
          className="rounded-full border border-rose-200 px-3 py-1 text-xs text-rose-700 transition-colors hover:bg-rose-50 hover:text-rose-800"
        >
          전체 삭제
        </button>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="border-b border-stone-100 p-4 transition-colors last:border-b-0 hover:bg-amber-50/40"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
                <div className="break-words text-sm text-stone-500">
                  {formatHistoryExpression(item.expression)}
                </div>
                <div className="break-words text-lg font-semibold text-slate-800">
                  {formatHistoryValue(item.result)}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="rounded-full bg-stone-100 px-2 py-1 text-xs text-stone-500">
                  {formatTime(item.timestamp)}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-end gap-2 border-t border-stone-100 pt-3">
              <button
                onClick={() => onUseValue(formatHistoryValue(item.result))}
                className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-100 hover:text-sky-800"
                title="값 사용"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => onCopyToClipboard(formatHistoryValue(item.result))}
                className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100 hover:text-emerald-800"
                title="복사"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>

              <button
                onClick={() => onRemoveItem(item.id)}
                className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 transition-colors hover:bg-rose-100 hover:text-rose-800"
                title="삭제"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
