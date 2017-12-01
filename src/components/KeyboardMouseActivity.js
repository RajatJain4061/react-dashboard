import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from 'react-chartjs-2';
import {DropdownButton,MenuItem} from 'react-bootstrap';
var Multiselect = require('react-bootstrap-multiselect');

class KeyboardMouseActivity extends Component {  

  componentDidMount() {
    this.setState({filteredUsersData:this.state.allUsersData})
    //this.filterUsersData();
  }

  constructor(props) {
    super(props);
    this.state = {
      chartData: [
        {
          label: 'Low Activity',
          data: [-30, -20, -20, -18, -16, -14, -14, -14, -12, -5],
          backgroundColor: '#F44336',
          hoverBackgroundColor: '#F44336',
          borderWidth: 0,
        },
        {
          label: 'Normal Activity',
          data: [70, 80, 80, 82, 84, 86, 86, 86, 88, 95],
          backgroundColor: '#CFD8DC',
          hoverBackgroundColor: '#CFD8DC',
          borderWidth: 0,
        },
      ],
      usersList: [{value:1,label:'GD','selected':true},{value:2,label:'TV','selected':true},{value:3,label:'RA','selected':true},{value:4,label:'VI','selected':true},{value:5,label:'Stan Kondakov','selected':true},{value:6,label:'QT','selected':true},{value:7,label:'RV','selected':true},{value:8,label:'AJ','selected':true},{value:9,label:'BW','selected':true},{value:10,label:'WE','selected':true}],
      chartLabels:['GD','TV','RA','VI','Stan Kondakov','QT','RV','AJ','BW','WE'],
      userActivityData:{
        1:{'today':{'low':-30,'normal':70},'yesterday':{'low':-30,'normal':70},'7days':{'low':-30,'normal':70},'30days':{'low':-30,'normal':70},},
        2:{'today':{'low':-30,'normal':70},'yesterday':{'low':-20,'normal':80},'7days':{'low':-22,'normal':78},'30days':{'low':-26,'normal':74},},
        3:{'today':{'low':-30,'normal':70},'yesterday':{'low':-25,'normal':75},'7days':{'low':-28,'normal':72},'30days':{'low':-31,'normal':69},},
        4:{'today':{'low':-30,'normal':70},'yesterday':{'low':-30,'normal':70},'7days':{'low':-32,'normal':68},'30days':{'low':-48,'normal':52},},
        5:{'today':{'low':-30,'normal':70},'yesterday':{'low':-35,'normal':65},'7days':{'low':-38,'normal':62},'30days':{'low':-54,'normal':46},},
        6:{'today':{'low':-30,'normal':70},'yesterday':{'low':-40,'normal':60},'7days':{'low':-42,'normal':58},'30days':{'low':-59,'normal':41},},
        7:{'today':{'low':-30,'normal':70},'yesterday':{'low':-45,'normal':55},'7days':{'low':-48,'normal':52},'30days':{'low':-65,'normal':35},},
        8:{'today':{'low':-30,'normal':70},'yesterday':{'low':-50,'normal':50},'7days':{'low':-52,'normal':48},'30days':{'low':-71,'normal':29},},
        9:{'today':{'low':-30,'normal':70},'yesterday':{'low':-55,'normal':45},'7days':{'low':-58,'normal':42},'30days':{'low':-79,'normal':21},},
        10:{'today':{'low':-30,'normal':70},'yesterday':{'low':-60,'normal':40},'7days':{'low':-62,'normal':38},'30days':{'low':-81,'normal':19},},
      },
      allUsersData: [
        {'user_id':1,'name':'GD',"color":'#56c677','image':''},
        {'user_id':2,'name':'TV',"color":'#07cfe9','image':''},
        {'user_id':3,'name':'RA',"color":'','image':'images/img1.png'},
        {'user_id':4,'name':'VI',"color":'','image':'images/img2.png'},
        {'user_id':5,'name':'Stan Kondakov',"color":'','image':'images/img3.png'},
        {'user_id':6,'name':'QT',"color":'#6370bf','image':''},
        {'user_id':7,'name':'RV',"color":'','image':'images/img4.png'},
        {'user_id':8,'name':'AJ',"color":'','image':'images/img5.png'},
        {'user_id':9,'name':'BW',"color":'#088d9d','image':''},
        {'user_id':10,'name':'WE',"color":'#f14c5b','image':''},
      ],
      dayFilterData : {'today':'Today','yesterday':'Yesterday','7days':'Last 7 Days','15day':'Last 15 Days','30days':'Last 30 Days'},
      showKeyboardFilters:false,
      showNoActivity:false,
      showKeyboardActivityChart:true,
      dayFilter:"Today",
      dayFilterValue:"today",
      filteredUserIDs:[1,2,3,4,5,6,7,8,9,10],  
      filteredUsersData:[],
      inputDayFilterValue:'today',
      inputUserFilterValue:[],
    };

    //InputBinding
    this.handleInputDayFilter = this.handleInputDayFilter.bind(this)
    this.handleInputUserFilter = this.handleInputUserFilter.bind(this)

    this.cancelFilter = this.cancelFilter.bind(this)
    this.filterGraph = this.filterGraph.bind(this)
    this.toggleFilterForm = this.toggleFilterForm.bind(this)
  }

