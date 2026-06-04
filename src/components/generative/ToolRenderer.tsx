"use client";

import type { Service, ServiceCategory } from "@/lib/hitc-data";
import { useChatActions } from "./chat-actions";

type ToolInvocation = {
  toolName: string;
  toolCallId: string;
  state: "partial-call" | "call" | "result";
  args?: Record<string, unknown>;
  result?: unknown;
};

export function ToolRenderer({ inv }: { inv: ToolInvocation }) {
  if (inv.state !== "result") {
    return <SkeletonCard label={prettyToolName(inv.toolName)} />;
  }
  const r = inv.result as Record<string, unknown>;
  switch (inv.toolName) {
    case "showCompanyOverview":
      return <CompanyOverview data={r as never} />;
    case "listServicesByCategory":
      return <CategoryServices data={r as never} />;
    case "searchServices":
      return <SearchResults data={r as never} />;
    case "getServiceDetail":
      return <ServiceDetail data={r as never} />;
    case "recommend":
      return <Recommendations data={r as never} />;
    case "showDataCenter":
      return <DataCenter data={r as never} />;
    case "showContact":
      return <ContactCard data={r as never} />;
    case "showWhyHITC":
      return <WhyHITC data={r as never} />;
    default:
      return null;
  }
}

function prettyToolName(name: string): string {
  const map: Record<string, string> = {
    showCompanyOverview: "Đang tra cứu thông tin công ty…",
    listServicesByCategory: "Đang tải danh sách dịch vụ…",
    searchServices: "Đang tìm dịch vụ phù hợp…",
    getServiceDetail: "Đang lấy chi tiết dịch vụ…",
    recommend: "Đang phân tích nhu cầu…",
    showDataCenter: "Đang tải thông tin Data Center…",
    showContact: "Đang lấy thông tin liên hệ…",
    showWhyHITC: "Đang chuẩn bị các lý do nên chọn HITC…",
  };
  return map[name] ?? "Đang xử lý…";
}

function SkeletonCard({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-paper-200 bg-white p-4 shadow-soft">
      <div className="flex items-center gap-3 text-sm text-ink-500">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-brand-500" />
        {label}
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-3/4 animate-pulse rounded bg-paper-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-paper-100" />
      </div>
    </div>
  );
}

function Surface({
  eyebrow,
  children,
  accent = "brand",
}: {
  eyebrow?: string;
  accent?: "brand" | "accent";
  children: React.ReactNode;
}) {
  const dot = accent === "brand" ? "bg-brand-500" : "bg-accent-500";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-paper-200 bg-white p-5 shadow-ring">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper-200 to-transparent" />
      {eyebrow ? (
        <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          {eyebrow}
        </div>
      ) : null}
      {children}
    </div>
  );
}

