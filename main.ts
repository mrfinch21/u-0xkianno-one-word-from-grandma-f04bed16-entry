// One Word From Grandma — u-0xkianno-one-word-from-grandma-f04bed16
//
// Exactly one word: the word a grandma would text about AI. The program is
// deterministic — one fixed word, no input, no network, no randomness. It
// checks the word against the sealed scorer's gate (1-30 characters, exactly
// one word, letters only, no punctuation tricks — verified in RULES.txt),
// writes it to /output/entry.txt, then reads it back to confirm the bytes.
//
// Why this word: "Chatty" is what a warm, slightly baffled grandma would
// call ChatGPT — not the product's name, but the pet name she gives it, the
// way she names the neighbour's dog. It is tied to AI, it sounds like her
// texting voice, and the joke lands with no caption: she thinks the chatbot
// is a chatty little person who lives in the phone.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "Chatty";
const OUT = "/output/entry.txt";

const n = [...WORD].length;
if (n < 1 || n > 30) throw new Error(`word is ${n} chars; sealed gate is 1-30`);
if (!/^[A-Za-z]+$/.test(WORD)) throw new Error("entry must be exactly one word of letters");
if (WORD.includes(" ")) throw new Error("entry must be exactly one word");
if (WORD !== WORD.trim()) throw new Error("word has surrounding whitespace");

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, WORD, "utf8");
const back = readFileSync(OUT, "utf8");
if (back !== WORD) throw new Error("entry.txt mismatch");
console.log(`word written: ${WORD} (${n} chars) -> ${OUT}`);
