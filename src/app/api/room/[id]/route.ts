import { NextResponse } from "next/server";
import prisma from "tt/lib/prisma"

async function getAllRoom() {
    let res = await prisma.room.findMany()
    return NextResponse.json(res);
}

async function getRoomById(id: string) {
    let res = await prisma.room.findUnique({
        where: {
          id: id,
        },
      })
    return NextResponse.json(res);
}


export async function GET(request: Request, {params}:{params?: {id: string}}) {
    if (!!params) {
        return getRoomById(params.id)
    } else {
        return getAllRoom()
    }
}
  