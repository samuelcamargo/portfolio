const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const svgBuffer = fs.readFileSync(path.join(process.cwd(), 'public', 'safari-pinned-tab.svg'));
  
  // Lista de ícones para gerar
  const icons = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  // Gerar cada ícone
  for (const icon of icons) {
    await sharp(svgBuffer)
      .resize(icon.size, icon.size)
      .png()
      .toFile(path.join(process.cwd(), 'public', icon.name));
    
    console.log(`Generated ${icon.name}`);
  }

  // Gerar favicon.ico (usando o PNG de 32x32 como base)
  const favicon32Buffer = await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toBuffer();

  await sharp(favicon32Buffer)
    .png()
    .toFile(path.join(process.cwd(), 'public', 'favicon.ico'));
  
  console.log('Generated favicon.ico');

  // Gerar og-image.jpg
  await sharp(svgBuffer)
    .resize(1200, 630, { 
      fit: 'contain',
      background: { r: 124, g: 58, b: 237, alpha: 1 } // #7C3AED
    })
    .jpeg({ quality: 90 })
    .toFile(path.join(process.cwd(), 'public', 'og-image.jpg'));
  
  console.log('Generated og-image.jpg');
}

generateIcons().catch(console.error); 