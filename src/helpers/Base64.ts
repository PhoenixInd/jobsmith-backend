// JS Base 64
import { encode, decode } from "js-base64";

// Custom encoding algorithm
export const useEncoding = (data: string): string =>
  encode(encode(encode(data)));

// Custom decoding algorithm
export const useDecoding = (data: string): string =>
  decode(decode(decode(data)));

export const checkIfEncoded = (text: string): boolean => 
  !Boolean(useDecoding(text))