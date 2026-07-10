import getNearestTargetInfo from "../../utility/nearByObjects";
import { useSceneStore } from "../../../stores/useSceneStore";
import { getIndexOfObs } from "../../utility/getIndex";

export default function depositAdapter(action, ent, actionSpace) {
  const { updateEntity, entities, updateEntityStat } = useSceneStore.getState();
  const agent = entities[ent.id];
  const indexOfAction = getIndexOfObs(actionSpace, action);
  const capabilities = agent.capabilities;
  let newStateSpace = { ...agent.state_space };

  if (capabilities.includes("TemporalMemory")) {
    newStateSpace.last_action_index = indexOfAction;
    if (agent.last_action === action) {
      newStateSpace.last_action_counter += 1;
    } else {
      newStateSpace.last_action_counter = 1;
    }
  }

  if (action !== "deposit") {
    updateEntity(agent.id, {
      last_action: action,
      state_space: newStateSpace,
    });
    updateEntityStat(agent.id, {
      state_space: newStateSpace,
    });
    return;
  }

  const info = getNearestTargetInfo(agent.position, entities, "isDeposit");
  const targetReached = info?.found && info?.distance <= info?.radius;

  // Not near deposit zone
  if (!targetReached) {
    newStateSpace.lastDepositSuccess = false;
    newStateSpace.nearDeposit = targetReached;
    updateEntity(agent.id, {
      last_action: action,
      state_space: newStateSpace,
    });
    updateEntityStat(agent.id, {
      state_space: newStateSpace,
    });
    return;
  }

  const isHolder = agent.capabilities.includes("Holder");
  const isCollector = agent.capabilities.includes("Collector");
  const holdingItem = isHolder && (agent?.state_space?.holding ?? false);
  const collectedItems = isCollector
    ? (agent?.state_space?.items_collected ?? 0)
    : 0;

  // Near deposit but nothing to deposit
  if (!holdingItem && collectedItems === 0) {
    newStateSpace.lastDepositSuccess = false;
    newStateSpace.nearDeposit = targetReached;
    updateEntity(agent.id, {
      last_action: action,
      state_space: newStateSpace,
    });
    updateEntityStat(agent.id, {
      state_space: newStateSpace,
    });
    return;
  }

  // Successful deposit
  let newStateFragment = { ...newStateSpace };
  let itemsJustDeposited = 0;

  if (holdingItem) {
    newStateFragment = {
      ...newStateFragment,
      holding: false,
      heldItemAssetRef: null,
      lastPickSuccess: false,
    };
    itemsJustDeposited += 1;
  }

  if (collectedItems > 0) {
    newStateFragment = {
      ...newStateFragment,
      items_collected: 0, // inventory cleared
      lastItemCollected: null,
      lastPickSuccess: false,
    };
    itemsJustDeposited += collectedItems;
  }

  newStateFragment = {
    ...newStateFragment,
    lastDepositSuccess: true,
    nearDeposit: true,
    items_deposited:
      (agent?.state_space?.items_deposited ?? 0) + itemsJustDeposited,
  };

  updateEntity(agent.id, {
    last_action: action,
    state_space: newStateFragment,
  });

  updateEntityStat(agent.id, {
    state_space: newStateFragment,
  });
}
