## Role Identification for League of Legends

This is a fork of the original python script in Javascript (Node.js).

### Setup

Actually, this fork isn't a npm module so just copy the entire `/js-role-identification/src/index.js` file in your project.

### Example Using Champion IDs

```js
// Pull the data required to make role assignments
const championRoles = await pullData()

// You can pass in a list of champions to `getRoles`
const champions = [122, 64, 69, 119, 201]  // ['Darius', 'Lee Sin', 'Cassiopeia', 'Draven', 'Braum']
const roles = getRoles(championRoles, champions)

// Output:
{'TOP': 122, 'JUNGLE': 64, 'MIDDLE': 69, 'BOTTOM': 119, 'UTILITY': 201}
```

See the `examples` directory for more.

You can run `node examples/realMatchesTests.js` to test the algorithm with real matches data or run `node examples/generatedMatchesTests.js` to test it with generated matches.

Tests data can be found in the `examples/data` directory.
