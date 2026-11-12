import { ArrowLeft, ShieldCheck } from 'lucide-react'

interface PrivacyPolicyPageProps {
  onBackHome: () => void
}

export function PrivacyPolicyPage({ onBackHome }: PrivacyPolicyPageProps) {
  return (
    <main className="relative z-10 mx-auto max-w-3xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36">
      <div className="mb-10 flex items-center justify-between gap-4">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            onBackHome()
          }}
          className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Aether Nexspace</span>
        </a>
      </div>

      <article className="space-y-8 text-slate-300">
          <header>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-2 font-mono text-xs text-slate-400">
              Last updated: November 2026 · Aether Nexspace · NSquare
            </p>
          </header>

          <div className="rounded-2xl border border-cyan-400/25 bg-[#0b0e18] p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-white sm:text-base">
                <strong>Aether Nexspace collects zero personal data.</strong> There are no user accounts, no telemetry, no analytics SDKs, and no NSquare data-collection servers. Everything you store remains locally on your Windows device.
              </p>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">What Aether Nexspace Is</h2>
            <p className="text-sm leading-relaxed sm:text-base">
              Aether Nexspace is a Windows desktop application developed and published by NSquare that organizes web applications you choose (such as WhatsApp Web, Gmail, Telegram, Slack, Notion, and custom HTTPS sites) into isolated workspaces within one window. Aether Nexspace does not inspect, log, or transmit the contents of those web sessions to NSquare.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-white">Data Stored Locally on Your Device</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03] font-mono text-xs text-slate-300 uppercase">
                  <tr>
                    <th className="px-4 py-3">Data Type</th>
                    <th className="px-4 py-3">Purpose</th>
                    <th className="px-4 py-3">Storage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.07]">
                  <tr>
                    <td className="px-4 py-3 text-white">App sessions (cookies, storage, cache)</td>
                    <td className="px-4 py-3">Keep you signed in across restarts</td>
                    <td className="px-4 py-3">Local device, isolated Chromium partition per app</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-white">Workspaces, apps &amp; preferences</td>
                    <td className="px-4 py-3">Remember your layout and settings</td>
                    <td className="px-4 py-3">Local device</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-white">Workspace lock PIN (if enabled)</td>
                    <td className="px-4 py-3">Protect access to the workspace window</td>
                    <td className="px-4 py-3">Local device, encrypted via Electron safeStorage / Windows DPAPI</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-white">Site permissions</td>
                    <td className="px-4 py-3">Remember per-origin camera/mic/location prompts</td>
                    <td className="px-4 py-3">Local device</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">Network &amp; Third-Party Services</h2>
            <p className="text-sm leading-relaxed sm:text-base">
              Microsoft Store builds are updated exclusively through Microsoft Store. All traffic inside each workspace tab travels directly between your device and the web services you choose to open, governed by those services&apos; respective privacy policies. Direct hardware APIs (USB, Serial, HID, and MIDI) are blocked by default.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">Removing Your Data</h2>
            <p className="text-sm leading-relaxed sm:text-base">
              Uninstalling Aether Nexspace with user-data cleanup selected (or clearing an individual app session inside Settings) removes the stored local sessions and preferences from your device.
            </p>
          </section>
      </article>
    </main>
  )
}
