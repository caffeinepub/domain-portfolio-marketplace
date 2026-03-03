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

  return (
    <>
      <motion.div
        data-ocid={`domain.card.${cardIndex}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.07 }}
        whileHover={{ y: -6, scale: 1.02 }}
        className={`
          relative rounded-xl border-2 p-5 card-raised cursor-default
          ${neonStyle.borderClass}
          flex flex-col gap-4
        `}
        style={{
          background:
            "linear-gradient(145deg, oklch(0.10 0.008 230) 0%, oklch(0.07 0.004 240) 100%)",
        }}
      >
        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-12 h-12 rounded-bl-xl rounded-tr-xl opacity-20"
          style={{ background: `var(${neonStyle.cssVar})` }}
        />

        {/* Domain Name */}
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-display font-bold text-xl md:text-2xl leading-tight break-all animate-neon-pulse ${neonStyle.textClass}`}
            >
              {domain.name}
            </h3>
          </div>

          {/* Registrar */}
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Building2 className="w-3 h-3 flex-shrink-0" />
            <span className="font-mono-code">{domain.registrar}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <Tag className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <span
            className={`font-display font-extrabold text-2xl tracking-tight ${neonStyle.textClass}`}
          >
            ${domain.price.toLocaleString()}
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

          {/* Hubungi Seller */}
          <Button
            data-ocid={`domain.contact.open_modal_button.${cardIndex}`}
            variant="ghost"
            className="w-full font-semibold text-sm text-muted-foreground hover:text-foreground border border-border"
            onClick={() => setContactOpen(true)}
          >
            Hubungi Seller
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
