import { NextResponse } from "next/server";
import { ulid } from "ulid";
import { ClothingSchema, type Clothing } from "@/lib/schemas/clothing";

// 仮のインメモリDB
const clothes: Clothing[] = [
  {
    id: ulid(),
    name: "黒ワンピース",
    location: "クローゼットA",
    boughtAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(clothes);
}

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = ClothingSchema.omit({ id: true }).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.format() },
      { status: 400 }
    );
  }

  const newItem: Clothing = {
    id: ulid(),
    ...parsed.data,
  };

  clothes.push(newItem);

  return NextResponse.json(newItem, { status: 201 });
}
