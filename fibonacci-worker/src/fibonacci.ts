export default class Fibonacci {

    public find(value: number = 2): number {
        if (value === 0) return 0;
        if (value === 1) return 1;
        const fistFibonnaciNumber = value - 1;
        const secondFibonnaciNumber = value - 2;
        return this.find(fistFibonnaciNumber) + this.find(secondFibonnaciNumber);
    }
}