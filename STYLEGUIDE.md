# Cashlyn Style Guide

This guide ensures visual and structural consistency across the Cashlyn app, using Tailwind CSS and Atomic Design principles.

---

## 1. Colors
- **Primary Brand:**
  - Black: `#171C23` (`bg-[#171C23]`, `text-[#171C23]`)
  - Lime Highlight: `#D6FF4B` or `lime-300` (`bg-lime-300`, `text-lime-700`)
- **Backgrounds:**
  - Main: `gray-50` (`bg-gray-50`)
  - Sidebar: `white` (`bg-white`)
- **Text:**
  - Main: `#171C23` (`text-[#171C23]`)
  - Muted/Inactive: `gray-400` (`text-gray-400`)
- **Borders/Dividers:**
  - Light gray: `gray-200` (`border-gray-200`)

---

## 2. Typography
- **Font Family:**
  - Sans-serif (Geist, Inter, or system default)
- **Font Weights:**
  - Brand/Logo: `font-extrabold`
  - Headings: `font-bold`
  - Sidebar active: `font-bold`
  - Sidebar inactive: `font-medium` or `font-normal`
- **Sizes:**
  - Main headings: `text-2xl`
  - Section headings: `text-lg`
  - Sidebar: `text-base`

---

## 3. Spacing & Layout
- **Sidebar:**
  - Width: `w-64`
  - Padding: `p-6`
  - Rounded: `rounded-xl`
  - Section spacing: `mb-10`, `gap-3`
- **Main Content:**
  - Padding: `p-6` or `p-8`
  - Card spacing: `mb-6`
- **Cards/Sections:**
  - Background: `bg-white`
  - Rounded: `rounded-xl`
  - Shadow: `shadow`

---

## 4. Components
- **Sidebar:**
  - Logo: Black square, left-aligned, bold brand name
  - Active link: `bg-lime-300 text-[#171C23] font-bold shadow`
  - Inactive link: `text-gray-400 hover:bg-gray-100`
  - Bottom links: Separated, gray, smaller
  - Icons: Heroicons, `w-6 h-6`
- **TopBar:**
  - Title left, search bar center/right, avatar and notification right
  - Notification: Bell icon with lime dot for unread
  - Avatar: Circle, initials or image, name next to it
- **Cards:**
  - `bg-white rounded-xl shadow p-4`
- **Buttons:**
  - Primary: `bg-lime-300 text-[#171C23] font-bold rounded-lg px-4 py-2`
  - Secondary: `bg-gray-100 text-gray-800 rounded-lg px-4 py-2`

---

## 5. Atomic Design Structure
- **Atoms:** Button, Icon, Input, Avatar, Badge, etc.
- **Molecules:** BalanceCard, QuickActions, SidebarLink, TableRow, etc.
- **Organisms:** Sidebar, TopBar, ChartSection, TransactionsTable, etc.

---

## 6. Accessibility & Responsiveness
- Use sufficient color contrast (lime on black, gray on white).
- All interactive elements should have `hover` and `focus` states.
- Layout should be responsive:
  - Sidebar collapses or becomes a drawer on mobile.
  - Main content stacks vertically on small screens.

---

## 7. Example Tailwind Classes
- **Active Sidebar Link:**
  `bg-lime-300 text-[#171C23] font-bold shadow`
- **Inactive Sidebar Link:**
  `text-gray-400 hover:bg-gray-100`
- **Card:**
  `bg-white rounded-xl shadow p-4`
- **Main Heading:**
  `text-2xl font-bold text-gray-800`
- **Button:**
  `bg-lime-300 text-[#171C23] font-bold rounded-lg px-4 py-2`

---

## Usage
- Always use the atomic structure for new components.
- Stick to the color palette and font weights for consistency.
- Use Heroicons for all icons.
- Use Tailwind utility classes for layout and spacing. 