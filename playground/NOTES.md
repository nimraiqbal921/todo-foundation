# Component Comparison Notes

## Modal

My implementation:
- Added dialog role
- Added Escape key close
- Added focus return after closing
- Added basic focus trapping

shadcn Dialog handled:
1. More complete focus management using Radix primitives
2. Better accessibility support and edge cases


## Tabs

My implementation:
- Added tablist, tab, and tabpanel roles
- Added arrow key navigation
- Added Home and End key support

shadcn Tabs handled:
1. Better keyboard interaction behavior
2. Automatic active tab and focus management


## Disclosure

My implementation:
- Used aria-expanded
- Added open and close functionality

shadcn/Radix patterns provide:
1. More complete accessibility handling
2. Better state management patterns