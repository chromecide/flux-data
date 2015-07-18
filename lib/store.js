var registeredAdapters = {};
var registeredStores = {};

module.exports = {
    registerAdapter: function(name, config, cbs){
        registeredAdapters[name] = config;



        if(cbs){
            cbs(false);
        }
    },
    getAdapter: function(name, cbs){
        var adapter = registeredAdapters[name];

        if(adapter){
            if(cbs){
                cbs(false, adapter);
            }
        }else{
            if(cbs){
                cbs(new Exception("Adapter Not Found", name));
            }
        }
    },
    registerStore: function(name, type, config, cbs){
        var self = this;

        self.getAdapter(type, function(err, adapter){
            if(!err){
                if(adapter){
                    new adapter(config, function(err, store){
                        if(!err){
                            registeredStores[name] = store;
                            if(cbs){
                                cbs(false, store);
                            }
                        }else{
                            if(cbs){
                                cbs(err);
                            }
                        }
                    });
                }else{
                    if(cbs){
                        cbs(new Error("Error loading Data Adapter"));
                    }
                }
            }else{
                if(cbs){
                    cbs(err);
                }
            }
        });
    }
};