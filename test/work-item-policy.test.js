import assert from "node:assert/strict";
import test from "node:test";

import { createWorkItem, isUrgent } from "../src/work-item-policy.js";

test("baseline preserves supplied fields", () => {
  assert.deepEqual(createWorkItem("Pilot", "normal", ["backend"]), {
    title: "Pilot",
    priority: "normal",
    tags: ["backend"],
  });
});

test("isUrgent returns true for priority 'high'", () => {
  assert.equal(isUrgent({ title: "T", priority: "high", tags: [] }), true);
});

test("isUrgent returns true for priority 'HIGH'", () => {
  assert.equal(isUrgent({ title: "T", priority: "HIGH", tags: [] }), true);
});

test("isUrgent returns true when tags include 'urgent'", () => {
  assert.equal(isUrgent({ title: "T", priority: "low", tags: ["urgent"] }), true);
});

test("isUrgent returns true when tags include 'URGENT'", () => {
  assert.equal(isUrgent({ title: "T", priority: "low", tags: ["URGENT"] }), true);
});

test("isUrgent returns false for priority 'low' with no urgent tag", () => {
  assert.equal(isUrgent({ title: "T", priority: "low", tags: ["backend"] }), false);
});

test("isUrgent returns false when tags are missing", () => {
  assert.equal(isUrgent({ title: "T", priority: "low" }), false);
});

test("isUrgent returns false for null", () => {
  assert.equal(isUrgent(null), false);
});

test("isUrgent returns false for undefined", () => {
  assert.equal(isUrgent(undefined), false);
});

test("isUrgent does not mutate the work item", () => {
  const item = { title: "T", priority: "high", tags: ["backend"] };
  const tagsBefore = [...item.tags];
  const priorityBefore = item.priority;
  const titleBefore = item.title;
  isUrgent(item);
  assert.equal(item.priority, priorityBefore);
  assert.equal(item.title, titleBefore);
  assert.deepEqual(item.tags, tagsBefore);
});
