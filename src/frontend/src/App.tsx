import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { ExternalLink, Globe2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { DomainCard, NEON_STYLES } from "./components/DomainCard";
import { ParticleBackground } from "./components/ParticleBackground";
import { useGetDomains } from "./hooks/useQueries";

// Fallback domains in case backend isn't seeded yet
const FALLBACK_DOMAINS = [
  {
    id: BigInt(1),
    name: "MarketMain.com",
    price: 4500,
    registrar: "GoDaddy",
    atomLink: "",
    afternicLink: "",
    spaceshipLink: "",
  },
  {
    id: BigInt(2),
    name: "LayerClaw.com",
    price: 2800,
    registrar: "Namecheap",
    atomLink: "",
    afternicLink: "",
    spaceshipLink: "",
  },
  {
    id: BigInt(3),
    name: "ClawPro.ai",
    price: 6500,
    registrar: "Dynadot",
    atomLink: "",
    afternicLink: "",
    spaceshipLink: "",
  },
  {
    id: BigInt(4),
    name: "InstaPro.ai",
    price: 8800,
    registrar: "GoDaddy",
    atomLink: "",
    afternicLink: "",
    spaceshipLink: "",
  },
  {
    id: BigInt(5),
    name: "WareLLM.com",
    price: 3200,
    registrar: "Namecheap",
    atomLink: "",
    afternicLink: "",
    spaceshipLink: "",
  },
  {
    id: BigInt(6),
    name: "TechnoASI.com",
    price: 5500,
    registrar: "Cloudflare",
    atomLink: "",
    afternicLink: "",
    spaceshipLink: "",
  },
  {
    id: BigInt(7),
    name: "COACloud.com",
    price: 2200,
    registrar: "Porkbun",
    atomLink: "",
    afternicLink: "",
    spaceshipLink: "",
  },
  {
    id: BigInt(8),
    name: "Sevotel.com",
    price: 1800,
    registrar: "Namecheap",
    atomLink: "",
    afternicLink: "",
    spaceshipLink: "",
  },
  {
    id: BigInt(9),
    name: "KongCrypto.com",
    price: 7500,
    registrar: "GoDaddy",
    atomLink: "",
    afternicLink: "",
    spaceshipLink: "",
  },
];

function DomainGrid() {
  const { data: domains, isLoading, isError } = useGetDomains();

  const displayDomains =
    !isLoading && (!domains || domains.length === 0)
      ? FALLBACK_DOMAINS
      : domains;

  if (isLoading) {
    return (
      <div
        data-ocid="domains.list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Array.from({ length: 9 }).map((_v, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders use stable index keys
            key={`skel-${i}`}
            data-ocid={`domain.card.${i + 1}`}
            className="rounded-xl border border-border p-5 space-y-4"
            style={{
              background:
                "linear-gradient(145deg, oklch(0.10 0.008 230) 0%, oklch(0.07 0.004 240) 100%)",
            }}
          >
            <Skeleton className="h-7 w-3/4 bg-muted" />
            <Skeleton className="h-4 w-1/3 bg-muted" />
            <Skeleton className="h-8 w-1/2 bg-muted" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full bg-muted" />
              <Skeleton className="h-10 w-full bg-muted" />
              <Skeleton className="h-10 w-full bg-muted" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 bg-muted" />
              <Skeleton className="h-6 w-20 bg-muted" />
              <Skeleton className="h-6 w-20 bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <div className="text-6xl">⚡</div>
        <p className="text-destructive font-semibold">Failed to load domains</p>
        <p className="text-sm text-muted-foreground">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  return (
    <div
      data-ocid="domains.list"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {(displayDomains || []).map((domain, i) => (
        <DomainCard
          key={domain.id.toString()}
          domain={domain}
          index={i}
          neonStyle={NEON_STYLES[i % NEON_STYLES.length]}
        />
      ))}
    </div>
  );
}

export default function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen bg-[#000000] overflow-x-hidden">
      {/* Animated Particle Background */}
      <ParticleBackground />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-20 bg-[oklch(0.04_0_0/0.85)]">
          <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe2 className="w-6 h-6 neon-text-cyan" />
              <span className="font-display font-bold text-lg neon-text-cyan tracking-tight">
                DomainVault
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="mailto:domains@domainvault.id"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
              >
                domains@domainvault.id
              </a>
              <a
                href="#domains"
                className="text-sm font-semibold px-4 py-1.5 rounded-full border neon-text-cyan border-current transition-all hover:bg-[oklch(0.82_0.28_195/0.1)]"
              >
                Browse Domains
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section
          data-ocid="hero.section"
          className="relative py-24 md:py-36 px-4 text-center overflow-hidden"
        >
          {/* Decorative grid lines */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(oklch(0.82 0.28 195) 1px, transparent 1px),
                linear-gradient(90deg, oklch(0.82 0.28 195) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radial glow behind title */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.82 0.28 195 / 0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-border text-xs font-mono-code text-muted-foreground"
            >
              <Zap className="w-3 h-3 neon-text-amber" />
              Premium Domain Portfolio — Available Now
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black text-4xl sm:text-5xl md:text-7xl leading-none tracking-tight mb-6"
            >
              <span className="neon-text-cyan">Premium</span>
              <br />
              <span className="text-foreground">Domain</span>
              <br />
              <span className="neon-text-magenta">Portfolio</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Koleksi domain eksklusif pilihan untuk bisnis, AI, dan crypto.
              Beli langsung atau ajukan penawaran terbaik Anda.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground font-mono-code"
            >
              {[
                "9 Premium Domains",
                "3 Marketplaces",
                "Instant BIN",
                "Make Offer",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-border bg-card"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Domain Grid */}
        <main id="domains" className="container max-w-7xl mx-auto px-4 pb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex items-center gap-4"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl neon-text-cyan">
              Available Domains
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[oklch(0.82_0.28_195/0.5)] to-transparent" />
          </motion.div>

          <DomainGrid />
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 py-10 px-4">
          <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Globe2 className="w-5 h-5 neon-text-cyan" />
                  <span className="font-display font-bold neon-text-cyan">
                    DomainVault
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Marketplace domain premium terpercaya. Temukan domain impian
                  Anda dengan harga terbaik.
                </p>
              </div>

              {/* Marketplaces */}
              <div>
                <h4 className="font-semibold text-sm mb-3 text-foreground">
                  Marketplace
                </h4>
                <div className="flex flex-col gap-2">
                  {[
                    { name: "Atom", href: "https://atom.com" },
                    { name: "Afternic", href: "https://www.afternic.com" },
                    { name: "SpaceShip", href: "https://www.spaceship.com" },
                  ].map((m) => (
                    <a
                      key={m.name}
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {m.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-sm mb-3 text-foreground">
                  Kontak
                </h4>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <a
                    href="mailto:domains@domainvault.id"
                    className="hover:text-foreground transition-colors"
                  >
                    domains@domainvault.id
                  </a>
                  <p>Response time: 24 jam</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
              © {currentYear}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </footer>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}
