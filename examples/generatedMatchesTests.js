const roles = require('./data/champRoles.json')
const { pullData, getRoles } = require('../js-role-identification/src/index.js');

(async () => {
  try {
    const championRoles = await pullData()

    // Add 74: Heimer as Syndra & 163: Taliyah as Karthus
    championRoles['74'] = {
      TOP: 0,
      JUNGLE: 0,
      MIDDLE: 0.03614833281396074,
      BOTTOM: 0.006516598537202354,
      UTILITY: 0
    }
    championRoles['163'] = {
      TOP: 0,
      JUNGLE: 0.023252616721353547,
      MIDDLE: 0,
      BOTTOM: 0,
      UTILITY: 0
    }

    let goodGuess = 0
    let badGuess = 0
    const fails = []

    for (let i = 0; i < 100; i++) {
      const team = []
      const expected = {}
      const leagueRoles = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY']

      for (const role of leagueRoles) {
        const keys = Object.keys(roles[role])
        let selectedChampion = roles[role][keys[keys.length * Math.random() << 0]]
        while (team.includes(selectedChampion)) {
          selectedChampion = roles[role][keys[keys.length * Math.random() << 0]]
        }

        team.push(selectedChampion)
        expected[role] = selectedChampion
      }

      const identifiedRoles = getRoles(championRoles, team)
      if (JSON.stringify(identifiedRoles) === JSON.stringify(expected)) {
        goodGuess++
      } else {
        badGuess++
        const detailedTeam = {}
        team.map(champ => {
          let champName = null
          for (const role of leagueRoles) {
            champName = Object.entries(roles[role]).find(([, id]) => champ === id)
            if (champName) break
          }
          detailedTeam[champ] = champName[0]
        })
        fails.push({
          team: detailedTeam,
          expected,
          result: identifiedRoles
        })
      }
    }
    const percent = goodGuess * 100 / (goodGuess + badGuess)


    console.log('Fails:')
    console.log(fails)
    console.log(goodGuess, badGuess)
    console.log('Right guess: ' + percent.toFixed(2) + '%')

  } catch (error) {
    console.log(error)
  }
})()