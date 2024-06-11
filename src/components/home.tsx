import { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
console.log(process.env);
export default class Home extends Component {
  state = {
    users_data: [],
    city: "Delhi",
    country: "IN",
    rdate: "",
    rday: "",
    icon: "",
    currentTemp: "",
    tempDesc: "",
    name: "",
    email: "",
    countryCode: "",
    mobile: "",
  };

  constructor(props: any) {
    console.log("I am constructor");
    //Super(): It is used to call the constructor of its parent class.
    //This is required when we need to access some variables of its parent class.
    super(props);
    this.getWeatherData();
  }

  //http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=8584915e301635faa851c9666a5108a6
  getWeatherData = () => {
    api
      .get(`/user/list`)
      .then((res) => {
        console.log(res?.data?.data);
        this.setState({
          users_data: res?.data?.data,
        });
        // this.setState({
        //   currentTemp: res.data.main.temp,
        //   country: res.data.sys.country,
        //   icon: `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`,
        //   tempDesc: res.data.weather[0].description,
        //   rdate: `${Date().toLocaleString().split(" ")[1]} ${
        //     Date().toLocaleString().split(" ")[2]
        //   }, ${Date().toLocaleString().split(" ")[3]} `,
        //   rday: Date().toLocaleString().split(" ")[0],
        // });
      })
      .catch((error) => {
        Swal.fire(`Data not found on city name ${this.state.city}.`);
      });
  };

  submitCity = (e: any) => {
    e.preventDefault();
    this.getWeatherData();
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
            <div className="col-lg-8 col-md-10 col-sm-12 grid-margin stretch-card">
              <div className="card card-weather">
                <div className="card-body">
                  <div className="row">
                    {this.state.users_data ? (
                      <Table striped bordered hover size="sm" variant="dark">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
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
