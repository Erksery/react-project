// export function getWordByDigit(num, word1, word2, word3) {
//   if (num % 10 === 1) return word1;
//   else if (num % 10 > 1 && num % 10 < 5) return word2;
//   return word3;
// }

export function getWordByDigit(num, word1, word2, word3) {
  if (num % 10 === 1) return word1;
  if (num === 12) return word1;
  else if (num % 10 > 1 && num % 10 < 5) return word2;
  return word3;
}
