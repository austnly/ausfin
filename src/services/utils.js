export const camelCase = (string) => {
    return string
        .split(" ")
        .map((word, index) => {
            if (index === 0) return word.toLowerCase();
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        })
        .join("");
};
