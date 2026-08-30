/**
 * Al-Muhandis Platform - Provider Abstractions Visual Matrix
 * Master Specification - Phase 0 (Professional Polish Theme)
 */

import React from 'react';
import { Card, Badge } from '../ui/Components.tsx';
import { Video, CreditCard, Bot, HardDrive, CheckCircle, Shield } from 'lucide-react';

export const ProviderAbstractionsViewer: React.FC = () => {
  const providerGroups = [
    {
      title: 'مزودات الفيديو (Video Streaming)',
      icon: Video,
      description: 'واجهة موحدة IVideoProvider تدعم البث المشفر HLS وDRM والعلامة المائية',
      providers: [
        { name: 'Bunny.net Stream', status: 'DEFAULT', badge: 'الافتراضي الرئيسي', type: 'DRM + CDN' },
        { name: 'Mux Video', status: 'SUPPORTED', badge: 'مدعوم', type: 'Live & On-Demand' },
        { name: 'Cloudflare Stream', status: 'SUPPORTED', badge: 'مدعوم', type: 'Edge Streaming' },
        { name: 'YouTube Unlisted', status: 'FALLBACK', badge: 'احتياطي مجاني', type: 'Embed Only' },
      ],
    },
    {
      title: 'بوابات الدفع (Payment Gateways)',
      icon: CreditCard,
      description: 'واجهة موحدة IPaymentProvider مع Webhooks وتحقق آلي من التوقيع الرقمي',
      providers: [
        { name: 'Paymob (مصر والخليج)', status: 'DEFAULT', badge: 'الافتراضي الرئيسي', type: 'بطاقات ومحافظ' },
        { name: 'Stripe International', status: 'SUPPORTED', badge: 'مدعوم', type: 'بطاقات دولية' },
        { name: 'Fawry Pay', status: 'SUPPORTED', badge: 'مدعوم', type: 'دفع نقدي بكود مرجعي' },
        { name: 'Kashier / ValU', status: 'READY', badge: 'جاهز للربط', type: 'تقسيط ودفع فوري' },
      ],
    },
    {
      title: 'الذكاء الاصطناعي (AI Engines)',
      icon: Bot,
      description: 'واجهة موحدة IAIProvider للمساعد الذكي وتلخيص الدروس وحل المسائل',
      providers: [
        { name: 'Google Gemini 2.5 Flash', status: 'DEFAULT', badge: 'الافتراضي الرئيسي', type: 'Server-Side SDK' },
        { name: 'OpenAI GPT-4o', status: 'SUPPORTED', badge: 'مدعوم', type: 'REST API' },
        { name: 'Anthropic Claude 3.5', status: 'READY', badge: 'جاهز للربط', type: 'Context Heavy' },
      ],
    },
    {
      title: 'التخزين السحابي والإشعارات (Storage & Notifications)',
      icon: HardDrive,
      description: 'واجهات IStorageProvider و INotificationProvider للملفات الهندسية الكبيرة والتنبيهات',
      providers: [
        { name: 'AWS S3 / Cloudflare R2', status: 'DEFAULT', badge: 'ملفات وتصميمات CAD/BIM', type: 'Presigned URLs' },
        { name: 'WhatsApp & SMS Hub', status: 'SUPPORTED', badge: 'تنبيهات فورية', type: 'OTP & Updates' },
        { name: 'Email (Sendgrid/SMTP)', status: 'SUPPORTED', badge: 'إشعارات بريدية', type: 'Invoices & Alerts' },
      ],
    },
  ];

  return (
    <Card variant="default" className="border-slate-200 bg-white shadow-xs overflow-hidden p-5">
      <div className="pb-4 border-b border-slate-200 mb-5">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          طبقات التجريد للمزودين الخارجيين (Provider Abstraction Layer)
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          معمارية مرنة تتيح التبديل بين مزودي الفيديو، الدفع، الذكاء الاصطناعي، والتخزين بدون تعديل الكود الأساسي
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providerGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div key={group.title} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{group.title}</h4>
                  <p className="text-[11px] text-slate-500">{group.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                {group.providers.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs font-semibold text-slate-800">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-mono">{p.type}</span>
                      <Badge
                        variant={p.status === 'DEFAULT' ? 'blue' : p.status === 'SUPPORTED' ? 'info' : 'neutral'}
                        size="sm"
                      >
                        {p.badge}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
