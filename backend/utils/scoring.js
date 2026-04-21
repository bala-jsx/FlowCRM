export const calculateScore = (lead) => {
    let score = 0;

    if (lead.budget === "10k_plus") score += 3;
    if (lead.authority === "decision_maker") score += 3;
    if (lead.timeline === "immediate") score += 2;

    return score;
};

export const getPriority = (score) => {
    if (score >= 7) return "hot";
    if (score >= 4) return "warm";
    return "cold";
};