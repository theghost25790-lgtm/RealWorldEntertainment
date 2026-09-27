import fs from "node:fs";

const registryPath = "website/v32.3/master-record-registry.json";
const raw = fs.readFileSync(registryPath, "utf8");
const registry = JSON.parse(raw);

const errors = [];
const warnings = [];
const records = Array.isArray(registry.records) ? registry.records : [];
const byId = new Map();
const paths = new Map();

function fail(message) { errors.push(message); }
function warn(message) { warnings.push(message); }

if (!registry.registry_id) fail("registry_id is required");
if (!registry.registry_version) fail("registry_version is required");
if (!Array.isArray(registry.records)) fail("records must be an array");

for (const record of records) {
  if (!record.record_id) {
    fail("record without record_id");
    continue;
  }

  if (byId.has(record.record_id)) {
    fail("duplicate record_id: " + record.record_id);
  } else {
    byId.set(record.record_id, record);
  }

  if (!record.record_type) fail(record.record_id + ": record_type is required");
  if (!record.status) fail(record.record_id + ": status is required");

  if (record.canonical_path) {
    if (!String(record.canonical_path).startsWith("/")) {
      fail(record.record_id + ": canonical_path must begin with /");
    }
    if (paths.has(record.canonical_path)) {
      fail(record.record_id + ": duplicate canonical_path with " + paths.get(record.canonical_path));
    } else {
      paths.set(record.canonical_path, record.record_id);
    }
  }

  if (record.searchable === true && record.publish_ready !== true) {
    fail(record.record_id + ": searchable records must be publish_ready");
  }

  if (record.searchable === true && !record.canonical_path) {
    fail(record.record_id + ": searchable records require canonical_path");
  }

  if (record.publish_ready === true && record.searchable === true) {
    if (!record.title) fail(record.record_id + ": public searchable record requires title");
    if (!record.summary) warn(record.record_id + ": searchable record has no summary");
  }

  for (const field of ["aliases", "tags", "keywords", "platforms"]) {
    if (record[field] !== undefined && !Array.isArray(record[field])) {
      fail(record.record_id + ": " + field + " must be an array");
    }
  }

  const relations = Array.isArray(record.relations) ? record.relations : [];
  if (relations.includes(record.record_id)) {
    fail(record.record_id + ": record cannot relate to itself");
  }
}

for (const record of records) {
  const relations = Array.isArray(record.relations) ? record.relations : [];
  for (const relation of relations) {
    if (!byId.has(relation)) {
      fail(record.record_id + ": unknown relation " + relation);
    }
  }
}

const currentBuilds = records.filter((r) => r.record_type === "build" && r.status === "current");
if (currentBuilds.length > 1) {
  fail("more than one build is marked current: " + currentBuilds.map((r) => r.record_id).join(", "));
}
if (currentBuilds.length === 0) {
  warn("no build is marked current");
}

const searchable = records.filter((r) => r.publish_ready === true && r.searchable === true);
const pending = records.filter((r) => r.status === "migration-pending");
const reserved = records.filter((r) => r.status === "reserved");

for (const message of warnings) console.warn("WARNING:", message);

if (errors.length) {
  for (const message of errors) console.error("ERROR:", message);
  console.error("\nRegistry validation failed with " + errors.length + " error(s).");
  process.exit(1);
}

console.log("RWE Archive Registry OK");
console.log("Version:", registry.registry_version);
console.log("Records:", records.length);
console.log("Searchable:", searchable.length);
console.log("Migration pending:", pending.length);
console.log("Reserved:", reserved.length);
console.log("Canonical paths:", paths.size);
