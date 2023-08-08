<script>
import { AgGridVue } from "ag-grid-vue";
import { mapState, mapActions } from 'vuex';
import L from "leaflet";

export default {
  name: 'HomePage',
  components: {
    AgGridVue,
  },
  
  data() {
    return {
      // leaflet
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 4.7,
      center: [59.95, 30.25],
      markers: [],
      tooltipContent: "tooltipContent",
      tooltipOptions: {
        permanent: true,
        direction: "top",
      },
      
      stopIconForward: L.divIcon({
        className: 'custom-icon',
        iconSize: [26, 26],
        html: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 17C15.2091 17 17 15.2091 17 13C17 10.7909 15.2091 9 13 9C10.7909 9 9 10.7909 9 13C9 15.2091 10.7909 17 13 17Z" stroke="blue" stroke-width="2" stroke-miterlimit="10"/></svg>`
      }),
      stopIconBackward: L.divIcon({
        className: 'custom-icon',
        iconSize: [26, 26],
        html: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 17C15.2091 17 17 15.2091 17 13C17 10.7909 15.2091 9 13 9C10.7909 9 9 10.7909 9 13C9 15.2091 10.7909 17 13 17Z" stroke="red" stroke-width="2" stroke-miterlimit="10"/></svg>`
      }),
      
      activeButton: 'routes',
      currentColumnDefs: [],
      currentRowData: [],
      mapData: [],
      
      gridOptions: {
        onRowClicked: () => console.log('row clicked'),
      },
    };
  },
  
  
  mounted() {
    this.fetchRowDataRouter()
      .then(() => {
        this.setActiveButton('routes');
        this.setMapDate()
        
        this.mapData.forEach(item => {
            
            let itemPoints = [];
            if (item.Points) {
              for (let i = 0; i < item.Points.length; i++) {
                let point = item.Points[i];
                let itemPoint = {
                  latLng: [
                    point?.Lat,
                    point?.Lon
                  ],
                  icon: this.stopIconForward
                };
                itemPoints.push(itemPoint);
              }
            }
            
            let itemStops = item.Stops.map(stop => ({
              // id: stop.ID,
              latLng: [
                stop?.Lat,
                stop?.Lon
              ],
              icon: stop.Forward ? this.stopIconForward : this.stopIconBackward
            }))
            // console.log(itemStops, itemPoints)
            this.markers.push(...itemStops, ...itemPoints)
          })
      })
  },
  
  computed: {
    ...mapState([
      'rowDataRouter',
      'rowDataStops',
      'columnDefsRouter',
      'columnDefsStops',
      "rowData"
    ]),
  },
  
  methods: {
    ...mapActions(['fetchRowDataRouter']),
    setMapDate() {
      this.mapData = structuredClone(this.rowData)
    },
    setActiveButton(button) {
      this.activeButton = button;
      if (button === 'routes') {
        this.currentColumnDefs = this.columnDefsRouter;
        this.currentRowData = this.rowDataRouter;
      } else if (button === 'stops') {
        this.currentColumnDefs = this.columnDefsStops;
        this.currentRowData = this.rowDataStops;
      }
    },
    
  },
}
</script>

<template>
  <section class="section">
    <div class="section__container container">
      <div class="section__sidebar sidebar">
        <div class="section__buttons">
          <button
            class="section__button"
            :class="{ active: activeButton === 'routes' }"
            @click="setActiveButton('routes')"
          >
            Маршруты
          </button>
          <button
            class="section__button"
            :class="{ active: activeButton === 'stops' }"
            @click="setActiveButton('stops')"
          >
            Остановки
          </button>
        </div>
        <ag-grid-vue
          class="ag-theme-alpine section__grid"
          :columnDefs="currentColumnDefs"
          :rowData="currentRowData"
          :gridOptions="gridOptions"
        />
      </div>
      <div class="section__map map">
        <l-map :zoom="zoom" :center="center">
          <l-tile-layer :url="url"/>
          <l-marker
            v-for="marker in markers"
            :key="marker.id"
            :lat-lng="marker.latLng"
            :icon="marker.icon"
          >
          </l-marker>
        </l-map>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "~ag-grid-community/styles/ag-grid.css";
@import "~ag-grid-community/styles/ag-theme-alpine.css";

.section {
  
  &__container {
    display: flex;
    height: 100%;
    min-height: 300px;
    padding: 0;
  }
  
  &__sidebar {
    flex: 0 0 calc(100% / 3);
    width: calc(100% / 3);
  }
  
  &__map {
    flex: 0 0 calc(100% * 2 / 3);
    width: calc(100% * 2 / 3);
  }
  
  // .section__grid
  &__grid {
    height: calc(100% - 48px);
  }
  
  
  // .section__buttons
  &__buttons {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  
  &__button {
    padding: 5px 10px;
    background-color: #e0e0e0;
    
    border: none;
    cursor: pointer;
    
    &.active {
      box-shadow: 0 0 1px 1px #6d9181;
    }
  }
}
</style>
