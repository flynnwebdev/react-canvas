import React from "react";
import ColorSelector from "./ColorSelector";

const styles = {
    border: "6px solid black"
}

class Canvas extends React.Component {
  state = {
      hex: "#ff0000",
      coords: null
  };

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()  
  }
    
  onInputChange = e => {
    this.setState({ hex: e.target.value });
  };
    
    onMouseMove = e => {
        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY
        const { coords } = this.state

        if (x > 0 && x < 400 && y > 0 && y < 400) {
            if (coords) {
                this.context.beginPath()
                this.context.moveTo(coords[0], coords[1])
                this.context.lineTo(x, y)
                this.context.closePath()
                this.context.stroke()
                this.setState({ coords: [x, y] })
            }
        } else {
            this.setState({ coords: null })
        }
    }
    
    onMouseDown = e => {
        this.setState({
            coords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
        })
    }

    onMouseUp = e => {
        this.setState({ coords: null })
    }
    
    componentDidUpdate() {
        this.context = this.canvasRef.current.getContext('2d')
        this.context.strokeStyle = this.state.hex
        this.context.lineJoin = "round"
        this.context.lineWidth = 3
    }

  render() {
    return (
      <div>
        <div>
          <ColorSelector
            onInputChange={this.onInputChange}
            hex={this.state.hex}
          />
        </div>
            <canvas
                ref={this.canvasRef}
                width="400"
                height="400"
                style={styles}
                onMouseMove={this.onMouseMove}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
            />
      </div>
    );
  }
}

export default Canvas;
