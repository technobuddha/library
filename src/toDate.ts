
export function toDate(entity: unknown): Date {
    return new Date(entity as (string | number | Date));
}

export default toDate;
