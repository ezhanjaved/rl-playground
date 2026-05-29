const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

export const calculateRewardStats = (
  rewardDict,
  terminalReward,
  budgetSteps,
) => {
  const maxShapingReward = Object.values(rewardDict).reduce(
    (sum, reward) => sum + toNumber(reward),
    0,
  );

  const defRew = maxShapingReward * toNumber(budgetSteps);
  const terminal = toNumber(terminalReward);
  let rewardStatus = null;

  if (terminalReward !== null && terminalReward !== undefined) {
    if (terminal > defRew) {
      rewardStatus = "Terminal reward is higher than max shaping reward";
    } else if (terminal < defRew) {
      rewardStatus = "Terminal reward is lower than max shaping reward";
    } else {
      rewardStatus = "Terminal reward is equal to max shaping reward";
    }
  }

  return {
    maxShapingReward,
    defRew,
    rewardStatus,
  };
};
