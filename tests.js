const assert = require('assert');
const wifiChannels = require('./wifiChannels');

// Should not be undefined
assert.notEqual(wifiChannels, undefined);

// Should return region
const dfsRegionDE = wifiChannels.getDfsRegion('DE');
assert.strictEqual(dfsRegionDE, "ETSI");

// Should throw error
try
{
    wifiChannels.getDfsRegion('XX');
} catch(err) {
    assert(err instanceof Error);
}

// Should return 6 elements for DE
const permRegionDE = wifiChannels.getPermissions('DE');
assert.strictEqual(permRegionDE.length, 6);

// Is valid band
assert(wifiChannels.isValidBand('802.11a'));

// Is not valid band
assert(!wifiChannels.isValidBand('xyz'));

// Retrieve non-empty list of permitted channels (13 channels for 802.11b in DE)
assert(wifiChannels.getPermittedChannels('DE', '802.11b').length === 13);

// Retrieve non-empty list of permitted channels (13 channels for 802.11a in DE)
assert(wifiChannels.getPermittedChannels('DE', '802.11a').length === 47);
wifiChannels.getPermittedChannels('DE', '802.11a').forEach((chan) => console.log(JSON.stringify(chan)));