var record = require(__dirname+'/record.js');

var model = function(cfg, cbs){
    this.config = cfg;

    if(cbs && cbs.success){
        cbs.success(this);
    }

    return this;
};

    /*
        Build a record based on this model
     */
    model.prototype.build = function(obj, cbs){
        var newRecord = new record(this);

        for(var key in obj){
            newRecord.set(key, obj[key]);
        }

        if(cbs && cbs.success){
            cbs.success(newRecord);
        }
    };

    model.prototype.save = function(recordData, cbs){
        this.store.save([recordData], cbs);
    };

    model.prototype.destroy = function(recordData, cbs){
        this.store.destroy([recordData], cbs);
    };

    model.prototype.find = function(queryData, cbs){
        this.store.read(this, queryData, cbs);
    };

module.exports = model;