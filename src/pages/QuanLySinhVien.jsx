import React, { Component } from "react";
import Table from "./Table";

export default class QuanLySinhVien extends Component {
  state = {
    formValue: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },

    formError: {
        id: "",
        name:"",
        phone: "",
        email: "",
    },
    
    valid: false,

    arrSV: [
      {
        id: "1",
        name: "Vu Minh Tri",
        phone: "0776812728",
        email: "minhtrivu6199@gmail.com",
      },
    ],
  };

  checkFormValid = () => {
    let {formError, formValue} = this.state;
    for (let key in formError) {
        if (formError[key] !== "" || formValue[key] === "") {
            return false;
        }
    }
    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.checkFormValid()) {
        alert("Form is invalid");
        return;
    }
    
    let arrSV = this.state.arrSV;
    let newArrSV = {...this.state.formValue};
    arrSV.push(newArrSV);
    this.setState({
        arrSV: arrSV,
    })

  };

  handleChangeInput = (e) => {
    let { value, name, type } = e.target;
    let dataType = e.target.getAttribute("data-type");
    let dataMaxLength = e.target.getAttribute("data-max-length");

    let newFormValue = this.state.formValue;

    newFormValue[name] = value;

    let newFormError = this.state.formError;
    let message = "";
    if (value.trim()==="") {
        message = name + " khong duoc de trong!";
    } else {
        if (dataType == "number") {
            let regexPhoneNumber = /^\d+(,\d{1,2})?$/;
            if (!regexPhoneNumber.test(value)) {
                message = name + " is invalid";
            }
        }

        if (dataMaxLength != null && value.length > dataMaxLength){
            message = name + ` khong vuot qua ${dataMaxLength} ky tu!`;
        }

        if (type == "email") {
            let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!regexEmail.test(value)) {
                message = name + " is invalid";
            }
        }
    }

    newFormError[name] = message;

    this.setState({
      formValue: newFormValue,
      formError: newFormError,
    },
    () => {
        this.setState({
            valid: this.checkFormValid(),
        })
    });
    console.log(name, value);
  };

  handleEditSV = (SVClick) => {
    this.setState({
        formValue: SVClick,
    },
    () => {
        this.setState({
            valid: this.checkFormValid(),
        })
    });
  }

  handleUpdateSV = () => {
    let {arrSV, formValue} = this.state;
    let SVUpdate = arrSV.find(sv => sv.id===formValue.id);

    if(SVUpdate) {
        for(let key in SVUpdate) {
            if(key !== 'id'){
                SVUpdate[key] = formValue[key];
            }
        }
    }

    this.setState({
        arrSV: arrSV
    })
  }

  handleDelSV = (idClick) => {
    let arrSV = this.state.arrSV.filter(
        (sv) => sv.id !== idClick
    );
    this.setState({
        arrSV: arrSV
    })
  }

  shouldComponentUpdate(newProps, currentState) {
        //this.props là props trước khi thay đổi
        //newProps là sau khi thay đổi
        // console.log('this.props', this.props);
        // console.log('newProps', newProps);
        console.log('shouldComponentUpdate');
        return true;
    }

  render() {
    let { formValue } = this.state;
    return (
      <>
        <form className="container" onSubmit={this.handleSubmit} >
          <h3 className="text-center bg-dark text-white">
            Thông tin sinh viên
          </h3>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <p>Mã SV</p>
                <input
                  className="form-control"
                  name="id"
                  value={formValue.id}
                  onInput={this.handleChangeInput} data-max-length="6"
                />
                {this.state.formError.id && (
                      <div className="alert alert-danger mt-2">
                        {this.state.formError.id}
                      </div>
                    )}
              </div>
              <div className="form-group">
                <p>Số điên thoại</p>
                <input
                  className="form-control"
                  name="phone"
                  value={formValue.phone}
                  onInput={this.handleChangeInput} data-type="number"
                />
                {this.state.formError.phone && (
                      <div className="alert alert-danger mt-2">
                        {this.state.formError.phone}
                      </div>
                    )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <p>Họ tên</p>
                <input
                  className="form-control"
                  name="name"
                  value={formValue.name}
                  onInput={this.handleChangeInput}
                />
                {this.state.formError.name && (
                      <div className="alert alert-danger mt-2">
                        {this.state.formError.name}
                      </div>
                    )}
              </div>
              <div className="form-group">
                <p>Email</p>
                <input
                  className="form-control"
                  name="email"
                  value={formValue.email}
                  onInput={this.handleChangeInput} type="email"
                />
                {this.state.formError.email && (
                      <div className="alert alert-danger mt-2">
                        {this.state.formError.email}
                      </div>
                    )}
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-success" type="submit" disabled={!this.state.valid}>
                Thêm sinh viên
              </button>
              <button className="btn btn-success mx-3" type="button" disabled={!this.state.valid} onClick={() => {
                this.handleUpdateSV();
              }}>
                Cập nhật
              </button>
            </div>
          </div>
        </form>
        <div className="container mt-3">
          <Table arrSV = {this.state.arrSV} handleEditSV = {this.handleEditSV} handleDelSV= {this.handleDelSV}/>
        </div>
      </>
    );
  }
}
