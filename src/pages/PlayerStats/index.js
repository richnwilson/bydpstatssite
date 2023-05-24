import React from "react";
import { useParams } from "react-router-dom";

const PlayerStats = () => {
  const params = useParams();

  return <div>{params.name}</div>;
};

export default PlayerStats;
