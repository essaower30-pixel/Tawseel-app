/**
 * PWA Dynamic Manager
 * Safe, lightweight icon & install manager that prevents memory leaks and Android WebView freezes.
 */

export const DEFAULT_APP_ICON_KEY = "tw_app_custom_icon";

/**
 * Retrieves the currently configured icon from storage or returns default PNG
 */
export function getActiveAppIcon(_themeColor = "#f97316", _appName = "توصيل"): string {
  try {
    const custom = localStorage.getItem(DEFAULT_APP_ICON_KEY);
    if (custom && custom.startsWith("data:image")) {
      return custom;
    }
  } catch {}
  return "/icon-512.png";
}

/**
 * Generates an SVG string representation if needed
 */
export function generateDefaultSvgIcon(size: number = 512, bgColor = "#f97316", text = "توصيل"): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgColor}" />
        <stop offset="100%" stop-color="#ea580c" />
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#bgGrad)"/>
    <text x="50%" y="${size * 0.58}" font-family="system-ui, sans-serif" font-weight="900" font-size="${size * 0.28}px" fill="#ffffff" text-anchor="middle">
      ${text}
    </text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Resizes any uploaded image file safely with Canvas
 */
export async function resizeImageToDataUrl(dataUrl: string, width: number, height: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        console.warn("Canvas conversion fallback:", e);
        resolve(dataUrl);
      }
    };
    img.onerror = () => {
      resolve(dataUrl);
    };
    img.src = dataUrl;
  });
}

/**
 * Updates UI icons (favicon, apple-touch-icon) without tampering with manifest blob URLs
 */
export async function updateDynamicPwaManifest(options?: {
  appName?: string;
  iconDataUrl?: string;
  themeColor?: string;
}) {
  if (typeof document === "undefined") return;

  const appName = options?.appName || "توصيل - التوصيل المحلي";
  const icon = options?.iconDataUrl || getActiveAppIcon();

  try {
    // 1. Update Document Title
    document.title = appName;

    // 2. Update Favicon safely
    let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon) {
      favicon.href = icon;
    }

    // 3. Update Apple Touch Icon safely
    let appleIcon = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
    if (appleIcon) {
      appleIcon.href = icon;
    }

    // 4. Update Apple Web App Title
    let appleTitle = document.querySelector<HTMLMetaElement>('meta[name="apple-mobile-web-app-title"]');
    if (appleTitle) {
      appleTitle.content = appName.split(" ")[0] || "توصيل";
    }
  } catch (err) {
    console.warn("PWA UI update minor notice:", err);
  }
}
