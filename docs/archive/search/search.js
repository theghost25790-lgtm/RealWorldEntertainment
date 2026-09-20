const input = document.querySelector("#archive-search");
const results = document.querySelector("#archive-results");
const count = document.querySelector("#archive-count");
let records = [];

function addText(parent, tag, textValue, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.textContent = textValue;
  parent.appendChild(el);
  return el;
}

function render(query) {
  const q = (query || "").trim().toLowerCase();
  const visible = records
    .filter((r) => r.publish_ready === true && r.searchable === true)
    .filter((r) => {
      if (!q) return true;
      return [r.record_id, r.record_type, r.title, r.status, r.canonical_path]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });

  count.textContent = visible.length + " verified record" + (visible.length === 1 ? "" : "s");
  results.replaceChildren();

  if (!visible.length) {
    const empty = document.createElement("section");
    empty.className = "card";
    addText(empty, "p", "No verified archive records match that search.");
    results.appendChild(empty);
    return;
  }

  visible.forEach((r) => {
    const article = document.createElement("article");
    article.className = "archive-card";
    addText(article, "span", r.record_type, "pill");

    const h3 = document.createElement("h3");
    if (r.canonical_path) {
      const link = document.createElement("a");
      link.href = "../.." + r.canonical_path + "/";
      link.textContent = r.title || r.record_id;
      h3.appendChild(link);
    } else {
      h3.textContent = r.title || r.record_id;
    }
    article.appendChild(h3);

    addText(article, "p", r.record_id, "mono");
    addText(article, "p", "Status: " + r.status);

    if (r.canonical_path) {
      const button = document.createElement("a");
      button.className = "button";
      button.href = "../.." + r.canonical_path + "/";
      button.textContent = "OPEN RECORD";
      article.appendChild(button);
    }

    results.appendChild(article);
  });
}

fetch("../records.json")
  .then((r) => {
    if (!r.ok) throw new Error("registry unavailable");
    return r.json();
  })
  .then((data) => {
    records = data.records || [];
    render(input.value);
  })
  .catch(() => {
    results.replaceChildren();
    const error = document.createElement("section");
    error.className = "card";
    addText(error, "p", "The archive registry could not be loaded.");
    results.appendChild(error);
    count.textContent = "Registry unavailable";
  });

input.addEventListener("input", () => render(input.value));
