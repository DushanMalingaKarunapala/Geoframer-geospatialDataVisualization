"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = mapStateToProps;
exports["default"] = exports.DEFAULT_KEPLER_GL_PROPS = exports.notificationPanelSelector = exports.geoCoderPanelSelector = exports.modalContainerSelector = exports.bottomWidgetSelector = exports.isSplitSelector = exports.plotContainerSelector = exports.sidePanelSelector = exports.mapFieldsSelector = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _console = _interopRequireDefault(require("global/console"));

var _redux = require("redux");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reselect = require("reselect");

var _keplerglConnect = require("../connect/keplergl-connect");

var _reactIntl = require("react-intl");

var _localization = require("../localization");

var _context = require("./context");

var VisStateActions = _interopRequireWildcard(require("../actions/vis-state-actions"));

var MapStateActions = _interopRequireWildcard(require("../actions/map-state-actions"));

var MapStyleActions = _interopRequireWildcard(require("../actions/map-style-actions"));

var UIStateActions = _interopRequireWildcard(require("../actions/ui-state-actions"));

var ProviderActions = _interopRequireWildcard(require("../actions/provider-actions"));

var _defaultSettings = require("../constants/default-settings");

var _userFeedbacks = require("../constants/user-feedbacks");

var _sidePanel = _interopRequireDefault(require("./side-panel"));

var _mapContainer = _interopRequireDefault(require("./map-container"));

var _mapsLayout = _interopRequireDefault(require("./maps-layout"));

var _bottomWidget = _interopRequireDefault(require("./bottom-widget"));

var _modalContainer = _interopRequireDefault(require("./modal-container"));

var _plotContainer = _interopRequireDefault(require("./plot-container"));

var _notificationPanel = _interopRequireDefault(require("./notification-panel"));

var _geocoderPanel = _interopRequireDefault(require("./geocoder-panel"));

var _utils = require("../utils/utils");

var _mapboxUtils = require("../utils/mapbox-utils");

var _localeUtils = require("../utils/locale-utils");

var _base = require("../styles/base");

var _observeDimensions = require("../utils/observe-dimensions");

var _templateObject;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// Maybe we should think about exporting this or creating a variable
// as part of the base.js theme
var GlobalStyle = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  font-family: ", ";\n  font-weight: ", ";\n  font-size: ", ";\n  line-height: ", ";\n\n  *,\n  *:before,\n  *:after {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n\n  ul {\n    margin: 0;\n    padding: 0;\n  }\n\n  li {\n    margin: 0;\n  }\n\n  a {\n    text-decoration: none;\n    color: ", ";\n  }\n\n  .mapboxgl-ctrl .mapboxgl-ctrl-logo {\n    display: none;\n  }\n"])), function (props) {
  return props.theme.fontFamily;
}, function (props) {
  return props.theme.fontWeight;
}, function (props) {
  return props.theme.fontSize;
}, function (props) {
  return props.theme.lineHeight;
}, function (props) {
  return props.theme.labelColor;
});

var BottomWidgetOuter = _styledComponents["default"].div(function (_ref) {
  var absolute = _ref.absolute;
  return "\n  ".concat(absolute ? 'position: absolute; bottom: 0; right: 0;' : '', "\n  pointer-events: none; /* prevent padding from blocking input */\n  & > * {\n    /* all children should allow input */\n    pointer-events: all;\n  }");
});

var mapFieldsSelector = function mapFieldsSelector(props) {
  return {
    getMapboxRef: props.getMapboxRef,
    mapboxApiAccessToken: props.mapboxApiAccessToken,
    mapboxApiUrl: props.mapboxApiUrl,
    mapState: props.mapState,
    mapStyle: props.mapStyle,
    onDeckInitialized: props.onDeckInitialized,
    onViewStateChange: props.onViewStateChange,
    deckGlProps: props.deckGlProps,
    uiStateActions: props.uiStateActions,
    visStateActions: props.visStateActions,
    mapStateActions: props.mapStateActions,
    // visState
    editor: props.visState.editor,
    datasets: props.visState.datasets,
    layers: props.visState.layers,
    layerOrder: props.visState.layerOrder,
    layerData: props.visState.layerData,
    layerBlending: props.visState.layerBlending,
    filters: props.visState.filters,
    interactionConfig: props.visState.interactionConfig,
    hoverInfo: props.visState.hoverInfo,
    clicked: props.visState.clicked,
    mousePos: props.visState.mousePos,
    animationConfig: props.visState.animationConfig,
    // uiState
    activeSidePanel: props.uiState.activeSidePanel,
    mapControls: props.uiState.mapControls,
    readOnly: props.uiState.readOnly,
    locale: props.uiState.locale
  };
};

exports.mapFieldsSelector = mapFieldsSelector;

var sidePanelSelector = function sidePanelSelector(props, availableProviders) {
  return {
    appName: props.appName,
    version: props.version,
    appWebsite: props.appWebsite,
    mapStyle: props.mapStyle,
    onSaveMap: props.onSaveMap,
    uiState: props.uiState,
    mapStyleActions: props.mapStyleActions,
    visStateActions: props.visStateActions,
    uiStateActions: props.uiStateActions,
    datasets: props.visState.datasets,
    filters: props.visState.filters,
    layers: props.visState.layers,
    layerOrder: props.visState.layerOrder,
    layerClasses: props.visState.layerClasses,
    interactionConfig: props.visState.interactionConfig,
    mapInfo: props.visState.mapInfo,
    layerBlending: props.visState.layerBlending,
    width: props.sidePanelWidth,
    availableProviders: availableProviders,
    mapSaved: props.providerState.mapSaved
  };
};

exports.sidePanelSelector = sidePanelSelector;

var plotContainerSelector = function plotContainerSelector(props) {
  return {
    width: props.width,
    height: props.height,
    exportImageSetting: props.uiState.exportImage,
    mapFields: mapFieldsSelector(props),
    addNotification: props.uiStateActions.addNotification,
    setExportImageSetting: props.uiStateActions.setExportImageSetting,
    setExportImageDataUri: props.uiStateActions.setExportImageDataUri,
    setExportImageError: props.uiStateActions.setExportImageError,
    splitMaps: props.visState.splitMaps
  };
};

exports.plotContainerSelector = plotContainerSelector;

var isSplitSelector = function isSplitSelector(props) {
  return props.visState.splitMaps && props.visState.splitMaps.length > 1;
};

exports.isSplitSelector = isSplitSelector;

var bottomWidgetSelector = function bottomWidgetSelector(props, theme) {
  return {
    filters: props.visState.filters,
    datasets: props.visState.datasets,
    uiState: props.uiState,
    layers: props.visState.layers,
    animationConfig: props.visState.animationConfig,
    visStateActions: props.visStateActions,
    toggleModal: props.uiStateActions.toggleModal,
    sidePanelWidth: props.uiState.readOnly ? 0 : props.sidePanelWidth + theme.sidePanel.margin.left
  };
};

exports.bottomWidgetSelector = bottomWidgetSelector;

var modalContainerSelector = function modalContainerSelector(props, rootNode) {
  return {
    appName: props.appName,
    mapStyle: props.mapStyle,
    visState: props.visState,
    mapState: props.mapState,
    uiState: props.uiState,
    providerState: props.providerState,
    mapboxApiAccessToken: props.mapboxApiAccessToken,
    mapboxApiUrl: props.mapboxApiUrl,
    visStateActions: props.visStateActions,
    uiStateActions: props.uiStateActions,
    mapStyleActions: props.mapStyleActions,
    providerActions: props.providerActions,
    rootNode: rootNode,
    // User defined cloud provider props
    cloudProviders: props.cloudProviders,
    onExportToCloudSuccess: props.onExportToCloudSuccess,
    onLoadCloudMapSuccess: props.onLoadCloudMapSuccess,
    onLoadCloudMapError: props.onLoadCloudMapError,
    onExportToCloudError: props.onExportToCloudError
  };
};

exports.modalContainerSelector = modalContainerSelector;

var geoCoderPanelSelector = function geoCoderPanelSelector(props) {
  return {
    isGeocoderEnabled: props.visState.interactionConfig.geocoder.enabled,
    mapboxApiAccessToken: props.mapboxApiAccessToken,
    mapState: props.mapState,
    updateVisData: props.visStateActions.updateVisData,
    removeDataset: props.visStateActions.removeDataset,
    updateMap: props.mapStateActions.updateMap
  };
};

exports.geoCoderPanelSelector = geoCoderPanelSelector;

var notificationPanelSelector = function notificationPanelSelector(props) {
  return {
    removeNotification: props.uiStateActions.removeNotification,
    notifications: props.uiState.notifications
  };
};

exports.notificationPanelSelector = notificationPanelSelector;
var DEFAULT_KEPLER_GL_PROPS = {
  mapStyles: [],
  mapStylesReplaceDefault: false,
  mapboxApiUrl: _defaultSettings.DEFAULT_MAPBOX_API_URL,
  width: 800,
  height: 800,
  appName: _defaultSettings.KEPLER_GL_NAME,
  version: _defaultSettings.KEPLER_GL_VERSION,
  sidePanelWidth: _defaultSettings.DIMENSIONS.sidePanel.width,
  theme: {},
  cloudProviders: [],
  readOnly: false
};
exports.DEFAULT_KEPLER_GL_PROPS = DEFAULT_KEPLER_GL_PROPS;
KeplerGlFactory.deps = [_bottomWidget["default"], _geocoderPanel["default"], _mapContainer["default"], _mapsLayout["default"], _modalContainer["default"], _sidePanel["default"], _plotContainer["default"], _notificationPanel["default"]];

