/**
 * Al-Muhandis Platform - Feature Flags Control & Testing Inspector
 * Master Specification - Phase 0 (Professional Polish Theme)
 */

import React, { useState } from 'react';
import { Card, Badge, Button } from '../ui/Components.tsx';
import { useFeatureFlags } from '../../context/FeatureFlagContext.tsx';
import { FEATURE_FLAG_REGISTRY } from '../../../shared/constants/feature-flags.ts';
import { FeatureFlagKey } from '../../../shared/types/feature-flags.ts';
import { Sliders, ToggleLeft, ToggleRight, RotateCcw } from 'lucide-react';

export const FeatureFlagsInspector: React.FC = () => {
  const { flags, toggleFlag, resetFlags, isLoading } = useFeatureFlags();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'AI', 'VIDEO', 'PAYMENT', 'COMMUNITY', 'SYSTEM'];

  const flagList = Object.values(FEATURE_FLAG_REGISTRY).filter((def) => {
    if (selectedCategory === 'ALL') return true;
    return def.category === selectedCategory;
  });

  return (
    <Card variant="default" className="border-slate-200 bg-white shadow-xs overflow-hidden p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" />
            نظام التحكم في الميزات (Feature Flags Engine)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            تفعيل وتعطيل الميزات بشكل ديناميكي دون الحاجة لإعادة نشر الكود
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="secondary"
            onClick={resetFlags}
            isLoading={isLoading}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            إعادة تعيين للافتراضي
          </Button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200'
            }`}
          >
            {cat === 'ALL' && 'الكل'}
            {cat === 'AI' && '🤖 الذكاء الاصطناعي'}
            {cat === 'VIDEO' && '🎬 بث الفيديو'}
            {cat === 'PAYMENT' && '💳 بوابات الدفع'}
            {cat === 'COMMUNITY' && '👥 المجتمع والشهادات'}
            {cat === 'SYSTEM' && '⚙️ إعدادات النظام'}
          </button>
        ))}
      </div>

      {/* Flags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {flagList.map((def) => {
          const isEnabled = flags[def.key as FeatureFlagKey] ?? def.defaultValue;
          return (
            <div
              key={def.key}
              className={`p-4 rounded-xl border transition-all ${
                isEnabled
                  ? 'bg-blue-50/30 border-blue-200'
                  : 'bg-slate-50 border-slate-200 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-800">{def.descriptionArabic}</span>
                    <Badge variant={isEnabled ? 'blue' : 'neutral'} size="sm">
                      {isEnabled ? 'مفعل' : 'معطل'}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{def.descriptionEnglish}</p>
                  <code className="text-[11px] font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                    {def.key}
                  </code>
                </div>

                <button
                  onClick={() => toggleFlag(def.key as FeatureFlagKey, !isEnabled)}
                  disabled={isLoading}
                  className={`p-1 rounded-lg transition-all cursor-pointer ${
                    isEnabled
                      ? 'text-blue-600 hover:bg-blue-100/50'
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'
                  }`}
                  title={isEnabled ? 'تعطيل الميزة' : 'تفعيل الميزة'}
                >
                  {isEnabled ? (
                    <ToggleRight className="w-8 h-8 text-blue-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
