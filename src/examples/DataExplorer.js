import React, { Component } from "react"

import DataExplorer, { Display, Toolbar } from "@nteract/data-explorer"

import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/select/lib/css/blueprint-select.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "react-table/react-table.css"
import "react-table-hoc-fixed-columns/lib/styles.css"
import "./nteract.css"

import data from "./happiness-dataresource.json"

export default function Dx() {
  return (
    <DataExplorer data={data}>
      <Display />
      <Toolbar />
    </DataExplorer>
  )
}
