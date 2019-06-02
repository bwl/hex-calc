YAML = require('yamljs');
const fs = require('fs');

const edge_length = 74   // a
const edge_length_hack = 76  // a

// d = 2 * a
const long_diagonal = 2 * edge_length

console.log('long diagonal', long_diagonal)
// d2 = √3 * a
const short_diagonal = Math.sqrt(3) * edge_length
//const short_diagonal = 133.36791218280354;

console.log('short_diagonal', short_diagonal)

// offset = √( 4 * a² - c² ) / 4
const tri_short = long_diagonal / 3
const tri_long = edge_length

console.log('tri_short', tri_short)
console.log('tri_long', tri_long)

const offset = 0.25 * (Math.sqrt(4 * Math.pow(tri_long, 2) - Math.pow(tri_short, 2)))

console.log('offset', offset)

const hexM = hexMatrix([73,52], 24, 96)
const regionCollect = regionCollection(hexM);
const myYaml = makeYaml(regionCollect)

fs.writeFile("regions.yml", myYaml, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

function hexPoints(x, y) {

  const a = [x, y]
  const b = [x + short_diagonal / 2, y - offset]
  const c = [x + short_diagonal, y]
  const d = [x + short_diagonal, y + edge_length_hack]
  const e = [x + short_diagonal / 2, y + edge_length_hack + offset]
  const f = [x, y + edge_length_hack]
  return [a,b,c,d,e,f]

}

function hexPointsRounded(x, y) {

  const a = [Math.round(x), Math.round(y)]
  const b = [Math.round(x + short_diagonal / 2), Math.round(y - offset)]
  const c = [Math.round(x + short_diagonal), Math.round(y)]
  const d = [Math.round(x + short_diagonal), Math.round(y + edge_length)]
  const e = [Math.round(x + short_diagonal / 2), Math.round(y + edge_length + offset)]
  const f = [Math.round(x), Math.round(y + edge_length)]
  return [a,b,c,d,e,f]

}

function hexMatrix(hexPoint, colSize, rowSize) {

  let hexColumns = []
  let hexMatrix = []

  for (let count = 0; count < rowSize; count++) {

    const startY = hexPoint[1] + ((edge_length_hack + offset) * (count % 2) + 1 )
    hexColumns.push(hexColumn([hexPoint[0] + ((short_diagonal / 2) * count), startY], colSize))
  }

  hexColumns.map(column => {
    column.map(hexPoints => {
      hexMatrix.push(hexPoints);
    })
  })

  return hexMatrix
}

function hexColumn(hexPoint, rowSize) {

  // for a given starting hexpoint
  // repeat SIZE times
  // return a row of hexes

  let row = []

  let a = hexPoint

  for (let count = 0; count < rowSize; count++) {

    let newY = a[1] + ((offset + offset + edge_length_hack + edge_length_hack) * count);

    const hex = hexPoints(a[0], newY)
    row.push(hex)
  }

  return row
}

function regionName() {

}


// Worldguard Region Format

// regions:
//     test:
//         members: {}
//         flags: {}
//         owners: {}
//         type: poly2d
//         priority: 0
//         max-y: 256
//         min-y: 0
//         points:
//         - {x: 647, z: 1489}
//         - {x: 597, z: 1460}
//         - {x: 594, z: 1394}
//         - {x: 647, z: 1358}
//         - {x: 710, z: 1404}
//         - {x: 708, z: 1464}

function regionCollection(hexMatrix) {

  let regions = {};
  
  hexMatrix.map((hex,index) => {
    const region_name = `test_${index}`;
    regions[region_name] = regionObject(hex, region_name);
  })

  return {
    regions: regions
  }

}  

function regionObject(hexSet, name) {

  
  return {
    members: {},
    members: {},
    flags: {
      greeting: `Enter - ${name}`,
      farewell: `Leave - ${name}`
    },
    owners: {},
    type: 'poly2d',
    priority: 0,
    'max-y': 256,
    'min-y': 0,
    points: [
      {
        x: Math.round(hexSet[0][0]),
        z: Math.round(hexSet[0][1])
      },
      { 
        x: Math.round(hexSet[1][0]),
        z: Math.round(hexSet[1][1])
      },
      { 
        x: Math.round(hexSet[2][0]),
        z: Math.round(hexSet[2][1])
      },
      {
        x: Math.round(hexSet[3][0]),
        z: Math.round(hexSet[3][1])
      },
      { 
        x: Math.round(hexSet[4][0]),
        z: Math.round(hexSet[4][1])
      },
      { 
        x: Math.round(hexSet[5][0]),
        z: Math.round(hexSet[5][1])
      },
    ]
  }
}

function makeYaml(regionCollection) {
  yamlString = YAML.stringify(regionCollection, 2);

  return yamlString;
}

