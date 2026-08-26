import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff781f" />
      <stop offset="50%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#ea580c" />
    </linearGradient>
    <linearGradient id="boxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fef08a" />
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#7c2d12" flood-opacity="0.35"/>
    </filter>
  </defs>
  
  <!-- Base Background -->
  <rect width="512" height="512" rx="115" fill="url(#bgGrad)"/>
  <rect x="18" y="18" width="476" height="476" rx="98" fill="none" stroke="#ffffff" stroke-width="8" stroke-opacity="0.3"/>

  <!-- Center Delivery Icon Group -->
  <g filter="url(#dropShadow)" transform="translate(18, -10)">
    <!-- Rear Delivery Box -->
    <rect x="75" y="160" width="125" height="115" rx="20" fill="url(#boxGrad)" stroke="#ffffff" stroke-width="6"/>
    <!-- Box ribbon/tape -->
    <path d="M 95 200 L 180 200 M 138 160 L 138 275" stroke="#f97316" stroke-width="10" stroke-linecap="round"/>

    <!-- Wheels -->
    <circle cx="120" cy="340" r="50" fill="#1e293b" stroke="#ffffff" stroke-width="14"/>
    <circle cx="120" cy="340" r="22" fill="#f8fafc"/>
    
    <circle cx="370" cy="340" r="50" fill="#1e293b" stroke="#ffffff" stroke-width="14"/>
    <circle cx="370" cy="340" r="22" fill="#f8fafc"/>

    <!-- Scooter Body & Frame -->
    <path d="M 120 340 L 210 330 L 285 240 L 370 240 L 370 340" fill="none" stroke="#ffffff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 210 330 L 255 180 L 340 180" fill="none" stroke="#ffffff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Handlebar & Mirror -->
    <path d="M 320 150 L 360 140 L 375 160" fill="none" stroke="#ffffff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Headlight beam -->
    <circle cx="385" cy="220" r="16" fill="#fef08a"/>
    <path d="M 395 210 L 440 195 L 440 245 Z" fill="#fef08a" opacity="0.6"/>
  </g>

  <!-- App Name Arabic Typography at Bottom -->
  <text x="50%" y="465" font-family="'Cairo', 'Tajawal', system-ui, sans-serif" font-weight="900" font-size="76px" fill="#ffffff" text-anchor="middle" letter-spacing="1">
    توصيل
  </text>
</svg>`;

// Maskable version has extra safe-area padding
const maskableSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff781f" />
      <stop offset="50%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#ea580c" />
    </linearGradient>
    <linearGradient id="boxGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fef08a" />
    </linearGradient>
    <filter id="dropShadow2" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#7c2d12" flood-opacity="0.35"/>
    </filter>
  </defs>
  
  <rect width="512" height="512" fill="url(#bgGrad2)"/>

  <g transform="translate(52, 50) scale(0.8)">
    <g filter="url(#dropShadow2)">
      <rect x="75" y="160" width="125" height="115" rx="20" fill="url(#boxGrad2)" stroke="#ffffff" stroke-width="6"/>
      <path d="M 95 200 L 180 200 M 138 160 L 138 275" stroke="#f97316" stroke-width="10" stroke-linecap="round"/>

      <circle cx="120" cy="340" r="50" fill="#1e293b" stroke="#ffffff" stroke-width="14"/>
      <circle cx="120" cy="340" r="22" fill="#f8fafc"/>
      
      <circle cx="370" cy="340" r="50" fill="#1e293b" stroke="#ffffff" stroke-width="14"/>
      <circle cx="370" cy="340" r="22" fill="#f8fafc"/>

      <path d="M 120 340 L 210 330 L 285 240 L 370 240 L 370 340" fill="none" stroke="#ffffff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 210 330 L 255 180 L 340 180" fill="none" stroke="#ffffff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>

      <path d="M 320 150 L 360 140 L 375 160" fill="none" stroke="#ffffff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="385" cy="220" r="16" fill="#fef08a"/>
      <path d="M 395 210 L 440 195 L 440 245 Z" fill="#fef08a" opacity="0.6"/>
    </g>

    <text x="50%" y="465" font-family="'Cairo', 'Tajawal', system-ui, sans-serif" font-weight="900" font-size="76px" fill="#ffffff" text-anchor="middle" letter-spacing="1">
      توصيل
    </text>
  </g>
</svg>`;

async function generateAllIcons() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);

  const svgBuffer = Buffer.from(svgContent);
  const maskableSvgBuffer = Buffer.from(maskableSvgContent);

  // 512x512 standard
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon.png'));

  // 192x192 standard
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'favicon.png'));
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // Maskable versions
  await sharp(maskableSvgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-maskable-512.png'));
  await sharp(maskableSvgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-maskable-192.png'));

  console.log('✅ All PNG & SVG icons generated successfully with sharp!');
}

generateAllIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
