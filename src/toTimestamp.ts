export function toTimestamp(entity: unknown): number {
    return new Date(entity as (string | number | Date)).getTime();
}

export default toTimestamp;
