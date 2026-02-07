export function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function hasKey<K extends string>(
    value: unknown,
    key: K
): value is Record<K, unknown> & Record<string, unknown> {
    return isPlainObject(value) && key in value;
}