  filterUsersData(){
    var allUsersData = this.state.allUsersData;
    var filteredUserIds = this.state.filteredUserIDs;
    console.log('allowed',filteredUserIds)
    var filteredUsersData = allUsersData.filter(function(itm){
        return filteredUserIds.indexOf(itm.user_id) > -1;
    });
    console.log(filteredUsersData)
    var chartData = this.state.chartData;
    var chartLabels = [];

    //for(var i = 0;i < 10; i++){
    for (var key in filteredUsersData){
      //console.log(user_id)
      var filteredUserData = filteredUsersData[key];
      //console.log(this.state.userActivityData[filteredUserData.user_id][this.state.dayFilterValue]['low']);
        chartData[0].data[key] = this.state.userActivityData[filteredUserData.user_id][this.state.dayFilterValue]['low'];
        chartData[1].data[key] = this.state.userActivityData[filteredUserData.user_id][this.state.dayFilterValue]['normal'];
        chartLabels[key] = filteredUserData.name;
    }
    if(filteredUsersData.length < 10){
        //fill remaining data as blank
        var initCounter = filteredUsersData.length;
        //console.log(initCounter)
        for(var i = initCounter;i < 10; i++){
            chartData[0].data[i] = 0;
            chartData[1].data[i] = 0;
            chartLabels[i] = "";
        }
    }
    var showKeyboardActivityChart = true;
    var showNoActivity = false;
    if(filteredUsersData.length == 0){
       showKeyboardActivityChart = false;
       showNoActivity = true
    }
    this.setState({
      chartData:chartData,chartLabels:chartLabels,filteredUsersData:filteredUsersData,
      showKeyboardActivityChart:showKeyboardActivityChart,showNoActivity:showNoActivity,showKeyboardFilters:false});
    this.forceUpdate();
  }

  filterByUsersID(userIDs){
      this.setState({filteredUserIDs:userIDs},function(){
          this.filterUsersData();
      })   
  }

  filterByDay(value){
    var dayFilterData = this.state.dayFilterData;
    var dayFilter = dayFilterData[value];
    
    this.setState({dayFilter:dayFilter,dayFilterValue:value,inputDayFilterValue:value},function(){
        this.filterUsersData();
    })
  }

  cancelFilter(){
      this.toggleFilterForm()
  }
  
  filterGraph(event){
      var dayFilterValue = this.state.inputDayFilterValue
      var users = this.state.inputUserFilterValue
      var dayFilterData = this.state.dayFilterData;
      var dayFilter = dayFilterData[dayFilterValue];
      
      var usersList = this.state.usersList;
      var inputUserFilterValue = this.state.inputUserFilterValue
      //mark selected user ids from input data
      var selectedUsers = this.refs.users.selectRef.selectedOptions
      var filteredUserIDs = [];
      for(var i = 0;i < selectedUsers.length; i++){
          var element = selectedUsers[i];
          filteredUserIDs.push(parseInt(element.value));
      }
      this.setState({dayFilterValue:dayFilterValue,dayFilter:dayFilter});
      this.setState({usersList: usersList,filteredUserIDs:filteredUserIDs,showKeyboardFilters:false},function(){
          this.filterUsersData();
      });
  }

  handleInputDayFilter(event){
      this.setState({inputDayFilterValue: event.target.value});
  }

  handleInputUserFilter(event){
    //console.log(this.refs.users.selectRef.selectedOptions)

  }

  toggleFilterForm(){
    var showKeyboardFilters = this.state.showKeyboardFilters;
    var showKeyboardActivityChart = this.state.showKeyboardActivityChart;
    var showNoActivity = this.state.showNoActivity;
    if((showNoActivity == true || showKeyboardActivityChart == true) && (showKeyboardFilters == false)){
          showNoActivity = false;
          showKeyboardActivityChart = false
          showKeyboardFilters = true          
    } else if(showKeyboardFilters == true){
        showKeyboardFilters = false;
        if(this.state.filteredUserIDs.length== 0){
          showNoActivity = true;
          showKeyboardActivityChart = false
        } else {
          showNoActivity = false;
          showKeyboardActivityChart = true
        }
    }

    this.setState({ showKeyboardFilters: showKeyboardFilters, showKeyboardActivityChart:showKeyboardActivityChart,showNoActivity:showNoActivity})
  }

