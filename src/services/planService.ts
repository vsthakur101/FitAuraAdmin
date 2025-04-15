export const getAllPlans = async () => {
    return Promise.resolve([
        { id: 1, name: "Fat Loss Program" },
        { id: 2, name: "Muscle Gain Program" },
        { id: 3, name: "Strength Builder" },
    ]);
};

export const assignPlanToClient = async (
    clientId: number,
    planId: number,
    notes: string
) => {
    // Replace with real API call
    return Promise.resolve({
        message: "Plan assigned!",
        data: { clientId, planId, notes },
    });
};
