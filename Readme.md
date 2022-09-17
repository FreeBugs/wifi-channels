# Module for retrieving a list of valid Wifi channels for a country

## Installation

Using npm:
    
    $ npm install wifi-channels
    
To run the tests

    $ node test.js
    
## Description
You can use this module to get a list of Wifi channels that are permitted in a country.
The data is based on the [linux wireless-regdb][1] as of **2022/Aug/12**.

## Usage
```js
const wifiChannels = require('wifi-channels');

console.log(wifiChannels.getDfsRegion('DE'));
// ETSI

console.log(JSON.stringify(wifiChannels.getPermittedChannels('DE', '802.11a')))
// {"channel":"32","lower":"5150","upper":"5170","maxbw":80,"maxantgain":0,"no_outdoor":true,"no_ir":false,"dfs_required":false}
// {"channel":"34","lower":"5150","upper":"5190","maxbw":80,"maxantgain":0,"no_outdoor":true,"no_ir":false,"dfs_required":false}
// {"channel":"36","lower":"5170","upper":"5190","maxbw":80,"maxantgain":0,"no_outdoor":true,"no_ir":false,"dfs_required":false}
// ...
```

### Methods
#### getDfsRegion(ISO)
Retrieves the DFS region for a given ISO-2 code. Returns one of the following strings:
- UNSET
- FCC
- ETSI
- JP

#### getPermittedChannels(ISO, band)
Retrieves a list of permitted channels for the ISO-2 code and band given.
Band can be:
- 802.11b
- 802.11y
- 802.11a

Returns an array of objects including the following properties:

| Member     | Description |
| ---------- | ------------|
| channel | Channel number |
| lower | Lowest frequency in MHz |
| upper | Highest frequency in MHz |
| maxbw | Maximum bandwidth in MHz |
| maxantgain | Maximum antenna gain in db |
| no_outdoor | Not allowed outside buildings (true/false) |
| dfs_required | DFS capabilities required (true/false) |
| no_ir | Do not initiate radiation (true/false) | 

## Updating the database
Updated json files can be generated using the `utils/update.sh` script. 

Python 3 is required and the jsonpickle module has to be available in your venv,
install it with `python3 -m pip install jsonpickle`.

Then run 
```
./update.sh https://mirrors.edge.kernel.org/pub/software/network/wireless-regdb/wireless-regdb-2021.08.28.tar.gz 
```

This will create a temp directory, extract the data and convert it to the json file.

# LICENSE

The MIT License (MIT)

Copyright (c) 2018-2021 Daniel Arnold

[1]: https://wireless.wiki.kernel.org/en/developers/regulatory/wireless-regdb 
