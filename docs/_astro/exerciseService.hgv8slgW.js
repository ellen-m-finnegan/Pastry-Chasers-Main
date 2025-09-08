function o(t) {
  return new URLSearchParams(t).toString();
}
const a = "d23c+r1ELW1wx72q4S+UVg==lie4avxP7aBrkZiv",
  n = "https://api.api-ninjas.com/v1/exercises";
async function i(t = {}) {
  const e = o(t),
    s = e ? `${n}?${e}` : n;
  try {
    const r = await fetch(s, {
      method: "GET",
      headers: { "Content-Type": "application/json", "X-Api-Key": a },
    });
    if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
    return await r.json();
  } catch (r) {
    return console.error("Error fetching exercises:", r), null;
  }
}
export { i as g };
