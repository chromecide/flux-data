var store = require(__dirname+'/store.js');
var model = require(__dirname+'/model.js');
var record = require(__dirname+'/record.js');


module.exports = {
    stores: store,
    store: function(type, params, cbs){
        var self = this;
        self.stores.getAdapter(type, {
            success: function(adapter){
                if(adapter){
                    new adapter(params, cbs);
                }else{
                    if(cbs && cbs.error){
                        cbs.error(new Exception("Adapter "+type+" not Found"));
                    }
                }
            },
            error: function(err){
                if(cbs && cbs.error){
                    cbs.error(err);
                }
            }
        });
    },
    model: model,
    record: record
};