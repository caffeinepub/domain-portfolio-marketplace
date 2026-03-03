import { Button } from "@/components/ui/button";
import { Building2, ExternalLink, ShoppingCart, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Domain } from "../backend.d";
import { ContactSellerDialog } from "./ContactSellerDialog";
import { MakeOfferDialog } from "./MakeOfferDialog";

interface DomainCardProps {
  domain: Domain;
  index: number;
  neonStyle: NeonStyle;
}

export interface NeonStyle {
  colorKey: string;
  textClass: string;
  borderClass: string;
  cssVar: string;
}

export const NEON_STYLES: NeonStyle[] = [
  {
    colorKey: "cyan",
    textClass: "neon-text-cyan",
    borderClass: "neon-border-cyan",
    cssVar: "--neon-cyan",
  },
  {
    colorKey: "magenta",
    textClass: "neon-text-magenta",
    borderClass: "neon-border-magenta",
    cssVar: "--neon-magenta",
  },
  {
    colorKey: "lime",
    textClass: "neon-text-lime",
    borderClass: "neon-border-lime",
    cssVar: "--neon-lime",
  },
  {
    colorKey: "violet",
    textClass: "neon-text-violet",
    borderClass: "neon-border-violet",
    cssVar: "--neon-violet",
  },
  {
    colorKey: "amber",
    textClass: "neon-text-amber",
    borderClass: "neon-border-amber",
    cssVar: "--neon-amber",
  },
  {
    colorKey: "blue",
    textClass: "neon-text-blue",
    borderClass: "neon-border-blue",
    cssVar: "--neon-blue",
  },
  {
    colorKey: "red",
    textClass: "neon-text-red",
    borderClass: "neon-border-red",
    cssVar: "--neon-red",
  },
  {
    colorKey: "teal",
    textClass: "neon-text-teal",
    borderClass: "neon-border-teal",
    cssVar: "--neon-teal",
  },
  {
    colorKey: "pink",
    textClass: "neon-text-pink",
    borderClass: "neon-border-pink",
    cssVar: "--neon-pink",
  },
];

// Hype levels based on Google search trend simulation
type HypeLevel = "high" | "medium" | "low";

const HYPE_MAP: Record<string, HypeLevel> = {
  "InstaPro.ai": "high",
  "ClawPro.ai": "high",
  "KongCrypto.com": "high",
  "TechnoASI.com": "high",
  "WareLLM.com": "high",
  "MarketMain.com": "medium",
  "LayerClaw.com": "medium",
  "COACloud.com": "low",
  "Sevotel.com": "low",
};

function getHypeLevel(domainName: string): HypeLevel {
  return HYPE_MAP[domainName] ?? "low";
}

function HypeBadge({
  level,
  cardIndex,
}: {
  level: HypeLevel;
  cardIndex: number;
}) {
  if (level === "high") {
    return (
      <span
        data-ocid={`domain.hype_badge.${cardIndex}`}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono-code uppercase tracking-wider"
        style={{
          background: "oklch(0.88 0.22 60 / 0.15)",
          border: "1px solid oklch(0.88 0.22 60 / 0.5)",
          color: "oklch(0.95 0.18 60)",
          animation: "hype-badge-pulse 1.6s ease-in-out infinite",
          boxShadow:
            "0 0 6px oklch(0.88 0.22 60 / 0.4), 0 0 12px oklch(0.88 0.22 60 / 0.2)",
        }}
      >
        🔥 HOT
      </span>
    );
  }
  if (level === "medium") {
    return (
      <span
        data-ocid={`domain.hype_badge.${cardIndex}`}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono-code uppercase tracking-wider"
        style={{
          background: "oklch(0.85 0.32 135 / 0.10)",
          border: "1px solid oklch(0.85 0.32 135 / 0.35)",
          color: "oklch(0.80 0.22 135)",
        }}
      >
        ⚡ POPULAR
      </span>
    );
  }
  return null;
}

function getMarketplaceLinks(domain: Domain) {
  const name = domain.name.toLowerCase();
  return {
    atom: domain.atomLink || `https://atom.com/domains/search?q=${name}`,
    afternic: domain.afternicLink || `https://www.afternic.com/forsale/${name}`,
    spaceship:
      domain.spaceshipLink ||
      `https://www.spaceship.com/marketplace/domain/${name}`,
  };
}

