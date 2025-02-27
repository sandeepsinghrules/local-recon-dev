<template>
    <vue-gauge :options="myOptions" />
  </template>
  
  <script>
  import VueGauge from "vue-gauge";
  export default {
    components: { VueGauge },
    props: {
      title: String,
      value: String,
      arc_delimiters: Array,
      arc_labels: Array,
      range_label: Array
    },
    data() {
      return {
        myOptions: {
          chartWidth: 260,
          needleValue: this.value,
          needleColor: "gray",
          arcDelimiters: this.arc_delimiters,
          arcColors: ["#3EBB80", "#FFB443", "#FF0000"],
          arcLabels: this.arc_labels,
          rangeLabel: this.range_label,
          centralLabel: this.title,
  
          rangeLabelFontSize: 14,
        },
      };
    },
    mounted() {
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  