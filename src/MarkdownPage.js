import React from "react"

import marked from "marked"
const ROOT = process.env.PUBLIC_URL

export default class MarkdownPage extends React.Component {
  state = {}

  componentWillMount() {
    this.getFile(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filename !== this.props.filename) {
      this.setState({ markdown: null })
      this.getFile(nextProps)
    }
  }

  getFile({ filename }) {
    if (filename) {
      const readmePath = `${ROOT}/assets/markdown/${filename}.md`

      fetch(readmePath)
        .then(response => {
          return response.text()
        })
        .then(text => {
          this.setState({
            markdown: marked(text)
          })
          window.Prism.highlightAll()
        })
    }
  }

  render() {
    const { markdown } = this.state

    return (
      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: markdown }}
      />
    )
  }
}