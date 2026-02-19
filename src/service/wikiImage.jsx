export const fetchWikiImage = async (placeName) => {
  try {
    const searchQuery = encodeURIComponent(placeName);

    // Step 1: Search Wikipedia
    const searchRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*`
    );

    const searchData = await searchRes.json();

    if (!searchData.query.search.length) return null;

    // Get best matching page title
    const pageTitle = searchData.query.search[0].title;

    const encodedTitle = encodeURIComponent(pageTitle);

    // Step 2: Get summary for that page
    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`
    );

    if (!summaryRes.ok) return null;

    const summaryData = await summaryRes.json();

    return summaryData.thumbnail?.source || null;

  } catch (error) {
    console.error("Wiki fetch error:", error);
    return null;
  }
};