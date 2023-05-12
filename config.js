// Don't change anything in this file! This helps serve the front end.

import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const html = path.join(__dirname, `views`, `index.html`);
