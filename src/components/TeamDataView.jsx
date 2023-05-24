// import { MapCard } from "../map-card/map-card";
import { useState } from "react";
// import { MapView } from "../map-view/map-view";

const TeamDataView = ({ teamData, mapURLs }) => {
  const [stateVal, setStateVal] = useState({
    selectedMap: "",
  });

  const { selectedMap } = stateVal;

  const winrate = (
    (teamData.reduce((acc, game) => acc + game.win, 0) / teamData.length) *
    100
  ).toFixed(2);
  const gamesPlayed = teamData.length;
  let totalAttackWins = 0;
  let totalAttackLosses = 0;
  let totalDefenceWins = 0;
  let totalDefenceLosses = 0;

  for (const match of teamData) {
    totalAttackWins += match.attack.wins;
    totalAttackLosses += match.attack.losses;
    totalDefenceWins += match.defence.wins;
    totalDefenceLosses += match.defence.losses;
  }

  const attackWinrate = (
    (totalAttackWins / (totalAttackLosses + totalAttackWins)) *
    100
  ).toFixed(2);
  const defenceWinrate = (
    (totalDefenceWins / (totalDefenceLosses + totalDefenceWins)) *
    100
  ).toFixed(2);

  const mapStats = teamData.reduce((acc, match) => {
    const { comp, map, win } = match;
    const compStr = JSON.stringify(comp);

    if (!acc[map]) {
      acc[map] = {};
    }

    if (!acc[map][compStr]) {
      acc[map][compStr] = {
        attack: { wins: 0, losses: 0 },
        defence: { wins: 0, losses: 0 },
        plantedAt: { a: 0, b: 0, c: 0 },
        winType: { bombDetonated: 0, bombDefused: 0, time: 0, kills: 0 },
        totalWins: 0,
        totalLosses: 0,
      };
    }

    const compStats = acc[map][compStr];
    const winTypeStats = compStats.winType;

    if (win) {
      compStats.totalWins++;
    } else {
      compStats.totalLosses++;
    }

    compStats.plantedAt.a += match.plantedAt.a;
    compStats.plantedAt.b += match.plantedAt.b;
    compStats.plantedAt.c += match.plantedAt.c;

    compStats.attack.wins += match.attack.wins;
    compStats.attack.losses += match.attack.losses;
    compStats.defence.wins += match.defence.wins;
    compStats.defence.losses += match.defence.losses;

    winTypeStats.bombDetonated += match.winType.bombDetonated;
    winTypeStats.bombDefused += match.winType.bombDefused;
    winTypeStats.time += match.winType.time;
    winTypeStats.kills += match.winType.kills;

    return acc;
  }, {});

  const mapStatsArray = Object.entries(mapStats).map(([map, compStatsMap]) => {
    const compStatsArray = Object.entries(compStatsMap).map(
      ([compStr, compStats]) => ({
        comp: JSON.parse(compStr),
        ...compStats,
      })
    );

    return { map, compStats: compStatsArray };
  });

//   if (selectedMap) {
//     return (
//       <MapView
//         map={selectedMap}
//         onBackClick={() => {
//           setStateVal((prev) => ({ ...prev, selectedMap: "" }));
//         }}
//       />
//     );
//   }

  return (
    <div>
        <table>
            <th>
                <td>Name</td>
                <td>Win %</td>
            </th>
          {mapStatsArray.map((map) => (
            <tr>
                <td>
                    {map.map}
                </td>
                <td>
                    ^
                </td>
                <td>
                    5%
                </td>
            </tr>
          ))}  
        </table>
      <div>
        <span>Winrate: </span>
        <span>{winrate}%</span>
      </div>
      <div>
        <span>Attack Winrate: </span>
        <span>{attackWinrate}%</span>
      </div>
      <div>
        <span>Defence Winrate: </span>
        <span>{defenceWinrate}%</span>
      </div>
      <div>
        <span>Games Played: </span>
        <span>{gamesPlayed}</span>
      </div>
      <div>
        <span>Maps Played: </span>
        {/* {mapStatsArray.map((map) => (
          <MapCard
            key={map._id}
            map={map}
            onMapClick={() => {
                setStateVal((prev) => ({ ...prev, selectedMap: mapa }));
            }}
          />
        ))} */}
      </div>
    </div>
  );
};

export default TeamDataView;
