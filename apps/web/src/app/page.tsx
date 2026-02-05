import { db, clothes } from "@swallowtail/db";

export default async function Page() {
  const allClothes = await db.select().from(clothes);
  
  return (
    <div>
      {/* デザインコード */}
    </div>
  );
}