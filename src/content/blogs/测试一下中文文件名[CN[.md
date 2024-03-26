---
title: 'Relative, absolute, fixed'
pubDate: 2022-09-03
description: 'Relative, absolute, fixed'
author: 'Astro 学习者'
image:
   url: 'https://docs.astro.build/assets/full-logo-light.png'
   alt: 'The full Astro logo.'
tags: ['astro', 'blogging', 'css']
---

## CHEATSHEET

|                         | Relative           | Absolute                    | Fixed    |
| ----------------------- | ------------------ | --------------------------- | -------- |
| In Normal Flow          | Yes                | No                          | No       |
| Offset Affects Position | Yes                | Yes                         | Yes      |
| Affects Other Elements  | No                 | No                          | No       |
| Position Context        | Self (normal flow) | Nearest positioned ancestor | Viewport |

### Relative Positioning

-  **Use for minor adjustments**: If an element needs to be nudged a little bit in any direction, `relative` positioning is often the easiest way to do it.
-  **Layering with z-index**: When using `relative` positioning, you can use the `z-index` property to change the stacking order of elements that overlap.
-  **Container for absolute elements**: An element with `relative` positioning can act as a container for absolutely positioned child elements.

### Absolute Positioning

-  **Removing elements from flow**: Absolute positioning can be used to remove an element from the document flow, which means it will not affect the layout of other elements.
-  **Positioning within a container**: To position an element absolutely within a container, set the parent's position to `relative`. This turns the parent into the positioning context for the absolutely positioned child.
-  **Overlapping elements**: Be mindful of other elements when positioning absolutely, as this can lead to overlapping. Always check how your layout behaves on different screen sizes.

### Fixed Positioning

-  **Creating a sticky header or footer**: Fixed positioning is commonly used for headers or footers that should remain visible while the user scrolls through a page.
-  **Viewport as the reference**: Remember that `fixed` positioned elements are always relative to the viewport and not affected by scrolling or other elements.
-  **Mobile considerations**: Fixed elements can behave unexpectedly on mobile devices, especially with virtual keyboards that can change the viewport size.

### General Tips

-  **Test responsiveness**: Always test your layout at various screen sizes to ensure your positioning looks good on all devices.
-  **Use with purpose**: Only use absolute or fixed positioning when necessary. Overusing these properties can make your layout hard to manage and maintain.
-  **Fallbacks for older browsers**: Some older browsers may not support certain positioning contexts, so make sure you have fallbacks or consider the necessity if you're aiming for wide compatibility.
-  **Combine with flexbox or grid**: Modern layouts benefit from combining positioning with Flexbox or Grid layouts for complex alignment and placement.
