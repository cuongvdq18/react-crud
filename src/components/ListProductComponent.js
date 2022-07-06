import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import HeaderComponent from './HeaderComponent';
import Moment from 'moment';
import axios from 'axios';
import LeftNavBar from './elements/LeftNavBar';
import Pagination from "react-js-pagination";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ListProductComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      IDDelete: "",
      itemCount: 0,
      isLoaded: false,
      currentPage: 1,
    }

    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }
  componentDidMount() {
    var retrievedObject = localStorage.getItem('token');
    const token = retrievedObject;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios.get("http://34.124.251.21:8000/api/v1/admin/products/?page=1", config).then((res) => {
      this.setState({
        products: res.data.data.data,
        itemCount: res.data.data.total
      });

    })
  }
  handlePageChange = pageNumber => {
    var retrievedObject = localStorage.getItem('token');
    const token = retrievedObject;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios.get("http://34.124.251.21:8000/api/v1/admin/products/?page=" + pageNumber, config)
      .then(res => {
        this.setState({ products: res.data.data.data });
      });
    this.setState({ currentPage: pageNumber });
  };


  deleteProduct(id) {
    ProductService.deleteProduct(id).then(res => {
      this.setState({ products: this.state.products.filter(product => product.id !== id) });
    });
  }
  viewProduct(id) {
    this.props.history.push(`/product/${id}`);
  }

  saveAndContinue(id) {
    this.setState({ IDDelete: id })
  }
  addProduct() {
    this.props.history.push('/add-product/_add');
  }

  notify = () => toast.success('Product deleted successfully!!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

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
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                <div className="title_right">
                  <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search for..." />
                      <span className="input-group-btn">
                        <button className="btn btn-secondary" type="button">Go!</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="clearfix"></div>
              <div className="row">
                <div className="col-md-12 col-sm-12  ">
                  <div className="x_panel">
                    <div className="x_title">
                      <h2>List Product</h2>
                      <ul className="nav navbar-right panel_toolbox">
                        <li><button onClick={() => this.addProduct()} className='btn btn-success'><i className="fa fa-plus"></i> New Product</button></li>

                        <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                        </li>
                        <li><a className="close-link"><i className="fa fa-close"></i></a>
                        </li>
                      </ul>
                      <div className="clearfix"></div>
                    </div>

                    <div className="x_content">
                      <div className="table-responsive">
                        <table className="table table-striped jambo_table bulk_action">
                          <thead>
                            <tr className="headings">

                              <th className="column-title"> ID</th>
                              <th className="column-title"> Product Name</th>
                              <th className="column-title"> Price </th>
                              <th className="column-title"> Unit</th>
                              <th className="column-title"> Creater</th>
                              <th className="column-title"> Create Day</th>
                              <th className="column-title"> Updater</th>
                              <th className="column-title"> Update Day</th>
                              <th className="column-title no-link last"><span className="nobr">Action</span>
                              </th>
                              <th className="bulk-actions" colSpan="7">
                                <a className="antoo" >Bulk Actions ( <span className="action-cnt"> </span> ) <i className="fa fa-chevron-down"></i></a>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.products.map((data, i) => {
                                return (
                                  <tr key={i} className="even pointer">
                                    <td className="table-td-center">
                                      {data.id}
                                    </td>
                                    <td className="table-td-center"> {data.name} </td>
                                    <td className="table-td-center"> {data.price}</td>
                                    <td className="table-td-center"> {data.unit}</td>
                                    <td className="table-td-center"> {data.created_user}</td>
                                    <td className="table-td-center"> {data.created_at = Moment().format('DD-MM-YYYY')}</td>
                                    <td className="table-td-center"> {data.updated_user}</td>
                                    <td className="table-td-center"> {data.updated_at = Moment().format('DD-MM-YYYY')}</td>
                                    <td>
                                      <button onClick={() => this.viewProduct(data.id)} className="btn btn-info"><i className="fa fa-info-circle"></i> </button>
                                      <button data-toggle="modal" data-target=".ModalDelete" onClick={() => this.saveAndContinue(data.id)} className="btn btn-danger"><i className="fa fa-trash"></i> </button>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>

                        <Pagination
                          activePage={this.state.currentPage}
                          itemsCountPerPage={25}
                          totalItemsCount={this.state.itemCount}
                          pageRangeDisplayed={1}
                          onChange={this.handlePageChange}
                          breakClassName={'page-item'}

                          breakLinkClassName={'page-link'}
                          containerClassName={'pagination'}
                          pageClassName={'page-item'}
                          pageLinkClassName={'page-link'}
                          previousClassName={'page-item'}
                          previousLinkClassName={'page-link'}
                          nextClassName={'page-item'}
                          nextLinkClassName={'page-link'}
                          activeClassName={'active'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade ModalDelete" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel2">Delete Product</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the product?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { this.deleteProduct(this.state.IDDelete); this.notify() }}>Delete</button>

              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }
}

export default ListProductComponent