  render() {
    const { showKeyboardFilters , showNoActivity, showKeyboardActivityChart, dayFilter} = this.state;
    return (
      <div className="box1firstlong">
        <div className="boxheader">
          <div className="lefthead">
              <h5>Users with</h5>
              <h3>Low Keyboard & Mouse Activity</h3>
          </div>
          <div className="selectright">
              <div className="day-filter">
              <DropdownButton bsStyle="primary" className="dropdown-toggle" title={this.state.dayFilter} key="KeyboardActivityDayFilter" id="KeyboardActivityDayFilter">
                  <MenuItem eventKey="1" active={this.state.dayFilterValue == 'today'}  onClick={() => this.filterByDay('today')}>Today</MenuItem>                  
                  <MenuItem eventKey="2" active={this.state.dayFilterValue == 'yesterday'}  onClick={() => this.filterByDay('yesterday')}>Yesterday</MenuItem>                  
                  <MenuItem eventKey="3" active={this.state.dayFilterValue == '7days'}  onClick={() => this.filterByDay('7days')}>Last 7 Days</MenuItem>                  
                  <MenuItem eventKey="4" active={this.state.dayFilterValue == '30days'} onClick={() => this.filterByDay('30days')}>Last 30 Days</MenuItem>            
              </DropdownButton>
              </div>
            <div className="ellipsiicon" onClick={this.toggleFilterForm}>
                  <i className="fa fa-ellipsis-v" id="iconelliplis" />
            </div>
          </div>
        </div>
        <div className="boxcenter"  id="lowActivityChart" style={{ display: (showKeyboardActivityChart ? 'block' : 'none') }}>
          <div className="chart">
            <Bar
              ref="chart"
              data={{
                labels: this.state.chartLabels,
                datasets: this.state.chartData,
              }}
              options={{
                layout: {
                  padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: -20,
                  },
                },
                //maintainAspectRatio: false,
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    boxWidth: 12,
                    fontColor: '#CFD8DC',
                  },
                },
                scales: {
                  xAxes: [
                    {
                      barPercentage: 1,
                      stacked: true,
                      gridLines: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        callback: function(value, index, values) {
                          return '';
                        },
                      },
                    },
                  ],
                  yAxes: [
                    {
                      stacked: true,
                      gridLines: {
                        display: true,
                        borderDash: [5],
                        zeroLineBorderDash: [5],
                        drawBorder: false,
                      },
                      ticks: {
                        stepSize: 50,
                        max: 100,
                        min: -100,
                        fontColor: '#CFD8DC',
                        padding: 10,
                        //min: 0, // it is for ignoring negative step.
                        beginAtZero: false,
                        callback: function(value, index, values) {
                          return Math.abs(value) + '%';
                        },
                      },
                    },
                  ],
                },
                tooltips: {
                  caretSize: 0,
                  position: 'nearest',
                  callbacks: {
                    label: function(tooltipItem, data) {
                      var label =
                        data.datasets[tooltipItem.datasetIndex]['label'];
                      return label + ' ' + Math.abs(tooltipItem.yLabel) + '%';
                    },
                  },
                },
              }}
            />
          </div>
          <ul> 
          {
                this.state.filteredUsersData.map(function(user, index){
                  return <li key={user.user_id} className="barbottomlist" style={{backgroundColor:user.color}}>
                    {
                    user.image == ""?<a href="javascript:void(0)" className="circletext"> {user.name}</a>:<a href="javascript:void(0)"><img src={user.image} alt="" /></a>
                    }
                  </li>                     
                })
            }            
          </ul>
        </div>
        <div className="boxcenter nolowactivity" id="nolowactivity" style={{ display: (showNoActivity ? 'block' : 'none') }}>
            <img src="images/lownow.png" alt="" />
            <p>No People with Low Activity</p>
            <span>No low activity for the selected people and date range.</span>
        </div>
        <div className="boxcenter boxcenter2" id="keyboardActivityFilter" style={{ display: (showKeyboardFilters ? 'block' : 'none') }}>
            <div className="userselect">            
              <div className="form-group ">
                <label>Users</label>
                <div className="multipleullist">
                        <Multiselect 
                        ref="users"
                        data={this.state.usersList}    
                        onChange={this.handleInputUserFilter} 
                        includeSelectAllOption enableFiltering multiple buttonText={function(options, select) { 
                        return options.length+' Users Selected'; }} />              
                </div>
              </div>
              <p>Note: This widget only shows users whose percentage of time worked with low keyboard & mouse activity is greater than 10%</p>
              <div className="form-group">
                <label>Date</label>
                <select ref="keyboardDayFilter" value={this.state.inputDayFilterValue} onChange={this.handleInputDayFilter}>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
              </select>
              </div>
              <div className="boxcenter2-btn">
                    <button type="button" onClick={this.cancelFilter} className="btn btn-primary cncl"><i className="ion-android-close"></i>Cancel</button>
                    <button type="button" onClick={this.filterGraph} className="btn btn-primary save"><i className="ion-android-checkmark-circle" aria-hidden="true"></i>Save</button>
              </div>              
            </div>
          </div>
        <div className="boxfooter">
          <p>{this.state.filteredUsersData.length} Users Selected</p>
          <p className="rightsee">See Screenshot Report</p>
        </div>
      </div>
    );
  }
}

export default KeyboardMouseActivity;
