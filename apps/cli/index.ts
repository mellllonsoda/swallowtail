import { Command } from "commander";
import { eq } from "drizzle-orm";
import { db } from "../../packages/db/index";
import { clothes } from "../../packages/db/schema";

const program = new Command();

program
  .name("swallowtail")
  .description("女装服管理ツール")
  .version("0.0.1");

program
    .command("add")
    .description("新しい服をクローゼットに追加します")
    .argument("<name>","服の名前")
    .option("-b, --brand <brand>", "ブランド名")
    .option("-c, --category <category>", "カテゴリ（例:skirt, dress）")
    .action(async (name, options) => {
        try {
            await db.insert(clothes).values({
                name: name,
                brand: options.brand,
                category: options.category,
            });
            console.log(`✨「${name}}」を追加しました。`)
        }catch (error) {
            console.error("❌登録にエラーが発生しました：", error);
        }
    });

program
    .command("list")
    .description("服のリストを表示します")
    .action(async () => {
        try {
            const allClothes = await db.select().from(clothes)

            if (allClothes.length === 0) {
                console.log("クローゼットは空です。addコマンドで追加してみましょう！")
                return;
            }

            console.table(allClothes.map(item => ({
                id: item.id,
                name: item.name,
                brand: item.brand || "-",
                category: item.category || "-",
            })))
        } catch (error) {
            console.error("❌リスト取得にエラーが発生しました：", error);
        }
    });

program
    .command("update")
    .description("服の情報を更新します")
    .argument("<id>", "服のID(UUID)")
    .option("-n, --name <name>", "服の名前")
    .option("-b, --brand <brand>", "ブランド名")
    .option("-c, --category <category>", "カテゴリ")
    .action(async (id, options) => {
        try {
            // オプションが指定された項目だけを抽出する
            const updateData: Record<string, any> = {};
            if (options.name) updateData.name = options.name;
            if (options.brand) updateData.brand = options.brand;
            if (options.category) updateData.category = options.category;

            // 何もオプションが指定されていない場合のチェック
            if (Object.keys(updateData).length === 0) {
                console.log("⚠️ 更新する項目を指定してください（例: --name \"新しい名前\"）");
                return;
            }

            await db.update(clothes).set(updateData).where(eq(clothes.id, id));
            
            // IDは長いので先頭だけ表示させるとスマートです
        console.log(`✨ ID: ${id} の情報を更新しました。`);
        } catch (error) {
            console.error("❌ 更新にエラーが発生しました：", error);
        }
    });


program
    .command("delete")
    .description("服をデータベースから削除します")
    .argument("<id>", "服のID(UUID)")
    .action(async (id) => {
        try {
            await db.delete(clothes).where(eq(clothes.id, id));
            console.log(`✨「${id}}」を削除しました。`);
        } catch (error) {
            console.error("❌削除にエラーが発生しました：", error);
        }
    }); 

await program.parseAsync(process.argv);