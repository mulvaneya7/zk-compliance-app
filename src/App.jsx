import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Database, Lock, FileCheck, Link as LinkIcon, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";

function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = "", variant, children, ...props }) {
  return (
    <button
      className={`${variant === "secondary" ? "bg-slate-200 text-slate-900" : "bg-emerald-500 text-slate-950"} px-4 font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function pseudoHash(input) {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = (h1 ^ (h1 >>> 16)) >>> 0;
  h2 = (h2 ^ (h2 >>> 13)) >>> 0;
  return `0x${h1.toString(16).padStart(8, "0")}${h2.toString(16).padStart(8, "0")}${(h1 ^ h2).toString(16).padStart(8, "0")}`;
}

function generateSyntheticDataset(size, pepRatePercent) {
  const pepCount = Math.round(size * (pepRatePercent / 100));
  const rows = [];
  for (let i = 0; i < size; i++) {
    rows.push({
      id: `CUST-${String(i + 1).padStart(5, "0")}`,
      pep: i < pepCount,
      riskBand: i < pepCount ? "enhanced-review" : i % 7 === 0 ? "standard-review" : "low-risk",
    });
  }
  return rows;
}

export default function ZKComplianceV01Prototype() {
  const [datasetSize, setDatasetSize] = useState(10000);
  const [pepRate, setPepRate] = useState(3.12);
  const [proof, setProof] = useState(null);

  const threshold = 5;
  const dataset = useMemo(() => generateSyntheticDataset(datasetSize, pepRate), [datasetSize, pepRate]);
  const pepCount = useMemo(() => dataset.filter((row) => row.pep).length, [dataset]);
  const actualRate = (pepCount / datasetSize) * 100;
  const passes = actualRate < threshold;

  const generateProof = () => {
    const timestamp = new Date().toISOString();
    const publicClaim = {
      claim: "PEP exposure is below threshold",
      thresholdPercent: threshold,
      datasetSize,
      result: passes ? "VERIFIED" : "FAILED",
    };
    const privateSummary = {
      pepCount,
      actualRate: Number(actualRate.toFixed(4)),
      note: "v0.1 demo uses local synthetic data and a simulated proof hash",
    };
    const proofHash = pseudoHash(JSON.stringify({ publicClaim, privateSummary, timestamp }));
    const ledgerId = pseudoHash(`ledger:${proofHash}:${timestamp}`).slice(0, 18);

    setProof({
      timestamp,
      proofHash,
      ledgerId,
      publicClaim,
      privateSummary,
    });
  };

  const resetDemo = () => setProof(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
              <ShieldCheck className="h-4 w-4" /> v0.1 prototype · simulated proof workflow
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Verify compliance without exposing customer data.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              This lightweight demo models the project’s core claim: an acquiring party can verify that politically exposed person exposure is below a defined threshold without receiving raw customer records.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <MiniStep icon={<Database />} title="Synthetic dataset" text="Customer records are generated locally for demonstration." />
              <MiniStep icon={<Lock />} title="Private computation" text="Raw rows stay inside the simulated execution boundary." />
              <MiniStep icon={<FileCheck />} title="Verifiable output" text="The auditor sees a result, proof hash, and ledger reference." />
            </div>
          </section>

          <Card className="rounded-3xl border-white/10 bg-white/10 text-white shadow-2xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold">Demo Controls</h2>
              <p className="mt-2 text-sm text-slate-300">Configure a synthetic M&A customer population.</p>

              <div className="mt-6 space-y-6">
                <label className="block">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Dataset size</span>
                    <span className="font-mono text-slate-200">{datasetSize.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={datasetSize}
                    onChange={(e) => setDatasetSize(Number(e.target.value))}
                    className="w-full"
                  />
                </label>

                <label className="block">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>PEP exposure rate</span>
                    <span className="font-mono text-slate-200">{pepRate.toFixed(2)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="9"
                    step="0.01"
                    value={pepRate}
                    onChange={(e) => setPepRate(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-950/60 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-slate-300">Compliance assertion</span>
                  <span className="font-semibold">PEP &lt; 5%</span>
                </div>
                <Metric label="Synthetic customers" value={datasetSize.toLocaleString()} />
                <Metric label="PEP count" value={pepCount.toLocaleString()} />
                <Metric label="Calculated exposure" value={`${actualRate.toFixed(2)}%`} />
              </div>

              <div className="mt-6 flex gap-3">
                <Button onClick={generateProof} className="flex-1 rounded-2xl py-6 text-base">
                  Generate Compliance Proof
                </Button>
                <Button onClick={resetDemo} variant="secondary" className="rounded-2xl py-6">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 grid gap-6 lg:grid-cols-3"
        >
          <StatusCard
            icon={passes ? <CheckCircle2 /> : <AlertTriangle />}
            title="Threshold Status"
            value={passes ? "Verified" : "Failed"}
            text={passes ? "The synthetic dataset satisfies the <5% PEP assertion." : "The synthetic dataset exceeds the allowed PEP threshold."}
            good={passes}
          />
          <StatusCard
            icon={<Lock />}
            title="Data Disclosure"
            value="No raw rows exposed"
            text="The demo intentionally shows only counts and public verification artifacts."
            good
          />
          <StatusCard
            icon={<LinkIcon />}
            title="Ledger Anchor"
            value={proof ? "Simulated" : "Pending"}
            text="v0.1 records a mock ledger reference instead of using Hyperledger Fabric."
            good={Boolean(proof)}
          />
        </motion.section>

        {proof && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl"
          >
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold">Auditor Verification Output</h2>
                <p className="mt-2 text-slate-300">Public evidence package generated by the v0.1 prototype.</p>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">Generated {new Date(proof.timestamp).toLocaleString()}</span>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Artifact label="Public claim" value={proof.publicClaim.claim} />
              <Artifact label="Verification result" value={proof.publicClaim.result} />
              <Artifact label="Threshold" value={`${proof.publicClaim.thresholdPercent}%`} />
              <Artifact label="Dataset size" value={proof.publicClaim.datasetSize.toLocaleString()} />
              <Artifact label="Proof hash" value={proof.proofHash} mono />
              <Artifact label="Mock ledger id" value={proof.ledgerId} mono />
            </div>

            <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5 text-amber-100">
              <strong>v0.1 limitation:</strong> This prototype simulates the zero-knowledge proof and ledger anchor. The next version should replace the simulated proof hash with a Circom/SnarkJS proof for the same &lt;5% PEP threshold assertion.
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}

function MiniStep({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
      <div className="mb-3 text-emerald-300 [&_svg]:h-6 [&_svg]:w-6">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 py-3 last:border-0">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="font-mono text-sm text-slate-100">{value}</span>
    </div>
  );
}

function StatusCard({ icon, title, value, text, good }) {
  return (
    <Card className="rounded-3xl border-white/10 bg-white/10 text-white shadow-xl">
      <CardContent className="p-6">
        <div className={good ? "text-emerald-300" : "text-amber-300"}>{React.cloneElement(icon, { className: "h-7 w-7" })}</div>
        <h3 className="mt-4 text-sm uppercase tracking-wide text-slate-400">{title}</h3>
        <p className="mt-2 text-2xl font-semibold">{value}</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
      </CardContent>
    </Card>
  );
}

function Artifact({ label, value, mono }) {
  return (
    <div className="rounded-2xl bg-slate-950/60 p-5">
      <div className="text-sm text-slate-400">{label}</div>
      <div className={mono ? "mt-2 break-all font-mono text-sm text-emerald-200" : "mt-2 text-lg font-semibold text-white"}>{value}</div>
    </div>
  );
}
