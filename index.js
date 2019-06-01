const edge_length = 72.169   // a
const long_diagonal = 144.338 // d
const short_diagonal = 125  // d2
const tri_short = long_diagonal / 3
const tri_long = edge_length
const offset = 36.085

function hexPoints(x, y) {
  const a = [Math.round(x), Math.round(y)]
  const b = [Math.round(x + short_diagonal / 2), Math.round(y + offset)]
  const c = [Math.round(x + short_diagonal), Math.round(y)]
  const d = [Math.round(x + short_diagonal), Math.round(y + edge_length)]
  const e = [Math.round(x + short_diagonal / 2), Math.round(y - offset)]
  const f = [Math.round(x), Math.round(y + edge_length)]
  return [a,b,c,d,e,f]

}

function new_a(a) {
  const x = a[0]
  const y = a[1] + short_diagonal
  return [x,y]

}

function hexMatrix(hexPoint, rowSize, colSize) {

  let hexRows = []
  let hexMatrix = []

  for (let count = 0; count < colSize; count++) {
    hexRows.push(hexRow([hexPoint[0],hexPoint[1] + long_diagonal * count], rowSize))
  }

  hexRows.map(row => {
    row.map(hexPoints => {
      hexMatrix.push(hexPoints);
    })
  })

  return hexMatrix
}

function hexRow(hexPoint, size) {

  let row = []

  let a = hexPoint

  for (let count = 0; count < size; count++) {
    const hex = hexPoints(Math.round(a[0]),Math.round(a[1]))
    a = new_a(a)
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
    regions[region_name] = regionObject(hex);
  })

  return {
    regions: regions
  }

}  

function regionObject(hexSet) {

  return {
    members: {},
    members: {},
    flags: {},
    owners: {},
    type: 'poly2d',
    priority: 0,
    'max-y': 256,
    'min-y': 0,
    points: [
      {
        x: hexSet[0][0],
        z: hexSet[0][1]
      },
      { 
        x: hexSet[1][0],
        z: hexSet[1][1]
      },
      { 
        x: hexSet[2][0],
        z: hexSet[2][1]
      },
      {
        x: hexSet[3][0],
        z: hexSet[3][1]
      },
      { 
        x: hexSet[4][0],
        z: hexSet[4][1]
      },
      { 
        x: hexSet[5][0],
        z: hexSet[5][1]
      },
    ]
  }
}

function makeYaml(regionCollection) {
  yamlString = YAML.stringify(regionCollection, 2, 2);

  return yamlString;
}




const hexM = hexMatrix([0,0], 4, 3)
const regionCollect = regionCollection(hexM);

console.log( makeYaml(regionCollect) )
//console.log(hexMatrix([0,0], 48, 56))
//console.log(new_a([0,0]));
