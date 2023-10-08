<template>
  <div class="home">
    <DateInputFrame
        v-bind:inputDate="inputDate"
        @showDateInputFrame="showDateInputFrame"
        @inputFinished="inputFinished"
        style="font-family: Avenir, Helvetica, Arial, sans-serif">
    </DateInputFrame>
    <input type="text" placeholder="Описание дня" v-model="holydayTitle" class="input">
    <button v-on:click="addDate" class="input">Добавить дату</button>
    <Wrapper v-if="showDatePicker" v-bind:left="left" v-bind:top="top">
      <Calendar 
        v-bind:year="date.getFullYear()" 
        v-bind:month="date.getMonth()+1" 
        v-bind:holydays="holydays"
        showChangeDateButtons = true
        @pickDateEvent="pickDateEvent"
        @dateChanged="dateChanged"/>
    </Wrapper>  
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Calendar from '@/components/Calendar.vue'; // @ is an alias to /src
import Wrapper from '@/components/Wrapper.vue'; // @ is an alias to /src
import DateInputFrame from '@/components/DateInputFrame.vue'; // @ is an alias to /src
import { holydays, Holyday } from '@/store/holydays'

@Component({
  components: {
    Calendar,
    HelloWorld,
    Wrapper,
    DateInputFrame
  },
})
export default class HomeView extends Vue {
  public date: Date = new Date()
  public inputDate = ''
  public showDatePicker = false
  public left = 0
  public top = 0
  public holydays = holydays
  public holydayTitle = ''

  created()
  {
    document.addEventListener('keydown', this.hideDatePicker)
  }

  public addDate(): void {
    if (!this.holydayTitle) {
      alert('Заполните описание дня')
      return
    }

    if (!this.inputDate) {
      alert('Заполните дату')
      return
    }

    let dateToAdd = strToDate(this.inputDate)

    if (dateToAdd) {
      const holydayToAdd: Holyday = {
        date: dateToAdd,
        holydayTitle: this.holydayTitle
      }
    
      this.holydays.push(holydayToAdd)
    }
  }

  public pickDateEvent(pickedValue: Date): void {
    this.date = pickedValue
    this.inputDate = pickedValue.toLocaleDateString()
    this.showDatePicker = false
  }
  
  public hideDatePicker(): void {
    this.showDatePicker = false
  }

  public dateChanged(month: number, year: number): void {
    this.date = new Date(year, month-1, 1)
  }
  
  public inputFinished(dateByString: string): void {
    this.inputDate = dateByString
  } 

  public showDateInputFrame(left: number, top: number): void {
    this.showDatePicker = true
    this.left = left
    this.top = top
  }   
}

function strToDate(inputDate: string): Date | undefined {

  const year = Number(inputDate.substring(6, 10))
  const month = Number(inputDate.substring(3, 6))
  const day = Number(inputDate.substring(0, 2))
    
  if (month > 12 || month < 1 || day < 1 || day > 31) {
    alert('Incorrect date input')
    return
  }

  const date = new Date (year, month - 1, day)   
  return date
}
</script>

<style scoped>
.input {
  margin: 5px;
  font-weight: 400;
  line-height: 1.5; 
  color: #212529;
  background-color: #fff;
  border: 1px solid #bdbdbd;
  border-radius: 0.25rem;  
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
