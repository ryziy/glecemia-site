// Принимает заказ с сайта и пересылает его в Telegram-бота.
// BOT_TOKEN и CHAT_ID задаются в Vercel → Settings → Environment Variables.
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const text = String((req.body && req.body.text) || "").slice(0, 3500);
  if (!text.startsWith("Новый заказ GLEKEMIA")) return res.status(400).json({ ok: false });
  try {
    const r = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: process.env.CHAT_ID, text })
    });
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
  } catch (e) {
    return res.status(502).json({ ok: false });
  }
};