function KeplerGlFactory(BottomWidget, GeoCoderPanel, MapContainer, MapsLayout, ModalContainer, SidePanel, PlotContainer, NotificationPanel) {
  /** @typedef {import('./kepler-gl').UnconnectedKeplerGlProps} KeplerGlProps */

  /** @augments React.Component<KeplerGlProps> */
  var KeplerGL = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(KeplerGL, _Component);

    var _super = _createSuper(KeplerGL);

    function KeplerGL() {
      var _this;

      (0, _classCallCheck2["default"])(this, KeplerGL);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
        dimensions: null
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleResize", function (dimensions) {
        _this.setState({
          dimensions: dimensions
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "root", /*#__PURE__*/(0, _react.createRef)());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "bottomWidgetRef", /*#__PURE__*/(0, _react.createRef)());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "themeSelector", function (props) {
        return props.theme;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "availableThemeSelector", (0, _reselect.createSelector)(_this.themeSelector, function (theme) {
        return (0, _typeof2["default"])(theme) === 'object' ? _objectSpread(_objectSpread({}, _base.theme), theme) : theme === _defaultSettings.THEME.light ? _base.themeLT : theme === _defaultSettings.THEME.base ? _base.themeBS : theme;
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "availableProviders", (0, _reselect.createSelector)(function (props) {
        return props.cloudProviders;
      }, function (providers) {
        return Array.isArray(providers) && providers.length ? {
          hasStorage: providers.some(function (p) {
            return p.hasPrivateStorage();
          }),
          hasShare: providers.some(function (p) {
            return p.hasSharingUrl();
          })
        } : {};
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "localeMessagesSelector", (0, _reselect.createSelector)(function (props) {
        return props.localeMessages;
      }, function (customMessages) {
        return customMessages ? (0, _localeUtils.mergeMessages)(_localization.messages, customMessages) : _localization.messages;
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_loadMapStyle", function () {
        var defaultStyles = Object.values(_this.props.mapStyle.mapStyles); // add id to custom map styles if not given

        var customStyles = (_this.props.mapStyles || []).map(function (ms) {
          return _objectSpread(_objectSpread({}, ms), {}, {
            id: ms.id || (0, _utils.generateHashId)()
          });
        });
        var allStyles = [].concat((0, _toConsumableArray2["default"])(customStyles), (0, _toConsumableArray2["default"])(defaultStyles)).reduce(function (accu, style) {
          var hasStyleObject = style.style && (0, _typeof2["default"])(style.style) === 'object';
          accu[hasStyleObject ? 'toLoad' : 'toRequest'][style.id] = style;
          return accu;
        }, {
          toLoad: {},
          toRequest: {}
        });

        _this.props.mapStyleActions.loadMapStyles(allStyles.toLoad);

        _this.props.mapStyleActions.requestMapStyles(allStyles.toRequest);
      });
      return _this;
    }

    (0, _createClass2["default"])(KeplerGL, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._validateMapboxToken();

        this._loadMapStyle();

        if (typeof this.props.onKeplerGlInitialized === 'function') {
          this.props.onKeplerGlInitialized();
        }

        if (this.root.current instanceof HTMLElement) {
          (0, _observeDimensions.observeDimensions)(this.root.current, this._handleResize);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.root.current instanceof HTMLElement) {
          (0, _observeDimensions.unobserveDimensions)(this.root.current);
        }
      }
    }, {
      key: "_validateMapboxToken",
      value:
      /* private methods */
      function _validateMapboxToken() {
        var mapboxApiAccessToken = this.props.mapboxApiAccessToken;

        if (!(0, _mapboxUtils.validateToken)(mapboxApiAccessToken)) {
          _console["default"].warn(_userFeedbacks.MISSING_MAPBOX_TOKEN);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            id = _this$props.id,
            width = _this$props.width,
            height = _this$props.height,
            uiState = _this$props.uiState,
            visState = _this$props.visState,
            readOnly = _this$props.readOnly;
        var dimensions = this.state.dimensions || {
          width: width,
          height: height
        };
        var splitMaps = visState.splitMaps,
            interactionConfig = visState.interactionConfig;
        var isSplit = isSplitSelector(this.props);
        var theme = this.availableThemeSelector(this.props);
        var localeMessages = this.localeMessagesSelector(this.props);
        var isExportingImage = uiState.exportImage.exporting;
        var availableProviders = this.availableProviders(this.props);
        var mapFields = mapFieldsSelector(this.props);
        var sideFields = sidePanelSelector(this.props, availableProviders);
        var plotContainerFields = plotContainerSelector(this.props);
        var bottomWidgetFields = bottomWidgetSelector(this.props, theme);
        var modalContainerFields = modalContainerSelector(this.props, this.root.current);
        var geoCoderPanelFields = geoCoderPanelSelector(this.props);
        var notificationPanelFields = notificationPanelSelector(this.props);
        var mapContainers = !isSplit ? [/*#__PURE__*/_react["default"].createElement(MapContainer, (0, _extends2["default"])({
          primary: true,
          key: 0,
          index: 0
        }, mapFields, {
          mapLayers: null
        }))] : splitMaps.map(function (settings, index) {
          return /*#__PURE__*/_react["default"].createElement(MapContainer, (0, _extends2["default"])({
            key: index,
            index: index,
            primary: index === 1
          }, mapFields, {
            mapLayers: splitMaps[index].layers
          }));
        });
        return /*#__PURE__*/_react["default"].createElement(_context.RootContext.Provider, {
          value: this.root
        }, /*#__PURE__*/_react["default"].createElement(_reactIntl.IntlProvider, {
          locale: uiState.locale,
          messages: localeMessages[uiState.locale]
        }, /*#__PURE__*/_react["default"].createElement(_styledComponents.ThemeProvider, {
          theme: theme
        }, /*#__PURE__*/_react["default"].createElement(GlobalStyle, {
          className: "kepler-gl",
          id: "kepler-gl__".concat(id),
          style: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            width: "".concat(width, "px"),
            height: "".concat(height, "px")
          },
          ref: this.root
        }, /*#__PURE__*/_react["default"].createElement(NotificationPanel, notificationPanelFields), !uiState.readOnly && !readOnly && /*#__PURE__*/_react["default"].createElement(SidePanel, sideFields), /*#__PURE__*/_react["default"].createElement(MapsLayout, {
          className: "maps"
        }, mapContainers), isExportingImage && /*#__PURE__*/_react["default"].createElement(PlotContainer, plotContainerFields), interactionConfig.geocoder.enabled && /*#__PURE__*/_react["default"].createElement(GeoCoderPanel, geoCoderPanelFields), /*#__PURE__*/_react["default"].createElement(BottomWidgetOuter, {
          absolute: true
        }, /*#__PURE__*/_react["default"].createElement(BottomWidget, (0, _extends2["default"])({
          ref: this.bottomWidgetRef
        }, bottomWidgetFields, {
          containerW: dimensions.width
        }))), /*#__PURE__*/_react["default"].createElement(ModalContainer, (0, _extends2["default"])({}, modalContainerFields, {
          containerW: dimensions.width,
          containerH: dimensions.height
        }))))));
      }
    }]);
    return KeplerGL;
  }(_react.Component);

  (0, _defineProperty2["default"])(KeplerGL, "defaultProps", DEFAULT_KEPLER_GL_PROPS);
  (0, _defineProperty2["default"])(KeplerGL, "contextType", _context.RootContext);
  return (0, _keplerglConnect.connect)(mapStateToProps, makeMapDispatchToProps)((0, _styledComponents.withTheme)(KeplerGL));
}

function mapStateToProps() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var props = arguments.length > 1 ? arguments[1] : undefined;
  return _objectSpread(_objectSpread({}, props), {}, {
    visState: state.visState,
    mapStyle: state.mapStyle,
    mapState: state.mapState,
    uiState: state.uiState,
    providerState: state.providerState
  });
}

var defaultUserActions = {};

var getDispatch = function getDispatch(dispatch, props) {
  return dispatch;
};

var getUserActions = function getUserActions(dispatch, props) {
  return props.actions || defaultUserActions;
};
/** @type {() => import('reselect').OutputParametricSelector<any, any, any, any>} */


function makeGetActionCreators() {
  return (0, _reselect.createSelector)([getDispatch, getUserActions], function (dispatch, userActions) {
    var _map = [VisStateActions, MapStateActions, MapStyleActions, UIStateActions, ProviderActions].map(function (actions) {
      return (0, _redux.bindActionCreators)(mergeActions(actions, userActions), dispatch);
    }),
        _map2 = (0, _slicedToArray2["default"])(_map, 5),
        visStateActions = _map2[0],
        mapStateActions = _map2[1],
        mapStyleActions = _map2[2],
        uiStateActions = _map2[3],
        providerActions = _map2[4];

    return {
      visStateActions: visStateActions,
      mapStateActions: mapStateActions,
      mapStyleActions: mapStyleActions,
      uiStateActions: uiStateActions,
      providerActions: providerActions,
      dispatch: dispatch
    };
  });
}

