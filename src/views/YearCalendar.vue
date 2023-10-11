<template>
  <div class="table">
    <h1>{{ year }}</h1>
    <table class="tableFormat">       
      <thead>
        <tr>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in months" :key="i" class="tr">
          <td v-for="(col, j) in months[i]" :key="j" style="vertical-align: top">
            <Calendar 
              v-bind:year="year" 
              v-bind:month="months[i][j]" 
              v-bind:holydays="holydays"/> 
          </td>
        </tr>
      </tbody>
    </table>           
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Calendar from '@/components/Calendar.vue'; // @ is an alias to /src
import { Holyday } from '@/store/holydays'

@Component({
  components: {
    Calendar,
  },
})

export default class FullCalendar extends Vue {
  public holydays = this.getCurrentHolydays()
  public months: number[][] = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];
  public year: number = new Date().getFullYear()

  public getCurrentHolydays(): Holyday[] {
    return this.$store.getters.getCurrentHolydays;
  }
}
</script>

<style scoped>
.table{
  top:0px;
  left: 0px;
  display:inline-block;
  flex-wrap:wrap;  
  align-items: baseline;
  table-layout: fixed;
}
.tableFormatOld{
  border: 1px dotted gray;
}
.tr{
  &:nth-child(even) { background-color: #EAF2D3; }
}
</style>