const fs = require("fs");

fs.readFile("./data2019.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    const customer = JSON.parse(jsonString);
    getRanks2019(customer);

    console.log("\n");
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});

console.log("\n");

fs.readFile("./data2024.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    const customer = JSON.parse(jsonString);
    getRanks2024(customer);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});

const Top3Incremented = () => {
  fs.readFile("./data2019.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const Data2019 = JSON.parse(jsonString);

      fs.readFile("./data2024.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("Error reading file from disk:", err);
          return;
        }
        try {
          const Data2024 = JSON.parse(jsonString);

          var Difference = [];

          Data2019.filter((item) => {
            for (j = 0; j < Data2024.length; j++) {
              if (item.name === Data2024[j].name) {
                var diff = Data2024[j].score2024 - item.score2019;

                const res = {
                  name: item.name,
                  diff: diff,
                };

                Difference.push(res);
              }
            }
          });

          //   console.log("seeeing difference", Difference);

          //sorting decreasing

          for (let i = 0; i < Difference.length; i++) {
            for (let j = 0; j < Difference.length - 1; j++) {
              if (Difference[j].diff < Difference[j + 1].diff) {
                var temp = Difference[j + 1];
                Difference[j + 1] = Difference[j];
                Difference[j] = temp;
              }
            }
          }

          console.log(
            "the first high incremented from 2029-24 is",
            Difference[0].name
          );
          console.log(
            "the  second high incremented from 2029-24 is",
            Difference[2].name
          );
          console.log(
            "the thirs high incremented  from 2029-24is",
            Difference[3].name
          );

          console.log("\n");

          console.log(
            "the first high decremented from 2029-24 is",
            Difference[Difference.length - 1].name
          );
          console.log(
            "the  second high decremented from 2029-24 is",
            Difference[Difference.length - 2].name
          );
          console.log(
            "the third high decremented  from 2029-24 is",
            Difference[Difference.length - 3].name
          );

          console.log("\n");

          //   getRanks2024(customer);
        } catch (err) {
          console.log("Error parsing JSON string:", err);
        }
      });
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
};

const getTop3 = (ranks) => {
  return ranks.filter((item) => item.rank <= 3);
};

const getBottom3 = (ranks) => {
  var largest = ranks[0].rank;

  for (var i = 0; i < ranks.length; i++) {
    if (largest < ranks[i].rank) {
      largest = ranks[i].rank;
    }
  }

  return ranks.filter((item) => item.rank >= largest - 2);
};

const getRanks2019 = (data) => {
  //sorting the data by decreasing order
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - 1; j++) {
      if (data[j].score2019 < data[j + 1].score2019) {
        var temp = data[j + 1];
        data[j + 1] = data[j];
        data[j] = temp;
      }
    }
  }

  //data sorted by score2019 in decreasing order

  const ranks = [];

  var rankCount = 1;
  for (let i = 0; i < data.length; i++) {
    //this if will hit on last element
    if (i === data.length - 1) {
      const rank = {
        name: data[i].name,
        score2019: data[i].score2019,
        rank: rankCount,
      };
      ranks.push(rank);
      rankCount++;
    } else {
      if (data[i].score2019 === data[i + 1].score2019) {
        const rank = {
          name: data[i].name,
          score2019: data[i].score2019,
          rank: rankCount,
        };
        ranks.push(rank);
      } else {
        const rank = {
          name: data[i].name,
          score2019: data[i].score2019,
          rank: rankCount,
        };
        ranks.push(rank);
        rankCount++;
      }
    }
  }

  console.log("ranks2019", ranks);

  fs.writeFile("data2019.json", JSON.stringify(ranks), (err) => {
    if (err) console.log(err);
    else {
      //   console.log("File written successfully\n");
      //   console.log("The written has the following contents:");
      //   console.log(fs.readFileSync("books.txt", "utf8"));
    }
  });

  data2019 = ranks;

  const Top3 = getTop3(ranks);
  const Bottom3 = getBottom3(ranks);

  console.log("here are the top3 rankers of 2019", Top3);
  console.log("here are the Bootom3 rankers of 2019", Bottom3);
};
const getRanks2024 = (data) => {
  //sorting the data by decreasing order
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - 1; j++) {
      if (data[j].score2024 < data[j + 1].score2024) {
        var temp = data[j + 1];
        data[j + 1] = data[j];
        data[j] = temp;
      }
    }
  }

  //data sorted by score2024 in decreasing order

  const ranks = [];

  var rankCount = 1;
  for (let i = 0; i < data.length; i++) {
    //this if will hit on last element
    if (i === data.length - 1) {
      const rank = {
        name: data[i].name,
        score2024: data[i].score2024,
        rank: rankCount,
      };
      ranks.push(rank);
      rankCount++;
    } else {
      if (data[i].score2024 === data[i + 1].score2024) {
        const rank = {
          name: data[i].name,
          score2024: data[i].score2024,
          rank: rankCount,
        };
        ranks.push(rank);
      } else {
        const rank = {
          name: data[i].name,
          score2024: data[i].score2024,
          rank: rankCount,
        };
        ranks.push(rank);
        rankCount++;
      }
    }
  }

  console.log("ranks2024", ranks);

  fs.writeFile("data2024.json", JSON.stringify(ranks), (err) => {
    if (err) console.log(err);
    else {
      //   console.log("File written successfully\n");
      //   console.log("The written has the following contents:");
      //   console.log(fs.readFileSync("books.txt", "utf8"));
    }
  });

  const Top3 = getTop3(ranks);
  const Bottom3 = getBottom3(ranks);

  console.log("here are the top3 rankers of 2024", Top3);
  console.log("here are the Bootom3 rankers of 2024", Bottom3);
  
  console.log('\n')
};

Top3Incremented();
