import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import KeplerGl from "kepler.gl";
import React, { Component } from "react";
import { connect } from "react-redux";

import nycTrips from "./data/nyc-trips.csv";

// Kepler.gl actions
import { addDataToMap, resetMapConfig } from "kepler.gl/actions";
// Kepler.gl Data processing APIs
import Processors from "kepler.gl/processors";

import axios from "axios"; // Import Axios
import processors from "kepler.gl/processors";

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

const white = "#ffffff";
const customTheme = {
  sidePanelBg: white,
  titleTextColor: "#000000",
  sidePanelHeaderBg: "#f7f7F7",
  subtextColorActive: "#2473bd",
};

//function to convert Earthquake geojson data to csv format
function convertGeoJSONToCSV(geojsonData) {
  // Create a header for the CSV data
  const csvHeader = "latitude,longitude,magnitude,depth\n";

  // Map each feature in the GeoJSON data to CSV format
  const csvData = geojsonData.features.map((feature, index) => {
    const coordinates = feature.epiLatLong
      .replace("SRID=4326;POINT (", "") // Remove prefix
      .replace(")", "") // Remove suffix
      .split(" ")
      .map(parseFloat); // Convert to float

    // Format the CSV data
    return `${coordinates[1]},${coordinates[0]},${feature.magnitude},${feature.depth}`;
  });

  // Join the header and CSV data
  return csvHeader + csvData.join("\n");
}

//function to convert Precipitation geojson data to csv
function convertGeoJSONToCSVPrep(geojsonData) {
  // Create a header for the CSV data
  const csvHeader = "latitude,longitude,precipitation,date\n";

  // Map each feature in the GeoJSON data to CSV format
  const csvData = geojsonData.features.map((feature, index) => {
    // Check if epiLatLong is defined and has the expected format
    if (feature.latlongPrecip && typeof feature.latlongPrecip === "string") {
      // Use a try-catch block to handle potential errors during data extraction
      try {
        const coordinates = feature.latlongPrecip
          .replace("SRID=4326;POINT (", "") // Remove prefix
          .replace(")", "") // Remove suffix
          .split(" ")
          .map(parseFloat); // Convert to float

        // Extract other relevant properties
        const precipitation = feature.precipitation;
        const date = feature.date;

        // Format the CSV data
        return `${coordinates[1]},${coordinates[0]},${precipitation},${date}`;
      } catch (error) {
        console.error("Error processing feature:", feature, error);
        return ""; // or some default value
      }
    } else {
      console.error("Invalid or missing epiLatLong in feature:", feature);
      return ""; // or some default value
    }
  });

  // Join the header and CSV data
  return csvHeader + csvData.join("\n");
}

//function to convert geojson to keplergl Geojson
function convertGeoJSONPoint(geojsonData) {
  return {
    type: "FeatureCollection",
    features: geojsonData.features.map((feature, index) => {
      const coordinates = feature.epiLatLong
        .replace("SRID=4326;POINT (", "") // Remove prefix
        .replace(")", "") // Remove suffix
        .split(" ")
        .map(parseFloat); // Convert to float

      return {
        type: "Feature",
        properties: {
          magnitude: feature.magnitude,
          depth: feature.depth,
          index: index,
        },
        geometry: {
          type: "Polygon",
          coordinates: coordinates,
        },
      };
    }),
  };
}

//convert json gemetric data to geojson
function convertGeoJSONPoly(geojsonData) {
  return {
    type: "FeatureCollection",
    features: geojsonData.features.map((feature, index) => {
      // Extracting geometry coordinates from the provided data
      const coordinates = feature.geometry
        .replace("SRID=4326;POLYGON ((", "") // Remove prefix
        .replace("))", "") // Remove suffix
        .split(", ")
        .map((coord) => coord.split(" ").map(parseFloat)); // Convert to nested arrays of floats

      return {
        type: "Feature",
        properties: {
          area: feature.area,
          max_volume: feature.max_volume,
          name: feature.name,
          typeofwaterbody: feature.typeofwaterbody,
        },
        geometry: {
          type: "Polygon",
          coordinates: [coordinates], // Wrap coordinates in an extra array
        },
      };
    }),
  };
}

//sample data

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        area: 8,
        max_volume: 9,
        name: "Waterfalls",
        typeofwaterbody: "",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-73.961373, 40.79853],
            [-73.961404, 40.798447],
            [-73.961419, 40.798384],
            [-73.961392, 40.798368],
            [-73.961346, 40.798348],
            // ... additional coordinates for the outer ring
          ],
          // You can have additional arrays for inner rings (holes) if needed
        ],
      },
    },
  ],
};

class App extends Component {
  componentDidMount() {
    // Fetch Earthquake data
    axios
      .get("http://127.0.0.1:8000/api/keplergl_earthquakes_map/")
      .then((response) => {
        const earthquakeGeojsonData = response.data.egeojson_data;

        if (earthquakeGeojsonData) {
          console.log("Edata" + earthquakeGeojsonData);
          const formattedGeojsonData = convertGeoJSONToCSV(
            earthquakeGeojsonData
          );
          const data = Processors.processCsvData(formattedGeojsonData);

          const datasetearthquakes = {
            data,
            info: {
              id: "earthquake_data",
            },
          };
          // Dispatch resetMapConfig action to clear the map configuration
          this.props.dispatch(resetMapConfig());
          this.props.dispatch(addDataToMap({ datasets: datasetearthquakes }));
        }
      })
      .catch((error) => {
        console.error("Error fetching earthquake data:", error);
      });

    // Fetch Precipitation data
    axios
      .get("http://127.0.0.1:8000/api/keplergl_precipitation_map/")
      .then((response) => {
        const precipitationGeojsonData = response.data.pgeojson_data;

        if (precipitationGeojsonData) {
          console.log("Pdata" + precipitationGeojsonData);
          const formattedGeojsonData = convertGeoJSONToCSVPrep(
            precipitationGeojsonData
          );
          const data = Processors.processCsvData(formattedGeojsonData);

          const datasetprecipitation = {
            data,
            info: {
              id: "precipitation_data",
            },
          };
          // Dispatch resetMapConfig action to clear the map configuration
          this.props.dispatch(resetMapConfig());
          this.props.dispatch(addDataToMap({ datasets: datasetprecipitation }));
        }
      })
      .catch((error) => {
        console.error("Error fetching precipitation data:", error);
      });

    //fetch waterbody data
    axios
      .get("http://127.0.0.1:8000/api/waterbody_map/")
      .then((response) => {
        console.log("responseee", response);
        const waterbodyGeojsonData = response.data.wgeojson_data;
        console.log(waterbodyGeojsonData);
        if (waterbodyGeojsonData) {
          console.log("Wb Data", waterbodyGeojsonData);

          const formattedGeojsonDatawb =
            convertGeoJSONPoly(waterbodyGeojsonData);
          console.log("formatted : ", formattedGeojsonDatawb);

          const data = Processors.processGeojson(formattedGeojsonDatawb);

          const datasetwaterbodies = {
            data,
            info: {
              id: "waterbody_data",
            },
          };
          this.props.dispatch(resetMapConfig());
          this.props.dispatch(addDataToMap({ datasets: datasetwaterbodies }));
        }
      })
      .catch((error) => {
        console.error("Error fetching Waterbody data:", error);
      });
  }
  render() {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          minHeight: "70vh",
          color: "wheat",
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <KeplerGl
              mapboxApiAccessToken={MAPBOX_TOKEN}
              id="map"
              width={width}
              height={height}
              appName="GeoFramer"
              version="v2.1"
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(App);
