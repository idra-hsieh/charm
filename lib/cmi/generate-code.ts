import { customAlphabet } from "nanoid";

const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz'; // Remove ambiguous characters
const CODE_LENGTH = 6;

/**
 * Generates a random 6-digit alphanumeric code.
 * @returns {string} The randomly generated unique code.
 */
export function generateUniqueCode(): string {
  const nanoid = customAlphabet(ALPHABET, CODE_LENGTH);
  return nanoid();
}