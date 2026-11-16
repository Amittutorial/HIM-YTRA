import fs from 'node:fs';
import readline from 'node:readline';

const fileStream = fs.createReadStream('C:/Users/HP/.gemini/antigravity/brain/fa55f704-fb1d-4172-a36c-61b6003b18ee/.system_generated/logs/transcript.jsonl');
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

for await (const line of rl) {
  const stepMatch = line.match(/"step_index":(\d+)/);
  if (stepMatch) {
    const s = parseInt(stepMatch[1]);
    if (s >= 4077 && s <= 4095) {
      const obj = JSON.parse(line);
      console.log(obj.step_index, obj.type, obj.thinking ? obj.thinking.slice(0, 150) : '', obj.content ? obj.content.slice(0, 150) : '');
      if (obj.tool_calls) console.log('tools:', JSON.stringify(obj.tool_calls));
    }
  }
}
