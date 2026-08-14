export function createWorkItem(title, priority, tags = []) {
  return { title, priority, tags: [...tags] };
}
