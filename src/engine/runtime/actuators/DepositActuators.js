import getNearestTargetInfo from "../../utility/nearByObjects";
import { useSceneStore } from "../../../stores/useSceneStore";

const MAX_DIST = 40.0;

export default function depositAdapter(action, ent, obs, obsSpace) {
  const { updateEntity, entities } = useSceneStore.getState();
  const agent = entities[ent.id];

  const getObs = (key) => {
    const idx = obsSpace?.indexOf(key) ?? -1;
    return idx === -1 ? null : obs[idx];
  };

  if (action !== "deposit") {
    updateEntity(agent.id, { last_action: action });
    return {
      nearDeposit: false,
      previousDistance: getObs("dist_to_nearest_deposit"),
      items_deposit: agent?.state_space?.items_deposited ?? 0,
    };
  }

  const info = getNearestTargetInfo(agent.position, entities, "isDeposit");
  const targetReached = info?.found && info?.distance <= info?.radius;

  if (!targetReached) {
    return {
      nearDeposit: false,
      previousDistance: info?.found
        ? info.distance / MAX_DIST
        : getObs("dist_to_nearest_deposit"),
      items_deposit: agent?.state_space?.items_deposited ?? 0,
    };
  }

  const isHolder = agent.capabilities.includes("Holder");
  const isCollector = agent.capabilities.includes("Collector");

  const holdingItem = isHolder && (agent?.state_space?.holding ?? false);
  const collectedItems = isCollector
    ? (agent?.state_space?.items_collected ?? 0)
    : 0;
  const previousDeposit = agent?.state_space?.items_deposited ?? 0;

  if (!holdingItem && collectedItems === 0) {
    return {
      nearDeposit: true,
      previousDistance: info.distance / MAX_DIST,
      items_deposit: previousDeposit,
    };
  }

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

  const updatedItemsDeposited = previousDeposit + itemsJustDeposited;

  updateEntity(agent.id, {
    last_action: action,
    state_space: {
      ...newStateFragment,
      nearDeposit: true,
      items_deposited: updatedItemsDeposited,
      previous_distance_deposit: info.distance / MAX_DIST, // store normalized
    },
  });

  return {
    nearDeposit: true,
    previousDistance: info.distance / MAX_DIST,
    items_deposit: updatedItemsDeposited,
  };
}
