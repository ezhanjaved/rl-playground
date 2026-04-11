
export async function ppoController(obsVector) {
  // refine obs vector -> make it all numeric
  const refinedObs = refineObs(obsVector);
  //get session and jwt token from local storage
  const session_token = localStorage.getItem("session_token");
  const jwt_token = localStorage.getItem("jwt_token");
  //will use these three to send over WS to cloud computer
  
}

function refineObs(obsVector) {
  obsVector.forEach((obs, index) => {
    const typeOfObs = typeof obs;
    if (typeOfObs === "boolean") {
      obsVector[index] = Number(obsVector[index]);
    }
  });
  return obsVector;
}
