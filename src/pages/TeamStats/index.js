import React from "react";
import { useState, useEffect } from "react";
import common from "../../helpers/common";
import axios from "axios";
import TeamDataView from "../../components/TeamDataView";

const TeamStats = () => {
  const [stateVal, setStateVal] = useState({
    teamData: null,
    mapURLs: [],
    loading: true,
  });

  const { teamData, loading, mapURLs } = stateVal;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios("https://bydo.herokuapp.com/teamdata");
        const {
          data: { data: maps },
        } = await axios("https://valorant-api.com/v1/maps");
        setStateVal((prev) => ({
          ...prev,
          teamData: data,
          loading: false,
          mapURLs: maps.map(({ listViewIcon, displayName}) => ({listViewIcon, displayName}))
        }));
      } catch (e) {
        common.displayMessage("error", "Error displaying data");
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <div className="dot-pulse"></div>
      ) : (
        <div>
          <TeamDataView teamData={teamData} mapURLs={mapURLs}/>
        </div>
      )}
    </>
  );
};

export default TeamStats;
