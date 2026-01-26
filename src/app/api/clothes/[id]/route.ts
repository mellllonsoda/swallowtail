import { NextResponse } from "next/server";
import { ClothingSchema, type Clothing } from "@/lib/schemas/clothing";

// 本当は共有したいけど、今は仮
const clothes: Clothing[] = [];

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_: Request, { params }: Params) {
  const item = clothes.find((c) => c.id === params.id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function DELETE(_: Request, { params }: Params) {
  const index = clothes.findIndex((c) => c.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const removed = clothes.splice(index, 1)[0];
  return NextResponse.json(removed);
}
