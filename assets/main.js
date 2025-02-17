const content = null || document.getElementById("content");

const url =
  "https://youtube-v311.p.rapidapi.com/activities/?part=snippet&channelId=UC3lBXcrKFnFAFkfVk5WuKcQ&maxResults=5";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "6f1e384235msh1eab2a4c829b7f9p1c50dejsn6ddae8438f44",
    "x-rapidapi-host": "youtube-v311.p.rapidapi.com",
  },
};
async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(url);
    let view = `
    ${videos.items
      .map(
        (video) => `
        <div class="group relative">
            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full" />
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>
        `
      )
      .slice(0, 4)
      .join("")}
    `;
    content.innerHTML = view;
  } catch (error) {
    throw new Error(error);
  }
})();
