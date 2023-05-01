<template>
  <div id="app">
    <input type="button" value="+" @click="changeclick"> 
    <input type="text" v-model="inputID" placeholder="Enter ID" ref="input">
    <input type="button" value="submit" @click="idsubmit">
    <span>{{ counter }}</span>
  </div>

  <div>
    <button @click="addDigit(1)"> 1 </button>
    <button @click="addDigit(2)"> 2 </button>
    <button @click="addDigit(3)"> 3 </button>
    <button @click="addDigit(4)"> 4 </button>
    <button @click="addDigit(5)"> 5 </button>
    <button @click="addDigit(6)"> 6 </button>
    <button @click="addDigit(7)"> 7 </button>
    <button @click="addDigit(8)"> 8 </button>
    <button @click="addDigit(9)"> 9 </button>
    <button @click="addDigit(0)"> 0 </button>
    <button @click="clearInput"> del </button>
    <button @click="clearAllInput"> del all </button>
  </div>

  <div>
    <h3> Items: </h3>
    <div v-for = "item in showdata" :key="showdata.id" class="item">
      <p>ID: {{ item.id }}</p>
      <p>Category: {{ item.Category }}</p>
      <p>Location: {{ item.Location }}</p>
      <p>Manufacturer: {{ item.Manufacturer }}</p>
      <p>Status: {{ item.Status }}</p>
      <p>Model: {{ item.Model }}</p>
      <p>Age: {{ itemAge(item.age) }}</p>
    </div>
  </div>

</template>

<script>

import JSONdata from "./inventory-details.json"
  export default{
    data(){
      return{
        counter:0,
        showdata:"",
        inputID:"",
      }
    },

    methods:{
      idsubmit(){
        if (this.inputID === "") {
           alert('Please enter the ID.')
        } else {
          this.showdata = JSONdata.data.filter(item => item.id.toUpperCase().includes(this.inputID));
        }
      },

      addDigit(digit){
        this.$refs.input.focus();
        this.inputID += digit;
      },

      clearInput() {
        this.$refs.input.focus();
        this.inputID = this.inputID.slice(0, -1);
      },

      clearAllInput() {
        this.$refs.input.focus();
        this.inputID = '';
      }

      // showdatafront(){
      //   this.showdata = JSONdata.data.filter(item => item.id.toUpperCase().includes("UNG137"));
      // }
    },
      // test

    computed:{
      itemAge(){
        return (age) => {
          if (age >= 12) {
            const years = Math.floor(age / 12)
            const months = age % 12
            if (months !== 0){
              return `${years}y${months}m`
            }else{
              return `${years}y`}
          }else {
            return `${age}m ${age > 1 ? 's': ''}`
          }
        }
      }

    }
  }
  
</script>

<style>
.item{
  background-color: rgba(242, 242, 242, 0.7);
  padding: 5px;
  margin-bottom: 10px;
}
</style>