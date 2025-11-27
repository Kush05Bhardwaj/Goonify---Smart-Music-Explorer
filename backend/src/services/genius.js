const Genius = require("genius-lyrics");
const Client = new Genius.Client(process.env.GENIUS_ACCESS_TOKEN);

async function getLyrics(artist, song) {
  const searches = await Client.songs.search(`${artist} ${song}`);
  if (!searches.length) return "Lyrics not found";

  const lyrics = await searches[0].lyrics();
  return lyrics;
}

module.exports = { getLyrics };
