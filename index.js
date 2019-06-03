YAML = require('yamljs');
const fs = require('fs');

const snowbound = [

  314,
  366,
  340,
  548,
  756,
  367,
  419,
  471,
  523,
  575,
  731,
  783,
  393,
  445,
  549,
  601,
  705,
  757,
  809,
  472,
  524,
  576,
  628,
  732,
  784,
  836,
  888,
  940,
  965,
  992,
  1044,
  1069,
  342,
  446,
  498,
  550,
  602,
  654,
  706,
  758,
  810,
  862,
  914,
  966,
  213,
  369,
  421,
  473,
  525,
  577,
  629,
  681,
  733,
  785,
  889,
  941,
  187,
  239,
  291,
  343,
  395,
  447,
  499,
  551,
  603,
  655,
  707,
  759,
  811,
  863,
  915,
  967,
  1019,
  162,
  266,
  318,
  370,
  422,
  474,
  526,
  578,
  630,
  682,
  734,
  786,
  838,
  890,
  942,
  994,
  1046,
  188,
  240,
  292,
  344,
  396,
  448,
  500,
  552,
  604,
  656,
  708,
  760,
  812,
  864,
  916,
  968,
  1020,
];


function addRange(start,finish) {
  for (let index = start; index <= finish; index++) {
    snowbound.push(index);
  }
}

function addIndex(index) {
  snowbound.push(index);
}

const edge_length = 74   // a
const edge_length_hack = 76  // a

// d = 2 * a
const long_diagonal = 2 * edge_length

// d2 = √3 * a
const short_diagonal = Math.sqrt(3) * edge_length
//const short_diagonal = 133.36791218280354;


// offset = √( 4 * a² - c² ) / 4
const tri_short = long_diagonal / 3
const tri_long = edge_length

const offset = 0.25 * (Math.sqrt(4 * Math.pow(tri_long, 2) - Math.pow(tri_short, 2)))


const hexM = hexMatrix([73,52], 26, 92)


const warpCollect = warpCollection(hexM);
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

  let snowbound_index = 1;

  hexMatrix.map((hex,index) => {
    let region_name = `test_${index}`;

    let owners = ''

    if (snowbound.indexOf(index) != -1) {
      owners = 'snowbound'
      region_name = `Snowbound ${snowbound_index} (i:${index})`
      snowbound_index++;
    }

    regions[region_name] = regionObject(hex, region_name, owners);

  })

  return {
    regions: regions
  }

}  

function warpCollection(hexMatrix) {

  let warps = [];
  


  hexMatrix.map((hex,index) => {
    const region_name = `test_${index}`;
    warps.push(warpObject(hex, region_name));

  })

  return warps;

}


function warpObject(hexSet, name) {

  const destZ = hexSet[0][1] + (hexSet[5][1] - hexSet[0][1] / 2);
  const destX = hexSet[0][0] + (hexSet[2][0] - hexSet[0][0] / 2);


  const warp = {
    name:name,
    world:'hex',
    uuid:'76406d5a-c226-4a10-97bc-37f3549a37e2',
    x: destX,
    y: '128',
    z: destZ,
    yaw:'0',
    pitch:'0'
  }

  return warp;

}


function regionObject(hexSet, name, owners) {

  
  return {
    members: {},
    members: {},
    flags: {
      greeting: `Enter - ${name}`,
      farewell: `Leave - ${name}`
    },
    owners: {
      groups: [owners]
    },
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

function makeCSV(warpCollect) {
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: 'warps.csv',
    header: ['name', 'world', 'uuid', 'x', 'y', 'z', 'yaw', 'pitch']
  });

  csvWriter.writeRecords(warpCollect).then(() => {
        console.log('...Done');
  });

}


makeCSV(warpCollect);
