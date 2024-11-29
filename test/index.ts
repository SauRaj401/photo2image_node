import { ocr } from "llama-ocr";
import 'dotenv/config';

async function main() {
  let markdown = await ocr({
    filePath: "./test/qr.jpg",
    apiKey: process.env.TOGETHER_API_KEY,
  });

  console.log(markdown);}
main();
