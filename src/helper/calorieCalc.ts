const calorieCalc = (carbs: number, protein: number, fats: number) => {
    const calsFromCarbs = carbs * 4;
    const calsFromProteins = protein * 4;
    const calsFromFats = fats * 9;
    return calsFromCarbs + calsFromProteins + calsFromFats;
};

export default calorieCalc;
