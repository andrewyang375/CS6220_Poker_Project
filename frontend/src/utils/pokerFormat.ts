const RANKS: Record<string, string> = {
  ace: "A",
  king: "K",
  queen: "Q",
  jack: "J",
  ten: "T",
  nine: "9",
  eight: "8",
  seven: "7",
  six: "6",
  five: "5",
  four: "4",
  three: "3",
  two: "2",
}
const SUIT_EMOJI: Record<string, string> = {
  spade: "♠️",
  heart: "♥️",
  diamond: "♦️",
  club: "♣️",
}
function toCardEmoji(s: string) {
  const t = s.toLowerCase().replace(/\s+/g, " ")
  const m = t.match(/(ace|king|queen|jack|ten|nine|eight|seven|six|five|four|three|two)\s+of\s+(spade|heart|diamond|club)/i)
  if (!m) return s.trim()
  const r = RANKS[m[1].toLowerCase()] || m[1][0].toUpperCase()
  const e = SUIT_EMOJI[m[2].toLowerCase()] || ""
  return `${e}${r}`
}
function splitCards(s: string) {
  return s.split(/\s*,\s*|\s+and\s+/i).map(toCardEmoji)
}
export type ParsedHand = {
  position?: string
  hand?: string[]
  blinds?: { sb?: number; bb?: number }
  stacks?: string
  players?: string[]
  preflop?: { actions?: string }
  flop?: { cards?: string[]; actions?: string }
  turn?: { card?: string; actions?: string }
  river?: { card?: string; actions?: string }
  pot?: number
  raw: string
}
export function parseInstruction(instruction: string): ParsedHand {
  const text = instruction.replace(/\s+/g, " ").trim()
  const out: ParsedHand = { raw: text }
  const mPos = text.match(/position is\s+([A-Z]{2,3})/i)
  if (mPos) out.position = mPos[1].toUpperCase()
  const mBlinds = text.match(/small blind is\s*([\d.]+)\s*chips?\s*and\s*the\s*big blind is\s*([\d.]+)\s*chips?/i)
  if (mBlinds) out.blinds = { sb: parseFloat(mBlinds[1]), bb: parseFloat(mBlinds[2]) }
  const mStacks = text.match(/Everyone started with\s+(\d+)\s*chips/i)
  if (mStacks) out.stacks = mStacks[1]
  const mPlayers = text.match(/player positions involved.*?are\s+([A-Z,\s]+)\./i)
  if (mPlayers) out.players = mPlayers[1].split(",").map(s => s.trim())
  const mHand = text.match(/\[(.*?)\]/)
  if (mHand) {
    const cards = mHand[1].split(/\s+and\s+/i).map(toCardEmoji)
    out.hand = cards
  }
  const mPre = text.match(/Before the flop,\s*(.+?)\.(?:\s|$)/i)
  if (mPre) out.preflop = { actions: mPre[1].trim() }
  const mFlop = text.match(/The flop comes\s+(.+?),\s*then\s*(.+?)\.(?:\s|$)/i)
  if (mFlop) out.flop = { cards: splitCards(mFlop[1]), actions: mFlop[2].trim() }
  const mTurn = text.match(/The turn comes\s+(.+?),\s*then\s*(.+?)\.(?:\s|$)/i)
  if (mTurn) out.turn = { card: toCardEmoji(mTurn[1]), actions: mTurn[2].trim() }
  const mRiver = text.match(/The river comes\s+(.+?),\s*then\s*(.+?)\.(?:\s|$)/i)
  if (mRiver) out.river = { card: toCardEmoji(mRiver[1]), actions: mRiver[2].trim() }
  const mPot = text.match(/current pot size is\s*([\d.]+)\s*chips/i)
  if (mPot) out.pot = parseFloat(mPot[1])
  return out
}
export function looksLikePokerPrompt(s: string) {
  return /No Limit Texas Holdem|Here is a game summary/i.test(s)
}
