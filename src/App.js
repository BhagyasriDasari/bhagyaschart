import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { toPng } from 'html-to-image';
import './App.css';

class App extends Component {
  state = {
    data: [],
    timeframe: 'daily',
  };

  componentDidMount() {
    fetch('/mydata.json')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        this.setState({ data });
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  filterDataByTimeframe = (data, timeframe) => {
    const now = new Date();
    let startDate;

    switch (timeframe) {
      case 'weekly':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'monthly':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'daily':
      default:
        startDate = new Date('1970-01-01'); // Show all data
        break;
    }

    console.log(`Timeframe: ${timeframe}`);
    console.log(`Start date: ${startDate}`);
    console.log(`End date (now): ${now}`);

    const filteredData = data.filter(item => {
      const itemDate = new Date(item.timestamp);
      console.log(`Item date: ${itemDate}, Start date: ${startDate}, Now: ${now}`);
      const withinRange = itemDate >= startDate && itemDate <= now;
      console.log(`Is item within range? ${withinRange}`);
      return withinRange;
    });

    console.log(`Filtered data for ${timeframe}:`, filteredData);
    return filteredData;
  };

  handleTimeframeChange = (timeframe) => {
    this.setState({ timeframe });
  };

  handleChartClick = (data) => {
    alert(`You clicked on: ${JSON.stringify(data)}`);
  };

  exportChart = () => {
    const chartContainer = document.getElementById('chart-container');
    toPng(chartContainer)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'chart.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error creating image:', error);
      });
  };

  render() {
    const { data, timeframe } = this.state;
    const filteredData = this.filterDataByTimeframe(data, timeframe);

    return (
      <div className="container">
        <h1 className='heading'>My Chart App</h1>
        <div className="button-group">
          <button onClick={() => this.handleTimeframeChange('daily')}>Daily</button>
          <button onClick={() => this.handleTimeframeChange('weekly')}>Weekly</button>
          <button onClick={() => this.handleTimeframeChange('monthly')}>Monthly</button>
          <button onClick={this.exportChart}>Export as PNG</button>
        </div>
        <div className="chart-container" id="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData} onClick={this.handleChartClick}>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line type="monotone" dataKey="value" stroke="#ff7300" yAxisId={0} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default App;
