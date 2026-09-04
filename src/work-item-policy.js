export function createWorkItem(title, priority, tags = []) {
  return { title, priority, tags: [...tags] };
}

export function isUrgent(workItem) {
  if (workItem == null) return false;
  const priority = typeof workItem.priority === "string"
    ? workItem.priority.toLowerCase()
    : "";
  if (priority === "high") return true;
  const tags = Array.isArray(workItem.tags) ? workItem.tags : [];
  return tags.some(
    (tag) => typeof tag === "string" && tag.toLowerCase() === "urgent"
  );
}
