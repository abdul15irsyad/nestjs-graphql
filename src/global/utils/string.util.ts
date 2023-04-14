export const getRandomNumber = ({ min = 0, max = 10 }: { min?: number, max?: number }): number => {
    return Math.round(Math.random() * (max - min)) + min;
}