# Design System & Semantic Color Tokens (`kumarnallana`)

This document defines the permanent, centralized semantic color architecture for the `kumarnallana` portfolio, ensuring all components adhere to the **60 / 30 / 10 Rule** (60% Neutral Dark Surfaces, 30% Secondary/Borders, 10% Accents).

---

## 1. Semantic Color Tokens

### ⬛ 60% — Neutral Base & Surface Tokens
| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `color-bg-base` | `#0B0F14` | Main page background, banner base, badge label background |
| `color-bg-surface` | `#10161D` | Standard card containers, table cell surfaces |
| `color-bg-elevated` | `#151C24` | Elevated badge values, interactive button surfaces |
| `color-bg-overlay` | `#18212B` | Hover states, popovers, active highlights |

---

### 🔲 30% — Borders & Structural Elevation Tokens
| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `color-border-subtle` | `#1E293B` | Dividers, subtle separation lines, table borders |
| `color-border-default` | `#27313D` | Standard card borders, badge container borders |
| `color-border-strong` | `#344150` | Active borders, focused inputs, interactive hover borders |

---

### 🔤 Typography & Contrast Hierarchy
| Token | Hex Value | Semantic Usage | Contrast Target |
| :--- | :--- | :--- | :--- |
| `color-text-primary` | `#F5F7FA` | Primary titles, hero name, badge values | > 12:1 (AAA) |
| `color-text-secondary` | `#C3CBD5` | Body descriptions, overview text, card copy | > 7:1 (AAA) |
| `color-text-muted` | `#8A94A3` | Labels, dates, secondary tags | > 4.5:1 (AA) |
| `color-text-subtle` | `#64748B` | Footnotes, watermark captions | > 3:1 |

---

### 🎨 10% — Accent & Status Tokens (Restrained Usage)
| Token | Hex Value | Semantic Usage | Application Rule |
| :--- | :--- | :--- | :--- |
| `color-accent-primary` | `#38BDF8` | Key icons, typing animation, hero accent | Use only for focal points and active states |
| `color-accent-secondary`| `#60A5FA` | Secondary tech highlights, subtle gradients | Soft supporting gradient stops |
| `color-status-success` | `#22C55E` | "Open to Opportunities" status indicator dot | Small dot or subtle accent only |
| `color-status-warning` | `#F59E0B` | In-progress alerts | Small indicator only |
| `color-status-error` | `#EF4444` | Critical errors/validation | Small indicator only |

---

## 2. Component Token Mapping Rules

### Badges & Metadata
- **Never use saturated neon backgrounds for badge containers.**
- **Label:** `color-bg-base` (`#0B0F14`)
- **Value Container:** `color-bg-elevated` (`#151C24`)
- **Value Text:** `color-text-primary` (`#F5F7FA`)
- **Icon / Accent:** `color-accent-primary` (`#38BDF8`) or `color-status-success` (`#22C55E`)

### CTA Buttons (LinkedIn, Email, GitHub)
- **Container:** Unified `color-bg-elevated` (`#151C24`)
- **Label / Prefix:** `color-bg-base` (`#0B0F14`)
- **Text:** `color-text-primary` (`#F5F7FA`)
- **Icon:** Unified `color-accent-primary` (`#38BDF8`)

### Tech Stack Badges
- **Container:** Unified `color-bg-elevated` (`#151C24`)
- **Text:** `color-text-primary` (`#F5F7FA`)
- **Logo:** Retains natural brand logo color inside the icon, surrounded by neutral dark surface.

---

## 3. Strict Prohibitions
1. ❌ **No saturated rectangular blocks** (e.g. pure cyan `#00F2FE` or bright green `#10B981` containers).
2. ❌ **No multi-colored button rows** where adjacent buttons use different background colors.
3. ❌ **No color drift**—any new component must strictly map to these tokens.
