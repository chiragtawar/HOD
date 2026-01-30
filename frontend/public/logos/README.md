# HOD Realty Logo Files

## Logo Locations

All logo files are saved in: `/frontend/public/logos/`

### Available Logos

1. **hod-logo-light.png** (314 KB)
   - Light background version (current/new design)
   - Navy blue and gold design
   - Used in: Navbar (header)
   - Best for: White/light backgrounds

2. **hod-logo-dark.png** (436 KB)
   - Dark background version (current/new design)
   - Gold line art on dark navy
   - Used in: Footer
   - Best for: Dark backgrounds

3. **hod-logo-light-original.png** (314 KB)
   - Original light background version (first logo)
   - Backup of the initial design
   - Available for reference or rollback

4. **hod-logo-dark-original.png** (436 KB)
   - Original dark background version (first logo)
   - Backup of the initial design
   - Available for reference or rollback

## Current Usage

### Navbar Component
File: `/frontend/src/components/Navbar.jsx`
- Currently using: `hod-logo-light.png`
- Old logo code is commented out
- To switch back: Uncomment the old code and comment out the new logo

### Footer Component
File: `/frontend/src/components/Footer.jsx`
- Currently using: `hod-logo-dark.png`
- Old logo code is commented out
- To switch back: Uncomment the old code and comment out the new logo

## How to Switch Logos

### Option 1: Revert to Old Icon Logo
In both `Navbar.jsx` and `Footer.jsx`:
1. Comment out the `<img>` tag section
2. Uncomment the old `<Command>` icon section

### Option 2: Use Different Logo File
Simply change the `src` attribute in the `<img>` tag:
```jsx
// Change from:
src="/logos/hod-logo-light.png"

// To:
src="/logos/hod-logo-dark.png"
```

## Logo Files Backup

Original logo files are also saved in:
`/Users/admin/.gemini/antigravity/brain/b3459b2f-ba40-46ea-b084-cc400345d3d3/`

- `hod_realty_logo_main_1769515623793.png` (light version)
- `hod_realty_logo_dark_1769515642736.png` (dark version)

## Customization Tips

### Adjust Logo Size
In the component, modify the `className` height:
```jsx
// Navbar - currently h-16
className="h-16 w-auto object-contain"

// Footer - currently h-20
className="h-20 w-auto object-contain"

// Try: h-12, h-14, h-16, h-18, h-20, h-24
```

### Add Hover Effects
The Navbar logo already has a hover effect:
```jsx
className="... group-hover:scale-105"
```

You can customize this to:
- `group-hover:scale-110` - Larger zoom
- `group-hover:rotate-3` - Slight rotation
- `group-hover:opacity-80` - Fade effect
