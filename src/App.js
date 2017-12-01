import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {userInviteValue:""}
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleInputChange(event){
      this.setState({userInviteValue: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <nav
          className="page-sidebar"
          data-pages="sidebar"
          style={{ transform: 'translate3d(0px, 0px, 0px)' }}
        >
          <div className="sidebar-overlay-slide from-top" id="appMenu">
            <div className="row">
              <div className="col-xs-6 no-padding">
                <a href="javascript:void(0)" className="p-l-40">
                  <img src="images/social_app.svg" alt="socail" />
                </a>
              </div>
              <div className="col-xs-6 no-padding">
                <a href="javascript:void(0)" className="p-l-10">
                  <img src="images/email_app.svg" alt="socail" />
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 m-t-20 no-padding">
                <a href="javascript:void(0)" className="p-l-40">
                  <img src="images/calendar_app.svg" alt="socail" />
                </a>
              </div>
              <div className="col-xs-6 m-t-20 no-padding">
                <a href="javascript:void(0)" className="p-l-10">
                  <img src="images/add_more.svg" alt="socail" />
                </a>
              </div>
            </div>
          </div>
          <div className="sidebar-header">
            <div className="sidebar-header-controls">
              <button
                type="button"
                className="btn btn-link hidden-md-down"
                data-toggle-pin="sidebar">
                <img src="images/logo.png" alt="" />
              </button>
            </div>
          </div>
          <div className="sidebar-menu">
            <div
              className="scroll-wrapper menu-items"
              style={{ position: 'relative' }}>
              <ul className="menu-items scroll-content scroll-scrolly_visible"
                style={{
                  height: 'auto',
                  marginBottom: '0px',
                  marginRight: '0px',
                  maxHeight: '660px',
                }}>
                <li className="m-t-30 ">
                  <a href="javascript:void(0)">
                    <span className="icon-thumbnail">
                      <img src="images/icon1.png" alt="" />
                    </span>
                  </a>
                </li>
                <li className="">
                  <a href="javascript:void(0)">
                    <span className="bg-success icon-thumbnail">
                      <img src="images/icon2.png" alt="" />
                    </span>
                  </a>
                </li>
                <li className="">
                  <a href="javascript:void(0)">
                    <span className="icon-thumbnail">
                      <img src="images/icon3.png" alt="" />
                    </span>
                  </a>
                </li>
                <li className="">
                  <a href="javascript:void(0)">
                    <span className="icon-thumbnail">
                      <img src="images/icon4.png" alt="" />
                    </span>
                  </a>
                </li>
                <li className="">
                  <a href="javascript:void(0)">
                    <span className="icon-thumbnail">
                      <img src="images/icon5.png" alt="" />
                    </span>
                  </a>
                </li>
                <li className="">
                  <a href="javascript:void(0)">
                    <span className="icon-thumbnail">
                      <img src="images/icon6.png" alt="" />
                    </span>
                  </a>
                </li>
                <li className="">
                  <a href="javascript:void(0)">
                    <span className="icon-thumbnail">
                      <img src="images/icon7.png" alt="" />
                    </span>
                  </a>
                </li>
                <li className="">
                  <a href="javascript:void(0)">
                    <span className="icon-thumbnail">
                      <img src="images/icon8.png" alt="" />
                    </span>
                  </a>
                </li>
              </ul>
              <div className="scroll-element scroll-x scroll-scrolly_visible">
                <div className="scroll-element_outer">
                  <div className="scroll-element_size" />
                  <div className="scroll-element_track" />
                  <div className="scroll-bar" style={{ width: '89px' }} />
                </div>
              </div>
              <div className="scroll-element scroll-y scroll-scrolly_visible">
                <div className="scroll-element_outer">
                  <div className="scroll-element_size" />
                  <div className="scroll-element_track" />
                  <div
                    className="scroll-bar"
                    style={{ height: '517px', top: '100.52px' }}
                  />
                </div>
              </div>
            </div>
            <div className="clearfix" />
          </div>
        </nav>
        <div
          className="page-container "
          style={{ backgroundColor: 'rgb(245, 245, 245)' }}
        >
          <div className="header">
            <a
              href="javascript:void(0)"
              className="btn-link toggle-sidebar hidden-lg-up "
              data-toggle="sidebar"
            >
              <i className="fa fa-bars" />
            </a>
            <div className="containernew">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 rightspace">
                  <div className="staffcont">
                    <h3>Staff.com</h3>
                    <p>
                      <img src="images/user.png" alt="" />                      
                      <input ref="userInvite" onChange={this.handleInputChange}
                        type="text"
                        value={this.state.userInviteValue}
                        placeholder="Invite teamate"
                        name="userInvite"
                      />                      
                    </p>
                    <a href="javascript:void(0)">Invite</a>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 hidedivbox">
                  <div className="currenttext ">
                    <p>
                      Current time:
                      <strong>9:41 PM, Sat, September 26,2017</strong>
                    </p>
                    <select required>
                      <option value="" hidden>
                        (GMT +8:00)Beijing,Chonqq...
                      </option>
                      <option value="1">(GMT +8:00)Beijing,Chonqq...</option>
                      <option value="2">(GMT +8:00)Beijing,Chonqq...</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Dashboard />
        </div>
      </div>
    );
  }
}

export default App;
