/* -------------------------
   Utility: Format Labels
-------------------------- */
function formatLabel(key) {
  return key
    .replace(/_/g, " ") // remove underscores
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize words
}

async function searchWord() {
  const searchInput = document.getElementById("searchInput");
  const resultDiv = document.getElementById("result");
  const word = searchInput.value.trim().toLowerCase();

  // Clear previous results
  resultDiv.innerHTML = "";

  if (!word) {
    resultDiv.innerHTML = `<p>Please enter a word to search.</p>`;
    return;
  }

  try {
    const firstLetter = word.charAt(0);
    // Fetch the JSON file: data/{letter}/{word}.json
    const response = await fetch(`data/${firstLetter}/${word}.json`);

    if (!response.ok) {
      throw new Error("Word not found");
    }

    const entry = await response.json();
    renderResult(entry);
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p>❌ Word "${word}" not found</p>`;
  }
}

function renderResult(entry) {
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = `
    <h2>${entry.word}</h2>
    <p><em>${entry.phonetic || ""}</em></p>

    <div class="section">
      <h3>Meanings</h3>
      ${Object.entries(entry.meanings || {})
        .map(
          ([pos, meanings]) =>
            `<b>${formatLabel(pos)}</b>
         <ul>
           ${meanings
             .map(
               (m) =>
                 `<li>
                ${m.definition}
                ${m.example ? `<br><small>Example: ${m.example}</small>` : ""}
              </li>`
             )
             .join("")}
         </ul>`
        )
        .join("")}
    </div>

    ${
      entry.tense_forms
        ? `<div class="section">
      <h3>Tense Forms</h3>
      <ul>
        ${Object.entries(entry.tense_forms)
          .map(
            ([k, v]) => `
            <li>
              <strong>${formatLabel(k)}</strong>: ${v}
            </li>`
          )
          .join("")}
      </ul>
    </div>`
        : ""
    }

    <div class="section">
      <h3>Synonyms</h3>
      <div class="list">
        ${(entry.synonyms || []).map((s) => `<span>${s}</span>`).join("")}
      </div>
    </div>

    <div class="section">
      <h3>Antonyms</h3>
      <div class="list">
        ${(entry.antonyms || []).map((a) => `<span>${a}</span>`).join("")}
      </div>
    </div>

    <div class="section">
      <h3>Usage Examples</h3>
      <ul>
        ${(entry.usage_examples || []).map((e) => `<li>${e}</li>`).join("")}
      </ul>
    </div>
  `;
}

// Allow pressing "Enter" to search
document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchWord();
  }
});