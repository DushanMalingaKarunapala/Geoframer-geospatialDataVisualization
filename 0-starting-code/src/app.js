
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import nycTrips from './data/nyc-trips.csv';

// Kepler.gl actions
import {addDataToMap,resetMapConfig} from 'kepler.gl/actions';
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';
import axios from 'axios'; // Import Axios





const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

const white = '#ffffff';
const customTheme = {
  sidePanelBg: white,
  titleTextColor: '#000000',
  sidePanelHeaderBg: '#f7f7F7',
  subtextColorActive: '#2473bd'
};

//function to convert Earthquake geojson data to csv format
function convertGeoJSONToCSV(geojsonData) {
  // Create a header for the CSV data
  const csvHeader = 'latitude,longitude,magnitude,depth\n';

  // Map each feature in the GeoJSON data to CSV format
  const csvData = geojsonData.features.map((feature, index) => {
    const coordinates = feature.epiLatLong
      .replace('SRID=4326;POINT (', '') // Remove prefix
      .replace(')', '') // Remove suffix
      .split(' ')
      .map(parseFloat); // Convert to float

    // Format the CSV data
    return `${coordinates[1]},${coordinates[0]},${feature.magnitude},${feature.depth}`;
  });

  // Join the header and CSV data
  return csvHeader + csvData.join('\n');
}

//function to convert Precipitation geojson data to csv
function convertGeoJSONToCSVPrep(geojsonData) {
  // Create a header for the CSV data
  const csvHeader = 'latitude,longitude,precipitation,date\n';

  // Map each feature in the GeoJSON data to CSV format
  const csvData = geojsonData.features.map((feature, index) => {
    // Check if epiLatLong is defined and has the expected format
    if (feature.latlongPrecip && typeof feature.latlongPrecip === 'string') {
      // Use a try-catch block to handle potential errors during data extraction
      try {
        const coordinates = feature.latlongPrecip
          .replace('SRID=4326;POINT (', '') // Remove prefix
          .replace(')', '') // Remove suffix
          .split(' ')
          .map(parseFloat); // Convert to float

        // Extract other relevant properties
        const precipitation = feature.precipitation;
        const date = feature.date;

        // Format the CSV data
        return `${coordinates[1]},${coordinates[0]},${precipitation},${date}`;
      } catch (error) {
        console.error('Error processing feature:', feature, error);
        return ''; // or some default value
      }
    } else {
      console.error('Invalid or missing epiLatLong in feature:', feature);
      return ''; // or some default value
    }
  });

  // Join the header and CSV data
  return csvHeader + csvData.join('\n');
}








//function to convert geojson to keplergl Geojson
function convertGeoJSON(geojsonData) {
  return {
    type: 'FeatureCollection',
    features: geojsonData.features.map((feature, index) => {
      const coordinates = feature.epiLatLong
        .replace('SRID=4326;POINT (', '') // Remove prefix
        .replace(')', '') // Remove suffix
        .split(' ')
        .map(parseFloat); // Convert to float

      return {
        type: 'Feature',
        properties: {
          magnitude: feature.magnitude,
          depth: feature.depth,
          index: index,
        },
        geometry: {
          type: 'Point',
          coordinates: coordinates,
        },
      };
    }),
  };
}




class App extends Component {
  componentDidMount() {
    // Fetch Earthquake data
    axios.get('http://127.0.0.1:8000/api/keplergl_earthquakes_map/')
      .then((response) => {
        const earthquakeGeojsonData = response.data.egeojson_data;

        if (earthquakeGeojsonData) {
          console.log("Edata" + earthquakeGeojsonData);
          const formattedGeojsonData = convertGeoJSONToCSV(earthquakeGeojsonData);
          const data = Processors.processCsvData(formattedGeojsonData);

          const datasetearthquakes = {
            data,
            info: {
              id: 'earthquake_data'
            }
          };
          // Dispatch resetMapConfig action to clear the map configuration
          this.props.dispatch(resetMapConfig());
          this.props.dispatch(addDataToMap({datasets: datasetearthquakes}));
        }
      })
      .catch((error) => {
        console.error("Error fetching earthquake data:", error);
      });

    // Fetch Precipitation data
    axios.get('http://127.0.0.1:8000/api/keplergl_precipitation_map/')
      .then((response) => {
        const precipitationGeojsonData = response.data.pgeojson_data;

        if (precipitationGeojsonData) {
          console.log("Pdata" + precipitationGeojsonData);
          const formattedGeojsonData = convertGeoJSONToCSVPrep(precipitationGeojsonData);
          const data = Processors.processCsvData(formattedGeojsonData);

          const datasetprecipitation = {
            data,
            info: {
              id: 'precipitation_data'
            }
          };
          // Dispatch resetMapConfig action to clear the map configuration
          this.props.dispatch(resetMapConfig());
          this.props.dispatch(addDataToMap({datasets: datasetprecipitation}));
        }
      })
      .catch((error) => {
        console.error("Error fetching precipitation data:", error);
      });
  
}
  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', minHeight: '70vh',color:'wheat'}}>
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl
              mapboxApiAccessToken={MAPBOX_TOKEN}
              id="map"
              width={width}
              height={height}
              appName = "GeoFramer"
              version="v2.2"
              theme={customTheme}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(App);
