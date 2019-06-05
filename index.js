YAML = require("yamljs");
const fs = require("fs");

const snowbound = [
    1019,
    1020,
    1021,
    1044,
    1046,
    1069,
    162,
    187,
    188,
    189,
    191,
    213,
    215,
    217,
    218,
    239,
    240,
    243,
    266,
    267,
    269,
    270,
    291,
    292,
    294,
    295,
    296,
    297,
    298,
    314,
    318,
    319,
    320,
    321,
    322,
    323,
    324,
    340,
    342,
    343,
    344,
    346,
    347,
    348,
    349,
    350,
    366,
    367,
    369,
    370,
    372,
    373,
    374,
    375,
    376,
    379,
    393,
    395,
    396,
    397,
    398,
    400,
    404,
    405,
    419,
    421,
    422,
    423,
    424,
    427,
    431,
    433,
    445,
    446,
    447,
    448,
    449,
    451,
    452,
    453,
    456,
    458,
    459,
    471,
    472,
    473,
    474,
    475,
    476,
    477,
    478,
    479,
    480,
    483,
    484,
    485,
    498,
    499,
    500,
    501,
    502,
    503,
    504,
    506,
    508,
    510,
    511,
    523,
    524,
    525,
    526,
    527,
    528,
    529,
    530,
    532,
    536,
    537,
    538,
    548,
    549,
    550,
    551,
    552,
    553,
    554,
    556,
    557,
    558,
    562,
    563,
    575,
    576,
    577,
    578,
    579,
    580,
    584,
    588,
    589,
    590,
    601,
    602,
    603,
    604,
    606,
    608,
    609,
    610,
    611,
    614,
    615,
    628,
    629,
    630,
    632,
    633,
    636,
    637,
    638,
    654,
    655,
    656,
    660,
    661,
    662,
    663,
    681,
    682,
    683,
    687,
    688,
    689,
    705,
    706,
    707,
    708,
    709,
    714,
    715,
    731,
    732,
    733,
    734,
    735,
    736,
    741,
    756,
    757,
    758,
    759,
    760,
    761,
    783,
    784,
    785,
    786,
    787,
    809,
    810,
    811,
    812,
    813,
    836,
    838,
    839,
    840,
    841,
    842,
    862,
    863,
    864,
    865,
    866,
    867,
    888,
    889,
    890,
    891,
    892,
    893,
    914,
    915,
    916,
    917,
    918,
    940,
    941,
    942,
    943,
    944,
    945,
    965,
    966,
    967,
    968,
    969,
    970,
    971,
    992,
    994,
    995,
    996,
    997

];
const timber = [
    1254,
    1280,
    1306,
    1332,
    1359,
    1360,
    1385,
    1386,
    1410,
    1411,
    1412,
    1413,
    1436,
    1437,
    1438,
    1463,
    1464,
    1486,
    1488,
    1489,
    1490,
    1512,
    1515,
    1516,
    1538,
    1541,
    1564,
    1568,
    1590,
    1593,
    1594,
    1597,
    1616,
    1617,
    1623,
    1624,
    1641,
    1642,
    1643,
    1646,
    1648,
    1650,
    1652,
    1667,
    1669,
    1671,
    1673,
    1677,
    1678,
    1692,
    1693,
    1694,
    1695,
    1697,
    1700,
    1702,
    1703,
    1719,
    1720,
    1721,
    1723,
    1725,
    1727,
    1744,
    1745,
    1746,
    1748,
    1749,
    1751,
    1752,
    1753,
    1771,
    1772,
    1775,
    1777,
    1778,
    1779,
    1780,
    1796,
    1797,
    1798,
    1800,
    1802,
    1803,
    1804,
    1805,
    1823,
    1825,
    1826,
    1827,
    1829,
    1830,
    1831,
    1832,
    1848,
    1849,
    1850,
    1851,
    1852,
    1854,
    1855,
    1856,
    1858,
    1874,
    1875,
    1877,
    1878,
    1879,
    1880,
    1881,
    1882,
    1884,
    1900,
    1901,
    1902,
    1903,
    1904,
    1905,
    1906,
    1907,
    1908,
    1910,
    1929,
    1930,
    1931,
    1932,
    1933,
    1934,
    1935,
    1954,
    1955,
    1956,
    1957,
    1958,
    1959,
    1960,
    1961,
    1962,
    1981,
    1982,
    1983,
    1984,
    1985,
    1987,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2013,
    2033,
    2034,
    2035,
    2036,
    2037,
    2040,
    2057,
    2058,
    2059,
    2060,
    2062,
    2065,
    2084,
    2086,
    2089,
    2090,
    2109,
    2110,
    2111,
    2112,
    2113,
    2114,
    2115,
    2135,
    2136,
    2137,
    2138,
    2139,
    2140,
    2141,
    2142,
    2161,
    2162,
    2163,
    2164,
    2165,
    2166,
    2167,
    2187,
    2188,
    2189,
    2190,
    2192,
    2194,
    2195,
    2213,
    2214,
    2215,
    2216,
    2218,
    2219,
    2220,
    2221,
    2240,
    2241,
    2242,
    2244,
    2246,
    2247,
    2248,
    2266,
    2269,
    2270,
    2272,
    2273,
    2294,
    2296,
    2319,
    2321,
    2348

];
const redsun = [ 
  
    1004,
    1007,
    1008,
    1009,
    1030,
    1032,
    1033,
    1034,
    1035,
    1056,
    1059,
    1061,
    1062,
    1084,
    1086,
    1087,
    1088,
    1108,
    1109,
    1110,
    1111,
    1112,
    1113,
    1114,
    1134,
    1135,
    1137,
    1138,
    1139,
    1160,
    1161,
    1163,
    1164,
    1165,
    1187,
    1188,
    1189,
    1190,
    1191,
    1213,
    1214,
    1215,
    1216,
    1239,
    1240,
    1241,
    1242,
    1265,
    1266,
    1267,
    1268,
    1269,
    1291,
    1292, 
    1293,
    1294,
    1295,
    1318,
    1319,
    1320,
    1321,
    1343,
    1344,
    1345,
    1346,
    1348,
    1350,
    1351,
    1370,
    1371,
    1372,
    1376,
    1377,
    1395,
    1396,
    1397,
    1398,
    1400,
    1402,
    1421,
    1422,
    1424,
    1425,
    1426,
    1427,
    1428,
    1429,
    1447,
    1448,
    1449,
    1450,
    1451,
    1452,
    1453,
    1454,
    1473,
    1474,
    1476,
    1477,
    1478,
    1480,
    1481,
    1499,
    1500,
    1501,
    1502,
    1503,
    1504,
    1505,
    1506,
    1527,
    1528,
    1529,
    1530,
    1531,
    1532,
    1551,
    1552,
    1553,
    1554,
    1555,
    1556,
    1557,
    1558,
    1580,
    1581,
    1582,
    1583,
    1584,
    1603,
    1605,
    1606,
    1607,
    1608,
    1632,
    1633,
    1634,
    1658,
    1659,
    1660,
    1684,
    1685,
    1686,
    1709,
    1710,
    1711,
    1712,
    1736,
    1738,
    1739,
    1762,
    1764,
    1791,
    1816,
    1919,
    1946,
    1998,
    2075,
    2101,
    646,
    671,
    672,
    697,
    723,
    724,
    749,
    750,
    774,
    775,
    801,
    802,
    826,
    827,
    828,
    853,
    874,
    878,
    879,
    900,
    904,
    905,
    926,
    928,
    930,
    931,
    952,
    953,
    955,
    956,
    957,
    978,
    980,
    981,
    982

];
const heartland = [
    1000,
    1002,
    1022,
    1023,
    1024,
    1025,
    1028,
    1029,
    1048,
    1049,
    1050,
    1052,
    1054,
    1055,
    1075,
    1076,
    1077,
    1079,
    1080,
    1081,
    1100,
    1102,
    1103,
    1104,
    1106,
    1107,
    1125,
    1127,
    1128,
    1129,
    1130,
    1131,
    1132,
    1133,
    1152,
    1153,
    1156,
    1157,
    1158,
    1159,
    1177,
    1178,
    1179,
    1181,
    1182,
    1183,
    1184,
    1185,
    1186,
    1204,
    1205,
    1206,
    1208,
    1209,
    1210,
    1211,
    1212,
    1230,
    1231,
    1232,
    1233,
    1234,
    1235,
    1236,
    1237,
    1238,
    1256,
    1257,
    1258,
    1259,
    1260,
    1261,
    1262,
    1263,
    1264,
    1283,
    1284,
    1285,
    1286,
    1287,
    1288,
    1289,
    1290,
    1310,
    1311,
    1312,
    1313,
    1315,
    1316,
    1317,
    1335,
    1336,
    1337,
    1338,
    1339,
    1340,
    1341,
    1342,
    1362,
    1363,
    1364,
    1366,
    1367,
    1368,
    1369,
    1387,
    1388,
    1389,
    1390,
    1391,
    1392,
    1393,
    1394,
    1414,
    1415,
    1416,
    1417,
    1418,
    1419,
    1420,
    1439,
    1440,
    1441,
    1442,
    1443,
    1444,
    1445,
    1446,
    1465,
    1466,
    1467,
    1469,
    1470,
    1471,
    1472,
    1491,
    1492,
    1493,
    1494,
    1495,
    1497,
    1498,
    1517,
    1518,
    1519,
    1520,
    1521,
    1522,
    1523,
    1524,
    1525,
    1543,
    1545,
    1546,
    1547,
    1549,
    1550,
    1569,
    1570,
    1571,
    1572,
    1573,
    1574,
    1576,
    1577,
    1595,
    1596,
    1598,
    1599,
    1601,
    1602,
    1621,
    1622,
    1625,
    1626,
    1628,
    1629,
    1647,
    1651,
    1654,
    1655,
    1674,
    1680,
    1681,
    1682,
    1699,
    1706,
    1707,
    1726,
    1732,
    1733,
    1734,
    1758,
    1759,
    1760,
    1784,
    1785,
    1786,
    1809,
    1812,
    1838,
    1890,
    843,
    868,
    872,
    894,
    896,
    899,
    919,
    920,
    921,
    924,
    946,
    947,
    948,
    972,
    973,
    976,
    998,
    999

];
const havoc = [
    1918
];

