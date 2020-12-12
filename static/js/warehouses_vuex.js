Vue.use(Vuex);
let store = new Vuex.Store({
    state: {
        id: "",
        name: "",
        warehousesarray: []
    },
    actions: {
        add: async function(ctx){
            let result = await Vue.resource("/addwarehouse").save(ctx.state.name);
            ctx.dispatch("loadWarehouses");
        },
        upd: async function(ctx){
            let result = await Vue.resource("/updatewarehouse").save(ctx.state.id + ";" +ctx.state.name);
            ctx.dispatch("loadWarehouses");
        },
        del: async function(ctx){
            let result = await Vue.resource("/deletewarehouse").save(ctx.state.id);
            ctx.dispatch("loadWarehouses");
        },
        loadWarehouses: async function(ctx) {
            ctx.commit("clearWarehousesArray"); 
            let response = await Vue.resource("/getwarehouseslist").get();
            let data = await response.json();
            ctx.commit("fillWarehousesArray", data);
        }
    },
    getters: {
        getWarehouses: function (state){
            return state.warehousesarray;
        }
    },
    mutations: {
        clearWarehousesArray: function (state){
            state.warehousesarray = []
        },
        fillWarehousesArray: function (state, data){
            data.forEach(element => state.warehousesarray.push(element));
        },
        addInit: function (state, name) {
            state.name = name;
        },
        updInit: function (state, data) {
            state.id = data.id;
            state.name = data.name;
        },
        delInit: function(state, id) {
            state.id = id;
        }
    }
});