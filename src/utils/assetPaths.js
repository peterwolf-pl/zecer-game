const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";

function joinWithBase(base, path) {
  if (path == null || path === "") return base;
  const trimmedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
  if (trimmedBase === "") {
    return `/${trimmedPath}`;
  }
  return `${trimmedBase}/${trimmedPath}`;
}

export function resolveAssetPath(path, base = BASE_URL) {
  if (path == null || path === "") return path;
  if (/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(path) || path.startsWith("//")) {
    return path;
  }
  if (path.startsWith("./") || path.startsWith("../")) {
    return path;
  }
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (
    normalizedBase !== "/" &&
    normalizedPath.startsWith(normalizedBase)
  ) {
    return normalizedPath;
  }
  return joinWithBase(base, path);
}

export function getBaseUrl() {
  return BASE_URL;
}
