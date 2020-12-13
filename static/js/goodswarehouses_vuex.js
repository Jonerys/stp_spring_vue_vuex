Vue.use(Vuex);
let store = new Vuex.Store({
    state: {
        name1: "",
        name2: "",
        curgoodsarray: [],
        goodsarray: []
    },
    actions: {
        add: async function(ctx){
            let result = await Vue.resource("/addgtowh").save(ctx.state.name2);
            ctx.dispatch("loadCurGoods");
        },
        upd: async function(ctx){
            let result = await Vue.resource("/updateginwh").save(ctx.state.name1 + ";" + ctx.state.name2);
            ctx.dispatch("loadCurGoods");
        },
        del: async function(ctx){
            let result = await Vue.resource("/deletegfromwh").save(ctx.state.name1);
            ctx.dispatch("loadCurGoods");
        },
        loadGoods: async function(ctx) {
            let response = await Vue.resource("/getgoodslist").get();
            let data = await response.json();
            ctx.commit("fillGoodsArray", data);
        },
        loadCurGoods: async function(ctx) {
            ctx.commit("clearCurGoodsArray"); 
            let response = await Vue.resource("/getdata").get();
            let data = await response.json();
            ctx.commit("fillCurGoodsArray", data);
        }
    },
    getters: {
        getСurGoods: function (state){
            return state.curgoodsarray;
        },
        getGoods: function (state){
            return state.goodsarray;
        }
    },
    mutations: {
        clearCurGoodsArray: function (state){
            state.curgoodsarray = [];
        },
        fillCurGoodsArray: function (state, data){
            data.goods.forEach(element => state.curgoodsarray.push(element));
        },
        fillGoodsArray: function (state, data){
            data.forEach(element => state.goodsarray.push(element));
        },
        addInit: function (state, name) {
            state.name2 = name;
        },
        updInit: function (state, data) {
            state.name1 = data.nameOld;
            state.name2 = data.nameNew;
        },
        delInit: function(state, name) {
            state.name1 = name;
        }
    }
});    