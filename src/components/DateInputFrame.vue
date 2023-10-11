<template>
  <span>
    <input 
      type="text" 
      v-model="inputDate" 
      v-on:click="clickEvent" 
      v-on:keydown="inputDateCheck"
      maxlength="10"
      placeholder="дд.мм.гггг"
      class="input">
  </span>
</template>
 
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
 
@Component({
   components: {
   },
})

export default class DateInputFrame extends Vue {
  @Prop() public inputDate!: string

  public clickEvent(e: MouseEvent): void {
    const rect = this.$el.getBoundingClientRect()
    this.$emit('showDateInputFrame', rect.left-50, rect.bottom + 10)
    e.stopPropagation()
  } 

  public inputDateCheck (e: KeyboardEvent): void {

    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault()
    }
    else {
      if ((this.inputDate.length === 2 || this.inputDate.length === 5) && e.key !== 'Backspace') {
        e.preventDefault()
        this.inputDate += '.' + e.key
      }

      if (this.inputDate.length === 9 && e.key !== 'Backspace') {
        this.$emit('inputFinished', this.inputDate + e.key)
      }
    }
  }
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
