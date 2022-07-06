import React, { Component } from 'react'
import ProductService from '../services/ProductService';
import HeaderComponent from './HeaderComponent';
import LeftNavBar from './elements/LeftNavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            price: '',
            unit: '',
            description: '',
            messageName:"",
            messagePrice:"",
            messageUnit:""
        };
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeUnitHandler = this.changeUnitHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
    }
   
    componentDidMount() {
        if (this.state.id === '_add') {
            return
        } else {

            ProductService.getProductById(this.state.id).then((res) => {
                let product = res.data.data;
                this.setState({
                    name: product.name,
                    price: product.price,
                    unit: product.unit,
                    description: product.description
                });
            });
        }
    }
    getNotice() {
        if (this.state.id === '_add') {
            return "The product has been created successfully"
        } else {
            return "The product has been successfully updated"
        }
    }
    
    notify = () => toast.success(this.getNotice(), {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: this.cancel.bind(this)
    });
    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = { name: this.state.name, price: this.state.price, unit: this.state.unit, description: this.state.description };

        if (this.state.id === '_add') {
            ProductService.createProduct(product).then(res => {
                if(res.data.message === "Data invalid"){
                    if(res.data.errors.name!=undefined ){          
                        this.setState({messageName: res.data.errors.name[0]})
                    }
                    else{
                        this.setState({messageName: ""})
                    }
                    if(res.data.errors.price!=undefined ){
                        this.setState({messagePrice:res.data.errors.price[0]})
                    }
                    else{
                        this.setState({messagePrice: ""})
                    }
                    if(res.data.errors.unit!=undefined ){
                        this.setState({messageUnit: res.data.errors.unit[0]})
                    }
                    else{
                        this.setState({messageUnit: ""})
                    }
                }
                if(res.data.message === "OK"){
                    this.setState({messageName: ""})
                    this.setState({messagePrice: ""})
                    this.setState({messageUnit: ""})
                    this.notify();
                }
               
            });
            
        } else {
            ProductService.updateProduct(product, this.state.id).then(res => {  
                if(res.data.message === "Data invalid"){
                    if(res.data.errors.name!=undefined ){          
                        this.setState({messageName: res.data.errors.name[0]})
                    }
                    else{
                        this.setState({messageName: ""})
                    }
                    if(res.data.errors.price!=undefined ){
                        this.setState({messagePrice:res.data.errors.price[0]})
                    }
                    else{
                        this.setState({messagePrice: ""})
                    }
                    if(res.data.errors.unit!=undefined ){
                        this.setState({messageUnit: res.data.errors.unit[0]})
                    }
                    else{
                        this.setState({messageUnit: ""})
                    }
                }
                if(res.data.message === "OK"){
                    this.setState({messageName: ""})
                    this.setState({messagePrice: ""})
                    this.setState({messageUnit: ""})
                    this.notify();
                }
            });
        }
        
       
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changePriceHandler = (event) => {
        this.setState({ price: event.target.value });
    }

    changeUnitHandler = (event) => {
        this.setState({ unit: event.target.value });
    }
    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }

    cancel() {
        if (this.state.id === '_add') {
            return  this.props.history.push('/');
        } 
        else {
            return  this.props.history.push(`/product/${this.state.id}`);
        }
        
    }
    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Product</h3>
        } else {
            return <h3 className="text-center">Update Product</h3>
        }
    }
    getpModal() {
        if (this.state.id === '_add') {
            return "create"
        } else {
            return "save change"
        }
    }

    render() {
        return (
            <div className="container nav-md body">
                <div className="main_container">
                    <LeftNavBar />
                    <HeaderComponent />
                    <div className="right_col" role="main">
                        <div className="">
                            <div className="page-title">
                                <div className="title_left">
                                    <h3>Products</h3>
                                </div>
                                <ToastContainer
                                    position="top-right"
                                    autoClose={1000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                />
                                <div className="title_right">
                                    <div className="col-md-5 col-sm-5 form-group pull-right top_search">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search for..." />

                                            <span className="input-group-btn">
                                                <button className="btn btn-default" type="button">Go!</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="x_panel">
                                        <div className="x_content">
                                            <form className="" action="" method="post" noValidate>

                                                <span className="section">
                                                    {
                                                        this.getTitle()                                               
                                                    }
                                                </span>
                                               
                                                <div className="field item form-group">
                                                    <label className="col-form-label col-md-3 col-sm-3  label-align">Name Product  {this.messageName}<span className="required">*</span></label>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="alret-field">{this.state.messageName}</div>
                                                        <input className="form-control" value={this.state.name} onChange={this.changeNameHandler} data-validate-length-range="6" data-validate-words="2" name="name" placeholder="ex. Quần short " required="required" />
                                                    </div>
                                                </div>
                                                <div className="field item form-group">
                                                    <label className="col-form-label col-md-3 col-sm-3  label-align">Price<span className="required">*</span></label>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="alret-field">{this.state.messagePrice}</div>
                                                        <input className="form-control optional" value={this.state.price} onChange={this.changePriceHandler} name="price" data-validate-length-range="5,15" type="number" />
                                                    </div>
                                                </div>
                                                <div className="field item form-group">
                                                    <label className="col-form-label col-md-3 col-sm-3  label-align">Unit <span className="required">*</span></label>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="alret-field">{this.state.messageUnit}</div>
                                                        <input className="form-control" value={this.state.unit} onChange={this.changeUnitHandler} type="text" name="unit" data-validate-minmax="10,100" required='required' /></div>
                                                </div>
                                                <div className="field item form-group">
                                                    <label className="col-form-label col-md-3 col-sm-3  label-align">Description<span className="required">*</span></label>
                                                    <div className="col-md-6 col-sm-6">
                                                        <textarea className="form-control date" value={this.state.description} onChange={this.changeDescriptionHandler} type="text" name="description" rows={10} required='required' /></div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="col-md-6 offset-md-3">
                                                        <button type="button" data-toggle="modal" data-target=".ModalCreate" className="btn btn-success">Submit</button>
                                                        <button type='reset' onClick={this.resetInput} className="btn btn-warning">Reset</button>
                                                    </div>
                                                    <div className="col-md-12 ">
                                                    <button onClick={this.cancel.bind(this)} className="btn btn-primary">Back</button>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="modal fade ModalCreate" tabIndex="-1" role="dialog" aria-hidden="true">
                                                <div className="modal-dialog modal-md">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <div className="modal-title" id="myModalLabel2">
                                                                {
                                                                    this.getTitle()
                                                                }
                                                            </div>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p>Are you sure you want to {this.getpModal()} the product?</p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            <button type='submit' className="btn btn-primary" data-dismiss="modal"  onClick={this.saveOrUpdateProduct}>Yes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default CreateProductComponent;