export function DomainCard({ domain, index, neonStyle }: DomainCardProps) {
  const [offerOpen, setOfferOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const cardIndex = index + 1;
  const links = getMarketplaceLinks(domain);
  const hypeLevel = getHypeLevel(domain.name);

  return (
    <>
      <motion.div
        data-ocid={`domain.card.${cardIndex}`}
        data-domain-name={domain.name}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.07 }}
        whileHover={{ y: -8, scale: 1.025 }}
        className={`
          relative rounded-xl border-2 p-5 card-raised cursor-default
          neon-border-silver animate-silver-ring
          flex flex-col gap-4
        `}
        style={{
          background:
            "linear-gradient(145deg, oklch(0.11 0.006 220) 0%, oklch(0.07 0.003 230) 100%)",
          borderColor: "oklch(0.85 0.006 220)",
        }}
      >
        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-12 h-12 rounded-bl-xl rounded-tr-xl opacity-20"
          style={{ background: `var(${neonStyle.cssVar})` }}
        />

        {/* Domain Name — larger, dominant — always silver */}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display font-black text-2xl md:text-3xl lg:text-4xl leading-tight break-all neon-text-silver animate-silver-shimmer">
            {domain.name}
          </h3>

          {/* Registrar + Hype Badge row */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Building2 className="w-3 h-3 flex-shrink-0" />
              <span className="font-mono-code">{domain.registrar}</span>
            </div>
            <HypeBadge level={hypeLevel} cardIndex={cardIndex} />
          </div>
        </div>

        {/* Price — centered — always silver */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="flex items-center gap-1.5">
            <Tag
              className="w-5 h-5 flex-shrink-0"
              style={{ color: "var(--neon-silver)", opacity: 0.75 }}
            />
            <span className="font-display font-extrabold text-3xl md:text-4xl tracking-tight neon-text-silver animate-silver-shimmer">
              ${domain.price.toLocaleString()}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-mono-code mt-0.5 tracking-wider uppercase">
            USD
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {/* BIN */}
          <a
            href={links.atom}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid={`domain.bin_button.${cardIndex}`}
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
            style={{
              background: `var(${neonStyle.cssVar})`,
              color: "#000",
              boxShadow: `0 0 12px var(${neonStyle.cssVar}), 0 0 24px oklch(from var(${neonStyle.cssVar}) l c h / 0.3)`,
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            Buy It Now (BIN)
          </a>

          {/* Make Offer */}
          <Button
            data-ocid={`domain.offer.open_modal_button.${cardIndex}`}
            variant="outline"
            className="w-full border font-semibold text-sm"
            style={{
              borderColor: `var(${neonStyle.cssVar})`,
              color: `var(${neonStyle.cssVar})`,
              background: "transparent",
            }}
            onClick={() => setOfferOpen(true)}
          >
            Make Offer
          </Button>

          {/* Contact Seller */}
          <Button
            data-ocid={`domain.contact.open_modal_button.${cardIndex}`}
            variant="ghost"
            className="w-full font-semibold text-sm text-muted-foreground hover:text-foreground border border-border"
            onClick={() => setContactOpen(true)}
          >
            Contact Seller
          </Button>
        </div>

        {/* Separator */}
        <div
          className="h-px w-full"
          style={{ background: `var(${neonStyle.cssVar})`, opacity: 0.15 }}
        />

        {/* Marketplace Links */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 font-mono-code uppercase tracking-wider">
            Marketplace
          </p>
          <div className="flex gap-2">
            <a
              href={links.atom}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`domain.atom_link.${cardIndex}`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold font-mono-code transition-all hover:scale-105 active:scale-95"
              style={{
                border: `1px solid var(${neonStyle.cssVar})`,
                color: `var(${neonStyle.cssVar})`,
                background: `oklch(from var(${neonStyle.cssVar}) l c h / 0.08)`,
              }}
              title="View on Atom"
            >
              <ExternalLink className="w-3 h-3" />
              Atom
            </a>
            <a
              href={links.afternic}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`domain.afternic_link.${cardIndex}`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold font-mono-code transition-all hover:scale-105 active:scale-95"
              style={{
                border: `1px solid var(${neonStyle.cssVar})`,
                color: `var(${neonStyle.cssVar})`,
                background: `oklch(from var(${neonStyle.cssVar}) l c h / 0.08)`,
              }}
              title="View on Afternic"
            >
              <ExternalLink className="w-3 h-3" />
              Afternic
            </a>
            <a
              href={links.spaceship}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`domain.spaceship_link.${cardIndex}`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold font-mono-code transition-all hover:scale-105 active:scale-95"
              style={{
                border: `1px solid var(${neonStyle.cssVar})`,
                color: `var(${neonStyle.cssVar})`,
                background: `oklch(from var(${neonStyle.cssVar}) l c h / 0.08)`,
              }}
              title="View on SpaceShip"
            >
              <ExternalLink className="w-3 h-3" />
              SpaceShip
            </a>
          </div>
        </div>
      </motion.div>

      <MakeOfferDialog
        open={offerOpen}
        onOpenChange={setOfferOpen}
        domain={{ id: domain.id, name: domain.name, price: domain.price }}
        neonColor={neonStyle.colorKey}
      />
      <ContactSellerDialog
        open={contactOpen}
        onOpenChange={setContactOpen}
        domain={{ id: domain.id, name: domain.name }}
        neonColor={neonStyle.colorKey}
      />
    </>
  );
}
