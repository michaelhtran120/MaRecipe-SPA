import calorieCalc from "./calorieCalc";
import macroCalc from "./macroCalc";

test("Calorie Calculator is accurate", () => {
    expect(calorieCalc(1, 1, 1)).toBe(17);
    expect(calorieCalc(2, 2, 2)).toBe(34);
    expect(calorieCalc(10, 10, 10)).toBe(170);
});

test("Macro Calculator totals macros", () => {
    expect(macroCalc(["1", "2", "3"], ["2", "3", "4"], ["3", "4", "5"])).toStrictEqual({ totalCarbs: 6, totalProteins: 9, totalFats: 12 });
    expect(macroCalc(["3", "3", "3"], ["3", "3", "3"], ["3", "3", "3"])).toStrictEqual({ totalCarbs: 9, totalProteins: 9, totalFats: 9 });
});
