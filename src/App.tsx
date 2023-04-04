import React, { useState } from 'react';
import './App.css';
import 'react-tabulator/lib/styles.css'; // default theme
import 'react-tabulator/css/bootstrap/tabulator_bootstrap.min.css'; // use Theme(s)
import { ReactTabulator } from 'react-tabulator';

function LikeButton() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <span className="likeButton" onClick={handleClick}>
      ♥ {count}
    </span>
  );
}

function App() {
  const columns = [
    { title: 'ID', field: 'id', width: 150 },
    { title: 'First Name', field: 'first_name', width: 150 },
    { title: 'Last Name', field: 'last_name', width: 150 },
    { title: 'Email', field: 'email', width: 150 }
  ];
  const options = {
    height: '300px',
    movableRows: true,
    pagination: true,
    paginationSize: 6,
    paginationMode: 'remote',
    ajaxURL: 'https://reqres.in/api/users',
    ajaxResponse: (url: string, params: any, response: any) => {
      console.log('url, params, response', url, params, response);
      return {
        data: response.data,
        last_page: response.total_pages
      };
    },
  };

  const events = {
    dataLoadError: (error: any) => {
      console.log('ajaxError', error);
    }
  };

  return (
    <div className="App">
      <LikeButton />
      <ReactTabulator
        columns={columns}
        options={options}
        events={events}
      />
    </div>
  );
}

export default App;
