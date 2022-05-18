export const camelCase = (string) => {
    return (
        string.split(" ")[0].toLowerCase() + string.split(" ").slice(1).join("")
    );
};
