<!--<script>-->
<!--import { AgGridVue } from "ag-grid-vue";-->

<!--export default {-->
<!--  name: 'HomePage',-->
<!--  components: {-->
<!--    AgGridVue,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      -->
<!--      // leaflet-->
<!--      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',-->
<!--      attribution:-->
<!--        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',-->
<!--      zoom: 13,-->
<!--      center: [51.505, -0.159],-->
<!--      markerLatLng: [51.504, -0.159],-->
<!--      -->
<!--      //ag-grid-vue-->
<!--      columnDefs: null,-->
<!--      rowData: null,-->
<!--    };-->
<!--  },-->
<!--  beforeMount() {-->
<!--    this.columnDefs = [-->
<!--      {field: "make", filter: true, checkboxSelection: true},-->
<!--      {field: "model"},-->
<!--      {field: "price"},-->
<!--    ];-->
<!--    -->
<!--    this.rowData = [-->
<!--      {make: "Toyota", model: "Celica", price: 35000},-->
<!--      {make: "Ford", model: "Mondeo", price: 32000},-->
<!--      {make: "Porsche", model: "Boxster", price: 72000},-->
<!--    ];-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <section class="section">-->
<!--    <div class="section__container container">-->
<!--      <div class="section__sidebar sidebar">-->
<!--        <ag-grid-vue-->
<!--          style="width: 100%; height: 100%;"-->
<!--          class="ag-theme-alpine"-->
<!--          :columnDefs="columnDefs"-->
<!--          :rowData="rowData"-->
<!--        >-->
<!--        </ag-grid-vue>-->
<!--      </div>-->
<!--      <div class="section__map map">-->
<!--        <l-map style="height: 100%" :zoom="zoom" :center="center">-->
<!--          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>-->
<!--          <l-marker :lat-lng="markerLatLng"></l-marker>-->
<!--        </l-map>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->
<!--</template>-->

