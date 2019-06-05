YAML = require("yamljs");
const fs = require("fs");

// Hex point calculation
// Used this resource as my primary guide:
// https://rechneronline.de/pi/hexagon.php
// 
// The edge_length_hack forces a bit of vertical distortion in the hexes
// Making them slightly taller was needed in order to fit the grid of the map
// Between me and the map author i'm honestly not sure whose math is wrong!
const edge_length = 74; // a
const edge_length_hack = 76; // a

// d = 2 * a
const long_diagonal = 2 * edge_length;

// d2 = √3 * a
const short_diagonal = Math.sqrt(3) * edge_length;

// offset = √( 4 * a² - c² ) / 4
const tri_short = long_diagonal / 3;
const tri_long = edge_length;
const offset = 0.25 * Math.sqrt(4 * Math.pow(tri_long, 2) - Math.pow(tri_short, 2));

// for a given point in space create the cooresponding 5 points
// this returns a fixed size hexagon based on the constants above
//              
//       E      
//     F   D    
//     A   C         Hex Point Layout
//       B      
//              
function hexPoints(x, y) {
    const a = [ x, y ];
    const b = [ x + short_diagonal / 2, y - offset ];
    const c = [ x + short_diagonal, y ];
    const d = [ x + short_diagonal, y + edge_length_hack ];
    const e = [ x + short_diagonal / 2, y + edge_length_hack + offset ];
    const f = [ x, y + edge_length_hack ];

    return [ a, b, c, d, e, f ];
}


// create a vertical column of hexes of columnSize height
//    _   
//   / \  
//   \_/  
//            The big amount of space between hexs is needed
//    _       to allow for the adjecent columns to fit in correctly
//   / \  
//   \_/  
//        
function hexColumn(hexPoint, columnSize) {
    let column = [];
    let a = hexPoint;

    for (let count = 0; count < columnSize; count++) {
        let newY = a[1] + (offset + offset + edge_length_hack + edge_length_hack) * count;
        const hex = hexPoints(a[0], newY);

        column.push(hex);
    }

    return column;
}


// create 92 columns - each 26 hexs tall
// start the grid at block x73 y52
const hexM = hexMatrix([ 73, 52 ], 26, 92);


//  create rowSize number of hexColumns
//  each hexColumn is colSize hexs tall

//  finally iterate through returned columns
//  to create flat array of all hexs

function hexMatrix(hexPoint, colSize, rowSize) {
    let hexColumns = [];
    let hexMatrix = [];

    for (let count = 0; count < rowSize; count++) {
        const startY = hexPoint[1] + ((edge_length_hack + offset) * (count % 2) + 1);

        hexColumns.push(hexColumn([ hexPoint[0] + short_diagonal / 2 * count, startY ], colSize));
    }

    hexColumns.map(column => {
        column.map(hexPoints => {
            hexMatrix.push(hexPoints);
        });
    });

    return hexMatrix;
}




//  now that we have an array of hex ids we can
//  add identification traits with simple array lists


// region set definitions
// each set returns 1 array of integer hex ids


// nortwest snow area
const snowbound = require("./sets/snowbound");

// northeast forest area
const timber = require("./sets/timber");

// southern desert area
const redsun = require("./sets/redsun");

// central farmland area
const heartland = require("./sets/heartland");

// cursed hex in south east corner
const havoc = [
    1918
];


// send our collection of hexes through world guard region formatter
// each hex is compared to above lists and returned with traits as assigned

const regionCollect = regionCollection(hexM);



// Atomic region object
// used by region collection to fill each hex entry
function regionObject(hexSet, name, owners) {
    return {
        members: {},
        flags: {
            greeting: `Enter - ${name}`,
            farewell: `Leave - ${name}`
        },
        owners: {
            groups: [ owners ]
        },
        type: "poly2d",
        priority: 0,
        "max-y": 256,
        "min-y": 0,
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
            }
        ]
    };
}

