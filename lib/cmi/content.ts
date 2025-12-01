export function getResult(scores: Record<string, number>) {
  // Logic: > 0 is "1", <= 0 is "0"
  // Order: Closeness | Control | Self-Worth | Boundary | Growth
  
  const getBit = (cat: string) => (scores[cat] > 0 ? "1" : "0");
  
  const bits = 
    getBit("closeness") + 
    getBit("control") + 
    getBit("selfWorth") + 
    getBit("boundary") + 
    getBit("growth");

  const type = MONEY_TYPES.find((t) => t.bits === bits) || MONEY_TYPES[0]; 
  const familyBits = bits.substring(0, 3);
  const family = PATTERN_FAMILIES[familyBits];

  return { type, family, bits };
}