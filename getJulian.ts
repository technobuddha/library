import { ticksPerDay } from './constants';

export function getJulian(input: Date): number {
    return (input.getTime() / ticksPerDay) + 2440587.5; 
}

export default getJulian;
