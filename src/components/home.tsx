import { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Table } from "react-bootstrap";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
console.log(process.env);
export default class Home extends Component {
  state = {
    users_data: [],
  };

  constructor(props: any) {
    console.log("I am constructor");
    //Super(): It is used to call the constructor of its parent class.
    //This is required when we need to access some variables of its parent class.
    super(props);
    this.getUsersListing();
  }

  getUsersListing = () => {
    api
      .get(`/user/list`)
      .then((res) => {
        console.log(res?.data?.data);
        this.setState({
          users_data: res?.data?.data,
        });
      })
      .catch((error) => {
        Swal.fire(`Users data not found.`);
      });
  };

  deleteUser = (id: string) => {
    api
      .delete(`/user/remove`, {
        data: {
          id: id,
        },
      })
      .then((res) => {
        Swal.fire(`Users deleted.`);
        this.getUsersListing();
      })
      .catch((error) => {
        Swal.fire(`Users data not found.`);
      });
  };

  submitCity = (e: any) => {
    e.preventDefault();
    this.getUsersListing();
  };

  onChange = (e: any) => {
    //console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { users_data } = this.state;

    return (
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-lg-10 col-md-10 col-sm-12 grid-margin stretch-card">
              <div className="card card-weather">
                <div className="card-body">
                  <div className="row">
                    {this.state.users_data &&
                    this.state.users_data.length > 0 ? (
                      <Table striped bordered hover size="sm" variant="dark">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users_data.map((v: any, i) => (
                            <tr>
                              <td>{i + 1}</td>
                              <td>{v?.name}</td>
                              <td>{v?.email}</td>
                              <td>
                                +{v?.countryCode}-{v?.mobile}
                              </td>
                              <td>{v?.role}</td>
                              <td>
                                <Button className="btn-sm btn-warning">
                                  Edit
                                </Button>
                                &nbsp;
                                <Button
                                  className="btn-sm btn-danger"
                                  onClick={() => this.deleteUser(v?._id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <h3>Users data not found!</h3>
                    )}
                  </div>

                  <div className="footer-content">
                    Love it!, Follow me{" "}
                    <a
                      href="https://www.linkedin.com/in/sanjaykumarwebs/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      here
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