// iterate through all hexes, compare with area lists
// process hex through regionObject();
// return object of all regions in proper format for yaml parse
function regionCollection(hexMatrix) {
    let regions = {};

    let snowbound_index = 1;

    let redsun_index = 1;

    let timber_index = 1;

    let heartland_index = 1;

    hexMatrix.map((hex, index) => {
        let region_name = "wild";

        let owners = "";

        if (snowbound.indexOf(index) !== -1) {
            owners = "snowbound";
            region_name = `snowbound_${snowbound_index}_${index}`;
            snowbound_index = snowbound_index + 1;
        }
        if (redsun.indexOf(index) !== -1) {
            owners = "redsun";
            region_name = `redsun_${redsun_index}_${index}`;
            redsun_index = redsun_index + 1;
        }
        if (timber.indexOf(index) !== -1) {
            owners = "timber";
            region_name = `timber_${timber_index}_${index}`;
            timber_index = timber_index + 1;
        }

        if (heartland.indexOf(index) !== -1) {
            owners = "heartland";
            region_name = `heartland_${heartland_index}_${index}`;
            heartland_index = heartland_index + 1;
        }
        // havoc
        if (index === 1918) {
            owners = "havoc";
            region_name = `havoc_${index}`;
        }

        if (region_name !== "wild") {
            regions[region_name] = regionObject(hex, region_name, owners);
        }
    });

    return {
        regions: regions
    };
}  


//  given our hex matrix
//  process all hexes against area lists
const warpCollect = warpCollection(hexM);

// Atomic warp object
// used by warp collection to fill each hex entry
function warpObject(hexSet, name) {
    const destX = hexSet[0][0] + 64;
    const destZ = hexSet[0][1] + 36;

    const warp = {
        name: name,
        world: "hex",
        uuid: "76406d5a-c226-4a10-97bc-37f3549a37e2",
        x: destX,
        y: "192",
        z: destZ,
        yaw: "0",
        pitch: "0"
    };

    return warp;
}

// iterate through all hexes, compare with area lists
// process hex through warpObject();
// return array of all warps in proper format for csv parse
function warpCollection(hexMatrix) {
    let warps = [];

    let snowbound_index = 1;
    let redsun_index = 1;
    let timber_index = 1;
    let heartland_index = 1;

    hexMatrix.map((hex, index) => {
        let region_name = "wild";

        let owners = "";

        if (snowbound.indexOf(index) !== -1) {
            owners = "snowbound";
            region_name = `snowbound_${snowbound_index}_${index}`;
            snowbound_index = snowbound_index + 1;
        }
        if (redsun.indexOf(index) !== -1) {
            owners = "redsun";
            region_name = `redsun_${redsun_index}_${index}`;
            redsun_index = redsun_index + 1;
        }
        if (timber.indexOf(index) !== -1) {
            owners = "timber";
            region_name = `timber_${timber_index}_${index}`;
            timber_index = timber_index + 1;
        }

        if (heartland.indexOf(index) !== -1) {
            owners = "heartland";
            region_name = `heartland_${heartland_index}_${index}`;
            heartland_index = heartland_index + 1;
        }
        // havoc
        if (index === 1918) {
            owners = "havoc";
            region_name = `havoc_${index}`;
        }

        if (region_name !== "wild") {
            warps.push(warpObject(hex, region_name));
        }
    });

    return warps;
}




// convert given object into yaml string using 2 space indentation
function makeYaml(object) {
    yamlString = YAML.stringify(object, 2);
    return yamlString;
}


// write given yamlString to file at filename location
function writeYaml(fileName, yamlString) {
    fs.writeFile(fileName, yamlString, function(err) {
        if (err) {
            return console.log(err);
        }
        
        console.log("regions.yml created and saved.");
    });
}

// write given array of warps to warps.csv file
function makeCSV(warpCollect) {
    const createCsvWriter = require("csv-writer").createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: "warps.csv",
        header: [ "name", "world", "uuid", "x", "y", "z", "yaw", "pitch" ]
    });
    
    csvWriter.writeRecords(warpCollect).then(() => {
        console.log("...Done");
    });
}


//  given constructed regions object
//  return yaml representation as string
const regionsYaml = makeYaml(regionCollect);


//  write regions file
writeYaml('regions.yml', regionsYaml);


// write warp file
makeCSV(warpCollect);


// print final success message
console.log('Hex Calc Completed.');