const edge_length = 74; // a
const edge_length_hack = 76; // a
// d = 2 * a
const long_diagonal = 2 * edge_length;
// d2 = √3 * a
const short_diagonal = Math.sqrt(3) * edge_length;
// const short_diagonal = 133.36791218280354;
// offset = √( 4 * a² - c² ) / 4
const tri_short = long_diagonal / 3;
const tri_long = edge_length;

const offset = 0.25 * Math.sqrt(4 * Math.pow(tri_long, 2) - Math.pow(tri_short, 2));

const hexM = hexMatrix([ 73, 52 ], 26, 92);
const warpCollect = warpCollection(hexM);
const regionCollect = regionCollection(hexM);
const myYaml = makeYaml(regionCollect);

fs.writeFile("regions.yml", myYaml, function(err) {
    if (err) {
        return console.log(err);
    }

    console.log("regions.yml created and saved.");
}); 

function hexPoints(x, y) {
    const a = [ x, y ];
    const b = [ x + short_diagonal / 2, y - offset ];
    const c = [ x + short_diagonal, y ];
    const d = [ x + short_diagonal, y + edge_length_hack ];
    const e = [ x + short_diagonal / 2, y + edge_length_hack + offset ];
    const f = [ x, y + edge_length_hack ];

    return [ a, b, c, d, e, f ];
}

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

function hexColumn(hexPoint, rowSize) {
    let row = [];

    let a = hexPoint;

    for (let count = 0; count < rowSize; count++) {
        let newY = a[1] + (offset + offset + edge_length_hack + edge_length_hack) * count;
        const hex = hexPoints(a[0], newY);

        row.push(hex);
    }

    return row;
}

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

function makeYaml(regionCollection) {
    yamlString = YAML.stringify(regionCollection, 2);

    return yamlString;
}

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

makeCSV(warpCollect);
