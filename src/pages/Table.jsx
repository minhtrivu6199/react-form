import React, { Component } from "react";

export default class Table extends Component {




    shouldComponentUpdate(newProps, currentState) {
        //this.props là props trước khi thay đổi
        //newProps là sau khi thay đổi
        // console.log('this.props', this.props);
        // console.log('newProps', newProps);
        if(this.props.like === newProps.like) {
            return false;
        }
        console.log('shouldComponentUpdate child');
        return true;
    }

  render() {
    const { arrSV, handleEditSV, handleDelSV } = this.props;
    return (
      <div>
        <table className="table">
          <thead className="bg-dark text-white">
            <tr>
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {arrSV.map(({ id, name, phone, email }, index) => {
              return (
                <tr key={index}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{phone}</td>
                  <td>{email}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => {
                        handleDelSV(id)
                    }}>
                      <i className="fa fa-trash"></i>
                    </button>
                    <button className="btn btn-primary mx-2" onClick={()=>{
                        let SVEdit = {
                            id, name, phone, email
                        };
                        handleEditSV(SVEdit);
                    }}>
                      <i className="fa fa-edit"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
