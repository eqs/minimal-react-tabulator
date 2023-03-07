import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-tabulator/lib/styles.css'; // default theme
import 'react-tabulator/css/bootstrap/tabulator_bootstrap.min.css'; // use Theme(s)
import { ReactTabulator } from 'react-tabulator';

function App() {
  const columns = [
    { title: 'ID', field: 'id', width: 150 },
    { title: 'First Name', field: 'first_name', width: 150 },
    { title: 'Last Name', field: 'last_name', width: 150 },
    { title: 'Email', field: 'email', width: 150 }
  ];
  const options = {
    height: 100,
    movableRows: true,
    progressiveLoad: 'scroll',
    progressiveLoadDelay: 200,
    progressiveLoadScrollMargin: 30,
    ajaxURL: 'https://reqres.in/api/users',
    dataSendParams: {
      page: 'page',
      size: 'per_page'
    },
    dataReceiveParams: {
      last_page: 'last'
    },
    paginationSize: 5,
    ajaxResponse: (url: string, params: any, response: any) => {
      console.log('url, params, response', url, params, response);
      return {
        data: response.data,
        last: response.total_pages
      };
    },
    ajaxError: function (error: any) {
      console.log('ajaxError', error);
    }
  };

  return (
    <div className="App">
      <ReactTabulator
        columns={columns}
        options={options}
        events={{
          dataLoaded: function (data: any) {
            console.log('dataLoaded', data);
            // return data; //return the response data to tabulator
            let modResponse: any = {};
            modResponse.data = data;
            modResponse.last = 5;
            return modResponse;
          },
          ajaxError: function (error: any) {
            console.log('ajaxError', error);
          }
        }}
      />
    </div>
  );
}

export default App;
