const Genius = require("genius-lyrics");
const Client = new Genius.Client(process.env.GENIUS_ACCESS_TOKEN);

async function getLyrics(artist, song) {
  try {
    const query = `${artist} ${song}`.trim();
    const searches = await Client.songs.search(query);
    
    if (!searches || searches.length === 0) {
      return "Lyrics not found for this song.";
    }

    const lyrics = await searches[0].lyrics();
    return lyrics || "Lyrics not available.";
  } catch (error) {
    console.error('Genius API error:', error.message);
    throw new Error('Failed to fetch lyrics from Genius');
  }
}

module.exports = { getLyrics };
