import fs from 'fs';
import path from 'path';

const legacyPath = path.resolve('./src/content/config.ts');
if (fs.existsSync(legacyPath)) {
  fs.unlinkSync(legacyPath);
  console.log('Removed legacy src/content/config.ts successfully');
}