function makeMapDispatchToProps() {
  var getActionCreators = makeGetActionCreators();

  var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
    var groupedActionCreators = getActionCreators(dispatch, ownProps);
    return _objectSpread(_objectSpread({}, groupedActionCreators), {}, {
      dispatch: dispatch
    });
  };

  return mapDispatchToProps;
}
/**
 * Override default kepler.gl actions with user defined actions using the same key
 */


function mergeActions(actions, userActions) {
  var overrides = {};

  for (var key in userActions) {
    if (userActions.hasOwnProperty(key) && actions.hasOwnProperty(key)) {
      overrides[key] = userActions[key];
    }
  }

  return _objectSpread(_objectSpread({}, actions), overrides);
}

var _default = KeplerGlFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2tlcGxlci1nbC5qcyJdLCJuYW1lcyI6WyJHbG9iYWxTdHlsZSIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJmb250RmFtaWx5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwibGluZUhlaWdodCIsImxhYmVsQ29sb3IiLCJCb3R0b21XaWRnZXRPdXRlciIsImFic29sdXRlIiwibWFwRmllbGRzU2VsZWN0b3IiLCJnZXRNYXBib3hSZWYiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsIm1hcGJveEFwaVVybCIsIm1hcFN0YXRlIiwibWFwU3R5bGUiLCJvbkRlY2tJbml0aWFsaXplZCIsIm9uVmlld1N0YXRlQ2hhbmdlIiwiZGVja0dsUHJvcHMiLCJ1aVN0YXRlQWN0aW9ucyIsInZpc1N0YXRlQWN0aW9ucyIsIm1hcFN0YXRlQWN0aW9ucyIsImVkaXRvciIsInZpc1N0YXRlIiwiZGF0YXNldHMiLCJsYXllcnMiLCJsYXllck9yZGVyIiwibGF5ZXJEYXRhIiwibGF5ZXJCbGVuZGluZyIsImZpbHRlcnMiLCJpbnRlcmFjdGlvbkNvbmZpZyIsImhvdmVySW5mbyIsImNsaWNrZWQiLCJtb3VzZVBvcyIsImFuaW1hdGlvbkNvbmZpZyIsImFjdGl2ZVNpZGVQYW5lbCIsInVpU3RhdGUiLCJtYXBDb250cm9scyIsInJlYWRPbmx5IiwibG9jYWxlIiwic2lkZVBhbmVsU2VsZWN0b3IiLCJhdmFpbGFibGVQcm92aWRlcnMiLCJhcHBOYW1lIiwidmVyc2lvbiIsImFwcFdlYnNpdGUiLCJvblNhdmVNYXAiLCJtYXBTdHlsZUFjdGlvbnMiLCJsYXllckNsYXNzZXMiLCJtYXBJbmZvIiwid2lkdGgiLCJzaWRlUGFuZWxXaWR0aCIsIm1hcFNhdmVkIiwicHJvdmlkZXJTdGF0ZSIsInBsb3RDb250YWluZXJTZWxlY3RvciIsImhlaWdodCIsImV4cG9ydEltYWdlU2V0dGluZyIsImV4cG9ydEltYWdlIiwibWFwRmllbGRzIiwiYWRkTm90aWZpY2F0aW9uIiwic2V0RXhwb3J0SW1hZ2VTZXR0aW5nIiwic2V0RXhwb3J0SW1hZ2VEYXRhVXJpIiwic2V0RXhwb3J0SW1hZ2VFcnJvciIsInNwbGl0TWFwcyIsImlzU3BsaXRTZWxlY3RvciIsImxlbmd0aCIsImJvdHRvbVdpZGdldFNlbGVjdG9yIiwidG9nZ2xlTW9kYWwiLCJzaWRlUGFuZWwiLCJtYXJnaW4iLCJsZWZ0IiwibW9kYWxDb250YWluZXJTZWxlY3RvciIsInJvb3ROb2RlIiwicHJvdmlkZXJBY3Rpb25zIiwiY2xvdWRQcm92aWRlcnMiLCJvbkV4cG9ydFRvQ2xvdWRTdWNjZXNzIiwib25Mb2FkQ2xvdWRNYXBTdWNjZXNzIiwib25Mb2FkQ2xvdWRNYXBFcnJvciIsIm9uRXhwb3J0VG9DbG91ZEVycm9yIiwiZ2VvQ29kZXJQYW5lbFNlbGVjdG9yIiwiaXNHZW9jb2RlckVuYWJsZWQiLCJnZW9jb2RlciIsImVuYWJsZWQiLCJ1cGRhdGVWaXNEYXRhIiwicmVtb3ZlRGF0YXNldCIsInVwZGF0ZU1hcCIsIm5vdGlmaWNhdGlvblBhbmVsU2VsZWN0b3IiLCJyZW1vdmVOb3RpZmljYXRpb24iLCJub3RpZmljYXRpb25zIiwiREVGQVVMVF9LRVBMRVJfR0xfUFJPUFMiLCJtYXBTdHlsZXMiLCJtYXBTdHlsZXNSZXBsYWNlRGVmYXVsdCIsIkRFRkFVTFRfTUFQQk9YX0FQSV9VUkwiLCJLRVBMRVJfR0xfTkFNRSIsIktFUExFUl9HTF9WRVJTSU9OIiwiRElNRU5TSU9OUyIsIktlcGxlckdsRmFjdG9yeSIsImRlcHMiLCJCb3R0b21XaWRnZXRGYWN0b3J5IiwiR2VvQ29kZXJQYW5lbEZhY3RvcnkiLCJNYXBDb250YWluZXJGYWN0b3J5IiwiTWFwc0xheW91dEZhY3RvcnkiLCJNb2RhbENvbnRhaW5lckZhY3RvcnkiLCJTaWRlUGFuZWxGYWN0b3J5IiwiUGxvdENvbnRhaW5lckZhY3RvcnkiLCJOb3RpZmljYXRpb25QYW5lbEZhY3RvcnkiLCJCb3R0b21XaWRnZXQiLCJHZW9Db2RlclBhbmVsIiwiTWFwQ29udGFpbmVyIiwiTWFwc0xheW91dCIsIk1vZGFsQ29udGFpbmVyIiwiU2lkZVBhbmVsIiwiUGxvdENvbnRhaW5lciIsIk5vdGlmaWNhdGlvblBhbmVsIiwiS2VwbGVyR0wiLCJkaW1lbnNpb25zIiwic2V0U3RhdGUiLCJ0aGVtZVNlbGVjdG9yIiwiYmFzaWNUaGVtZSIsIlRIRU1FIiwibGlnaHQiLCJ0aGVtZUxUIiwiYmFzZSIsInRoZW1lQlMiLCJwcm92aWRlcnMiLCJBcnJheSIsImlzQXJyYXkiLCJoYXNTdG9yYWdlIiwic29tZSIsInAiLCJoYXNQcml2YXRlU3RvcmFnZSIsImhhc1NoYXJlIiwiaGFzU2hhcmluZ1VybCIsImxvY2FsZU1lc3NhZ2VzIiwiY3VzdG9tTWVzc2FnZXMiLCJtZXNzYWdlcyIsImRlZmF1bHRTdHlsZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJjdXN0b21TdHlsZXMiLCJtYXAiLCJtcyIsImlkIiwiYWxsU3R5bGVzIiwicmVkdWNlIiwiYWNjdSIsInN0eWxlIiwiaGFzU3R5bGVPYmplY3QiLCJ0b0xvYWQiLCJ0b1JlcXVlc3QiLCJsb2FkTWFwU3R5bGVzIiwicmVxdWVzdE1hcFN0eWxlcyIsIl92YWxpZGF0ZU1hcGJveFRva2VuIiwiX2xvYWRNYXBTdHlsZSIsIm9uS2VwbGVyR2xJbml0aWFsaXplZCIsInJvb3QiLCJjdXJyZW50IiwiSFRNTEVsZW1lbnQiLCJfaGFuZGxlUmVzaXplIiwiQ29uc29sZSIsIndhcm4iLCJNSVNTSU5HX01BUEJPWF9UT0tFTiIsInN0YXRlIiwiaXNTcGxpdCIsImF2YWlsYWJsZVRoZW1lU2VsZWN0b3IiLCJsb2NhbGVNZXNzYWdlc1NlbGVjdG9yIiwiaXNFeHBvcnRpbmdJbWFnZSIsImV4cG9ydGluZyIsInNpZGVGaWVsZHMiLCJwbG90Q29udGFpbmVyRmllbGRzIiwiYm90dG9tV2lkZ2V0RmllbGRzIiwibW9kYWxDb250YWluZXJGaWVsZHMiLCJnZW9Db2RlclBhbmVsRmllbGRzIiwibm90aWZpY2F0aW9uUGFuZWxGaWVsZHMiLCJtYXBDb250YWluZXJzIiwic2V0dGluZ3MiLCJpbmRleCIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwicG9zaXRpb24iLCJib3R0b21XaWRnZXRSZWYiLCJDb21wb25lbnQiLCJSb290Q29udGV4dCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1ha2VNYXBEaXNwYXRjaFRvUHJvcHMiLCJkZWZhdWx0VXNlckFjdGlvbnMiLCJnZXREaXNwYXRjaCIsImRpc3BhdGNoIiwiZ2V0VXNlckFjdGlvbnMiLCJhY3Rpb25zIiwibWFrZUdldEFjdGlvbkNyZWF0b3JzIiwidXNlckFjdGlvbnMiLCJWaXNTdGF0ZUFjdGlvbnMiLCJNYXBTdGF0ZUFjdGlvbnMiLCJNYXBTdHlsZUFjdGlvbnMiLCJVSVN0YXRlQWN0aW9ucyIsIlByb3ZpZGVyQWN0aW9ucyIsIm1lcmdlQWN0aW9ucyIsImdldEFjdGlvbkNyZWF0b3JzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwib3duUHJvcHMiLCJncm91cGVkQWN0aW9uQ3JlYXRvcnMiLCJvdmVycmlkZXMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQU9BOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0EsSUFBTUEsV0FBVyxHQUFHQyw2QkFBT0MsR0FBVix3Z0JBQ0EsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxVQUFoQjtBQUFBLENBREwsRUFFQSxVQUFBRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlFLFVBQWhCO0FBQUEsQ0FGTCxFQUdGLFVB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cEQsTUFBQUEsZUFBZSxFQUFmQSxlQURLO0FBRUxDLE1BQUFBLGVBQWUsRUFBZkEsZUFGSztBQUdMeUIsTUFBQUEsZUFBZSxFQUFmQSxlQUhLO0FBSUwzQixNQUFBQSxjQUFjLEVBQWRBLGNBSks7QUFLTHFELE1BQUFBLGVBQWUsRUFBZkEsZUFMSztBQU1Ma0gsTUFBQUEsUUFBUSxFQUFSQTtBQU5LLEtBQVA7QUFRRCxHQWpCTSxDQUFQO0FBa0JEOztBQUVELFNBQVNILHNCQUFULEdBQWtDO0FBQ2hDLE1BQU1jLGlCQUFpQixHQUFHUixxQkFBcUIsRUFBL0M7O0FBQ0EsTUFBTVMsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFDWixRQUFELEVBQVdhLFFBQVgsRUFBd0I7QUFDakQsUUFBTUMscUJBQXFCLEdBQUdILGlCQUFpQixDQUFDWCxRQUFELEVBQVdhLFFBQVgsQ0FBL0M7QUFFQSwyQ0FDS0MscUJBREw7QUFFRWQsTUFBQUEsUUFBUSxFQUFSQTtBQUZGO0FBSUQsR0FQRDs7QUFTQSxTQUFPWSxrQkFBUDtBQUNEO0FBRUQ7QUFDQTtBQUNBOzs7QUFDQSxTQUFTRixZQUFULENBQXNCUixPQUF0QixFQUErQkUsV0FBL0IsRUFBNEM7QUFDMUMsTUFBTVcsU0FBUyxHQUFHLEVBQWxCOztBQUNBLE9BQUssSUFBTUMsR0FBWCxJQUFrQlosV0FBbEIsRUFBK0I7QUFDN0IsUUFBSUEsV0FBVyxDQUFDYSxjQUFaLENBQTJCRCxHQUEzQixLQUFtQ2QsT0FBTyxDQUFDZSxjQUFSLENBQXVCRCxHQUF2QixDQUF2QyxFQUFvRTtBQUNsRUQsTUFBQUEsU0FBUyxDQUFDQyxHQUFELENBQVQsR0FBaUJaLFdBQVcsQ0FBQ1ksR0FBRCxDQUE1QjtBQUNEO0FBQ0Y7O0FBRUQseUNBQVdkLE9BQVgsR0FBdUJhLFNBQXZCO0FBQ0Q7O2VBRWMxRyxlIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIxIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBjcmVhdGVSZWZ9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zb2xlIGZyb20gJ2dsb2JhbC9jb25zb2xlJztcbmltcG9ydCB7YmluZEFjdGlvbkNyZWF0b3JzfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgc3R5bGVkLCB7VGhlbWVQcm92aWRlciwgd2l0aFRoZW1lfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQge2Nvbm5lY3QgYXMga2VwbGVyR2xDb25uZWN0fSBmcm9tICdjb25uZWN0L2tlcGxlcmdsLWNvbm5lY3QnO1xuaW1wb3J0IHtJbnRsUHJvdmlkZXJ9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHttZXNzYWdlc30gZnJvbSAnLi4vbG9jYWxpemF0aW9uJztcbmltcG9ydCB7Um9vdENvbnRleHR9IGZyb20gJ2NvbXBvbmVudHMvY29udGV4dCc7XG5cbmltcG9ydCAqIGFzIFZpc1N0YXRlQWN0aW9ucyBmcm9tICdhY3Rpb25zL3Zpcy1zdGF0ZS1hY3Rpb25zJztcbmltcG9ydCAqIGFzIE1hcFN0YXRlQWN0aW9ucyBmcm9tICdhY3Rpb25zL21hcC1zdGF0ZS1hY3Rpb25zJztcbmltcG9ydCAqIGFzIE1hcFN0eWxlQWN0aW9ucyBmcm9tICdhY3Rpb25zL21hcC1zdHlsZS1hY3Rpb25zJztcbmltcG9ydCAqIGFzIFVJU3RhdGVBY3Rpb25zIGZyb20gJ2FjdGlvbnMvdWktc3RhdGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBQcm92aWRlckFjdGlvbnMgZnJvbSAnYWN0aW9ucy9wcm92aWRlci1hY3Rpb25zJztcblxuaW1wb3J0IHtcbiAgRElNRU5TSU9OUyxcbiAgS0VQTEVSX0dMX05BTUUsXG4gIEtFUExFUl9HTF9WRVJTSU9OLFxuICBUSEVNRSxcbiAgREVGQVVMVF9NQVBCT1hfQVBJX1VSTFxufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge01JU1NJTkdfTUFQQk9YX1RPS0VOfSBmcm9tICdjb25zdGFudHMvdXNlci1mZWVkYmFja3MnO1xuXG5pbXBvcnQgU2lkZVBhbmVsRmFjdG9yeSBmcm9tICcuL3NpZGUtcGFuZWwnO1xuaW1wb3J0IE1hcENvbnRhaW5lckZhY3RvcnkgZnJvbSAnLi9tYXAtY29udGFpbmVyJztcbmltcG9ydCBNYXBzTGF5b3V0RmFjdG9yeSBmcm9tICcuL21hcHMtbGF5b3V0JztcbmltcG9ydCBCb3R0b21XaWRnZXRGYWN0b3J5IGZyb20gJy4vYm90dG9tLXdpZGdldCc7XG5pbXBvcnQgTW9kYWxDb250YWluZXJGYWN0b3J5IGZyb20gJy4vbW9kYWwtY29udGFpbmVyJztcbmltcG9ydCBQbG90Q29udGFpbmVyRmFjdG9yeSBmcm9tICcuL3Bsb3QtY29udGFpbmVyJztcbmltcG9ydCBOb3RpZmljYXRpb25QYW5lbEZhY3RvcnkgZnJvbSAnLi9ub3RpZmljYXRpb24tcGFuZWwnO1xuaW1wb3J0IEdlb0NvZGVyUGFuZWxGYWN0b3J5IGZyb20gJy4vZ2VvY29kZXItcGFuZWwnO1xuXG5pbXBvcnQge2dlbmVyYXRlSGFzaElkfSBmcm9tICd1dGlscy91dGlscyc7XG5pbXBvcnQge3ZhbGlkYXRlVG9rZW59IGZyb20gJ3V0aWxzL21hcGJveC11dGlscyc7XG5pbXBvcnQge21lcmdlTWVzc2FnZXN9IGZyb20gJ3V0aWxzL2xvY2FsZS11dGlscyc7XG5cbmltcG9ydCB7dGhlbWUgYXMgYmFzaWNUaGVtZSwgdGhlbWVMVCwgdGhlbWVCU30gZnJvbSAnc3R5bGVzL2Jhc2UnO1xuaW1wb3J0IHtvYnNlcnZlRGltZW5zaW9ucywgdW5vYnNlcnZlRGltZW5zaW9uc30gZnJvbSAnLi4vdXRpbHMvb2JzZXJ2ZS1kaW1lbnNpb25zJztcblxuLy8gTWF5YmUgd2Ugc2hvdWxkIHRoaW5rIGFib3V0IGV4cG9ydGluZyB0aGlzIG9yIGNyZWF0aW5nIGEgdmFyaWFibGVcbi8vIGFzIHBhcnQgb2YgdGhlIGJhc2UuanMgdGhlbWVcbmNvbnN0IEdsb2JhbFN0eWxlID0gc3R5bGVkLmRpdmBcbiAgZm9udC1mYW1pbHk6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZm9udEZhbWlseX07XG4gIGZvbnQtd2VpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmZvbnRXZWlnaHR9O1xuICBmb250LXNpemU6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZm9udFNpemV9O1xuICBsaW5lLWhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5saW5lSGVpZ2h0fTtcblxuICAqLFxuICAqOmJlZm9yZSxcbiAgKjphZnRlciB7XG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgdWwge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgbGkge1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgfVxuXG4gIC5tYXBib3hnbC1jdHJsIC5tYXBib3hnbC1jdHJsLWxvZ28ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbmA7XG5cbmNvbnN0IEJvdHRvbVdpZGdldE91dGVyID0gc3R5bGVkLmRpdihcbiAgKHthYnNvbHV0ZX0pID0+IGBcbiAgJHthYnNvbHV0ZSA/ICdwb3NpdGlvbjogYWJzb2x1dGU7IGJvdHRvbTogMDsgcmlnaHQ6IDA7JyA6ICcnfVxuICBwb2ludGVyLWV2ZW50czogbm9uZTsgLyogcHJldmVudCBwYWRkaW5nIGZyb20gYmxvY2tpbmcgaW5wdXQgKi9cbiAgJiA+ICoge1xuICAgIC8qIGFsbCBjaGlsZHJlbiBzaG91bGQgYWxsb3cgaW5wdXQgKi9cbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xuICB9YFxuKTtcblxuZXhwb3J0IGNvbnN0IG1hcEZpZWxkc1NlbGVjdG9yID0gcHJvcHMgPT4gKHtcbiAgZ2V0TWFwYm94UmVmOiBwcm9wcy5nZXRNYXBib3hSZWYsXG4gIG1hcGJveEFwaUFjY2Vzc1Rva2VuOiBwcm9wcy5tYXBib3hBcGlBY2Nlc3NUb2tlbixcbiAgbWFwYm94QXBpVXJsOiBwcm9wcy5tYXBib3hBcGlVcmwsXG4gIG1hcFN0YXRlOiBwcm9wcy5tYXBTdGF0ZSxcbiAgbWFwU3R5bGU6IHByb3BzLm1hcFN0eWxlLFxuICBvbkRlY2tJbml0aWFsaXplZDogcHJvcHMub25EZWNrSW5pdGlhbGl6ZWQsXG4gIG9uVmlld1N0YXRlQ2hhbmdlOiBwcm9wcy5vblZpZXdTdGF0ZUNoYW5nZSxcbiAgZGVja0dsUHJvcHM6IHByb3BzLmRlY2tHbFByb3BzLFxuICB1aVN0YXRlQWN0aW9uczogcHJvcHMudWlTdGF0ZUFjdGlvbnMsXG4gIHZpc1N0YXRlQWN0aW9uczogcHJvcHMudmlzU3RhdGVBY3Rpb25zLFxuICBtYXBTdGF0ZUFjdGlvbnM6IHByb3BzLm1hcFN0YXRlQWN0aW9ucyxcblxuICAvLyB2aXNTdGF0ZVxuICBlZGl0b3I6IHByb3BzLnZpc1N0YXRlLmVkaXRvcixcbiAgZGF0YXNldHM6IHByb3BzLnZpc1N0YXRlLmRhdGFzZXRzLFxuICBsYXllcnM6IHByb3BzLnZpc1N0YXRlLmxheWVycyxcbiAgbGF5ZXJPcmRlcjogcHJvcHMudmlzU3RhdGUubGF5ZXJPcmRlcixcbiAgbGF5ZXJEYXRhOiBwcm9wcy52aXNTdGF0ZS5sYXllckRhdGEsXG4gIGxheWVyQmxlbmRpbmc6IHByb3BzLnZpc1N0YXRlLmxheWVyQmxlbmRpbmcsXG4gIGZpbHRlcnM6IHByb3BzLnZpc1N0YXRlLmZpbHRlcnMsXG4gIGludGVyYWN0aW9uQ29uZmlnOiBwcm9wcy52aXNTdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZyxcbiAgaG92ZXJJbmZvOiBwcm9wcy52aXNTdGF0ZS5ob3ZlckluZm8sXG4gIGNsaWNrZWQ6IHByb3BzLnZpc1N0YXRlLmNsaWNrZWQsXG4gIG1vdXNlUG9zOiBwcm9wcy52aXNTdGF0ZS5tb3VzZVBvcyxcbiAgYW5pbWF0aW9uQ29uZmlnOiBwcm9wcy52aXNTdGF0ZS5hbmltYXRpb25Db25maWcsXG5cbiAgLy8gdWlTdGF0ZVxuICBhY3RpdmVTaWRlUGFuZWw6IHByb3BzLnVpU3RhdGUuYWN0aXZlU2lkZVBhbmVsLFxuICBtYXBDb250cm9sczogcHJvcHMudWlTdGF0ZS5tYXBDb250cm9scyxcbiAgcmVhZE9ubHk6IHByb3BzLnVpU3RhdGUucmVhZE9ubHksXG4gIGxvY2FsZTogcHJvcHMudWlTdGF0ZS5sb2NhbGVcbn0pO1xuXG5leHBvcnQgY29uc3Qgc2lkZVBhbmVsU2VsZWN0b3IgPSAocHJvcHMsIGF2YWlsYWJsZVByb3ZpZGVycykgPT4gKHtcbiAgYXBwTmFtZTogcHJvcHMuYXBwTmFtZSxcbiAgdmVyc2lvbjogcHJvcHMudmVyc2lvbixcbiAgYXBwV2Vic2l0ZTogcHJvcHMuYXBwV2Vic2l0ZSxcbiAgbWFwU3R5bGU6IHByb3BzLm1hcFN0eWxlLFxuICBvblNhdmVNYXA6IHByb3BzLm9uU2F2ZU1hcCxcbiAgdWlTdGF0ZTogcHJvcHMudWlTdGF0ZSxcbiAgbWFwU3R5bGVBY3Rpb25zOiBwcm9wcy5tYXBTdHlsZUFjdGlvbnMsXG4gIHZpc1N0YXRlQWN0aW9uczogcHJvcHMudmlzU3RhdGVBY3Rpb25zLFxuICB1aVN0YXRlQWN0aW9uczogcHJvcHMudWlTdGF0ZUFjdGlvbnMsXG5cbiAgZGF0YXNldHM6IHByb3BzLnZpc1N0YXRlLmRhdGFzZXRzLFxuICBmaWx0ZXJzOiBwcm9wcy52aXNTdGF0ZS5maWx0ZXJzLFxuICBsYXllcnM6IHByb3BzLnZpc1N0YXRlLmxheWVycyxcbiAgbGF5ZXJPcmRlcjogcHJvcHMudmlzU3RhdGUubGF5ZXJPcmRlcixcbiAgbGF5ZXJDbGFzc2VzOiBwcm9wcy52aXNTdGF0ZS5sYXllckNsYXNzZXMsXG4gIGludGVyYWN0aW9uQ29uZmlnOiBwcm9wcy52aXNTdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZyxcbiAgbWFwSW5mbzogcHJvcHMudmlzU3RhdGUubWFwSW5mbyxcbiAgbGF5ZXJCbGVuZGluZzogcHJvcHMudmlzU3RhdGUubGF5ZXJCbGVuZGluZyxcblxuICB3aWR0aDogcHJvcHMuc2lkZVBhbmVsV2lkdGgsXG4gIGF2YWlsYWJsZVByb3ZpZGVycyxcbiAgbWFwU2F2ZWQ6IHByb3BzLnByb3ZpZGVyU3RhdGUubWFwU2F2ZWRcbn0pO1xuXG5leHBvcnQgY29uc3QgcGxvdENvbnRhaW5lclNlbGVjdG9yID0gcHJvcHMgPT4gKHtcbiAgd2lkdGg6IHByb3BzLndpZHRoLFxuICBoZWlnaHQ6IHByb3BzLmhlaWdodCxcbiAgZXhwb3J0SW1hZ2VTZXR0aW5nOiBwcm9wcy51aVN0YXRlLmV4cG9ydEltYWdlLFxuICBtYXBGaWVsZHM6IG1hcEZpZWxkc1NlbGVjdG9yKHByb3BzKSxcbiAgYWRkTm90aWZpY2F0aW9uOiBwcm9wcy51aVN0YXRlQWN0aW9ucy5hZGROb3RpZmljYXRpb24sXG4gIHNldEV4cG9ydEltYWdlU2V0dGluZzogcHJvcHMudWlTdGF0ZUFjdGlvbnMuc2V0RXhwb3J0SW1hZ2VTZXR0aW5nLFxuICBzZXRFeHBvcnRJbWFnZURhdGFVcmk6IHByb3BzLnVpU3RhdGVBY3Rpb25zLnNldEV4cG9ydEltYWdlRGF0YVVyaSxcbiAgc2V0RXhwb3J0SW1hZ2VFcnJvcjogcHJvcHMudWlTdGF0ZUFjdGlvbnMuc2V0RXhwb3J0SW1hZ2VFcnJvcixcbiAgc3BsaXRNYXBzOiBwcm9wcy52aXNTdGF0ZS5zcGxpdE1hcHNcbn0pO1xuXG5leHBvcnQgY29uc3QgaXNTcGxpdFNlbGVjdG9yID0gcHJvcHMgPT5cbiAgcHJvcHMudmlzU3RhdGUuc3BsaXRNYXBzICYmIHByb3BzLnZpc1N0YXRlLnNwbGl0TWFwcy5sZW5ndGggPiAxO1xuXG5leHBvcnQgY29uc3QgYm90dG9tV2lkZ2V0U2VsZWN0b3IgPSAocHJvcHMsIHRoZW1lKSA9PiAoe1xuICBmaWx0ZXJzOiBwcm9wcy52aXNTdGF0ZS5maWx0ZXJzLFxuICBkYXRhc2V0czogcHJvcHMudmlzU3RhdGUuZGF0YXNldHMsXG4gIHVpU3RhdGU6IHByb3BzLnVpU3RhdGUsXG4gIGxheWVyczogcHJvcHMudmlzU3RhdGUubGF5ZXJzLFxuICBhbmltYXRpb25Db25maWc6IHByb3BzLnZpc1N0YXRlLmFuaW1hdGlvbkNvbmZpZyxcbiAgdmlzU3RhdGVBY3Rpb25zOiBwcm9wcy52aXNTdGF0ZUFjdGlvbnMsXG4gIHRvZ2dsZU1vZGFsOiBwcm9wcy51aVN0YXRlQWN0aW9ucy50b2dnbGVNb2RhbCxcbiAgc2lkZVBhbmVsV2lkdGg6IHByb3BzLnVpU3RhdGUucmVhZE9ubHkgPyAwIDogcHJvcHMuc2lkZVBhbmVsV2lkdGggKyB0aGVtZS5zaWRlUGFuZWwubWFyZ2luLmxlZnRcbn0pO1xuXG5leHBvcnQgY29uc3QgbW9kYWxDb250YWluZXJTZWxlY3RvciA9IChwcm9wcywgcm9vdE5vZGUpID0+ICh7XG4gIGFwcE5hbWU6IHByb3BzLmFwcE5hbWUsXG4gIG1hcFN0eWxlOiBwcm9wcy5tYXBTdHlsZSxcbiAgdmlzU3RhdGU6IHByb3BzLnZpc1N0YXRlLFxuICBtYXBTdGF0ZTogcHJvcHMubWFwU3RhdGUsXG4gIHVpU3RhdGU6IHByb3BzLnVpU3RhdGUsXG4gIHByb3ZpZGVyU3RhdGU6IHByb3BzLnByb3ZpZGVyU3RhdGUsXG5cbiAgbWFwYm94QXBpQWNjZXNzVG9rZW46IHByb3BzLm1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuICBtYXBib3hBcGlVcmw6IHByb3BzLm1hcGJveEFwaVVybCxcbiAgdmlzU3RhdGVBY3Rpb25zOiBwcm9wcy52aXNTdGF0ZUFjdGlvbnMsXG4gIHVpU3RhdGVBY3Rpb25zOiBwcm9wcy51aVN0YXRlQWN0aW9ucyxcbiAgbWFwU3R5bGVBY3Rpb25zOiBwcm9wcy5tYXBTdHlsZUFjdGlvbnMsXG4gIHByb3ZpZGVyQWN0aW9uczogcHJvcHMucHJvdmlkZXJBY3Rpb25zLFxuXG4gIHJvb3ROb2RlLFxuICAvLyBVc2VyIGRlZmluZWQgY2xvdWQgcHJvdmlkZXIgcHJvcHNcbiAgY2xvdWRQcm92aWRlcnM6IHByb3BzLmNsb3VkUHJvdmlkZXJzLFxuICBvbkV4cG9ydFRvQ2xvdWRTdWNjZXNzOiBwcm9wcy5vbkV4cG9ydFRvQ2xvdWRTdWNjZXNzLFxuICBvbkxvYWRDbG91ZE1hcFN1Y2Nlc3M6IHByb3BzLm9uTG9hZENsb3VkTWFwU3VjY2VzcyxcbiAgb25Mb2FkQ2xvdWRNYXBFcnJvcjogcHJvcHMub25Mb2FkQ2xvdWRNYXBFcnJvcixcbiAgb25FeHBvcnRUb0Nsb3VkRXJyb3I6IHByb3BzLm9uRXhwb3J0VG9DbG91ZEVycm9yXG59KTtcblxuZXhwb3J0IGNvbnN0IGdlb0NvZGVyUGFuZWxTZWxlY3RvciA9IHByb3BzID0+ICh7XG4gIGlzR2VvY29kZXJFbmFibGVkOiBwcm9wcy52aXNTdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZy5nZW9jb2Rlci5lbmFibGVkLFxuICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogcHJvcHMubWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gIG1hcFN0YXRlOiBwcm9wcy5tYXBTdGF0ZSxcbiAgdXBkYXRlVmlzRGF0YTogcHJvcHMudmlzU3RhdGVBY3Rpb25zLnVwZGF0ZVZpc0RhdGEsXG4gIHJlbW92ZURhdGFzZXQ6IHByb3BzLnZpc1N0YXRlQWN0aW9ucy5yZW1vdmVEYXRhc2V0LFxuICB1cGRhdGVNYXA6IHByb3BzLm1hcFN0YXRlQWN0aW9ucy51cGRhdGVNYXBcbn0pO1xuXG5leHBvcnQgY29uc3Qgbm90aWZpY2F0aW9uUGFuZWxTZWxlY3RvciA9IHByb3BzID0+ICh7XG4gIHJlbW92ZU5vdGlmaWNhdGlvbjogcHJvcHMudWlTdGF0ZUFjdGlvbnMucmVtb3ZlTm90aWZpY2F0aW9uLFxuICBub3RpZmljYXRpb25zOiBwcm9wcy51aVN0YXRlLm5vdGlmaWNhdGlvbnNcbn0pO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9LRVBMRVJfR0xfUFJPUFMgPSB7XG4gIG1hcFN0eWxlczogW10sXG4gIG1hcFN0eWxlc1JlcGxhY2VEZWZhdWx0OiBmYWxzZSxcbiAgbWFwYm94QXBpVXJsOiBERUZBVUxUX01BUEJPWF9BUElfVVJMLFxuICB3aWR0aDogODAwLFxuICBoZWlnaHQ6IDgwMCxcbiAgYXBwTmFtZTogS0VQTEVSX0dMX05BTUUsXG4gIHZlcnNpb246IEtFUExFUl9HTF9WRVJTSU9OLFxuICBzaWRlUGFuZWxXaWR0aDogRElNRU5TSU9OUy5zaWRlUGFuZWwud2lkdGgsXG4gIHRoZW1lOiB7fSxcbiAgY2xvdWRQcm92aWRlcnM6IFtdLFxuICByZWFkT25seTogZmFsc2Vcbn07XG5cbktlcGxlckdsRmFjdG9yeS5kZXBzID0gW1xuICBCb3R0b21XaWRnZXRGYWN0b3J5LFxuICBHZW9Db2RlclBhbmVsRmFjdG9yeSxcbiAgTWFwQ29udGFpbmVyRmFjdG9yeSxcbiAgTWFwc0xheW91dEZhY3RvcnksXG4gIE1vZGFsQ29udGFpbmVyRmFjdG9yeSxcbiAgU2lkZVBhbmVsRmFjdG9yeSxcbiAgUGxvdENvbnRhaW5lckZhY3RvcnksXG4gIE5vdGlmaWNhdGlvblBhbmVsRmFjdG9yeVxuXTtcblxuZnVuY3Rpb24gS2VwbGVyR2xGYWN0b3J5KFxuICBCb3R0b21XaWRnZXQsXG4gIEdlb0NvZGVyUGFuZWwsXG4gIE1hcENvbnRhaW5lcixcbiAgTWFwc0xheW91dCxcbiAgTW9kYWxDb250YWluZXIsXG4gIFNpZGVQYW5lbCxcbiAgUGxvdENvbnRhaW5lcixcbiAgTm90aWZpY2F0aW9uUGFuZWxcbikge1xuICAvKiogQHR5cGVkZWYge2ltcG9ydCgnLi9rZXBsZXItZ2wnKS5VbmNvbm5lY3RlZEtlcGxlckdsUHJvcHN9IEtlcGxlckdsUHJvcHMgKi9cbiAgLyoqIEBhdWdtZW50cyBSZWFjdC5Db21wb25lbnQ8S2VwbGVyR2xQcm9wcz4gKi9cbiAgY2xhc3MgS2VwbGVyR0wgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBERUZBVUxUX0tFUExFUl9HTF9QUk9QUztcblxuICAgIHN0YXRlID0ge1xuICAgICAgZGltZW5zaW9uczogbnVsbFxuICAgIH07XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRlTWFwYm94VG9rZW4oKTtcbiAgICAgIHRoaXMuX2xvYWRNYXBTdHlsZSgpO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2VwbGVyR2xJbml0aWFsaXplZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnByb3BzLm9uS2VwbGVyR2xJbml0aWFsaXplZCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucm9vdC5jdXJyZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgb2JzZXJ2ZURpbWVuc2lvbnModGhpcy5yb290LmN1cnJlbnQsIHRoaXMuX2hhbmRsZVJlc2l6ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5yb290LmN1cnJlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICB1bm9ic2VydmVEaW1lbnNpb25zKHRoaXMucm9vdC5jdXJyZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlUmVzaXplID0gZGltZW5zaW9ucyA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtkaW1lbnNpb25zfSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFJvb3RDb250ZXh0O1xuXG4gICAgcm9vdCA9IGNyZWF0ZVJlZigpO1xuICAgIGJvdHRvbVdpZGdldFJlZiA9IGNyZWF0ZVJlZigpO1xuXG4gICAgLyogc2VsZWN0b3JzICovXG4gICAgdGhlbWVTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLnRoZW1lO1xuICAgIGF2YWlsYWJsZVRoZW1lU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3Rvcih0aGlzLnRoZW1lU2VsZWN0b3IsIHRoZW1lID0+XG4gICAgICB0eXBlb2YgdGhlbWUgPT09ICdvYmplY3QnXG4gICAgICAgID8ge1xuICAgICAgICAgICAgLi4uYmFzaWNUaGVtZSxcbiAgICAgICAgICAgIC4uLnRoZW1lXG4gICAgICAgICAgfVxuICAgICAgICA6IHRoZW1lID09PSBUSEVNRS5saWdodFxuICAgICAgICA/IHRoZW1lTFRcbiAgICAgICAgOiB0aGVtZSA9PT0gVEhFTUUuYmFzZVxuICAgICAgICA/IHRoZW1lQlNcbiAgICAgICAgOiB0aGVtZVxuICAgICk7XG5cbiAgICBhdmFpbGFibGVQcm92aWRlcnMgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHByb3BzID0+IHByb3BzLmNsb3VkUHJvdmlkZXJzLFxuICAgICAgcHJvdmlkZXJzID0+XG4gICAgICAgIEFycmF5LmlzQXJyYXkocHJvdmlkZXJzKSAmJiBwcm92aWRlcnMubGVuZ3RoXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIGhhc1N0b3JhZ2U6IHByb3ZpZGVycy5zb21lKHAgPT4gcC5oYXNQcml2YXRlU3RvcmFnZSgpKSxcbiAgICAgICAgICAgICAgaGFzU2hhcmU6IHByb3ZpZGVycy5zb21lKHAgPT4gcC5oYXNTaGFyaW5nVXJsKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiB7fVxuICAgICk7XG5cbiAgICBsb2NhbGVNZXNzYWdlc1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICBwcm9wcyA9PiBwcm9wcy5sb2NhbGVNZXNzYWdlcyxcbiAgICAgIGN1c3RvbU1lc3NhZ2VzID0+IChjdXN0b21NZXNzYWdlcyA/IG1lcmdlTWVzc2FnZXMobWVzc2FnZXMsIGN1c3RvbU1lc3NhZ2VzKSA6IG1lc3NhZ2VzKVxuICAgICk7XG5cbiAgICAvKiBwcml2YXRlIG1ldGhvZHMgKi9cbiAgICBfdmFsaWRhdGVNYXBib3hUb2tlbigpIHtcbiAgICAgIGNvbnN0IHttYXBib3hBcGlBY2Nlc3NUb2tlbn0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKCF2YWxpZGF0ZVRva2VuKG1hcGJveEFwaUFjY2Vzc1Rva2VuKSkge1xuICAgICAgICBDb25zb2xlLndhcm4oTUlTU0lOR19NQVBCT1hfVE9LRU4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9sb2FkTWFwU3R5bGUgPSAoKSA9PiB7XG4gICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gT2JqZWN0LnZhbHVlcyh0aGlzLnByb3BzLm1hcFN0eWxlLm1hcFN0eWxlcyk7XG4gICAgICAvLyBhZGQgaWQgdG8gY3VzdG9tIG1hcCBzdHlsZXMgaWYgbm90IGdpdmVuXG4gICAgICBjb25zdCBjdXN0b21TdHlsZXMgPSAodGhpcy5wcm9wcy5tYXBTdHlsZXMgfHwgW10pLm1hcChtcyA9PiAoe1xuICAgICAgICAuLi5tcyxcbiAgICAgICAgaWQ6IG1zLmlkIHx8IGdlbmVyYXRlSGFzaElkKClcbiAgICAgIH0pKTtcblxuICAgICAgY29uc3QgYWxsU3R5bGVzID0gWy4uLmN1c3RvbVN0eWxlcywgLi4uZGVmYXVsdFN0eWxlc10ucmVkdWNlKFxuICAgICAgICAoYWNjdSwgc3R5bGUpID0+IHtcbiAgICAgICAgICBjb25zdCBoYXNTdHlsZU9iamVjdCA9IHN0eWxlLnN0eWxlICYmIHR5cGVvZiBzdHlsZS5zdHlsZSA9PT0gJ29iamVjdCc7XG4gICAgICAgICAgYWNjdVtoYXNTdHlsZU9iamVjdCA/ICd0b0xvYWQnIDogJ3RvUmVxdWVzdCddW3N0eWxlLmlkXSA9IHN0eWxlO1xuXG4gICAgICAgICAgcmV0dXJuIGFjY3U7XG4gICAgICAgIH0sXG4gICAgICAgIHt0b0xvYWQ6IHt9LCB0b1JlcXVlc3Q6IHt9fVxuICAgICAgKTtcblxuICAgICAgdGhpcy5wcm9wcy5tYXBTdHlsZUFjdGlvbnMubG9hZE1hcFN0eWxlcyhhbGxTdHlsZXMudG9Mb2FkKTtcbiAgICAgIHRoaXMucHJvcHMubWFwU3R5bGVBY3Rpb25zLnJlcXVlc3RNYXBTdHlsZXMoYWxsU3R5bGVzLnRvUmVxdWVzdCk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgaWQsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIHVpU3RhdGUsXG4gICAgICAgIHZpc1N0YXRlLFxuICAgICAgICAvLyByZWFkT25seSBvdmVycmlkZVxuICAgICAgICByZWFkT25seVxuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLnN0YXRlLmRpbWVuc2lvbnMgfHwge3dpZHRoLCBoZWlnaHR9O1xuICAgICAgY29uc3Qge1xuICAgICAgICBzcGxpdE1hcHMsIC8vIHRoaXMgd2lsbCBzdG9yZSBzdXBwb3J0IGZvciBzcGxpdCBtYXAgdmlldyBpcyBuZWNlc3NhcnlcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWdcbiAgICAgIH0gPSB2aXNTdGF0ZTtcblxuICAgICAgY29uc3QgaXNTcGxpdCA9IGlzU3BsaXRTZWxlY3Rvcih0aGlzLnByb3BzKTtcbiAgICAgIGNvbnN0IHRoZW1lID0gdGhpcy5hdmFpbGFibGVUaGVtZVNlbGVjdG9yKHRoaXMucHJvcHMpO1xuICAgICAgY29uc3QgbG9jYWxlTWVzc2FnZXMgPSB0aGlzLmxvY2FsZU1lc3NhZ2VzU2VsZWN0b3IodGhpcy5wcm9wcyk7XG4gICAgICBjb25zdCBpc0V4cG9ydGluZ0ltYWdlID0gdWlTdGF0ZS5leHBvcnRJbWFnZS5leHBvcnRpbmc7XG4gICAgICBjb25zdCBhdmFpbGFibGVQcm92aWRlcnMgPSB0aGlzLmF2YWlsYWJsZVByb3ZpZGVycyh0aGlzLnByb3BzKTtcblxuICAgICAgY29uc3QgbWFwRmllbGRzID0gbWFwRmllbGRzU2VsZWN0b3IodGhpcy5wcm9wcyk7XG4gICAgICBjb25zdCBzaWRlRmllbGRzID0gc2lkZVBhbmVsU2VsZWN0b3IodGhpcy5wcm9wcywgYXZhaWxhYmxlUHJvdmlkZXJzKTtcbiAgICAgIGNvbnN0IHBsb3RDb250YWluZXJGaWVsZHMgPSBwbG90Q29udGFpbmVyU2VsZWN0b3IodGhpcy5wcm9wcyk7XG4gICAgICBjb25zdCBib3R0b21XaWRnZXRGaWVsZHMgPSBib3R0b21XaWRnZXRTZWxlY3Rvcih0aGlzLnByb3BzLCB0aGVtZSk7XG4gICAgICBjb25zdCBtb2RhbENvbnRhaW5lckZpZWxkcyA9IG1vZGFsQ29udGFpbmVyU2VsZWN0b3IodGhpcy5wcm9wcywgdGhpcy5yb290LmN1cnJlbnQpO1xuICAgICAgY29uc3QgZ2VvQ29kZXJQYW5lbEZpZWxkcyA9IGdlb0NvZGVyUGFuZWxTZWxlY3Rvcih0aGlzLnByb3BzKTtcbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvblBhbmVsRmllbGRzID0gbm90aWZpY2F0aW9uUGFuZWxTZWxlY3Rvcih0aGlzLnByb3BzKTtcblxuICAgICAgY29uc3QgbWFwQ29udGFpbmVycyA9ICFpc1NwbGl0XG4gICAgICAgID8gWzxNYXBDb250YWluZXIgcHJpbWFyeT17dHJ1ZX0ga2V5PXswfSBpbmRleD17MH0gey4uLm1hcEZpZWxkc30gbWFwTGF5ZXJzPXtudWxsfSAvPl1cbiAgICAgICAgOiBzcGxpdE1hcHMubWFwKChzZXR0aW5ncywgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxNYXBDb250YWluZXJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICBwcmltYXJ5PXtpbmRleCA9PT0gMX1cbiAgICAgICAgICAgICAgey4uLm1hcEZpZWxkc31cbiAgICAgICAgICAgICAgbWFwTGF5ZXJzPXtzcGxpdE1hcHNbaW5kZXhdLmxheWVyc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxSb290Q29udGV4dC5Qcm92aWRlciB2YWx1ZT17dGhpcy5yb290fT5cbiAgICAgICAgICA8SW50bFByb3ZpZGVyIGxvY2FsZT17dWlTdGF0ZS5sb2NhbGV9IG1lc3NhZ2VzPXtsb2NhbGVNZXNzYWdlc1t1aVN0YXRlLmxvY2FsZV19PlxuICAgICAgICAgICAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgICAgICAgICAgPEdsb2JhbFN0eWxlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwia2VwbGVyLWdsXCJcbiAgICAgICAgICAgICAgICBpZD17YGtlcGxlci1nbF9fJHtpZH1gfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogYCR7aGVpZ2h0fXB4YFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgcmVmPXt0aGlzLnJvb3R9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8Tm90aWZpY2F0aW9uUGFuZWwgey4uLm5vdGlmaWNhdGlvblBhbmVsRmllbGRzfSAvPlxuICAgICAgICAgICAgICAgIHshdWlTdGF0ZS5yZWFkT25seSAmJiAhcmVhZE9ubHkgJiYgPFNpZGVQYW5lbCB7Li4uc2lkZUZpZWxkc30gLz59XG4gICAgICAgICAgICAgICAgPE1hcHNMYXlvdXQgY2xhc3NOYW1lPVwibWFwc1wiPnttYXBDb250YWluZXJzfTwvTWFwc0xheW91dD5cbiAgICAgICAgICAgICAgICB7aXNFeHBvcnRpbmdJbWFnZSAmJiA8UGxvdENvbnRhaW5lciB7Li4ucGxvdENvbnRhaW5lckZpZWxkc30gLz59XG4gICAgICAgICAgICAgICAge2ludGVyYWN0aW9uQ29uZmlnLmdlb2NvZGVyLmVuYWJsZWQgJiYgPEdlb0NvZGVyUGFuZWwgey4uLmdlb0NvZGVyUGFuZWxGaWVsZHN9IC8+fVxuICAgICAgICAgICAgICAgIDxCb3R0b21XaWRnZXRPdXRlciBhYnNvbHV0ZT5cbiAgICAgICAgICAgICAgICAgIDxCb3R0b21XaWRnZXRcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmJvdHRvbVdpZGdldFJlZn1cbiAgICAgICAgICAgICAgICAgICAgey4uLmJvdHRvbVdpZGdldEZpZWxkc31cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyVz17ZGltZW5zaW9ucy53aWR0aH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9Cb3R0b21XaWRnZXRPdXRlcj5cbiAgICAgICAgICAgICAgICA8TW9kYWxDb250YWluZXJcbiAgICAgICAgICAgICAgICAgIHsuLi5tb2RhbENvbnRhaW5lckZpZWxkc31cbiAgICAgICAgICAgICAgICAgIGNvbnRhaW5lclc9e2RpbWVuc2lvbnMud2lkdGh9XG4gICAgICAgICAgICAgICAgICBjb250YWluZXJIPXtkaW1lbnNpb25zLmhlaWdodH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0dsb2JhbFN0eWxlPlxuICAgICAgICAgICAgPC9UaGVtZVByb3ZpZGVyPlxuICAgICAgICAgIDwvSW50bFByb3ZpZGVyPlxuICAgICAgICA8L1Jvb3RDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ga2VwbGVyR2xDb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFrZU1hcERpc3BhdGNoVG9Qcm9wcykod2l0aFRoZW1lKEtlcGxlckdMKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUgPSB7fSwgcHJvcHMpIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5wcm9wcyxcbiAgICB2aXNTdGF0ZTogc3RhdGUudmlzU3RhdGUsXG4gICAgbWFwU3R5bGU6IHN0YXRlLm1hcFN0eWxlLFxuICAgIG1hcFN0YXRlOiBzdGF0ZS5tYXBTdGF0ZSxcbiAgICB1aVN0YXRlOiBzdGF0ZS51aVN0YXRlLFxuICAgIHByb3ZpZGVyU3RhdGU6IHN0YXRlLnByb3ZpZGVyU3RhdGVcbiAgfTtcbn1cblxuY29uc3QgZGVmYXVsdFVzZXJBY3Rpb25zID0ge307XG5cbmNvbnN0IGdldERpc3BhdGNoID0gKGRpc3BhdGNoLCBwcm9wcykgPT4gZGlzcGF0Y2g7XG5jb25zdCBnZXRVc2VyQWN0aW9ucyA9IChkaXNwYXRjaCwgcHJvcHMpID0+IHByb3BzLmFjdGlvbnMgfHwgZGVmYXVsdFVzZXJBY3Rpb25zO1xuXG4vKiogQHR5cGUgeygpID0+IGltcG9ydCgncmVzZWxlY3QnKS5PdXRwdXRQYXJhbWV0cmljU2VsZWN0b3I8YW55LCBhbnksIGFueSwgYW55Pn0gKi9cbmZ1bmN0aW9uIG1ha2VHZXRBY3Rpb25DcmVhdG9ycygpIHtcbiAgcmV0dXJuIGNyZWF0ZVNlbGVjdG9yKFtnZXREaXNwYXRjaCwgZ2V0VXNlckFjdGlvbnNdLCAoZGlzcGF0Y2gsIHVzZXJBY3Rpb25zKSA9PiB7XG4gICAgY29uc3QgW3Zpc1N0YXRlQWN0aW9ucywgbWFwU3RhdGVBY3Rpb25zLCBtYXBTdHlsZUFjdGlvbnMsIHVpU3RhdGVBY3Rpb25zLCBwcm92aWRlckFjdGlvbnNdID0gW1xuICAgICAgVmlzU3RhdGVBY3Rpb25zLFxuICAgICAgTWFwU3RhdGVBY3Rpb25zLFxuICAgICAgTWFwU3R5bGVBY3Rpb25zLFxuICAgICAgVUlTdGF0ZUFjdGlvbnMsXG4gICAgICBQcm92aWRlckFjdGlvbnNcbiAgICBdLm1hcChhY3Rpb25zID0+IGJpbmRBY3Rpb25DcmVhdG9ycyhtZXJnZUFjdGlvbnMoYWN0aW9ucywgdXNlckFjdGlvbnMpLCBkaXNwYXRjaCkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgIG1hcFN0YXRlQWN0aW9ucyxcbiAgICAgIG1hcFN0eWxlQWN0aW9ucyxcbiAgICAgIHVpU3RhdGVBY3Rpb25zLFxuICAgICAgcHJvdmlkZXJBY3Rpb25zLFxuICAgICAgZGlzcGF0Y2hcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbWFrZU1hcERpc3BhdGNoVG9Qcm9wcygpIHtcbiAgY29uc3QgZ2V0QWN0aW9uQ3JlYXRvcnMgPSBtYWtlR2V0QWN0aW9uQ3JlYXRvcnMoKTtcbiAgY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoLCBvd25Qcm9wcykgPT4ge1xuICAgIGNvbnN0IGdyb3VwZWRBY3Rpb25DcmVhdG9ycyA9IGdldEFjdGlvbkNyZWF0b3JzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uZ3JvdXBlZEFjdGlvbkNyZWF0b3JzLFxuICAgICAgZGlzcGF0Y2hcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBtYXBEaXNwYXRjaFRvUHJvcHM7XG59XG5cbi8qKlxuICogT3ZlcnJpZGUgZGVmYXVsdCBrZXBsZXIuZ2wgYWN0aW9ucyB3aXRoIHVzZXIgZGVmaW5lZCBhY3Rpb25zIHVzaW5nIHRoZSBzYW1lIGtleVxuICovXG5mdW5jdGlvbiBtZXJnZUFjdGlvbnMoYWN0aW9ucywgdXNlckFjdGlvbnMpIHtcbiAgY29uc3Qgb3ZlcnJpZGVzID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIHVzZXJBY3Rpb25zKSB7XG4gICAgaWYgKHVzZXJBY3Rpb25zLmhhc093blByb3BlcnR5KGtleSkgJiYgYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBvdmVycmlkZXNba2V5XSA9IHVzZXJBY3Rpb25zW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsuLi5hY3Rpb25zLCAuLi5vdmVycmlkZXN9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBLZXBsZXJHbEZhY3Rvcnk7XG4iXX0=