<template>
    <div id="app">
        <!-- <input type="button" value="+" @click="changeclick"> -->
        <!-- <input type="text" v-model="inputID" placeholder="Enter ID" ref="input"> -->
        <!--<span>{{ counter }}</span>-->

    </div>
    <div class="input-container">
        <input ref="input" class="input" type="text" v-model="inputID" placeholder="Enter ID" />
    </div>
    <div class="container">
        <div class="digit-panel">
            <button class="digit" v-for="digit in digits" :key="digit" @click="addDigit(digit)">{{ digit }}</button>
        </div>
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
        digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'clear', 0, 'clear all', 'submit']
      }
    },

    methods:{
      addDigit(digit){
        this.$refs.input.focus();
        if (digit === 'clear') {
            this.inputID = this.inputID.slice(0, -1);
        } else if (digit === 'clear all') {
            this.inputID = '';
        } else if (digit === 'submit'){
            if (this.inputID === "") {
                alert('Please enter the ID.')
            } else {
                this.showdata = JSONdata.data.filter(item => item.id.toUpperCase().includes(this.inputID));
            }
        } else {
            this.inputID += digit.toString();
        }
      },

    },

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

.container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.input-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.input {
    padding: 10px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
}

.digit-panel {
    display: flex;
    flex-wrap: wrap;
}

.digit {
    flex: 1 0 calc(33.33% - 10px);
    margin: 5px;
    text-align: center;
}
</style>