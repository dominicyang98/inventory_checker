<template>
    <div id="header" style="background-color:lightblue; text-align:center">Inventory Management I</div>
    <div id="reader"></div>

    <div class="basecontainer">
      <div class="input-container">
          <input ref="input" class="input" type="tel" v-model="inputID" placeholder="Enter ID" />
      </div>
    </div>

    <div class="basecontainer">
      <div class="container">
          <div class="digit-panel">
              <button class="digit" v-for="digit in digits" :key="digit" @click="addDigit(digit)">{{ digit }}</button>
          </div>
      </div>
    </div>

    <div class="basecontainer">
      <div>
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
    </div>

</template>

<script>
import {Html5QrcodeScanner} from "html5-qrcode";
import JSONdata from "./inventory-details.json"

function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    if (!consoleOutput[message]) {
        // test
        var msg;
        msg = decodedResult;
        consoleOutput[msg] = true;
        console.log(msg)
        //console.log(`Code matched = ${decodedText}`, message);
    }
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
}

export default (await import('vue')).defineComponent({
  data(){
    return{
      showdata:"",
      inputID:"",
      digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'clear', 0, 'clear all', 'submit']
    }
  },

  mounted() {
      if (process.client) {
          let html5QrcodeScanner = new Html5QrcodeScanner(
              "reader",
              {fps: 30, qrbox: {width: 300, height: 100}},
              /* verbose= */ false);
          html5QrcodeScanner.render((decodedText, decodedResult) => {
              this.inputID = decodedText;
              console.log(decodedResult)
          }, onScanFailure);
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
})
  
</script>

<style>
.item{
  background-color: rgba(242, 242, 242, 0.7);
  padding: 5px;
  margin-bottom: 10px;
}

.basecontainer {
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100%;
    margin-top: 10px;

}

.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;

}

.input-container {
    display: flex;
    align-items: center;
    margin-top: 10px;

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