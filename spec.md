# Domain Portfolio Marketplace

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Domain portfolio marketplace with 9 listed domains
- Each domain card shows: domain name, price (USD), BIN button, Make Offer button, Contact Seller button, registrar name
- Each domain card has 3 marketplace redirect links: Atom, Afternic, SpaceShip
- Domain name displayed with glowing neon circular/embossed effect
- Black background with animated floating particles or moving background
- Make Offer modal/dialog with offer amount input
- Contact Seller modal/dialog with name, email, message inputs

### Modify
- None

### Remove
- None

## Implementation Plan

### Backend
- Domain data model: id, name, price (USD), registrar, atomLink, afternicLink, spaceshipLink
- Seed 9 domains with prices, registrar names, and marketplace links
- Queries: getDomains, getDomainById
- Mutations: submitOffer (domain, amount, email), contactSeller (domain, name, email, message)

### Frontend
- Landing page with hero section and domain grid
- Animated particle/star background (canvas or CSS animation)
- DomainCard component with neon glow effect on domain name
- BIN button (Buy It Now - redirects to primary marketplace)
- Make Offer button -> modal with offer form
- Contact Seller button -> modal with contact form
- Marketplace badges: Atom, Afternic, SpaceShip with external links
- Responsive grid layout
- All interactive elements with deterministic data-ocid markers

### Domains Data
1. MarketMain.com - registrar: GoDaddy
2. LayerClaw.com - registrar: Namecheap
3. ClawPro.ai - registrar: Spaceship
4. InstaPro.ai - registrar: Afternic
5. WareLLM.com - registrar: GoDaddy
6. TechnoASI.com - registrar: Namecheap
7. COACloud.com - registrar: GoDaddy
8. Sevotel.com - registrar: Namecheap
9. KongCrypto.com - registrar: GoDaddy
