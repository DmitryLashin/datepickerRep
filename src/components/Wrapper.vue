<template>
  <div class="wrapper" ref="wrapperFrame" v-on:click="windowClicked">
    <div class="frame" v-bind:style="{left: left + 'px',  top: top + 'px'}">
      <slot></slot>
    </div>
    </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {     
    },
})

export default class Wrapper extends Vue {
    @Prop() public left!: number;
    @Prop() public top!: number;  

    public windowClicked(e: MouseEvent): void {
        if (this.$refs.wrapperFrame == e.target) {
            this.$emit('hideDatePicker')
        }
    }       
}

</script>

<style scoped>
.wrapper{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;  
    .frame{
        position: fixed;
    }
}
</style>
  