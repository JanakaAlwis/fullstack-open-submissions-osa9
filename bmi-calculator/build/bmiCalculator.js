export const calculateBmi = (heightCm, weightKg) => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    if (bmi < 18.5)
        return "Underweight";
    if (bmi < 25)
        return "Normal range";
    if (bmi < 30)
        return "Overweight";
    return "Obese";
};
const parseArguments = (args) => {
    if (args.length !== 4)
        throw new Error("Exactly two arguments required: height and weight");
    const height = Number(args[2]);
    const weight = Number(args[3]);
    if (isNaN(height) || isNaN(weight))
        throw new Error("Provided values must be numbers");
    return [height, weight];
};
// Run if executed directly
if (require.main === module) {
    try {
        const [height, weight] = parseArguments(process.argv);
        console.log(calculateBmi(height, weight));
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
    }
}
