module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "((\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    testPathIgnorePatterns: ["/dist/", "/node_modules/"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverage: true,
};