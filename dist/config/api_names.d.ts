declare const ApiNames: {
    readonly UP: "UP";
    readonly DOWN: "DOWN";
};
declare type ApiNames = typeof ApiNames[keyof typeof ApiNames];
