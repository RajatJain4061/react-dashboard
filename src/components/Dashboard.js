import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import KeyboardMouseActivity from './KeyboardMouseActivity';
import TimeTracked from './TimeTracked';

class Dashboard extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="page-content-wrapper ">
        <div className="containernew">
          <div className="row">
            <div className="col-md-12 showmobile">
              <div className="currenttext">
                <p>
                  Current time: <strong>9:41 PM, Sat, September 26,2017</strong>
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
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <KeyboardMouseActivity />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <TimeTracked />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
