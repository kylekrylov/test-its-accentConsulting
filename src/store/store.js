import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        rowData: {},
        rowDataRouter: [],
        columnDefsRouter: [
            { headerName: "Имя", field: "name", sortable: true, filter: true  },
            { headerName: "Кол-во остановок", field: "stopCount", sortable: true, filter: true },
        ],
        rowDataStops: [],
        columnDefsStops: [
            { headerName: "Имя", field: "name", sortable: true, filter: true },
            { headerName: "Кол-во маршрутов", field: "routeCount", sortable: true, filter: true },
            { headerName: "Направление", field: "direction", sortable: true, filter: true },
        ],
    },
    mutations: {
        SET_ROW_DATA_ROUTER(state, data) {
            state.rowDataRouter = data;
        },
        SET_ROW_DATA_STOPS(state, data) {
            state.rowDataStops = data;
        },
        SET_ROW_DATA(state, data) {
            state.rowData = data;
        },
    },
    actions: {
        async fetchRowDataRouter({ commit }) {
            try {
                const response = await axios.get('https://220.transflow.ru/api/public/v1/routes_data?key=012345678abc');

                const rowDataRouter = response.data.map(item => ({
                    name: item.Name,
                    stopCount: item.Stops.length,
                }));

                const rowDataStops = [];
                response.data.forEach(route => {
                    route.Stops.forEach(stop => {
                        const existingStop = rowDataStops.find(s => s.name === stop.Name && s.direction === (stop.Forward ? 'прямое' : 'обратное'));

                        rowDataStops.push({
                            name: stop.Name,
                            routeCount: (existingStop && existingStop.routeCount) || 1,
                            direction: stop.Forward ? 'прямое' : 'обратное',
                        });

                    });
                });
                 const rowData = response.data

                commit('SET_ROW_DATA_ROUTER', rowDataRouter);
                commit('SET_ROW_DATA_STOPS', rowDataStops);
                commit('SET_ROW_DATA', rowData);

                // console.log(rowData)
            } catch (error) {
                console.error(error);
            }
        },
    },
});
