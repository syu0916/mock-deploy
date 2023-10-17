
/**
 * @param column a column within the processed file
 * @param searchFor the term to search for
 * @returns a json object containing a body for the actual response content.
 */
export function mockedSearchZoo(column: string | number, searchFor: string) {



  const zooMap: { [col: string]: { [search: string]: JSON } } = {
    "": {
      "tiger": JSON.parse(
        '{"body":[["01", "Bronx Zoo", "Jeremy", "tiger", "steak"],' +
          '["02", "San Francisco Zoo", "Sean", "tiger", "steak"],' +
          '["03", "San Francisco Zoo", "John", "human", "tiger"]]}'
      ),

      "penguin": JSON.parse(
        '{"body":[["04", "Maryland Zoo", "Lawn", "penguin", "krill"],' +
          '["05", "Baltimore Zoo", "Prawn", "penguin", "krill"],' +
          '["06", "New York Zoo", "Drawn", "penguin", "sardines"]]}'
      ),

      "human": JSON.parse(
        '{"body":[["03", "San Francisco Zoo", "John", "human", "tiger"]]}'
      ),
    },
    "animal": {
      "tiger": JSON.parse(
        '{"body":[["01", "Bronx Zoo", "Jeremy", "tiger", "steak"],' +
          '["02", "San Francisco Zoo", "Sean", "tiger", "steak"]]}'
      ),

      "human": JSON.parse(
        '{"body":[["03", "San Francisco Zoo", "John", "human", "tiger"]]}'
      ),

      "penguin": JSON.parse(
        '{"body":[["04", "Maryland Zoo", "Lawn", "penguin", "krill"],' +
          '["05", "Baltimore Zoo", "Prawn", "penguin", "krill"],' +
          '["06", "New York Zoo", "Drawn", "penguin", "sardines"]]}'
      ),
    },
    "food": {
      "tiger": JSON.parse(
        '{"body":[["03", "San Francisco Zoo", "John", "human", "tiger"]]}'
      ),

      "steak": JSON.parse(
        '{"body":[["01", "Bronx Zoo", "Jeremy", "tiger", "steak"],' +
          '["02", "San Francisco Zoo", "Sean", "tiger", "steak"]]}'
      ),

      "krill": JSON.parse(
        '{"body": [["04", "Maryland Zoo", "Lawn", "penguin", "krill"],["05", "Baltimore Zoo", "Prawn", "penguin", "krill"]]}'
      ),

      "sardines": JSON.parse(
        '{"body":[["06", "New York Zoo", "Drawn", "penguin", "sardines"]]}'
      ),
    },
  };

  let index : number = Number(column)
  if (!Number.isNaN(index)) {
    if (index == 3) {
      if (!(searchFor in zooMap['animal'])) {
        return JSON.parse("[[]]");
      } else {
        return zooMap['animal'][searchFor];
      }
    } else if (index == 4) {
      if (!(searchFor in zooMap['food'])) {
        return JSON.parse("[[]]");
      } else {
        return zooMap['food'][searchFor];
      }
    } else if (index > 4) {
      return JSON.parse("[[]]");
    }
  } else {
    if (!(column in zooMap) || !(searchFor in zooMap[column])) {
      return JSON.parse("[[]]");
    } else if (column in zooMap && searchFor in zooMap[column]) {
      return zooMap[column][searchFor];
    }
  }


}
