# Logo Instructions

## Current Logo Setup

The website now has logo support in two places:

1. **Header Logo** - Displays in the navigation bar next to "Little Learner's"
2. **Favicon** - Shows in the browser tab/URL bar

## How to Replace with Your Own Logo

### For Header Logo

Replace the file: `public/logo.svg`

**Requirements:**
- Format: SVG (recommended) or PNG
- Size: 40x40 pixels (or any square size, it will scale)
- Background: Transparent recommended
- Colors: Should work well with your brand colors

**Alternative formats:**
If you prefer PNG/JPG instead of SVG:
1. Save your logo as `public/logo.png` or `public/logo.jpg`
2. Update `src/components/Header.jsx` line with the logo:
   ```jsx
   <img 
     src="/public/images/little-leanrs-logo.jpeg"  // Change from /logo.svg to /logo.png
     alt="Little Learner's Logo" 
     className="header__logo-image"
   />
   ```

### For Favicon (Browser Tab Icon)

Replace the file: `public/favicon.ico`

**Requirements:**
- Format: ICO (recommended) or PNG
- Size: 16x16, 32x32, or 48x48 pixels
- You can use online tools to convert your logo to .ico format:
  - https://favicon.io/
  - https://www.favicon-generator.org/

**Note:** The current setup uses the same SVG for both header and favicon. You can use different images if needed.

## Current Placeholder Logo

The current logo is a simple placeholder with:
- Blue circular background
- White book icon
- Yellow accent circle with letter "L"

This is just a starting point - replace it with your actual tuition center logo!

## Testing Your Logo

After replacing the logo files:
1. Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. Refresh the page (F5 or Cmd+R)
3. Check both the header and browser tab to see your new logo

## Need Help?

If you need help creating or converting your logo, there are many free tools available:
- Canva (for creating logos)
- GIMP (free image editor)
- Inkscape (free vector graphics editor)
- Online ICO converters for favicons
