<template>
    <div id="header" style="background-color:lightblue; text-align:center">Inventory Management</div>
    <div id="reader"></div>

    <div class="basecontainer">
      <div class="input-container">
          <input ref="input" class="input" type="tel" v-model="inputID" placeholder="Enter ID" />
      </div>
    </div>

    <div class="basecontainer">
      <div class="container">
          <button @click="addsubmit">search</button>
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
import JSONdata from "./inventory-details.json"

export default (await import('vue')).defineComponent({
  data(){
    return{
      showdata:"",
      inputID:"",
    }
  },

  methods:{
    addsubmit(){
        if (this.inputID === "") {
            alert('Please enter the ID.')
        } else {
            this.showdata = JSONdata.data.filter(item => item.id.toUpperCase().includes(this.inputID));
        }
    }
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
          return `${age}m`
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

</style>