export default interface Player {
    id: string,
    name: string,
    last_active: number
}

export type PlayerWSymbol = Player & {sym: "x" | "o" | null}
