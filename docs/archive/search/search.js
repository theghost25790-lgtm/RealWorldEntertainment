const input = document.querySelector("#archive-search");
const results = document.querySelector("#archive-results");
const count = document.querySelector("#archive-count");
const typeFilter = document.querySelector("#archive-type");
let records = [];
let byId = new Map();

function addText(parent, tag, textValue, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.textContent = textValue;
  parent.appendChild(el);
  return el;
}

function searchableRecords() {
  return records.filter((r) => r.publish_ready === true && r.searchable === true);
}

function values(record, field) {
  const v = record[field];
  if (Array.isArray(v)) return v;
  if (v === null || v === undefined) return [];
  return [v];
}

function normalise(value) {
  return String(value || "").trim().toLowerCase();
}

function relationTerms(record) {
  return values(record, "relations")
    .map((id) => byId.get(id))
    .filter((r) => r && r.publish_ready === true && r.searchable === true)
    .flatMap((r) => [r.record_id, r.title, ...values(r, "aliases"), ...values(r, "tags")])
    .filter(Boolean);
}

function scoreRecord(record, query) {
  const q = normalise(query);
  if (!q) return 1;

  const id = normalise(record.record_id);
  const title = normalise(record.title);
  const aliases = values(record, "aliases").map(normalise);
  const tags = values(record, "tags").map(normalise);
  const keywords = values(record, "keywords").map(normalise);
  const platforms = values(record, "platforms").map(normalise);
  const summary = normalise(record.summary);
  const relationValues = relationTerms(record).map(normalise);
  let score = 0;

  if (id === q) score += 1000;
  if (title === q || aliases.includes(q)) score += 800;
  if (title.startsWith(q) || aliases.some((v) => v.startsWith(q))) score += 500;
  if (id.includes(q)) score += 350;
  if (title.includes(q) || aliases.some((v) => v.includes(q))) score += 300;
  if (tags.some((v) => v.includes(q))) score += 250;
  if (keywords.some((v) => v.includes(q))) score += 220;
  if (platforms.some((v) => v.includes(q))) score += 200;
  if (summary.includes(q)) score += 150;
  if (relationValues.some((v) => v.includes(q))) score += 80;

  const words = q.split(/\s+/).filter(Boolean);
  const haystack = [
    record.record_id,
    record.record_type,
    record.title,
    record.status,
    record.canonical_path,
    record.summary,
    ...values(record, "aliases"),
    ...values(record, "tags"),
    ...values(record, "keywords"),
    ...values(record, "platforms"),
    ...relationTerms(record)
  ].filter(Boolean).join(" ").toLowerCase();

  if (words.length > 1 && words.every((word) => haystack.includes(word))) score += 120;
  return score;
}

function recordHref(record) {
  return record.canonical_path ? "../.." + record.canonical_path + "/" : null;
}

function renderPills(article, record) {
  const wrap = document.createElement("div");
  wrap.className = "statusline";
  values(record, "tags").slice(0, 4).forEach((tag) => addText(wrap, "span", tag, "pill"));
  article.appendChild(wrap);
}

function renderRelated(article, record) {
  const related = values(record, "relations")
    .map((id) => byId.get(id))
    .filter((r) => r && r.publish_ready === true && r.searchable === true && r.canonical_path);

  if (!related.length) return;
  const heading = addText(article, "p", "Related verified records", "kicker");
  heading.style.marginTop = "1rem";
  const wrap = document.createElement("div");
  wrap.className = "record-links";

  related.forEach((r) => {
    const link = document.createElement("a");
    link.className = "record-link";
    link.href = recordHref(r);
    const small = document.createElement("small");
    small.textContent = r.record_type;
    link.appendChild(small);
    link.appendChild(document.createTextNode(r.title || r.record_id));
    wrap.appendChild(link);
  });
  article.appendChild(wrap);
}

function updateUrl(query, type) {
  const url = new URL(window.location.href);
  const q = (query || "").trim();
  if (q) url.searchParams.set("q", q); else url.searchParams.delete("q");
  if (type && type !== "all") url.searchParams.set("type", type); else url.searchParams.delete("type");
  window.history.replaceState({}, "", url);
}

function render() {
  const query = input.value;
  const type = typeFilter.value;
  const visible = searchableRecords()
    .filter((r) => type === "all" || r.record_type === type)
    .map((r) => ({record:r, score:scoreRecord(r, query)}))
    .filter((x) => x.score > 0)
    .sort((a,b) => b.score - a.score || String(b.record.record_id).localeCompare(String(a.record.record_id)));

  count.textContent = visible.length + " verified record" + (visible.length === 1 ? "" : "s");
  results.replaceChildren();

  if (!visible.length) {
    const empty = document.createElement("section");
    empty.className = "card";
    addText(empty, "p", "No verified archive records match that search.");
    results.appendChild(empty);
    updateUrl(query, type);
    return;
  }

  visible.forEach(({record:r}) => {
    const article = document.createElement("article");
    article.className = "archive-card";
    addText(article, "span", r.record_type, "pill");

    const h3 = document.createElement("h3");
    const href = recordHref(r);
    if (href) {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = r.title || r.record_id;
      h3.appendChild(link);
    } else {
      h3.textContent = r.title || r.record_id;
    }
    article.appendChild(h3);

    addText(article, "p", r.record_id, "mono");
    if (r.summary) addText(article, "p", r.summary);
    addText(article, "p", "Status: " + r.status);
    renderPills(article, r);
    renderRelated(article, r);

    if (href) {
      const button = document.createElement("a");
      button.className = "button";
      button.href = href;
      button.textContent = "OPEN RECORD";
      article.appendChild(button);
    }
    results.appendChild(article);
  });

  updateUrl(query, type);
}

function populateTypes() {
  const types = [...new Set(searchableRecords().map((r) => r.record_type))].sort();
  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1) + "s";
    typeFilter.appendChild(option);
  });
}

fetch("../records.json")
  .then((r) => {
    if (!r.ok) throw new Error("registry unavailable");
    return r.json();
  })
  .then((data) => {
    records = data.records || [];
    byId = new Map(records.map((r) => [r.record_id, r]));
    populateTypes();

    const params = new URLSearchParams(window.location.search);
    input.value = params.get("q") || "";
    const requestedType = params.get("type");
    if (requestedType && [...typeFilter.options].some((o) => o.value === requestedType)) {
      typeFilter.value = requestedType;
    }
    render();
  })
  .catch(() => {
    results.replaceChildren();
    const error = document.createElement("section");
    error.className = "card";
    addText(error, "p", "The archive registry could not be loaded.");
    results.appendChild(error);
    count.textContent = "Registry unavailable";
  });

input.addEventListener("input", render);
typeFilter.addEventListener("change", render);
