import getNearestTargetInfo from "../../utility/nearByObjects";
import { useSceneStore } from "../../../stores/useSceneStore";
import { getIndexOfObs } from "../../utility/getIndex";

export default function depositAdapter(action, ent, actionSpace) {
  const { updateEntity, entities } = useSceneStore.getState();
  const agent = entities[ent.id];
  const indexOfAction = getIndexOfObs(actionSpace, action);
  if (action !== "deposit") {
    updateEntity(agent.id, {
      last_action: action,
      state_space: {
        ...agent.state_space,
        last_action_index: indexOfAction,
      },
    });
    return;
  }

  const info = getNearestTargetInfo(agent.position, entities, "isDeposit");
  const targetReached = info?.found && info?.distance <= info?.radius;

  // Not near deposit zone
  if (!targetReached) {
    updateEntity(agent.id, {
      last_action: action,
      state_space: {
        ...agent.state_space,
        last_action_index: indexOfAction,
        lastDepositSuccess: false,
        nearDeposit: targetReached,
      },
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
    updateEntity(agent.id, {
      last_action: action,
      state_space: {
        ...agent.state_space,
        last_action_index: indexOfAction,
        lastDepositSuccess: false,
        nearDeposit: targetReached,
      },
    });
    return;
  }

  // Successful deposit
  let newStateFragment = { ...agent.state_space };
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
      items_collected: 0,
      lastItemCollected: null,
    };
    itemsJustDeposited += collectedItems;
  }

  updateEntity(agent.id, {
    last_action: action,
    state_space: {
      ...newStateFragment,
      last_action_index: indexOfAction,
      lastDepositSuccess: true,
      nearDeposit: targetReached,
      items_deposited:
        (agent?.state_space?.items_deposited ?? 0) + itemsJustDeposited,
    },
  });
}
