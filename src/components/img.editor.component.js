import React from "react";
import TestImg from '../assets/img/test_img.png'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class ImgEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ctx: null,
            x: null,
            y: null,
            tmpX: null,
            tmpY: null,
            isDrawing: false,
            rectangles: [],
            img: null,
            ctxWidth: 0,
            ctxHeight: 0,
            XzoomCoefficient: 0,
            YzoomCoefficient: 0,
            ctxBorderColor: props.borderColor || 'green',
            ctxBackColor: props.backColor || 'black',
            ctxFontColor: props.fontColor || 'white',
            ctxBorder: props.border || 5,
            coef: 1,
            error: ''
        };
    }

    componentDidMount() {
        this.initializeCanvas()
    }

    initializeCanvas = () => {
        let ctx = this.refs.canvas.getContext('2d')
        const img = this.refs.image
        const canvasWrapper = this.refs.canvasWrapper
        let windowWidth = window.innerWidth
        let heightOffset = this.getOffset(canvasWrapper)

        ctx.font = "30px Arial";

        img.onload = () => {
            let coef = img.width / windowWidth
            let ctxHeight = img.height / coef

            this.setState((state) => ({
                ...state,
                ctx,
                img,
                coef,
                ctxWidth: windowWidth,
                ctxHeight,
                YzoomCoefficient: heightOffset
            }))
        }
    }

    setPoint = (event) => {
        if (this.state.isDrawing) {
            let x = event.pageX - this.state.XzoomCoefficient, y = event.pageY - this.state.YzoomCoefficient
            let { width, height } = this.calcWidthAndHeight(this.state.x, x, this.state.y, y)
            let id = this.state.rectangles.length + 1

            this.drawRectangle(this.state.x, this.state.y, width, height, id)

            let rectangles = this.state.rectangles
            rectangles.push({
                id,
                x: this.state.x * this.state.coef,
                y: this.state.y * this.state.coef,
                x2: x * this.state.coef,
                y2: y * this.state.coef,
                label: '',
                regex: ''
            })

            this.setState((state) => ({
                ...state,
                x: null,
                y: null,
                tmpX: null,
                tmpY: null,
                isDrawing: !state.isDrawing,
                rectangles
            }))
        } else {            
            let x = event.pageX - this.state.XzoomCoefficient, y = event.pageY - this.state.YzoomCoefficient;
        
            this.setState((state) => ({
                ...state,
                x,
                y,
                isDrawing: !state.isDrawing
            }))

            this.state.ctx.fillStyle = this.state.ctxBorderColor;
            this.state.ctx.fillRect(x,y,10,10);
        }
    }

    drawRectangle(x, y, width, height, text) {
        // Clear aria before
        this.state.ctx.clearRect(
            x,
            y,
            width,
            height
        );

        const border = this.state.ctxBorder
        this.state.ctx.fillRect(x, y, width, height);
        this.state.ctx.clearRect(x + border, y + border, width - (border * 2), height - (border * 2));
        
        let ctx = this.state.ctx
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = this.state.ctxBackColor
        this.setState((state) => ({
            ...state,
            ctx
        }))
        ctx.fillRect(x + border, y + border, width - (border * 2), height - (border * 2));

        const prevColor = this.state.ctxBorderColor;

        ctx.globalAlpha = 1.0;
        ctx.font = "40px Arial";
        ctx.fillStyle = this.state.ctxFontColor;

        this.setState((state) => ({
            ...state,
            ctx
        }))

        this.state.ctx.fillText(`${text}`, x + Math.round(width / 2) - 10, y + Math.round(height / 2) + 7);

        ctx.fillStyle = prevColor;
        this.setState((state) => ({
            ...state,
            ctx
        }))
    }

    omPointerMove = (event) => {
        if (!this.state.isDrawing) {
            return
        }
        let tmpX = event.pageX - this.state.XzoomCoefficient, tmpY = event.pageY - this.state.YzoomCoefficient
        
        if (this.state.tmpX && this.state.tmpY) {
            let { width, height } = this.calcWidthAndHeight(this.state.x, this.state.tmpX, this.state.y, this.state.tmpY)

            this.state.ctx.clearRect(
                this.state.x,
                this.state.y,
                width + this.state.ctxBorder,
                height + this.state.ctxBorder
            );
        }

        this.setState((state) => ({
            ...state,
            tmpX,
            tmpY
        }))
        
        this.drawBorder(this.state.x, this.state.y, tmpX, tmpY)
    }

    calcWidthAndHeight(x1, x2, y1, y2) {
        let width = Math.abs(x1 - x2), height = Math.abs(y1 - y2)
        return {
            width,
            height
        }
    }

    drawBorder = (x1, y1, x2, y2) => {
        let { width, height } = this.calcWidthAndHeight(x1, x2, y1, y2)
        let border = this.state.ctxBorder, borderX2 = border * 2

        if (this.state.isDrawing) {
            this.state.ctx.fillRect(x1, y1, width, height);
            this.state.ctx.clearRect(x1 + border, y1 + border, width - borderX2, height - borderX2);
        }
    }

    getOffset(el) {
        let y = 0;

        while(el != null) {
            y += el.offsetTop;
            el = el.offsetParent;
        }

        return y;
    }

    handleInput = (event) => {
        const input  = event.target,
            value = input.value,
            type = input.dataset.type,
            id = input.dataset.id

        const recIndex = this.state.rectangles.findIndex(rec => rec.id == id)

        if (recIndex !== -1) {
            const updatedRectangle = this.state.rectangles[recIndex]
            updatedRectangle[type] = value

            const rectangles = this.state.rectangles
            rectangles[recIndex] = updatedRectangle

            this.setState((state) => ({
                ...state,
                rectangles
            }))
        }
    }

    validateInputs = () => {
        const validRectangles = this.state.rectangles.filter(rec => {
            return rec.label.length >= 3
        })

        return validRectangles.length === this.state.rectangles.length
    }

    handleSubmit = () => {
        const isValid = this.validateInputs()
        
        if (isValid) {

        } else {
            this.setState((state) => ({
                ...state,
                error: 'All labels are required!'
            }))
        }
    }

    render() {
        return (
            <div>
                <div className="canvas-wrapper" ref="canvasWrapper">
                    <canvas
                        ref="canvas"
                        onClick={this.setPoint}
                        width={this.state.ctxWidth} height={this.state.ctxHeight}
                        style={{ background: '../assets/img/test_img.png' }}
                        onPointerMove={this.omPointerMove}
                    />
                    <img ref="image" src={TestImg} className="d-none" />
                </div>
                <div className="row m-0">
                    { this.state.rectangles.map(rec => {
                        return <div key={rec.id} className="col-md-3">
                                    <form>
                                        <div className="form-group">
                                        <h4>Aria #{rec.id}</h4>
                                        <label>Label (required)</label>
                                        <input type="text" onChange={this.handleInput} className="form-control" data-id={`${rec.id}`} data-type="label" placeholder="Field 1"></input>
                                        <label>Regex (optional)</label>
                                        <input type="text" onChange={this.handleInput} className="form-control" data-id={`${rec.id}`} data-type="regex" placeholder="%^abc%"></input>
                                        <small className="form-text text-muted">Regular expression for the data</small>
                                        </div>
                                    </form>
                                </div>
                    }) }
                </div>
                { this.state.rectangles.length > 0 && 
                    <div className="row m-0">
                        { this.state.error &&
                            <div className="alert alert-danger text-center col-10 offset-1 mb-2 mt-2" role="alert">
                                {this.state.error}
                            </div>
                        }
                        <div className="col-md-2 text-center offset-md-5 mb-4 mt-2">
                            <button type="button" className="btn btn-success" onClick={this.handleSubmit}>Finish</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default ImgEditor