import React, { Component } from 'react';
//import itm from './lister.js';
import { Table , Radio,Button } from 'element-react';
import 'element-theme-default'
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {}
    this.state.columns =[
      {
        label:'#',
        prop:'index',
        width:60   //these are the columns for the table you can check elemen react documentation for further undrestanding
      },{
        label:'Camper',
        prop: 'username',
        width:'30%'
      },{
        label:'recent points',
        prop:'recent',
        width:'40%'
      },{
        label:'all time points',
        prop:'alltime'
      }
    ]
    this.state.radio = {
      r1: 'Recent',
      r2:'All time'
    }
this.state.r1= 'Recent'


  }

  render() {
    return (
      <div className="app">
      <Radio.Group className="switch" value={this.state.r1} onChange={this.onChange.bind(this,'r1')} >
     <Radio.Button value="Recent"  />
     <Radio.Button value="All time"  />
     </Radio.Group>

       <Table
      style={{width: '100%',maxWidth:'900px',margin:'0 auto'}}
      rowClassName={this.rowClassName.bind(this)} //this is the table for the list

      columns={this.state.columns}
      data={this.state.data}

   />
   <p className="foo">developed by <a href='https://naderjs.github.io/'>Nader Atef</a></p>
      </div>
    );
  }
  rowClassName(row, index) {
  if (index % 2 === 0) {
    return 'info-row camper';
  } else  {
    return 'positive-row camper';
  }

  return '';
}
onChange(key, value) {
  let self= this
  this.setState({
    [key]: value
  });
  if(self.state.r1 == 'All time'){
    self.state.data = self.state.recentCampers
  }else{
    self.state.data = self.state.allTime
  }
}
  componentDidMount(){
    var self = this
    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    .then(resp => {
      self.setState({recentCampers: resp.data})
        self.setState({data: resp.data})
      for(let ke in self.state.data){
        self.state.data[ke].index = parseInt(ke) +1
        self.state.recentCampers[ke].index = parseInt(ke) +1
      }

    }).catch(err =>{
      alert('an error occured')
    })

    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
    .then(resp=>{
      self.setState({allTime: resp.data})
      for(let ke in self.state.allTime){
        self.state.allTime[ke].index = parseInt(ke) +1 //adding the number  of every
      }
    }).catch(err=>{
      alert('an error occured')
    })
    let campers =  document.getElementsByClassName('camper')
    setTimeout(function(){
    console.log(campers.length , campers)
  for(let i =0 ; i< campers.length ; i++){
  //    console.log(campers[i],'fsfs')

  campers[i].addEventListener('click', function(){ //giving a click event to with the profile of every camper
//    console.log('hello')
    window.open('https://freecodecamp.com/' + self.state.recentCampers[i].username,'_new')
  });
};
},1000);
  }

}

export default App;
