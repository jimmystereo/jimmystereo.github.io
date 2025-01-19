// Debounce variable to delay API calls
let debounceTimeout;

// Function to perform search on input
async function performSearch() {
    // Clear any previously scheduled requests
    clearTimeout(debounceTimeout);

    // Debounce the API call to wait for 300ms after typing stops
    debounceTimeout = setTimeout(async () => {
        const query = document.getElementById("search-bar").value;

        // If the query is empty, clear the results and exit
        if (query.trim() === "") {
            document.getElementById("results").innerHTML = ""; // Clear results on empty input
            return;
        }

        try {
            // Prepare the JSON body
            const requestBody = JSON.stringify({ q: query });

            // Perform the fetch request
            const response = await fetch("https://zipmap-525691187913.us-central1.run.app/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: requestBody,
            });

            // Check if the response is okay
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON response
            const data = await response.json();

            // Get the results container and clear any previous results
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";

            // Display results or show "No results found"
            if (data.results.length === 0) {
                resultsDiv.innerHTML = "<p>No results found.</p>";
            } else {
                data.results.forEach((item) => {
                    const div = document.createElement("div");
                    div.className = "result-item";
                    div.textContent = `Country Code: ${item['country code']}, Name: ${item["place name"]}, Latitude: ${item.latitude}, Longitude: ${item.longitude}`;
                    resultsDiv.appendChild(div);
                });
            }
        } catch (error) {
            console.error("Error performing search:", error);
        }
    }, 300); // 300ms debounce delay
}
