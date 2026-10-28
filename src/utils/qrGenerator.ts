import QRCode from 'qrcode';
import { QrStyleOptions } from '../types/qrcodes';

export async function generateQrDataUrl(content: string, options: QrStyleOptions): Promise<string> {
  // If frameStyle is 'none', standard QR is generated
  if (options.frameStyle === 'none') {
    return QRCode.toDataURL(content, {
      width: options.size,
      margin: 1,
      color: {
        dark: options.fgColor,
        light: options.bgColor,
      },
      errorCorrectionLevel: options.errorCorrectionLevel,
    });
  }

  // Draw framed QR on an offscreen canvas
  const canvas = document.createElement('canvas');
  const qrSize = options.size;
  const paddingX = 24;
  const paddingTop = options.frameStyle === 'scanme' ? 24 : 16;
  const paddingBottom = options.frameStyle === 'scanme' ? 56 : 46;

  canvas.width = qrSize + paddingX * 2;
  canvas.height = qrSize + paddingTop + paddingBottom;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return QRCode.toDataURL(content, { width: options.size });
  }

  // 1. Draw frame background
  ctx.fillStyle = options.bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Draw outer border
  ctx.lineWidth = 4;
  ctx.strokeStyle = options.fgColor;
  ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

  // 3. Render base QR code onto temporary image
  const baseQrData = await QRCode.toDataURL(content, {
    width: qrSize,
    margin: 1,
    color: {
      dark: options.fgColor,
      light: options.bgColor,
    },
    errorCorrectionLevel: options.errorCorrectionLevel,
  });

  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, paddingX, paddingTop, qrSize, qrSize);
      resolve();
    };
    img.onerror = reject;
    img.src = baseQrData;
  });

  // 4. Draw callout banner at the bottom ("SCAN ME" / "PAY VIA UPI")
  const bannerY = paddingTop + qrSize + 8;
  const bannerHeight = 36;
  ctx.fillStyle = options.fgColor;
  ctx.fillRect(paddingX, bannerY, qrSize, bannerHeight);

  // Text inside banner
  ctx.fillStyle = options.bgColor;
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(options.frameText || 'SCAN ME', canvas.width / 2, bannerY + bannerHeight / 2);

  return canvas.toDataURL('image/png');
}

export async function generateQrSvg(content: string, options: QrStyleOptions): Promise<string> {
  return QRCode.toString(content, {
    type: 'svg',
    width: options.size,
    margin: 1,
    color: {
      dark: options.fgColor,
      light: options.bgColor,
    },
    errorCorrectionLevel: options.errorCorrectionLevel,
  });
}
