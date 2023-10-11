  <template>  
    <div class="calendar-month">
      <div class="month-title">
        <button v-if="showChangeDateButtons" v-on:click="changeDate(false, true)">&lt;&lt;</button>
        <button v-if="showChangeDateButtons" v-on:click="changeDate(false, false)">&lt;</button>
        <span class="month-name">{{ getMonthName(month) }} {{ year }}</span>
        <button v-if="showChangeDateButtons" v-on:click="changeDate(true, false)">></button>
        <button v-if="showChangeDateButtons" v-on:click="changeDate(true, true)">>></button>
      </div>
      <div class="month-body">
        <table>       
          <thead>
            <tr>
              <th v-for="(dayTitle, index) in daysTitles" :key="index">{{ dayTitle }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, i) in calendarMonth" :key="i">
              <td v-for="(day, j) in calendarMonth[i]" :key="j">
                <div v-if="calendarMonth[i][j].dayNumber > 0">
                  <div class="calendarDay" 
                    v-on:click="$emit('pickDateEvent', calendarMonth[i][j].date)"
                    v-on:mouseover="changeTooltipVisibility(calendarMonth[i][j].holydayTitle !== '')"
                    v-on:mouseleave="changeTooltipVisibility(false)"
                    v-bind:class="{ holydayStyle: calendarMonth[i][j].holydayTitle !== '' }">
                      {{ calendarMonth[i][j].dayNumber }}
                      <div class="tooltipText" v-bind:style = "{display: getTooltipStyle(calendarMonth[i][j].holydayTitle)}"
                        v-if="calendarMonth[i][j].holydayTitle !== '' && showTooltip">                    
                        {{calendarMonth[i][j].holydayTitle}}
                      </div>                      
                  </div>
                </div>
              </td>  
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Holyday } from '@/store/holydays'
  
  type CalendarDay = {
    date: Date,
    dayNumber: number,
    holydayTitle: string
  }

  @Component
  export default class Calendar extends Vue {
    @Prop() public month!: number;
    @Prop() public year!: number;
    @Prop() public holydays!: Holyday[]
    @Prop() public showChangeDateButtons!: boolean
    
    public date = new Date();  
    public calendarMonth: CalendarDay[][] = this.getCalendarMonth(this.inputYear(), this.inputMonth())
    public daysTitles: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Bc']
    public showTooltip = false
    
    public tooltipStyle = 'none'    

    public getTooltipStyle(tooltip: string): string {
      if (tooltip !== '') {
       return 'block'
      }

      return 'none'
    }
   
    public changeTooltipVisibility(setVisible: boolean): void {
      this.showTooltip = setVisible
    }

    public inputMonth(): number {
      return this.month
    }

    public inputYear(): number {
      return this.year
    }

    public getMonthName(month: number): string {
      const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
      return monthNames[month - 1]
    }

    public changeDate(increase: boolean, changeYear: boolean): void {    
      let changedYear = this.year
      let changedMonth = this.month
      
      if (increase) {
        if (changeYear) {
          changedYear = this.year + 1
        }
        else {
          changedMonth = this.month + 1
        }        
      }
      else {
        if (changeYear) {
          changedYear = this.year - 1
        }
        else {
          changedMonth = this.month - 1
        }        
      }

      if (changedMonth === 13) {
        changedMonth = 1
        changedYear = this.year + 1
      }
      
      if (changedMonth === 0) {
        changedMonth = 12
        changedYear = this.year - 1
      }

      this.$emit('dateChanged', changedMonth, changedYear)
      this.calendarMonth = this.getCalendarMonth(changedYear, changedMonth)
    }

    public getCalendarMonth(year: number, month: number): CalendarDay[][] {

      let week: CalendarDay[] = []
      const wholeMonth: CalendarDay[][] = []
      let lastDay = 30

      if (month == 1 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        lastDay = 31
      }

      if (month == 2) {
        if (year % 4 == 0 && year % 100 != 0) {
          lastDay = 29       
        }
        else {
         lastDay = 28  
        }
      }

      month--

      // shifting with zero days
      const date = new Date(year, month, 1)
      let weekDay = date.getDay()
      if (weekDay === 0) {
        weekDay = 7
      }

      for (let i=1; i<weekDay; i++) {
        const dateToAdd: CalendarDay = {
          date: date,
          dayNumber: 0,
          holydayTitle: ''
        }
        week.push(dateToAdd)
      }
      
      for (let i=1; i<=lastDay; i++) {
        const date = new Date (year, month, i)
        const dateToAdd: CalendarDay = {
          date: date,
          dayNumber: i,
          holydayTitle: getHolydayTitle(date, this.holydays)
        }

        week.push(dateToAdd)

        if (date.getDay() === 0 || i === lastDay) {
          wholeMonth.push(week)
          week = []
        }
      }

      return wholeMonth
    }
  }

  function getHolydayTitle(date: Date, holydays: Holyday[]): string {
    
    for (let i=0; i<=holydays.length - 1; i++) {
      if (holydays[i].date.getTime() === date.getTime()) {
        return holydays[i].holydayTitle
      }
    }
    
    return ''
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .calendar-month {
    border: 1px solid #bdbdbd;
    border-radius: 0.25rem;  
  }
  .month-body{
    display: flex;
    flex-wrap: wrap;
    width: 14rem;
    margin: 1rem;
    align-items: top;
    height: 14rem;
    .calendarDay{
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      &:hover{
        background-color:rgb(199, 184, 161);
      }
    }
  }
  .month-title{
    width: 17rem;
    margin: 0.5rem;
    font-family: Avenir, Helvetica, Arial, sans-serif;  
  }
  .month-name{
    margin: 0.5rem;
    display: inline-block;
    width: 120px;  
  }
  .holydayStyle{
    color: red;
  }
  .tooltipText {
    font-family: "PT Sans", sans-serif; 
    background-color: #333333; 
    color: #FFFFFF;
    font-size: 16px; 
    line-height: 20px; 
    font-weight: 400; 
    text-transform: none;
    padding: 20px 18px 18px 20px;
    border-radius: 10px; 
    width: 256px;
    position: absolute;  
    z-index: 1;
    top: 35px;
    left: 150px;
    transform: translateX(-50%);
    display: block;
  }
</style>
  