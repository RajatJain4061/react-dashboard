import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Line } from 'react-chartjs-2';
import {DropdownButton,MenuItem} from 'react-bootstrap';
var Multiselect = require('react-bootstrap-multiselect');

class TimeTracked extends Component {
  componentWillMount() {    
    this.setState({filteredUsersData:this.state.allUsersData})    
  }

  constructor(props) {
    super(props);
    this.state = {
      chartData: [
        {
          label: 'P Designers',
          data: [95, 55, 110, 120, 105, 20, 0,],
          borderColor: '#5A68C6',
          backgroundColor: '#5A68C6',
          //hoverBackgroundColor: '#5A68C6',
          borderWidth: 0,
          fill: false,
          lineTension: 0,
          pointRadius: 0,
        },
        {
          label: 'P Managers',
          data: [70, 120, 140, 145, 135, 48, 20,],
          borderColor: '#F53F39',
          backgroundColor: '#F53F39',
          //hoverBackgroundColor: '#F53F39',
          borderWidth: 0,
          fill: false,
          lineTension: 0,
          pointRadius: 0, 
        },
        {
          label: 'P Developers',
          data: [130, 105, 130, 105, 130, 40, 25, ],
          borderColor: '#FEB100',
          backgroundColor: '#FEB100',
          //hoverBackgroundColor: '#FEB100',
          borderWidth: 0,
          fill: false,
          lineTension: 0,
          pointRadius: 0,
        },
        {
          label: 'Support',
          data: [110, 75, 85, 88, 60, 10, 10,],
          borderColor: '#52BD6C',
          backgroundColor: '#52BD6C',
          lineTension: 0,
          //hoverBackgroundColor: '#56BB6F',
          borderWidth: 0,                  
          fill: false,
          pointRadius: 0,
        },
        {
          label: 'Translation',
          lineTension: 0,
          data: [40, 40, 70, 35, 70, 0, 5,],
          borderColor: '#01CFF2',
          backgroundColor: '#01CFF2',
          //hoverBackgroundColor: '#01CFF2',
          borderWidth: 0,
          fill: false,
          pointRadius: 0,
        },
      ],      
      userActivityData:{
          1:{'today':[95, 55, 110, 120, 105, 20, 0,],'yesterday':[40, 40, 70, 35, 70, 0, 5,],'7days':[110, 75, 85, 88, 60, 10, 10,],'30days':[95, 55, 110, 120, 105, 20, 0,],},
          2:{'today':[70, 120, 140, 145, 135, 48, 20,],'yesterday':[70, 120, 140, 145, 135, 48, 20,],'7days':[40, 40, 70, 35, 70, 0, 5,],'30days':[110, 75, 85, 88, 60, 10, 10,],},
          3:{'today':[130, 105, 130, 105, 130, 40, 25, ],'yesterday':[130, 105, 130, 105, 130, 40, 25, ],'7days':[130, 105, 130, 105, 130, 40, 25, ],'30days':[40, 40, 70, 35, 70, 0, 5,]},
          4:{'today':[110, 75, 85, 88, 60, 10, 10,],'yesterday':[40, 40, 70, 35, 70, 0, 5,],'7days':[95, 55, 110, 120, 105, 20, 0,],'30days':[130, 105, 130, 105, 130, 40, 25, ],},
          5:{'today':[40, 40, 70, 35, 70, 0, 5,],'yesterday':[110, 75, 85, 88, 60, 10, 10,],'7days':[70, 120, 140, 145, 135, 48, 20,],'30days':[95, 55, 110, 120, 105, 20, 0,],},
      },
      allUsersData: [
        {'user_id':1,'name':'P Designers',"color":'#5A68C6'},
        {'user_id':2,'name':'P Managers',"color":'#F53F39'},
        {'user_id':3,'name':'P Developers',"color":'#FEB100'},
        {'user_id':4,'name':'Support',"color":'#52BD6C'},
        {'user_id':5,'name':'Translation',"color": '#01CFF2'},
      ],
      usersList: [{value:1,'label':'P Designers','selected':true},{value:2,'label':'P Managers','selected':true},{value:3,'label':'P Developers','selected':true},{value:4,'label':'Support','selected':true},{value:5,'label':'Translation','selected':true}],
      dayFilterData : {'today':'Today','yesterday':'Yesterday','7days':'Last 7 Days','15day':'Last 15 Days','30days':'Last 30 Days'},
      showTeamFilters:false,
      showNoActivity:false,
      showTeamActivityChart:true,
      dayFilter:"Today",
      dayFilterValue:"today",
      filteredUserIDs:[1,2,3,4,5],  
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

    //var chartData = this.state.chartData;
    var chartData = [];
    //for(var i = 0;i < 10; i++){
    for (var key in filteredUsersData){
      var filteredUserData = filteredUsersData[key];
      var userActivityData = this.state.userActivityData;
      var data = {
          label: filteredUserData.name,
          data: userActivityData[filteredUserData.user_id][this.state.dayFilterValue],
          borderColor: filteredUserData.color,
          backgroundColor: filteredUserData.color,
          borderWidth: 0,
          fill: false,
          lineTension: 0,
          pointRadius: 0, 
        }
        chartData.push(data)
    }

    var showTeamActivityChart = true;
    var showNoActivity = false;
    if(filteredUsersData.length == 0){
       showTeamActivityChart = false;
       showNoActivity = true
    }
    this.setState({
      chartData:chartData,filteredUsersData:filteredUsersData,
      showTeamActivityChart:showTeamActivityChart,showNoActivity:showNoActivity,showTeamFilters:false});

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
      this.setState({usersList: usersList,filteredUserIDs:filteredUserIDs,showTeamFilters:false},function(){
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
    var showTeamFilters = this.state.showTeamFilters;
    var showTeamActivityChart = this.state.showTeamActivityChart;
    var showNoActivity = this.state.showNoActivity;
    if((showNoActivity == true || showTeamActivityChart == true) && (showTeamFilters == false)){
          showNoActivity = false;
          showTeamActivityChart = false
          showTeamFilters = true          
    } else if(showTeamFilters == true){
        showTeamFilters = false;
        if(this.state.filteredUserIDs.length== 0){
          showNoActivity = true;
          showTeamActivityChart = false
        } else {
          showNoActivity = false;
          showTeamActivityChart = true
        }
    }
    console.log(showNoActivity);
    this.setState({ showTeamFilters: showTeamFilters, showTeamActivityChart:showTeamActivityChart,showNoActivity:showNoActivity})
  }

  render() {
    const { showTeamFilters , showTeamActivity, showTeamActivityChart,dayFilter,showNoActivity} = this.state;
    return (
      <div className="box1firstlong">
        <div className="boxheader">
          <div className="lefthead">
            <h5 onClick={() => this.filterByUsersID([1,2,3])}>Comparing teams</h5>
            <h3>Time Tracked</h3>
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
              <i className="fa fa-ellipsis-v" id="iconelliplis2" />
            </div>
          </div>
        </div>
        <div className="boxcenter" id="linegraphbox" style={{ display: (showTeamActivityChart ? 'block' : 'none') }}>
          <Line
            ref="chart"
            data={{
              labels: [
                'May 15',
                'May 16',
                'May 17',
                'May 18',
                'May 19',
                'May 20',
                'May 21',
              ],
              datasets: this.state.chartData
            }}
            options={{				
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                },
              },
              //maintainAspectRatio: false,
              legend: {
                  display: true,
                  position: 'top',
                labels: {
					          usePointStyle: true,
                  	padding:10,
                    fontSize:12,
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
						          fontColor: '#CFD8DC',
                      callback: function(value, index, values) {
                        return value;
                      },
                    },
                  },
                ],
                yAxes: [
                  {
                    //stacked: true,
                    gridLines: {
                      display: true,
                      borderDash: [5],
                      zeroLineBorderDash: [5],
                      drawBorder: false,
                    },
                    ticks: {
                      stepSize: 50,
                      max: 200,
                      min: 0,
                      fontColor: '#CFD8DC',
                      padding: 10,
                      //min: 0, // it is for ignoring negative step.
                      beginAtZero: false,
                      callback: function(value, index, values) {
                        return Math.abs(value) + 'h';
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
                    return label + '\n ' + Math.abs(tooltipItem.yLabel) + 'h';
                  },
                },
              },
            }}
          />
        </div>
        <div className="boxcenter nolowactivity" id="nolowactivity" style={{ display: (showNoActivity ? 'block' : 'none') }}>
            <img src="images/lownow.png" alt="" />
            <p>No Teams for Time Tracked</p>
            <span>No time tracked for the selected teams and date range.</span>
        </div>
        <div className="boxcenter boxcenter2" style={{ display: (showTeamFilters ? 'block' : 'none') }}>
            <div className="userselect">
              <div className="form-group">
                <label>Users</label>
                <div className="multipleullist">
                <Multiselect 
                ref="users"
                data={this.state.usersList}
                onChange={this.handleInputUserFilter} 
                includeSelectAllOption enableFiltering multiple buttonText={function(options, select) { 
                return options.length+' Teams Selected'; }} />
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
          <p>{this.state.filteredUsersData.length}  Teams Selected</p>
          <p className="rightsee">See Timesheet Reports</p>
        </div>
      </div>
    );
  }
}

export default TimeTracked;
