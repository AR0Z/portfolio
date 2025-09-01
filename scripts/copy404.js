import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.resolve(__dirname, "../dist/404/index.html");
const dest = path.resolve(__dirname, "../dist/404.html");

fs.copyFileSync(src, dest);
console.log("404.html créé à la racine !");

// Supprimer le dossier 404 maintenant
const dirToRemove = path.resolve(__dirname, "../dist/404");
fs.rmSync(dirToRemove, { recursive: true, force: true });
console.log("Dossier dist/404 supprimé !");