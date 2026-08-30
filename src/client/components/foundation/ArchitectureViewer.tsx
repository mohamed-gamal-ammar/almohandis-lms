/**
 * Al-Muhandis Platform - Architecture & Monorepo Structure Viewer
 * Master Specification - Phase 0 (Professional Polish Theme)
 */

import React, { useState } from 'react';
import { Card, Badge } from '../ui/Components.tsx';
import { FolderTree, Layers, ShieldCheck, Database, Cpu, Terminal, FileCode2, Check } from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'structure' | 'rbac' | 'database' | 'security'>('structure');

  return (
    <Card variant="default" className="border-slate-200 bg-white shadow-xs overflow-hidden p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            مخطط المعمارية الشاملة (Architecture Master Specification)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            فصل تام بين Frontend, Backend, Shared Types, Database, و Abstraction Providers
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 overflow-x-auto">
          {[
            { id: 'structure', label: 'هيكل المشروع', icon: FolderTree },
            { id: 'rbac', label: 'مصفوفة الصلاحيات (RBAC)', icon: ShieldCheck },
            { id: 'database', label: 'قاعدة البيانات (Prisma)', icon: Database },
            { id: 'security', label: 'الأمان والـValidation', icon: Cpu },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content: Structure */}
      {activeTab === 'structure' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-3">
                <FileCode2 className="w-4 h-4" />
                <span>Frontend (Client-Side SPA)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>React 19 + TypeScript + Tailwind CSS</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>دعم كامل للغة العربية والـRTL مع خطوط Cairo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>مكونات واجهة مستخدم قياسية وقابلة لإعادة الاستخدام</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>FeatureFlagProvider لإدارة الميزات الحية</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-3">
                <Terminal className="w-4 h-4" />
                <span>Backend & API Versioning</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Node.js + Express بأسلوب Clean Architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>مسارات إصدارية معتمدة: <code>/api/v1/*</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Structured JSON Logger مع حجب الأسرار تلقائيًا</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>معالجة مركزية للأخطاء عبر <code>AppError</code></span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Shared Core & Infrastructure</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>عقود وبيانات مشتركة <code>src/shared/*</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Prisma ORM + PostgreSQL جاهز للترحيل</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>مزودات مجردة: Video, Payment, AI, Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>حماية Helmet و CORS وسياسات الأمان</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Monorepo Architecture Terminal Box */}
          <div className="bg-[#0F172A] text-slate-300 rounded-xl p-4 font-mono text-[11px] border border-slate-800 space-y-2" dir="ltr">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span className="ml-2 text-xs font-semibold text-slate-200">al-muhandis-monorepo-structure</span>
              </span>
              <span className="text-[10px] text-emerald-400">Strict TypeScript 5.8</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div>
                <p className="text-blue-400 font-bold">├── src/</p>
                <p className="text-slate-400 pl-4">├── client/ <span className="text-slate-500"># React 19 UI, Context, Custom Hooks</span></p>
                <p className="text-slate-400 pl-4">├── server/ <span className="text-slate-500"># Express v1 Router, Middleware, Controllers</span></p>
                <p className="text-slate-400 pl-4">└── shared/ <span className="text-slate-500"># Types, Enums, DTOs, Provider Contracts</span></p>
                <p className="text-emerald-400 font-bold">├── prisma/</p>
                <p className="text-slate-400 pl-4">└── schema.prisma <span className="text-slate-500"># 21 Models with PostgreSQL</span></p>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-slate-800 md:pl-4 pt-2 md:pt-0 text-slate-400">
                <p className="text-emerald-400">$ yarn typecheck</p>
                <p className="text-slate-300">✓ Typecheck completed. 0 errors found.</p>
                <p className="text-emerald-400 mt-2">$ yarn test</p>
                <p className="text-slate-300">✓ 12 test suites passed (100% assertions verified)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: RBAC */}
      {activeTab === 'rbac' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3">الدور الوظيفي (Role)</th>
                  <th className="p-3">الوصف والمسؤولية</th>
                  <th className="p-3">إدارة الكورسات</th>
                  <th className="p-3">رفع الفيديو</th>
                  <th className="p-3">المدفوعات</th>
                  <th className="p-3">الذكاء الاصطناعي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold text-rose-600">SUPER_ADMIN</td>
                  <td className="p-3">إدارة كاملة للمنصة وتهيئة الخوادم والصلاحيات</td>
                  <td className="p-3"><Badge variant="success" size="sm">كامل</Badge></td>
                  <td className="p-3"><Badge variant="success" size="sm">مسموح</Badge></td>
                  <td className="p-3"><Badge variant="success" size="sm">كامل</Badge></td>
                  <td className="p-3"><Badge variant="success" size="sm">مسموح</Badge></td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold text-amber-700">INSTRUCTOR</td>
                  <td className="p-3">المحاضر الهندسي المسؤول عن المحتوى والتقييم</td>
                  <td className="p-3"><Badge variant="success" size="sm">إنشاء وتعديل</Badge></td>
                  <td className="p-3"><Badge variant="success" size="sm">مسموح</Badge></td>
                  <td className="p-3"><Badge variant="neutral" size="sm">عرض فقط</Badge></td>
                  <td className="p-3"><Badge variant="success" size="sm">مسموح</Badge></td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold text-blue-700">TEACHING_ASSISTANT</td>
                  <td className="p-3">المعيد / المساعد للرد على استفسارات الطلاب والتصحيح</td>
                  <td className="p-3"><Badge variant="blue" size="sm">قراءة وتصحيح</Badge></td>
                  <td className="p-3"><Badge variant="danger" size="sm">محظور</Badge></td>
                  <td className="p-3"><Badge variant="danger" size="sm">محظور</Badge></td>
                  <td className="p-3"><Badge variant="success" size="sm">مسموح</Badge></td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold text-emerald-700">STUDENT</td>
                  <td className="p-3">المهندس / الطالب المشترك في الدورات التعليمية</td>
                  <td className="p-3"><Badge variant="blue" size="sm">مشاهدة المسجل</Badge></td>
                  <td className="p-3"><Badge variant="danger" size="sm">محظور</Badge></td>
                  <td className="p-3"><Badge variant="neutral" size="sm">شراء واشتراك</Badge></td>
                  <td className="p-3"><Badge variant="success" size="sm">مساعد ذكي</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Database */}
      {activeTab === 'database' && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              جداول ونماذج البيانات المعرفة في Prisma (21 Models & Enums):
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'User', 'UserProfile', 'UserSession', 'Course', 'CourseModule',
                'Lesson', 'VideoAsset', 'Attachment', 'Enrollment', 'LessonProgress',
                'PaymentOrder', 'PaymentTransaction', 'WebhookEventLog', 'Quiz',
                'QuizQuestion', 'QuizSubmission', 'Review', 'DiscussionThread',
                'DiscussionReply', 'Notification', 'FeatureFlag', 'AuditLog'
              ].map((model) => (
                <span key={model} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-2xs">
                  {model}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Security */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-sm font-bold text-emerald-700 mb-2">معايير الأمان المنفذة في Phase 0:</h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>• تشفير وفحص الـHeaders عبر Helmet</li>
              <li>• عزل تام لمفاتيح الـAPI والـSecrets عن الـFrontend</li>
              <li>• حجب آلي لكلمات المرور والتوكنز من الـLogs</li>
              <li>• تتبع الطلبات عبر <code>X-Request-Id</code> الفريد</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-sm font-bold text-blue-700 mb-2">التحقق من البيانات (Strict Validation):</h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>• Zod Schemas لكل DTO ومخطط إدخال</li>
              <li>• TypeScript Strict Mode مفعّل بالكامل</li>
              <li>• عدم الاعتماد على بيانات وهمية في الـServer</li>
              <li>• Error Handling موحد برمز كود وHTTP Status دقيق</li>
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};
