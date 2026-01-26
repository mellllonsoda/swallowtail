import { db } from "@swallowtail/db";
import { clothes } from "@swallowtail/db/schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function Home() {
  // 1. データベースから全アイテムを取得
  const allClothes = await db.select().from(clothes);

  return (
    <div className="min-h-screen">
      <main className="max-w-[1400px] mx-auto px-8 py-12">
        
        {/* ヘッダー：Jostフォントによる強いタイポグラフィ */}
        <header className="flex justify-between items-baseline border-b-2 border-black pb-4 mb-16">
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none font-sans">
            Swallowtail<br />
            <span className="text-zinc-400 font-light italic">Inventory</span>
          </h1>
          <div className="text-right uppercase tracking-[0.2em] text-[10px] font-bold font-mono text-zinc-500">
            <p>Archive Count: {allClothes.length}</p>
            <p>System Status: Online</p>
          </div>
        </header>

        {/* リストセクション */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold uppercase tracking-tight font-sans">Current Archive</h2>
            {/* 登録ボタン：装飾を削ぎ落とした黒い矩形 */}
            <Button className="rounded-none bg-black text-white hover:bg-zinc-800 px-10 py-6 text-xs uppercase font-bold tracking-[0.2em] transition-none font-sans">
              + Register Unit
            </Button>
          </div>

          <Table className="border-t-2 border-black">
            <TableHeader className="bg-zinc-50">
              <TableRow className="border-b border-black hover:bg-transparent transition-none">
                <TableHead className="text-black font-bold uppercase py-5 font-sans">Ref. ID</TableHead>
                <TableHead className="text-black font-bold uppercase font-sans">Item Name</TableHead>
                <TableHead className="text-black font-bold uppercase font-sans">Category</TableHead>
                <TableHead className="text-black font-bold uppercase font-sans">Brand / Label</TableHead>
                <TableHead className="text-black font-bold uppercase text-right font-sans">Dim (W/L)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-mono">
              {allClothes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center text-zinc-300 uppercase tracking-[0.3em] font-light italic">
                    Database is empty / Waiting for input
                  </TableCell>
                </TableRow>
              ) : (
                allClothes.map((item) => (
                  <TableRow key={item.id} className="border-b border-zinc-200 hover:bg-zinc-50 transition-none group">
                    <TableCell className="text-zinc-400 py-6">#{item.id.toString().padStart(3, '0')}</TableCell>
                    <TableCell className="font-bold text-xl uppercase text-black">{item.name}</TableCell>
                    <TableCell>
                      <span className="inline-block border border-black px-3 py-1 text-[10px] font-bold uppercase bg-white text-black font-sans">
                        {item.category || "General"}
                      </span>
                    </TableCell>
                    <TableCell className="text-zinc-600 uppercase text-xs tracking-widest font-sans">
                      {item.brand || "—"}
                    </TableCell>
                    <TableCell className="text-right font-medium text-zinc-900">
                      {item.waist ?? "—"} / {item.length ?? "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </section>

        {/* フッター：情報の純粋な提示 */}
        <footer className="mt-20 py-8 border-t border-zinc-100 flex justify-between items-center text-[10px] text-zinc-400 uppercase tracking-[0.3em] font-mono">
          <div className="flex gap-12">
            <p>© 2026 Swallowtail System</p>
            <p>Framework: Next.js + Bun</p>
          </div>
          <p>Functionalism over decoration</p>
        </footer>
      </main>
    </div>
  );
}