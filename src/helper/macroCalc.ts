// First convert string values to numbers
const stringToNumber = (stringArr: string[]) => stringArr.map((string: string) => parseFloat(string));

// Return total carbs, proteins and fats from ingerdients
const macroCalculator = (carbsArr: string[], proteinsArr: string[], fatsArr: string[]) => {
    const totalCarbs = stringToNumber(carbsArr).reduce((acc, cur) => acc + cur);
    const totalProteins = stringToNumber(proteinsArr).reduce((acc, cur) => acc + cur);
    const totalFats = stringToNumber(fatsArr).reduce((acc, cur) => acc + cur);

    return {
        totalCarbs,
        totalProteins,
        totalFats
    };
};

export default macroCalculator;
