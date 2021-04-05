import React from "react";
import "./App.css";
import countapi from "countapi-js";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip"

const countNamespace = "projectpurplebowwow";

export class CityRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      status: "READY",
    };
  }

  hitCounter() {
    this.setState({ status: "LOADING" });
    countapi
      .hit(countNamespace, `${this.props.item.CODE}-${this.props.item.id}`)
      .then((result) => {
        if (result.value && result.value !== undefined) {
          this.setState({ count: result.value, status: "SUCCESS" });
        } else {
          this.setState({ status: "READY" });
        }
      });
  }
  componentDidMount() {
    countapi
      .get(countNamespace, `${this.props.item.CODE}-${this.props.item.id}`)
      .then((result) => {
        console.log(result.value);
        if (result.value && result.value !== undefined) {
          this.setState({ count: result.value });
        }
      });
  }
  render() {
    return (
      <TableRow >
        <TableCell
          align="left"
          component="th"
          scope="item"
          style={{
            borderColor: "rgba(92, 57, 119, 0.4)",
            fontWeight: "bold",
          }}
        >
          {this.props.item.MUNICIPALITY}
        </TableCell>
        <TableCell
          align="left"
          component="th"
          scope="item"
          style={{
            borderColor: "rgba(92, 57, 119, 0.4)",
            fontWeight: "bold",
          }}
        >
          {`~${this.props.item.POPULATION} total residents.`}
        </TableCell>
        <TableCell
          align="left"
          component="th"
          scope="item"
          style={{
            borderColor: "rgba(92, 57, 119, 0.4)",
          }}
        >
          {this.state.count > 0
            ? `${this.state.count} resident(s) in this area reported having troubling accessing the vaccine. `
            : "No residents in this area have reported having troubling accessing the vaccine."}
        </TableCell>
        <TableCell
          align="right"
          component="th"
          scope="item"
          style={{
            fontSize: "0.75rem",
            borderColor: "rgba(92, 57, 119, 0.4)",
          }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => this.hitCounter()}
            style={{

              backgroundColor: "#5c3977",
              color: "white",
            }}
            disabled={this.state.status === "SUCCESS"}
            endIcon={
              this.state.status === "LOADING" ? (
                <CircularProgress color={"inherit"} size={18} />
              ) : this.state.status === "SUCCESS" ? (
                <Icon>check_circle</Icon>
              ) : (
                <Icon>priority_high</Icon>
              )
            }
          >
            REPORT DIFFICULTIES
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
    };
  }
  componentDidMount() {
    this.fetchCities();
  }
  fetchCities() {
    fetch("cities.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ cities: data.cities });
      });
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: "#333333",
          height: "100%",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            style={{
              backgroundColor: "#e0e0e0",
              marginBottom: "20px",
              width: "75%",
              height: "85%",
              overflowY: "scroll",
            }}
            square={true}
          >
            <AppBar
              position="fixed"
              style={{
                top: "auto",
                right: "auto",
                backgroundColor: "#5c3977",
                width: "inherit",
              }}
            >
              <Toolbar
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: "1",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginRight: "30px",
                    }}
                  >
                    {"PROJECT PURPLE COW"}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "white" }}
                    gutterBottom
                  >
                    {
                      "A TOOL FOR THOSE WHO NEED A VACCINE BUT CANNOT GET TO A SITE"
                    }
                  </Typography>
                </div>
                <Tooltip  placement="left" title={"If you or a loved one are in need of a vaccine, but cannot make it to a mass vaccination site due to any reason, use this tool to draw attention to the appropriate area. This tool aims to be of use for those in need and those who are planning routes for mobile vaccination clinics."}><Icon>info</Icon></Tooltip>
              </Toolbar>
              <Divider />
            </AppBar>
            <Toolbar style={{ marginBottom: "20px" }} />
            <div style={{ display: "flex", height: "auto" }}>
              <TableContainer>
                <Table>
                  <TableBody>
                    {this.state.cities.map((item, index) => (
                      <CityRow style={{marginTop:'20px'}} item={item} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default App;
