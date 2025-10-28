import { parseInstruction, ParsedHand } from "../../utils/pokerFormat"

type Props = { instruction: string }

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-xl px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700">{children}</span>
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-start gap-3">
      <div className="w-28 shrink-0 text-gray-500">{label}</div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
function BoardRow({ parsed }: { parsed: ParsedHand }) {
  return (
    <div className="flex flex-col gap-2">
      {parsed.flop?.cards?.length ? (
        <div className="flex items-center gap-2">
          <span className="w-16 text-gray-500">Flop</span>
          <div className="flex gap-2">{parsed.flop.cards.map((c, i) => <Pill key={`f${i}`}>{c}</Pill>)}</div>
          {parsed.flop.actions ? <span className="ml-3 text-sm text-gray-600">then {parsed.flop.actions}</span> : null}
        </div>
      ) : null}
      {parsed.turn?.card ? (
        <div className="flex items-center gap-2">
          <span className="w-16 text-gray-500">Turn</span>
          <Pill>{parsed.turn.card}</Pill>
          {parsed.turn.actions ? <span className="ml-3 text-sm text-gray-600">then {parsed.turn.actions}</span> : null}
        </div>
      ) : null}
      {parsed.river?.card ? (
        <div className="flex items-center gap-2">
          <span className="w-16 text-gray-500">River</span>
          <Pill>{parsed.river.card}</Pill>
          {parsed.river.actions ? <span className="ml-3 text-sm text-gray-600">then {parsed.river.actions}</span> : null}
        </div>
      ) : null}
    </div>
  )
}

export default function FormattedHand({ instruction }: Props) {
  const p = parseInstruction(instruction)
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {p.position ? <Pill>🪑 {p.position}</Pill> : null}
        {p.hand?.length ? <Pill>🂠 {p.hand.join(" ")}</Pill> : null}
        {p.blinds?.sb !== undefined && p.blinds?.bb !== undefined ? <Pill>💰 {p.blinds.sb} / {p.blinds.bb}</Pill> : null}
        {p.pot !== undefined ? <Pill>🪙 Pot {p.pot}</Pill> : null}
      </div>

      {p.preflop?.actions ? (
        <Row label="Preflop">
          <div className="text-sm">{p.preflop.actions}</div>
        </Row>
      ) : null}

      {(p.flop?.cards?.length || p.turn?.card || p.river?.card) ? (
        <Row label="Board">
          <BoardRow parsed={p} />
        </Row>
      ) : null}

      {p.players?.length ? (
        <Row label="Players">
          <div className="flex flex-wrap gap-2">{p.players.map(x => <Pill key={x}>{x}</Pill>)}</div>
        </Row>
      ) : null}
    </div>
  )
}
