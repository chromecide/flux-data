var store = require(__dirname+'/store.js');
var model = require(__dirname+'/model.js');
var record = require(__dirname+'/record.js');


module.exports = {
    stores: store,
    store: function(type, params, cbs){
        var self = this;
        self.stores.getAdapter(type, function(err, adapter){
            if(!err){
                if(adapter){
                    new adapter(params, cbs);
                }else{
                    if(cbs){
                        cbs(new Exception("Adapter "+type+" not Found"));
                    }
                }
            }else{
                if(cbs){
                    cbs(err);
                }
            }
        });
    },
    model: model,
    record: record
};