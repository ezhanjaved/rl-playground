import { useSceneStore } from "../../stores/useSceneStore";
const pendingBallReset = { ballId: null };
export function footballRef(event) {
  const { entities, updateEntity } = useSceneStore.getState();

  const rigidBodyName = event.other.rigidBodyObject?.name;
  const colliderName = event.other.colliderObject?.name;
  const postName = event.target.colliderObject?.name;

  const isBall = rigidBodyName === "ball" || colliderName === "ball_collider";

  if (!isBall) {
    console.log("Ignored non-ball object:", rigidBodyName, colliderName);
    return;
  }

  const ballId = findBallId(entities);
  if (!ballId) return;

  const ballState = entities[ballId]?.state ?? {};

  if (ballState.goalLocked) {
    console.log("Ball is Goal Locked - preventing multiple updates");
    return;
  }

  let goalOwnerTeam = null;
  let scoringTeam = null;

  if (postName === "goal_sensor_blue") {
    goalOwnerTeam = "blue";
  } else if (postName === "goal_sensor_red") {
    goalOwnerTeam = "red";
  } else if (postName === "goal_sensor_green") {
    goalOwnerTeam = "green"
  } else if (postName === "goal_sensor_yellow") {
    goalOwnerTeam = "yellow"
  } else {
    return;
  }

  updateEntity(ballId, {
    state: {
      ...ballState,
      goalLocked: true,
    },
  });

  const lastTouchedBy = ballState.lastTouchedBy;
  const lastTouchedTeam = ballState.lastTouchedTeam;
  const isOwnGoal = lastTouchedTeam === goalOwnerTeam;
  scoringTeam = isOwnGoal ? entities[lastTouchedBy]?.oppTeamId : entities[lastTouchedBy]?.teamId

  pendingBallReset.ballId = ballId;
  pendingBallReset.scoringTeam = scoringTeam;
  pendingBallReset.goalOwnerTeam = goalOwnerTeam;
  pendingBallReset.lastTouchedBy = lastTouchedBy;
  pendingBallReset.isOwnGoal = isOwnGoal;

  console.log(
    isOwnGoal
      ? `OWN GOAL by ${lastTouchedBy} from ${lastTouchedTeam}`
      : `GOAL by ${lastTouchedBy} from ${lastTouchedTeam}`,
  );

  flushPendingBallReset();
}

function updateGoalStats({ scoringTeam, goalOwnerTeam, scorerId, isOwnGoal }) {
  const { entities, updateEntity } = useSceneStore.getState();

  Object.entries(entities).forEach(([playerId, ent]) => {
    if (ent.tag !== "agent" || !ent.teamId) return;
    console.log("ID: " + playerId);
    const currentStateSpace = ent.state_space ?? {};

    let newStateSpace = {
      ...currentStateSpace,
    };

    console.log("Team ID: " + ent.teamId);
    console.log("State Space: " + JSON.stringify(newStateSpace, null, 2));
    // Team that gets the score
    if (ent.teamId === scoringTeam) {
      newStateSpace.team_goals_scored =
        (currentStateSpace.team_goals_scored ?? 0) + 1;
    }

    // Team that conceded
    if (ent.teamId === goalOwnerTeam) {
      console.log("Updating here");
      newStateSpace.team_goals_conceded =
        (currentStateSpace.team_goals_conceded ?? 0) + 1;
    }

    // Actual last-touch player
    if (playerId === scorerId) {
      if (isOwnGoal) {
        // Penalize the player who caused own goal
        newStateSpace.my_own_goals_scored =
          (currentStateSpace.my_own_goals_scored ?? 0) + 1;

        newStateSpace.last_goal_type = false;
      } else {
        // Reward normal scorer
        newStateSpace.my_goals_scored =
          (currentStateSpace.my_goals_scored ?? 0) + 1;

        newStateSpace.last_goal_type = true;
      }
    } else {
      newStateSpace.last_goal_type = null;
    }
    newStateSpace.previous_distance_ball = Infinity;
    newStateSpace.previous_distance_goal = Infinity;

    updateEntity(playerId, {
      state_space: newStateSpace,
    });
  });
}

function findBallId(entities) {
  return Object.entries(entities).find(([id, ent]) => ent.tag === "ball")?.[0];
}

function resetBallPosition(id) {
  console.log("Resetting Position of ball");

  const { entities, deleteEntity, addEntity } = useSceneStore.getState();

  const positionSpawned = entities[id]?.positionSpawned;
  deleteEntity(id);

  const footballObj = {
    tag: "ball",
    assetRef: "dynamic/football.gltf",
    position: positionSpawned,
    isBall: "true",
    isDecor: "true",
    collider: { shape: "ball", r: 0.25 },
    state: {
      lastTouchedBy: null,
      lastTouchedTeam: null,
      goalLocked: false,
    },
  };

  addEntity(footballObj);
  if (!positionSpawned) {
    console.warn("Cannot reset ball. Missing body or spawn position.");
    return;
  }
}

export function flushPendingBallReset() {
  if (!pendingBallReset.ballId) return;
  console.log(
    "Pending Ball Reset Data: " + JSON.stringify(pendingBallReset, null, 2),
  );
  const { ballId, scoringTeam, goalOwnerTeam, lastTouchedBy, isOwnGoal } =
    pendingBallReset;
  updateGoalStats({
    scoringTeam,
    goalOwnerTeam,
    scorerId: lastTouchedBy,
    isOwnGoal,
  });
  resetBallPosition(ballId);
  pendingBallReset.ballId = null;
}

export function isAlignedToGoal(
  deltaXToGoal,
  deltaZToGoal,
  maxAngleDegrees = 20,
) {
  const distance = Math.hypot(deltaXToGoal, deltaZToGoal);

  if (distance < 1e-6) {
    return true;
  }

  const alignment = deltaZToGoal / distance;

  const requiredAlignment = Math.cos((maxAngleDegrees * Math.PI) / 180);

  return alignment >= requiredAlignment;
}

export function BallToGoal(
  deltaXToBall,
  deltaZToBall,
  deltaXToGoal,
  deltaZToGoal,
) {
  const dx = deltaXToGoal - deltaXToBall;
  const dz = deltaZToGoal - deltaZToBall;
  const distance = Math.sqrt(dx*dx + dz*dz);
  return distance
}
