class WifiChannels {
    constructor() {
        this.self = this;
        this.regdb = require('./regdb.json');
        this.channels = require('./channels.json');
        this.dfs_regs = {
            0: "UNSET",
            1: "FCC",
            2: "ETSI",
            3: "JP"
        };
    }

    getAllIso2Codes() {
        return Object.keys(this.regdb);
    }

    getDfsRegion(iso2Code) {
        let rec = this.regdb[iso2Code];
        if (rec === undefined) throw new Error("No record for " + iso2Code + ".");
        return this.dfs_regs[rec.dfs_region];
    }

    getPermissions(iso2Code) {
        let rec = this.regdb[iso2Code];
        if (rec === undefined) throw new Error('No record for ' + iso2Code + '.');
        return this.regdb[iso2Code]._permissions;
    }

    isValidBand(band) {
        return Object.keys(this.channels).find((b) => b === band.toLowerCase());
    }

    getPermittedChannels(iso2Code, band) {
        if (!this.isValidBand(band)) throw new Error('Invalid band \'' + band + '\'.');
        let permissions = this.getPermissions(iso2Code);
        let resultChannels = [];
        Object.keys(this.channels[band.toLowerCase()]).forEach((key) => {
            const chan = this.channels[band.toLowerCase()][key];
            permissions.forEach((perm) => {
                if ((perm.freqband.start <= chan.lower) && (perm.freqband.end >= chan.upper))
                    resultChannels.push({
                        channel: key,
                        lower: chan.lower,
                        upper: chan.upper,
                        maxbw: perm.freqband.maxbw,
                        maxantgain: perm.power.max_ant_gain,
                        no_outdoor: ((perm.textflags !== undefined) && (perm.textflags.includes("NO-OUTDOOR"))),
                        no_ir: ((perm.textflags !== undefined) && (perm.textflags.includes("NO-IR"))),
                        dfs_required: ((perm.textflags !== undefined) && (perm.textflags.includes("DFS")))
                    });
            })
        });
        return resultChannels;
    }

}

module.exports = new (WifiChannels);