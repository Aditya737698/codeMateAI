export async function askBugAssistant(query: string) {
  const res = await fetch("http://localhost:8000/api/bug-assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "You are Smart Issue Tracker AI. Always answer in clear numbered steps. Each step must start on a new line with a number, like 1. 2. 3. Do not answer in a paragraph. Short and clear."
        },
        {
          role: "user",
          content: query
        }
      ]
    }),
  });

  const data = await res.json();
  return data.reply;
}