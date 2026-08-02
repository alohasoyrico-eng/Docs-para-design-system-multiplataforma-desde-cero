export async function loadContent(path, fallback, warningMessage) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`${path} request failed: ${response.status}`);
    return await resolveContentShards(await response.json(), path);
  } catch (error) {
    console.warn(warningMessage, error);
    return fallback;
  }
}

export async function loadContentBundle(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`${path} request failed: ${response.status}`);
  return response.json();
}

function contentBasePath(path) {
  return path.slice(0, path.lastIndexOf("/") + 1);
}

function mergeContent(target, source) {
  if (Array.isArray(target) && Array.isArray(source)) return [...target, ...source];
  if (!target || typeof target !== "object" || Array.isArray(target)) return source;
  if (!source || typeof source !== "object" || Array.isArray(source)) return source;
  return Object.entries(source).reduce((next, [key, value]) => {
    next[key] = key in next ? mergeContent(next[key], value) : value;
    return next;
  }, { ...target });
}

async function resolveContentShards(content, path) {
  if (!Array.isArray(content?.$systemShards)) return content;
  const basePath = contentBasePath(path);
  const shards = await Promise.all(
    content.$systemShards.map(async (shardPath) => {
      const response = await fetch(`${basePath}${shardPath}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`${shardPath} request failed: ${response.status}`);
      return resolveContentShards(await response.json(), `${basePath}${shardPath}`);
    }),
  );
  return shards.reduce((merged, shard) => mergeContent(merged, shard), {});
}
