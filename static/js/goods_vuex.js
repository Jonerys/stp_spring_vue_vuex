Vue.use(Vuex);
let store = new Vuex.Store({
    state: {
        id: "",
        name: "",
        goodsarray: []
    },
    actions: {
        add: async function(ctx){
            let result = await Vue.resource("/addgood").save(ctx.state.name);
            ctx.dispatch("loadGoods");
        },
        upd: async function(ctx){
            let result = await Vue.resource("/updategood").save(ctx.state.id + ";" +ctx.state.name);
            ctx.dispatch("loadGoods");
        },
        del: async function(ctx){
            let result = await Vue.resource("/deletegood").save(ctx.state.id);
            ctx.dispatch("loadGoods");
        },
        loadGoods: async function(ctx) {
            ctx.commit("clearGoodsArray"); 
            let response = await Vue.resource("/getgoodslist").get();
            let data = await response.json();
            ctx.commit("fillGoodsArray", data);
        }
    },
    getters: {
        getGoods: function (state){
            return state.goodsarray;
        }
    },
    mutations: {
        clearGoodsArray: function (state){
            state.goodsarray = []
        },
        fillGoodsArray: function (state, data){
            data.forEach(element => state.goodsarray.push(element));
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