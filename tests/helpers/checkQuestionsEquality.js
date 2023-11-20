export function checkQuestionsEquality(arr1 = [], arr2 = []) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    return arr1.every((arr1Item) => arr2.includes(arr1Item));
}
