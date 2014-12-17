var registeredAdapters = {};
var registeredStores = {};

module.exports = {
    registerAdapter: function(name, config, cbs){
        registeredAdapters[name] = config;

        if(cbs && cbs.success){
            cbs.success();
        }
    },
    getAdapter: function(name, cbs){
        var adapter = registeredAdapters[name];

        if(adapter){
            if(cbs && cbs.success){
                cbs.success(adapter);
            }
        }else{
            if(cbs && cbs.error){
                cbs.error(new Exception("Adapter Not Found", name));
            }
        }
    },
    registerStore: function(name, type, config, cbs){
        var self = this;

        self.getAdapter(type, {
            success: function(adapter){
                new adapter(config, {
                    success: function(store){
                        registeredStores[name] = store;
                        if(cbs && cbs.success){
                            cbs.success(store);
                        }
                    },
                    error: function(err){
                        if(cbs && cbs.error){
                            cbs.error(err);
                        }
                    }
                });
            },
            error: function(err){
                if(cbs && cbs.error){
                    cbs.error(err);
                }
            }
        })
    }
};