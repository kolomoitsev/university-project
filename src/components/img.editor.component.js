import React from "react";
import axios from 'axios'
import TestImg from '../assets/img/test_img.png'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const token = localStorage.getItem('token')

class ImgEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
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
            error: '',
            name: '',
            lang: '',
            description: '',
            image: '',
            imageName: '',
            loadingFieldIndex: -1
        };

    }

    componentDidMount() {
        const token = localStorage.getItem('token')

        // TODO: replace with good solution
        const id = window.location.pathname.split('/')[2]
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_SERVER}/structures/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            .then( res => {
                const { name, description, lang, image, documentfield_set } = res.data
                const imageName = image.split('/')[4]
                this.setState(prev => ({
                    ...prev,
                    id,
                    name,
                    description,
                    lang,
                    image: `http://127.0.0.1:8000${image}`,
                    imageName,
                    rectangles: documentfield_set
                }))

                this.initializeCanvas()

                setTimeout(() => {
                    this.state.rectangles.forEach((rec, index) => {
                        let min_x = rec.min_x / this.state.coef
                        let min_y = rec.min_y / this.state.coef
                        let { width, height } = this.calcWidthAndHeight(min_x, rec.max_x / this.state.coef, min_y, rec.max_y / this.state.coef)
                        this.drawRectangle(min_x, min_y, width, height, index + 1)
                    })
                }, 1000)
            })
    }

    initializeCanvas = () => {
        let ctx = this.refs.canvas.getContext('2d')
        const img = this.refs.image
        const canvasWrapper = this.refs.canvasWrapper
        let windowWidth = window.innerWidth
        let heightOffset = this.getOffset(canvasWrapper)

        ctx.font = "30px Arial";
        ctx.fillStyle = this.state.ctxBorderColor

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

            const min_x = Math.round(this.state.x * this.state.coef)
            const min_y = Math.round(this.state.y * this.state.coef)
            const max_x = Math.round(x * this.state.coef)
            const max_y = Math.round(y * this.state.coef)

            this.addField({
                name: `Label ${this.state.rectangles.length + 1}`,
                json_name: `label_${this.state.rectangles.length + 1}`,
                side: 'RIGHT',
                min_x,
                min_y,
                max_x,
                max_y,
                structure: this.state.id
            })

            let rectangles = this.state.rectangles
            rectangles.push({
                id,
                min_x,
                min_y,
                max_x,
                max_y,
                name: '',
                regexp: '',
                json_name: '',
                side: ''
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

            //this.state.ctx.fillStyle = this.state.ctxBorderColor;
            this.state.ctx.fillRect(x,y,10,10);
        }
    }

    drawRectangle(x, y, width, height, text) {
        console.log('DRAWING RECTANGLE')

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

    handleFocus =(event) => {
        const input  = event.target,
        type = input.dataset.type,
        id = input.dataset.id

        const recIndex = this.state.rectangles.findIndex(rec => rec.id == id)

        if (recIndex !== -1) {
            const updatedRectangle = this.state.rectangles[recIndex]
            const prevValue = updatedRectangle[type]

            updatedRectangle.prevValue = prevValue

            const rectangles = this.state.rectangles
            rectangles[recIndex] = updatedRectangle

            this.setState((state) => ({
                ...state,
                rectangles,
            }))
        }
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

    saveInput = (event) => {
        const input  = event.target,
        value = input.value,
        type = input.dataset.type,
        id = input.dataset.id

        const recIndex = this.state.rectangles.findIndex(rec => rec.id == id)

        if (recIndex !== -1) {
            this.setState(prev => ({
                ...prev,
                loadingFieldIndex: recIndex
            }))

            const updatedRectangle = this.state.rectangles[recIndex]

            const rectangles = this.state.rectangles
            rectangles[recIndex] = updatedRectangle

            axios({
                method: 'put',
                url: `${process.env.REACT_APP_API_SERVER}/fields/${updatedRectangle.id}/`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: updatedRectangle
                })
                .then( res => {
                    console.log('SAVED', res)
                })
                .catch(err => {
                    updatedRectangle[type] = updatedRectangle.prevValue
                })
                .finally(() => {
                    const rectangles = this.state.rectangles
                    rectangles[recIndex] = updatedRectangle
    
                    this.setState((state) => ({
                        ...state,
                        rectangles,
                        loadingFieldIndex: -1
                    }))
                })
        }
    }

    validateInputs = () => {
        const validRectangles = this.state.rectangles.filter(rec => {
            return rec.label.length >= 3 && rec.jsonName.length
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

    addField(data) {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_SERVER}/fields/`,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            })
            .then( res => {
                console.log(res)
            })
            .catch( error => {
                // TODO: handle error
            })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="form-group ">
                                <label htmlFor="inputTitle">Template name</label>
                                <input type="text" value={this.state.name} className="form-control" id="inputTitle"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDescription">Template description</label>
                                <textarea value={this.state.description} className="form-control" id="inputDescription" rows="3"></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="documentName">Document language</label>
                                <div className="input-group mb-3">
                                    <select disabled={true} defaultValue={this.state.lang} className="custom-select" id="inputGroupSelect04">
                                        <option value="eng">eng</option>
                                        <option value="rus">rus</option>
                                        <option value="de">de</option>
                                    </select>
                                </div>  
                            </div>

                            <div className="form-group">
                                <label htmlFor="documentName">Document name</label>
                                <input type="text" disabled={true} value={this.state.imageName} className="form-control" id="documentName"/>
                            </div>

                            <div className="form-group text-right">
                                <button type="button" className="btn customBtn">Save</button>
                            </div>
                        </div>

                        <div className="col-12">
                            <h2 className="text-center">Document image</h2>
                        </div>
                    </div>
                </div>
                <div className="canvas-wrapper" ref="canvasWrapper" style={{ background: `url(${this.state.image})`, backgroundSize: 'contain' }}>
                    <canvas
                        ref="canvas"
                        onClick={this.setPoint}
                        width={this.state.ctxWidth} height={this.state.ctxHeight}
                        style={{ background: `url(${this.state.image})`, backgroundSize: 'contain' }}
                        onPointerMove={this.omPointerMove}
                    />
                    <img ref="image" src={this.state.image} className="d-none" />
                </div>
                <div className="row m-0">
                    { this.state.rectangles.map((rec, index) => {
                        return <div key={rec.id} className="col-md-3">
                                    <form className="field-form">
                                        {this.state.loadingFieldIndex >= 0 && this.state.loadingFieldIndex == index && <div className="loading">
                                            <div className="spinner-border text-secondary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>} 
                                        <div className="form-group">
                                            <h4>Aria #{rec.id}</h4>
                                            <label>Label (required)</label>
                                            <input type="text" onChange={this.handleInput} onFocus={this.handleFocus} onBlur={this.saveInput} value={rec.name} className="form-control" data-id={`${rec.id}`} data-type="name" placeholder="Field 1"></input>
                                            <label>JSON name (required)</label>
                                            <input type="text" onChange={this.handleInput} onFocus={this.handleFocus} onBlur={this.saveInput} value={rec.json_name} className="form-control" data-id={`${rec.id}`} data-type="json_name" placeholder="json_name"></input>
                                            <label>Side</label>
                                            <div className="input-group mb-3">
                                                <select defaultValue={rec.side} onChange={this.handleInput} onFocus={this.handleFocus} onBlur={this.saveInput} className="custom-select" data-id={`${rec.id}`} data-type="side">
                                                    <option value="RIGHT">right</option>
                                                    <option value="LEFT">left</option>
                                                    <option value="TOP">top</option>
                                                    <option value="BOTTOM">bottom</option>
                                                </select>
                                            </div>
                                            <label>Regexp (optional)</label>
                                            <input type="text" onChange={this.handleInput} onFocus={this.handleFocus} onBlur={this.saveInput}  value={rec.regexp} className="form-control" data-id={`${rec.id}`} data-type="regexp" placeholder="%^abc%"></input>
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
                    </div>
                }
            </div>
        )
    }
}

export default ImgEditor
