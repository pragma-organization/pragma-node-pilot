import assert from "node:assert/strict";
import test from "node:test";

import { createWorkItem } from "../src/work-item-policy.js";

test("baseline preserves supplied fields", () => {
  assert.deepEqual(createWorkItem("Pilot", "normal", ["backend"]), {
    title: "Pilot",
    priority: "normal",
    tags: ["backend"],
  });
});
