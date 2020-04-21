const tests = require('./data/realMatches.json')
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

    for (const test of tests) {
      const roles = getRoles(championRoles, test.team)
      if (JSON.stringify(roles) === JSON.stringify(test.expected)) {
        goodGuess++
      } else {
        badGuess++
        fails.push({
          ...test,
          result: roles
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