function CompanyOverview({
  data,
}: {
  data: {
    profile: { name: string; tagline: string; about: string; mission: string; vision: string; website: string };
    stats: { cableKm: number; customers: number; internationalGateways: number; dataCenterTier: string };
    partners: string[];
  };
}) {
  const { profile, stats, partners } = data;
  return (
    <Surface eyebrow="HITC · Tổng quan">
      <h3 className="font-display text-2xl leading-tight text-ink-900">{profile.name}</h3>
      <p className="mt-2 text-sm text-ink-500">{profile.tagline}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={`${stats.cableKm.toLocaleString()}+`} label="km cáp quang Bắc–Nam" />
        <Stat value={`${stats.internationalGateways}`} label="hướng quốc tế" />
        <Stat value={`${stats.customers.toLocaleString()}+`} label="khách hàng DN" />
        <Stat value={stats.dataCenterTier} label="Data Center EcoDC" />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <Card title="Sứ mệnh">{profile.mission}</Card>
        <Card title="Tầm nhìn">{profile.vision}</Card>
      </div>

      <div className="mt-5">
        <div className="text-xs uppercase tracking-wider text-ink-500">Đối tác công nghệ</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {partners.map((p) => (
            <span
              key={p}
              className="rounded-full border border-paper-200 bg-paper-50 px-3 py-1 text-xs text-ink-700"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </Surface>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-paper-200 bg-paper-50 p-3">
      <div className="font-display text-2xl text-ink-900">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-500">{label}</div>
    </div>
  );
}

function Chip({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "brand" | "emerald" | "accent";
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : tone === "accent"
        ? "bg-accent-500/10 text-accent-600 ring-accent-500/30"
        : "bg-brand-50 text-brand-700 ring-brand-100";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ring-1 ${toneClass}`}
    >
      <span className="font-semibold uppercase tracking-wider opacity-70">{label}</span>
      <span>{value}</span>
    </span>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-paper-200 bg-paper-50 p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-ink-800">{children}</p>
    </div>
  );
}

const CATEGORY_ACCENT: Record<ServiceCategory, string> = {
  data: "from-emerald-100 to-transparent",
  internet: "from-sky-100 to-transparent",
  cloud: "from-indigo-100 to-transparent",
  digital: "from-fuchsia-100 to-transparent",
  voice: "from-amber-100 to-transparent",
};

function ServiceTile({ s }: { s: Service }) {
  const { ask } = useChatActions();
  return (
    <button
      type="button"
      onClick={() => ask(`Cho mình xem chi tiết dịch vụ "${s.title}" (id: ${s.id})`)}
      className="group relative block w-full overflow-hidden rounded-xl border border-paper-200 bg-white p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-brand-400/60 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 ${CATEGORY_ACCENT[s.category]}`}
      />
      <div className="relative">
        <div className="text-[10px] uppercase tracking-[0.18em] text-ink-500">{s.id}</div>
        <h4 className="mt-1 font-display text-lg leading-tight text-ink-900">{s.title}</h4>
        <p className="mt-2 text-sm text-ink-700 line-clamp-2">{s.summary}</p>
        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-brand-600 opacity-0 transition group-hover:opacity-100">
          Hỏi trợ lý về dịch vụ này
          <span aria-hidden>→</span>
        </div>
      </div>
    </button>
  );
}

function CategoryServices({
  data,
}: {
  data: {
    category: ServiceCategory;
    meta: { label: string; icon: string; description: string };
    services: Service[];
  };
}) {
  const { meta, services, category } = data;
  return (
    <Surface eyebrow={`Nhóm dịch vụ · ${category}`}>
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-2xl">
          {meta.icon}
        </div>
        <div>
          <h3 className="font-display text-xl text-ink-900">{meta.label}</h3>
          <p className="mt-1 text-sm text-ink-500">{meta.description}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {services.map((s) => (
          <ServiceTile key={s.id} s={s} />
        ))}
      </div>
    </Surface>
  );
}

function SearchResults({ data }: { data: { keyword: string; services: Service[] } }) {
  return (
    <Surface eyebrow={`Kết quả tìm kiếm · "${data.keyword}"`}>
      {data.services.length === 0 ? (
        <p className="text-sm text-ink-500">
          Không tìm thấy dịch vụ phù hợp. Bạn có thể mô tả rõ hơn nhu cầu để mình gợi ý.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {data.services.map((s) => (
            <ServiceTile key={s.id} s={s} />
          ))}
        </div>
      )}
    </Surface>
  );
}

function Recommendations({ data }: { data: { goal: string; services: Service[] } }) {
  return (
    <Surface eyebrow="Gợi ý cho nhu cầu của bạn" accent="accent">
      <p className="text-sm italic text-ink-700">"{data.goal}"</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {data.services.length === 0 ? (
          <p className="text-sm text-ink-500">
            Mình cần thêm chi tiết về quy mô / công nghệ hiện tại để gợi ý chính xác.
          </p>
        ) : (
          data.services.map((s, i) => (
            <div key={s.id} className="relative">
              <div className="absolute -left-2 -top-2 z-10 grid h-6 w-6 place-items-center rounded-full bg-accent-500 font-display text-xs font-bold text-white shadow-soft">
                {i + 1}
              </div>
              <ServiceTile s={s} />
            </div>
          ))
        )}
      </div>
    </Surface>
  );
}

function ServiceDetail({
  data,
}: {
  data: { found: false; id: string } | { found: true; service: Service };
}) {
  if (!data.found) {
    return (
      <Surface eyebrow="Không tìm thấy">
        <p className="text-sm text-ink-500">
          Mình không có dịch vụ với mã <code className="text-ink-900">{data.id}</code>. Bạn thử mô tả nhu cầu để mình gợi ý nhé.
        </p>
      </Surface>
    );
  }
  const s = data.service;
  return (
    <Surface eyebrow={`Dịch vụ · ${s.category}`}>
      <h3 className="font-display text-2xl text-ink-900">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-700">{s.summary}</p>

      {(s.sla || s.pricingModel) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {s.sla && (
            <Chip label="SLA" value={s.sla} tone="emerald" />
          )}
          {s.pricingModel && (
            <Chip label="Pricing" value={s.pricingModel} tone="brand" />
          )}
        </div>
      )}

      <div className="mt-5">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-600">
          Điểm nổi bật
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {s.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 rounded-lg border border-paper-200 bg-paper-50 p-3 text-sm text-ink-800"
            >
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {s.idealFor && s.idealFor.length > 0 && (
        <div className="mt-5">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-600">
            Phù hợp với
          </div>
          <ul className="space-y-1.5">
            {s.idealFor.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink-800">
                <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-500/15 text-[10px] text-accent-600">
                  ✦
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      <a
        href={s.url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-glow transition hover:bg-brand-600"
      >
        Mở trang chính thức
        <span aria-hidden>↗</span>
      </a>
    </Surface>
  );
}

function DataCenter({
  data,
}: {
  data: {
    dc: { name: string; tier: string; highlights: string[] };
    stats: { dataCenterTier: string };
  };
}) {
  return (
    <Surface eyebrow={`Data Center · ${data.dc.tier}`}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl text-ink-900">{data.dc.name}</h3>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
          Uptime Institute {data.dc.tier}
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {data.dc.highlights.map((h) => (
          <li key={h} className="flex items-start gap-3 text-sm text-ink-800">
            <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-50 text-[10px] text-brand-600">
              ✓
            </span>
            {h}
          </li>
        ))}
      </ul>
    </Surface>
  );
}

function ContactCard({
  data,
}: {
  data: {
    contact: { website: string; hotline: string; email: string; address: string; sunteco: string };
  };
}) {
  const c = data.contact;
  return (
    <Surface eyebrow="Liên hệ HITC" accent="accent">
      <div className="grid gap-3 sm:grid-cols-2">
        <ContactItem label="Hotline" value={c.hotline} href={`tel:${c.hotline.replace(/\s/g, "")}`} />
        <ContactItem label="Email" value={c.email} href={`mailto:${c.email}`} />
        <ContactItem label="Website" value={c.website.replace(/^https?:\/\//, "")} href={c.website} />
        <ContactItem label="Sunteco Cloud" value={c.sunteco.replace(/^https?:\/\//, "")} href={c.sunteco} />
      </div>
      <div className="mt-4 rounded-xl border border-paper-200 bg-paper-50 p-3 text-sm text-ink-800">
        <div className="text-xs uppercase tracking-wider text-ink-500">Văn phòng</div>
        <div className="mt-1">{c.address}</div>
      </div>
    </Surface>
  );
}

function ContactItem({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex flex-col rounded-xl border border-paper-200 bg-paper-50 p-3 transition hover:border-accent-500/50"
    >
      <span className="text-[11px] uppercase tracking-wider text-ink-500">{label}</span>
      <span className="mt-1 text-sm text-ink-900 group-hover:text-accent-600">{value}</span>
    </a>
  );
}

function WhyHITC({
  data,
}: {
  data: {
    positioning: string;
    usps: Array<{
      id: string;
      title: string;
      icon: string;
      pitch: string;
      proof: string[];
    }>;
  };
}) {
  return (
    <Surface eyebrow="Tại sao chọn HITC" accent="accent">
      <p className="font-display text-lg leading-snug text-ink-900">
        {data.positioning}
      </p>
      <div className="mt-5 space-y-3">
        {data.usps.map((u, i) => (
          <article
            key={u.id}
            className="relative overflow-hidden rounded-xl border border-paper-200 bg-paper-50 p-4"
          >
            <div className="absolute -right-6 -top-6 grid h-20 w-20 place-items-center rounded-full bg-brand-50 text-3xl opacity-80">
              {u.icon}
            </div>
            <div className="relative">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-xs font-bold text-accent-500">
                  0{i + 1}
                </span>
                <h4 className="font-display text-base font-semibold text-ink-900">
                  {u.title}
                </h4>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{u.pitch}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {u.proof.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-paper-200 bg-white px-2.5 py-1 text-[11px] text-ink-700"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Surface>
  );
}
