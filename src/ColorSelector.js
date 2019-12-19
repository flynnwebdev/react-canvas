import React from "react"

class ColorSelector extends React.Component {

    componentDidUpdate() {
        console.log(`LOG: ${new Date()} - User picked color: ${this.props.hex}`)
    }

    render() {
        const { hex } = this.props

        return (
            <input type="color" value={hex} onChange={this.props.onInputChange} />
        )
    }

    static defaultProps = {
        hex: "#ff0000"
    }
}

export default ColorSelector