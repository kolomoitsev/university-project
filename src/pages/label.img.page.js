import React from "react";
import TestImg from '../assets/img/test_img.png'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class LabelImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ctx: null,
            x: null,
            y: null,
            isDrawing: false,
            rectangles: [],
            img: null
        };
    }

    componentDidMount() {
        this.initializeCanvas()
    }

    initializeCanvas = () => {
        const ctx = this.refs.canvas.getContext('2d')
        const img = this.refs.image

        img.onload = () => {
            this.setState((state) => ({
                ...state,
                ctx,
                img
            }))

            this.state.ctx.drawImage(img, 0, 0)
        }
    }

    setPoint = (event) => {
        console.log(event)

        if (this.state.isDrawing) {
            let x = event.pageX - 76, y = event.pageY - 2,
                width = x - this.state.x, height = y - this.state.y

            console.log(this.state.x, width)
            this.state.ctx.clearRect(
                this.state.x,
                this.state.y,
                width,
                height
            );

            this.state.ctx.fillRect(this.state.x, this.state.y, width, height);

            this.setState((state) => ({
                ...state,
                x: null,
                y: null,
                isDrawing: !state.isDrawing
            }))
        } else {            
            let x = event.pageX - 76, y = event.pageY - 2;
        
            this.setState((state) => ({
                ...state,
                x,
                y,
                isDrawing: !state.isDrawing
            }))

            this.state.ctx.fillStyle = "green";
            this.state.ctx.fillRect(x,y,10,10);
        }
    }

    reDrawImg = () => {
        let newCtx = this.state.ctx
        newCtx.globalCompositeOperation = 'existing content'

        this.setState((state) => ({
            ...state,
            ctx: newCtx
        }))

        this.state.ctx.drawImage(this.state.img, 0, 0)

        newCtx = this.state.ctx
        this.state.ctx.globalCompositeOperation = 'new content'

        this.setState((state) => ({
            ...state,
            ctx: newCtx
        }))
    }

    drawBorder = (event) => {
        // console.log(event)
        // if (this.state.isDrawing) {
        //     console.log('Drawing')
        //     this.state.ctx.beginPath();
        //     this.state.ctx.moveTo(0, 0);
        //     this.state.ctx.lineTo(300, 150);
        //     this.state.ctx.stroke();
        // }
    }

    render() {
        return (
            <div className="canvas-wrapper">
                <canvas
                    ref="canvas"
                    onClick={this.setPoint}
                    width={1200} height={900}
                    style={{ background: '../assets/img/test_img.png' }}
                    onPointerMove={this.drawBorder}
                 />
                <img ref="image" src={TestImg} className="d-none" />
            </div>
        )
    }
}

export default LabelImg