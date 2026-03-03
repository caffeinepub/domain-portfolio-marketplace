import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ALL_DOMAINS = [
  "MarketMain.com",
  "LayerClaw.com",
  "ClawPro.ai",
  "InstaPro.ai",
  "WareLLM.com",
  "TechnoASI.com",
  "COACloud.com",
  "Sevotel.com",
  "KongCrypto.com",
];

interface SearchBarProps {
  onSelectDomain?: (name: string) => void;
}

export function SearchBar({ onSelectDomain }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? ALL_DOMAINS.filter((d) => d.toLowerCase().includes(query.toLowerCase()))
    : ALL_DOMAINS;

  const showDropdown = isOpen && query.trim().length > 0;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(name: string) {
    setQuery("");
    setIsOpen(false);
    if (onSelectDomain) onSelectDomain(name);

    // Scroll to domain card
    const card = document.querySelector(`[data-domain-name="${name}"]`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });

      // Flash effect: add highlight class, remove after 1.5s
      card.classList.add("domain-highlight-flash");
      setTimeout(() => {
        card.classList.remove("domain-highlight-flash");
      }, 1500);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[highlightIndex]) {
      e.preventDefault();
      handleSelect(filtered[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  // Reset highlight when query changes (derived state via effect is acceptable here
  // since `filtered` is not a stable ref — using query as the trigger is intentional)
  // biome-ignore lint/correctness/useExhaustiveDependencies: resetting highlight on query change intentionally
  useEffect(() => {
    setHighlightIndex(0);
  }, [query]);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      {/* Search Input Row */}
      <div className="relative flex items-center gap-3">
        {/* Input */}
        <div
          className="relative flex-1"
          style={{
            background: "oklch(0.08 0.008 230)",
            border: "1px solid oklch(0.25 0.08 195)",
            borderRadius: "9999px",
            boxShadow: "0 0 12px oklch(0.82 0.28 195 / 0.12)",
          }}
        >
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--neon-cyan)" }}
          />
          <input
            ref={inputRef}
            data-ocid="search.search_input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search domains... e.g. InstaPro.ai"
            className="w-full bg-transparent pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none rounded-full font-mono-code"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Glowing circular search button */}
        <button
          type="button"
          data-ocid="search.button"
          onClick={() => {
            if (filtered.length > 0) handleSelect(filtered[0]);
          }}
          className="relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center group"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.15 0.04 195) 0%, oklch(0.10 0.02 220) 100%)",
          }}
          aria-label="Search"
        >
          {/* Spinning neon ring */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, var(--neon-cyan), transparent 60%, var(--neon-cyan))",
              animation: "spin-ring 1.4s linear infinite",
              padding: "2px",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          {/* Second ring (slower, opposite) */}
          <span
            className="absolute inset-[3px] rounded-full"
            style={{
              background:
                "conic-gradient(from 180deg, oklch(0.75 0.28 330 / 0.6), transparent 50%, oklch(0.75 0.28 330 / 0.6))",
              animation: "spin-ring-reverse 2s linear infinite",
              padding: "1.5px",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          {/* Pulse glow */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "0 0 12px var(--neon-cyan), 0 0 24px oklch(0.82 0.28 195 / 0.3)",
              animation: "glow-pulse 1.8s ease-in-out infinite",
            }}
          />
          <Search
            className="relative z-10 w-4 h-4 group-hover:scale-110 transition-transform"
            style={{ color: "var(--neon-cyan)" }}
          />
        </button>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            data-ocid="search.dropdown"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full mt-2 left-0 right-14 z-50 overflow-hidden rounded-xl"
            style={{
              background: "oklch(0.08 0.008 230)",
              border: "1px solid oklch(0.25 0.08 195)",
              boxShadow:
                "0 0 20px oklch(0.82 0.28 195 / 0.15), 0 8px 32px oklch(0 0 0 / 0.6)",
            }}
          >
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-muted-foreground font-mono-code">
                No domains found
              </div>
            ) : (
              <div>
                {filtered.map((domain, i) => (
                  <div key={domain}>
                    <button
                      type="button"
                      onMouseEnter={() => setHighlightIndex(i)}
                      onClick={() => handleSelect(domain)}
                      className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm transition-colors"
                      style={{
                        background:
                          i === highlightIndex
                            ? "oklch(0.82 0.28 195 / 0.1)"
                            : "transparent",
                        color:
                          i === highlightIndex
                            ? "var(--neon-cyan)"
                            : "oklch(0.80 0.02 220)",
                      }}
                    >
                      <Search
                        className="w-3.5 h-3.5 flex-shrink-0 opacity-50"
                        style={{
                          color:
                            i === highlightIndex
                              ? "var(--neon-cyan)"
                              : "currentColor",
                        }}
                      />
                      <span className="font-mono-code font-medium">
                        {domain}
                      </span>
                      {i === highlightIndex && (
                        <span
                          className="ml-auto text-xs opacity-50 font-mono-code"
                          style={{ color: "var(--neon-cyan)" }}
                        >
                          ↵ Jump to
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
