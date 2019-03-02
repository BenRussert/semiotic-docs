A frame that displays continuous data along the _ordinal_(categorical) and _range_(numerical) axes. Examples include [bar charts](/guides/bar-chart), [pie charts](/guides/pie-chart), [violin plots](/guides/ordinal-summaries), and [timelines](/guides/examples/timeline)

`<OrdinalFrame>` charts render [pieces](#piece-rendering) and [summaries](#summary-rendering).

`OrdinalFrame` data elements are accessible by tabbing to the data group (pieces or summaries) and hitting enter to arrow-key navigate through the data elements.

```jsx
import OrdinalFrame from "semiotic/lib/OrdinalFrame"

export default () => (
  <OrdinalFrame
    data={[
      { department: "art", students: 50 },
      { department: "science", students: 8 }
    ]}
    style={{ fill: "blue" }}
    rAccessor={"students"}
    oAccessor={"department"}
  />
)
```

**Table of Contents**

- [General Properties](#general-properties)
  - [size: {[_width_, _height_]}](#size-width--height-)
  - [rAccessor: {_string_ | _function_}](#raccessor-string--function-)
  - [oAccessor: {_string_ | _function_}](#oaccessor-string--function-)
  - [oSort: {_function_}](#osort-function-)
  - [projection: {_string_}](#projection-string-)
  - [title: {_string_ | _JSX_}](#title-string--jsx-)
  - [margin: {_number_ | _object_}](#margin-number--object-)
  - [rScaleType: {_d3-scale_}](#rscaletype-d3-scale-)
  - [oScaleType: {_d3-scale_}](#oscaletype-d3-scale-)
  - [rExtent: {[_min_, _max_]}](#rextent-min--max-)
  - [invertR: bool](#invert-bool)
  - [data: {[ { column: "a", value: 5 }, { column: "b", value: 3 } ...]}](#data-column-a-value-5-column-b-value-3)
  - [oPadding: { _number_ }](#opadding-number-)
  - [dynamicColumnWidth: { _string_ | \_func}](#dynamicColumnWidth-string--func-)
- [Piece Rendering](#piece-rendering)
  - [type { _string_ | _object_ | _func_ }](#type-string-object-func-)
  - [style: { _object_ | _function_ }](#style-object--function-)
  - [pieceClass: { _string_ | _function_ }](#piececlass-string--function-)
- [Summary Rendering](#summary-rendering)
  - [summaryType { _string_ | _object_ | _func_ }](#summarytype-_string--object--func-)
  - [summaryStyle: { _object_ | _function_ }](#summarystyle-object--function-)
  - [summaryClass: { _string_ | _function_ }](#summaryclass-string--function-)
  - [summaryPosition: { _function_ }](#summaryposition-function-)
- [Annotation and Decoration](#annotation-and-decoration)
  - [tooltipContent: { _function_ }](#tooltipcontent-function-)
  - [axis: { _object_ }](#axis-object-)
  - [oLabel: { _bool_ | _function_ }](#olabel-bool--function-)
  - [annotations: { _array_ }](#annotations-array-)
  - [svgAnnotationRules: { _function_ }](#svgannotationrules-function-)
  - [htmlAnnotationRules: { _function_ }](#htmlannotationrules-function-)
  - [backgroundGraphics: { _array_ | _JSX_ }](#backgroundgraphics-array--jsx-)
  - [foregroundGraphics: { _array_ | _JSX_ }](#foregroundgraphics-array--jsx-)
- [Interaction](#interaction)
  - [hoverAnnotation: { _bool_ }](#hoverannotation-bool-)
  - [pieceHoverAnnotation: { _bool_ | _object_ }](#piecehoverannotation-bool--object-)
  - [customHoverBehavior: { _function_ }](#customhoverbehavior-function-)
  - [customClickBehavior: { _function_ }](#customclickbehavior-function-)
  - [customDoubleClickBehavior: { _function_ }](#customdoubleclickbehavior-function-)
  - [interaction: { _object_ }](#interaction-object-)
- [Miscellaneous](#miscellaneous)
  - [name: { _string_ }](#name-string-)
  - [position: { _array_ }](#position-array-)
  - [additionalDefs: { _JSX_ }](#additionaldefs-jsx-)
  - [download: { _bool_ }](#download-bool-)
  - [downloadFields: { _array_ }](#downloadfields-array-)

## General Properties

### size: {[_width_, _height_]}

If _size_ is specified, sets the width and height of the frame from the array of values. The array must contain two numbers which represents the width and height, respectively. Size defaults to `[500,500]`.

```jsx
<OrdinalFrame size={[500, 500]} />
```

### rAccessor: { _string_ | _function_ }

Determines how _range_ values are accessed from the data array.

```jsx
/*String option
e.g. data=[{value: 1, column: 1}, {value: 4, column: 2}, ... ]*/
<OrdinalFrame rAccessor={"value"} />

/*Function option
e.g. data=[[1, "art"], [2, "science"], ... ]*/
<OrdinalFrame rAccessor={d => d[0]} />
```

### oAccessor: { _string_ | _function_ }

Determines how _ordinal_ values are accessed from the data array.

```jsx
/*String option
e.g. data=[{value: 1, column: 1}, {value: 4, column: 2}, ... ]*/
<OrdinalFrame oAccessor={"column"} />

/*Function option
e.g. data=[[1, "art"], [2, "science"], ... ]*/
<OrdinalFrame oAccessor={d => d[1]} />
```

### oSort: { _function_ }

If _oSort_ is specified, sets the sorting function of the columns. By default, the columns are sorted based on data order (the first item of a particular ordinal value will be the first column). The function sent to _sortO_ is a simple array sorting function that takes the string name of ordinal values.

```jsx
//sorts by alphabetical order
<OrdinalFrame oSort={(a, b) => a < b} />
```

### projection: { _string_ }

If _projection_ is specified, sets the orientation of the chart. The three possible options are "horizontal", "vertical" or "radial". Defaults to "vertical".

```jsx
<OrdinalFrame projection={"horizontal"} />
```

### title: { _string_ | _JSX_ }

Centers this title at the top of the chart.

```jsx
/*String option*/
<OrdinalFrame title={"Chart Title"} />

/*JSX option*/
<OrdinalFrame title={<g><circle r={5} /><text>Chart Title</text></g>} />
```

### margin: { _number_ | _object_ }

The margin can be set to one number, which is applied equally to all sides, or as an object.

```jsx
/*Single number option*/
<OrdinalFrame margin={10} />

/*Object option*/
<OrdinalFrame margin={{ top: 5, bottom: 10, left: 15, right: 20 }} />
```

### rScaleType: { _d3-scale_ }

Custom [d3-scale](https://github.com/d3/d3-scale#d3-scale) for the range. Defaults to [scaleLinear()](https://github.com/d3/d3-scale#scaleLinear).

```jsx
<OrdinalFrame rScaleType={d3.scaleTime()} />
```

### oScaleType: { _d3-scale_ }

Custom [D3 scale](https://github.com/d3/d3-scale#d3-scale) for the ordinal values.

```jsx
<OrdinalFrame oScaleType={d3.scaleThreshold()} />
```

### rExtent: { [_min_, _max_] | _object_ }

If _rExtent_ is specified, sets the _min_ and/or _max_ value(s) for the _range_. The array may contain two numbers, or it can contain a number and an `undefined` value, if you only want to set the min or max extent.

The extent exposes an `onChange` callback function that updates with the calculated extent value.

```jsx
/*min and max values set*/
<OrdinalFrame rExtent={[20,250]} />

/*only min value set*/
<OrdinalFrame rExtent={[20, undefined]} />

/*log calculated extent*/
<OrdinalFrame rExtent={{ onChange: d => console.log("calculated extent: ", d) }} />

/*log calculated extent and set extent*/
<OrdinalFrame
   rExtent={{ extent: [20, undefined], onChange: d => console.log("calculated extent: ", d) }} />
```

### invertR: { _bool_ }

Inverts the _range_ axis such that the _min_ and _max_ values are transposed.

### data: { _array_ }

An array of objects or numerical values used to render both summary and piece visualizations in `OrdinalFrame`. The column of the data is based on its oAccessor value, while its position or height is determined by its rAccessor value.

```jsx
<OrdinalFrame data={[{ column: "a", value: 5 }, { column: "b", value: 3 }]} />
```

### oPadding: { _number_ }

The distance in pixels between each column.

```jsx
<OrdinalFrame oPadding={5} />
```

### dynamicColumnWidth: { _string_ | _func_ }

If _dynamicColumnWidth_ is specified, sets the column width of the frame based on the data. If a string, then columnWidth is proportionate to the total value of the string property for each column, for instance used in the [Marimekko Chart](/examples/marimekko-chart) example where bar width is based on the total value for that bar. If set to a function, the function is passed an array of pieces in that column which you can measure in any way you want.

```jsx
/*String option*/
<OrdinalFrame dynamicColumnWidth={"value"} />

/*Function option*/
<OrdinalFrame dynamicColumnWidth={pieces => max(pieces.map(p => p.value))} />
```

### pixelColumnWidth: { _number_ }

If _pixelColumnWidth_ is specified, the row (in the case of horizontal) or column (in the case of vertical) size will be fixed to the number specified. The corresponding `size` setting will be ignored as the height or width of the chart will be based on the number of columns times the set value.

```jsx
<OrdinalFrame pixelColumnWidth={40} />
```

## Piece Rendering

"Piece" refers to the individual components of data visualization forms like bar charts and swarm plots. A "piece" of a bar chart is a segment in a stacked bar chart or the entire bar of a simple bar chart, or one of the circles in a swarm plot.

### type { _string_ | _object_ | _func_ }

A string (`"bar"`, `"timeline"`, `"clusterbar"`, `"swarm"`, `"point"`, `"none"`) or object with `type` equal to one of those strings to use method-specific options such as `{ type: "swarm", r: 8 }`, or a function that takes data and the OrdinalFrame calculated settings and creates JSX elements. See the Waterfall Chart in the interactive examples to see how to use custom type functions.

```jsx
// basic
<OrdinalFrame type="bar" />

// with options
<OrdinalFrame type={{ type: "swarm", r: 20, customMark: d => <circle r={20} fill: "red" /> }} />
```

- Shared settings
  - `customMark`: Takes a function that is passed `(d,i,{ ...drawingProps, baseMarkProps, renderMode, styleFn, classFn, adjustedSize, chartSize, margin })` and should return JSX SVG. The drawing props vary depending on whether it's a circle (like swarm plots) or a rectangle (like bar charts).
- `"timeline"`, `"bar"`, `"clusterbar"` shared features
  - `innerRadius`: Only honored in `"radial"` projection. Determines the pixel radius of the inside cutout (for donut-style charts).
  - `offsetAngle`: Only honored in `"radial"` projection. The rotation, in degrees, of the rendered pie chart (so you could make the initial slice face down by setting it to `180`).
  - `angleRange`: Only honored in `"radial"` projection. The start and end angle of the chart, so you could set it to `[30, 330]` if you wanted a small gap in your pie chart. Defaults to `[0, 360]`
- `"bar"`, `"clusterbar"` shared features
  - `icon`: Only honored in `"vertical"` and `"horizontal"` projection. Is the `d` attribute of a path or a function that takes the datapoint and returns the `d` attribute of an SVG path and uses it to render an ISOTYPE style bar chart.
  - `iconPadding`: Only honored in an icon bar chart. The amount of space between icons in pixels. Defaults to 1.
  - `resize`: Only honored in an icon bar chart. If set to `"auto"`, an icon is stretched to fit the width (for vertical) or height (for horizontal) of a bar or, if set to `"fixed"`, fills the bar with icons at its native size. Defaults to `"auto"`.
- `"point"`, `"swarm"` shared features
  - `r`: A number or a function that takes the data for a piece and returns a number that is the size of the piece. Defaults to 3 in `point` mode and a dynamic size based on the density of points in a column in `swarm` mode.
- `"swarm"`
  - `iterations`: Beeswarm uses a force simulation under the hood, this determines how long it runs. Default is 120.
  - `strength`: Strength of the anchoring force, defaults to 2, if set higher, points will cluster more along the axis indicating their value, but spread out farther, if set lower, points will drift away from their true value more, but present a more compact beeswarm.

### style: { _object_ | _function_ }

A React style object or a function taking a single datapoint and returning a React style object. This is applied to each piece.

```jsx
// object
<OrdinalFrame style={{ fill: "red" }} />

// function
<OrdinalFrame style={d => ({ fill: d.color })} />
```

### pieceClass: { _string_ | _function_ }

A string or function that takes a piece and returns a string that is assigned to that piece's class.

```jsx
// object
<OrdinalFrame pieceClass="cool-piece" />

// function
<OrdinalFrame pieceClass={d => d.classSettings} />
```

## Summary Rendering

"Summary" refers to a complex visual element that summarizes all of the datapoints that fall within a particular column. These can be single shapes, like a violin plot, or multiple pieces, like a histogram or heat map.

### summaryType { _string_ | _object_ | _func_ }

A string (`"heatmap"`, `"boxplot"`, `"histogram"`, `"joy"`, `"contour"`, `"violin"`) or object with `type` equal to one of those strings (with further method-specific settings such as `{ type: "contour", bandwidth: 15 }` or `{ type: "joy", amplitude: 30 }`, or a function that takes data and the OrdinalFrame calculated settings and creates JSX elements. See [[summaryType Advanced Settings]] for more details on how to use the extended settings.

- Custom Settings for ORFrame Summary Types

As with other data visualization types in the various frames, [[ORFrame]] will let you send the following strings to summaryType: `"boxplot"`, `"histogram"`, `"heatmap"`, `"violin"`, `"contour"`, `"joy"`. If you want more control over the summary data visualization being rendered, each of these types have additional settings you can adjust based on your use case and which typically expose settings associated with the data transformation method associated with the summary type. To do this, you need to send an object instead of a string, and that object should have a “type” attribute set to the string, so this uses contouring with the default method:

```jsx
<OrdinalFrame summaryType={"contour"} />
```

...while this sends custom settings to adjust the number of contouring thresholds:

```jsx
<OrdinalFrame summaryType={{ type: "contour", thresholds: 5 }} />
```

_For those of you new to React, the reason for double curly brackets is that the first curly brackets are just so we can send JavaScript to JSX and the second curly brackets are because we are instantiating an object._

## Custom Settings by Type

### Shared

All bucketized summaries (violin, joy, histogram, heatmap) share the following:

- `bins`: the number of bins that entries are bucketed into (defaults to 25)
- `binValue`: the value of the bin--the height of the histogram, the width of the violin, the darkness of the heatmap. Defaults to the length of the array of pieces that fall within the bin: `d => d.length` so if you want to total the values use `d => sumFunction(d))`.

### Violin Plot Settings

- `curve`: The `d3-shape` style curve interpolator used for the shape (defaults to `curveCatmullRom`). Not honored in radial projection because the diagonals play have with them.

### Joy Plot Settings

- `curve`: The `d3-shape` style curve interpolator used for the shape (defaults to `curveCatmullRom`). Not honored in radial projection.
- `amplitude`: An amount of pixels to overflow the height into the adjoining column (defaults to `0` which is more like a Joyless Plot if you ask me).

### Contour Settings

Under the hood this implements `d3-contour` and passes these settings through.

- `thresholds`: the number of thresholds for the contouring (defaults to `8`).
- `bandwidth`: the size of the contour bandwidth (defaults to `12`).
- `resolution`: the pixel resolution of the contouring (defaults to `1000`).

### Boxplot Settings

Currently no available custom settings. The boxplot samples the data sent to each column, so you can send a preprocessed array of `[ min, firstQuartile, median, thirdQuartile, max ]` values and generate your own boxplot.

```jsx
// string
<OrdinalFrame summaryType="violin" />

// object
<OrdinalFrame summaryType={{ type: "joy", amplitude: 30 }} />
```

### summaryStyle: { _object_ | _function_ }

A React style object or a function taking a single datapoint and returning a React style object. This is applied to each piece.

```jsx
// object
<OrdinalFrame summaryStyle={{ fill: "red" }} />

// function
<OrdinalFrame summaryStyle={d => ({ fill: d.color })} />
```

### summaryClass: { _string_ | _function_ }

A string or function that takes a piece and returns a string that is assigned to that piece's class.

```jsx
// string
<OrdinalFrame summaryClass="cool-class" />

// function
<OrdinalFrame summaryClass={d => d.customClass} />
```

### summaryPosition: { _function_ }

A function that takes a the `middle` of a `summary`, the `key`, and the index of the summary and returns a value that will be applied across the axis of the projection with `translate` (x for vertical projections, y for horizontal projections).

## Annotation and Decoration

### tooltipContent: { _function_ }

A function returning JSX HTML to display in the tooltip (only active if `hoverAnnotation` or `pieceHoverAnnotation` is set to `true`). The tooltip is passed the array of pieces associated with the column being hovered. The content is placed on and directly above the hovered point, so take that into account when using CSS to style the position and any additional elements. You can drop any HTML into this floating div, including another frame, if you want to have data visualization in your data visualization so you can visualize while you visualize.

```jsx
<OrdinalFrame
  tooltipContent={d => (
    <div className="tooltip-content">
      <p>{d.name}</p>
      <p>{d.value}</p>
    </div>
  )}
/>
```

### axis: { _object_ }

An object that define the range axis. These objects roughly correspond to the options in `d3-axis`, with extended options such as `label`. Use oLabel to set labels for the columns.

```jsx
<OrdinalFrame axis={{ orient: "left" }} />
```

### oLabel: { _bool_ | _function_ | _object_ }

Whether to show a labels for each column (simple boolean `true`) or a function that takes the string value associated with the column (from your oAccessor) and returns JSX centered on the basic title location. Or an object with a `label` prop that can be a bool or a function allowing for more complex placement. Currently this is just an `orient` prop that can be `"right"` or `"top"` to change the label position from the default left (for horizontal) or right (for vertical) or `"stem"` or `"center"` to change a radial label from its default edge as well as a `padding` prop that determines the outset or inset of a label in radial mode.

```jsx
// boolean
<OrdinalFrame oLabel={true} />

// function
<OrdinalFrame oLabel={d => <text fontSize={36}>{d}</text> } />

// object
<OrdinalFrame oLabel={
   { label: true,
     orient: "stem",
     padding: -5  }
} />
```

### annotations: { _array_ }

An array of objects to be processed using the frame's built-in annotation rules or the custom defined rules. See [[Using Annotations]] for more details.

```jsx
<OrdinalFrame
   annotations={[
      { type: "or", valueL 5, category: "tomatoes", label: "5 of these tomatoes" }
   ]}
 />
```

### svgAnnotationRules: { _function_ }

A function that takes an annotation object and returns a JSX SVG element. The function is sent `{ d, i, oScale, rScale, oAccessor, rAccessor, ordinalFrameProps, adjustedPosition, adjustedSize, annotationLayer, ordinalFrameState }`

### htmlAnnotationRules: { _function_ }

A function that takes an annotation object and returns a JSX HTML element. The function is sent `{ d, i, oScale, rScale, oAccessor, rAccessor, ordinalFrameProps, adjustedPosition, adjustedSize, annotationLayer, ordinalFrameState }`. Elements can be placed using CSS `left` and `top` and will overlay on the chart. Internally, the default annotation for tooltips uses this method.

### annotationSettings: { _object_ }

An object with `{ layout, pointSizeFunction, labelSizeFunction }` containing custom annotation settings to enable annotations bumping out of each others' way or placing them in the margins.

### backgroundGraphics: { _array_ | _JSX_ }

A JSX or array of JSX to display behind the chart.

### foregroundGraphics: { _array_ | _JSX_ }

A JSX or array of JSX to display in front of the chart.

## Interaction

### hoverAnnotation: { _bool_ }

Turn on automatic tooltips for each column with a column overlay to improve interaction. Content of the tooltips defaults to the o and r value and can be customized with `tooltipContent`. Tooltip is shown at the max or sum value of the column.

### pieceHoverAnnotation: { _bool_ | _object_ }

Turn on automatic tooltips for individual pieces with a voronoi overlay to improve interaction. Content of the tooltips defaults to the o and r value and can be customized with `tooltipContent`. If you are displaying both pieces and summaries, you can send an object with { onlyPieces: true } to force the overlay to generate based on pieces, otherwise it will default to generating the overlay based on summaries.

### customHoverBehavior: { _function_ }

A function to fire on hover that passes the column or piece being hovered over.

### customClickBehavior: { _function_ }

A function to fire on click that passes the column or piece being hovered over.

### customDoubleClickBehavior: { _function_ }

A function to fire on doubleclick that passes the column or piece being hovered over.

### interaction: { _object_ }

An object passed to the interaction layer that is currently only used to determine whether to activate the column brushes, their settings, and the actions to fire on its start, brush and end events. See the Parallel Coordinates and Brushable Swarm Plot in the interactive examples.

## Miscellaneous

### name: { _string_ }

Used internally to identify frames, which comes in handy when you need to link frames together.

### position: { _array_ }

Just an offset and hardly ever useful

### additionalDefs: { _JSX_ }

JSX to be injected into the visualization layer's SVG `defs`.

### download: { _bool_ }

Enable a download button to download the data as a CSV

### downloadFields: { _array_ }

The field keys to download from each datapoint. By default, the CSV download only shows the o and r values.

Connectors in [[OrdinalFrame]] allow you to draw connections between elements in adjacent columns. The current, limited implementation is a simple test that if it returns true draws a link. This function is run on every piece, and it only tests for links to the next column (left to right in vertical, top to bottom in horizonal and clockwise in radial). For "bar" it draws a filled area, for "point" and "swarm" it draws a line.

You can use this functionality to create slopegraphs or funnel diagrams.

The following code will draw a connection between elements in adjoining columns that has the same `type` value. It will only draw a link to the first matching item in the next column so this cannot be used to draw branching paths or other multi-link connections from one piece to many pieces.

```html
<OrdinalFrame connectorType={d => d.type} connectorStyle={d => ({ fill:
d.source.color })} />
```
