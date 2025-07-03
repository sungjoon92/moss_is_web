// camelCase → snake_case
export const toSnakeCase = (obj: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k.replace(/([A-Z])/g, "_$1").toLowerCase(),
      v,
    ])
  );

// snake_case → camelCase
export const toCamelCase = (obj: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
      v,
    ])
  );
