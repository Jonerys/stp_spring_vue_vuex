import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
            id: "",
            name: "",
            goodsarray: []
        },
        actions: {
            add: async function(ctx){
                let result = await addurl.save(ctx.state.name);
                ctx.dispatch("getGoods");
            },
            upd: async function(ctx){
                let result = await updateurl.save(ctx.state.id + ";" +ctx.state.name);
                ctx.dispatch("getGoods");
            },
            del: async function(ctx){
                let result = await deleteurl.save(ctx.state.id);
                ctx.dispatch("getGoods");
            },
            getGoods: async function(ctx) {
                
                ctx.commit("nullifyGoodsArray"); 
                let response = await gurl.get();
                let data = await response.json();
                console.log(data);
                ctx.commit("fillGoodsArray", data);
            }
        },
        getters: {
            getGoodsForTable: function (state){
                return state.goodsarray;
            }
        },
        mutations: {
            nullifyGoodsArray: function (state){
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
    }
})