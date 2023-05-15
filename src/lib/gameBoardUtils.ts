import { SymbolType } from "tt/app/room/[id]/page";

export function gameBoardToString (g: SymbolType[]): string {
    let gString:string = ""

    g.forEach((sym: SymbolType) => gString += sym || "_" );

    return gString;
}

export function gameBoardToArray (g: string): SymbolType[] {
    let gArray:SymbolType[] = []

    console.log(g)

    g.split('').forEach(sym => gArray.push((sym === ("x" || "o")) ? sym : null))


    return gArray
}

