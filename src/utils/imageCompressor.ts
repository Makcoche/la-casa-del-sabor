/**
 * Compresses an image data URL to a specified maximum width/height and quality
 * to avoid exceeding localStorage limits.
 */
export function compressImage(dataUrl: string, maxWidth: number, maxHeight: number, quality: number = 0.75): Promise<string> {
  return new Promise((resolve) => {
    // If it's already a small or external URL, return as-is
    if (!dataUrl.startsWith('data:image')) {
      resolve(dataUrl);
      return;
    }

    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Keep aspect ratio
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Fill white background for JPEG compression of PNGs with transparency
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => {
      resolve(dataUrl);
    };
  });
}
