import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { useCountUp } from "@/lib/useCountUp";
import { useLang } from "@/lib/i18n";
import { runScan, type ScanResult } from "@/lib/scan.functions";

export function Scan() {
  const { lang, t } = useLang();
  const scan = useServerFn(runScan);
  const [form, setForm] = useState({ company: "", what: "", pain: "" });

  const mutation = useMutation<ScanResult, Error>({
    mutationFn: () => scan({ data: { ...form, lang } }),
  });

  const disabled = !form.company.trim() || !form.what.trim() || !form.pain.trim();
  const result = mutation.data;
  const mapDone = (result?.map.length ?? 0) * 0.28 + 0.4;

  return (
    <section id="scan" className="border-t border-border bg-foreground py-28 text-background md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="mono-label text-background/50">{t.scanLabel}</p>
        <h2 className="display-xl mt-6 max-w-4xl text-[8vw] md:text-[3.8vw]">{t.scanTitle}</h2>
        <p className="mt-6 max-w-2xl text-lg text-background/70">{t.scanSub}</p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {t.scanDeliverables.map(([title, line], i) => (
            <div key={title} className="border-t border-signal pt-4">
              <p className="font-mono text-[11px] tracking-widest uppercase">
                {String(i + 1).padStart(2, "0")} — {title}
              </p>
              <p className="mt-2 text-background/70">{line}</p>
            </div>
          ))}
        </div>


        <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!disabled) mutation.mutate();
            }}
            className="space-y-6"
          >
            <Field
              label={t.scanCompany}
              value={form.company}
              placeholder={t.scanCompanyPh}
              onChange={(v) => setForm((f) => ({ ...f, company: v }))}
              maxLength={200}
            />
            <Field
              label={t.scanWhat}
              value={form.what}
              placeholder={t.scanWhatPh}
              onChange={(v) => setForm((f) => ({ ...f, what: v }))}
              textarea
              maxLength={1500}
            />
            <Field
              label={t.scanPain}
              value={form.pain}
              placeholder={t.scanPainPh}
              onChange={(v) => setForm((f) => ({ ...f, pain: v }))}
              textarea
              maxLength={1500}
            />

            <button
              type="submit"
              disabled={disabled || mutation.isPending}
              className="inline-flex border-b-2 border-signal pb-2 font-mono text-[11px] tracking-widest text-background uppercase transition-colors hover:text-signal disabled:opacity-40"
            >
              {mutation.isPending ? `${t.scanRunning}…` : t.scanRun}
            </button>

            {mutation.isError && (
              <p className="font-mono text-[11px] tracking-widest text-signal uppercase">{t.scanError}</p>
            )}
          </form>

          <div className="min-h-[420px] border border-background/15 p-6 md:p-10">
            <AnimatePresence mode="wait">
              {mutation.isPending && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {t.scanSteps.map(
                    (step, i) => (
                      <motion.p
                        key={step}
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: [0.2, 1, 0.35] }}
                        transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.35 }}
                        className="font-mono text-[11px] tracking-widest uppercase"
                      >
                        {step}…
                      </motion.p>
                    ),
                  )}
                </motion.div>
              )}

              {!mutation.isPending && !result && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="mono-label text-background/40">{t.scanMap}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3 text-background/25">
                    {t.scanIdleMap.map(
                      (s, i, arr) => (
                        <span key={s} className="flex items-center gap-3 font-mono text-xs tracking-widest uppercase">
                          {s}
                          {i < arr.length - 1 && <span className="text-signal/50">→</span>}
                        </span>
                      ),
                    )}
                  </div>
                </motion.div>
              )}

              {!mutation.isPending && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-10"
                >
                  <div>
                    <p className="mono-label text-background/40">{t.scanMap}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-y-3">
                      {result.map.map((step, i, arr) => (
                        <span key={`${step}-${i}`} className="flex items-center">
                          <motion.span
                            initial={{ opacity: 0, y: 8, borderColor: "rgba(255,255,255,0.05)" }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.28, duration: 0.4 }}
                            className="border border-background/25 px-2 py-1 font-mono text-xs tracking-widest uppercase"
                          >
                            {step}
                          </motion.span>
                          {i < arr.length - 1 && (
                            <motion.span
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.18 + i * 0.28, duration: 0.24 }}
                              className="mx-2 h-[2px] w-6 origin-left bg-signal md:w-8"
                            />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mono-label text-background/40">{t.scanFindings}</p>
                    <div className="mt-5 border-t border-background/15">
                      {result.findings.map((f, i) => (
                        <motion.div
                          key={`${f.title}-${i}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: mapDone + i * 0.45, duration: 0.5 }}
                          className="group border-b border-background/15 py-5"
                        >
                          <p className="flex items-center gap-3 font-mono text-[11px] tracking-widest text-signal uppercase">
                            <motion.span
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: mapDone + i * 0.45, duration: 0.35 }}
                              className="h-[2px] w-6 origin-left bg-signal"
                            />
                            {String(i + 1).padStart(2, "0")} — {f.kind}
                          </p>
                          <p className="mt-2 text-lg font-semibold">{f.title}</p>
                          <p className="mt-1 text-background/60">{f.detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mono-label text-background/40">{t.scanBlueprint}</p>
                    <div className="mt-5 grid grid-cols-2 gap-6 md:grid-cols-4">
                      <Stat n={result.blueprint.automations} label={t.scanAutos} delay={mapDone + 2} />
                      <Stat
                        n={result.blueprint.connections}
                        label={t.scanConnects}
                        delay={mapDone + 2.15}
                      />
                      <Stat
                        n={result.blueprint.customSystems}
                        label={t.scanBuilds}
                        delay={mapDone + 2.3}
                      />
                      <Stat
                        n={`${result.blueprint.hoursMin}–${result.blueprint.hoursMax}`}
                        label={t.scanHours}
                        delay={mapDone + 2.45}
                      />
                    </div>
                    {result.summary && <p className="mt-8 text-lg text-background/80">{result.summary}</p>}
                  </div>

                  <div className="flex flex-wrap gap-x-8 gap-y-5">
                    <a
                      href="#contact"
                      className="border-b-2 border-signal pb-2 font-mono text-[11px] tracking-widest uppercase transition-colors hover:text-signal"
                    >
                      {t.scanBuildCta} →
                    </a>
                    <button
                      onClick={() => mutation.reset()}
                      className="border-b border-background/40 pb-2 font-mono text-[11px] tracking-widest uppercase transition-colors hover:text-signal"
                    >
                      {t.scanAgain}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label, delay = 0 }: { n: number | string; label: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <p className="display-xl text-4xl md:text-5xl">
        {typeof n === "number" ? <Counter n={n} delay={delay} /> : n}
      </p>
      <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-widest text-background/50 uppercase">
        {label}
      </p>
    </motion.div>
  );
}

function Counter({ n, delay }: { n: number; delay: number }) {
  const [start, setStart] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setStart(true), delay * 1000);
    return () => clearTimeout(id);
  }, [delay]);
  const value = useCountUp(n, 800, start);
  return <>{value}</>;
}


function Field({
  label,
  value,
  placeholder,
  onChange,
  textarea,
  maxLength,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  maxLength: number;
}) {
  const cls =
    "mt-3 w-full border border-background/25 bg-transparent px-4 py-3 text-background placeholder:text-background/30 focus:border-signal focus:outline-none";
  return (
    <label className="block">
      <span className="mono-label text-background/50">{label}</span>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      ) : (
        <input
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  );
}
