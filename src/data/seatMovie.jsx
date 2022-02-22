import React, { Component } from "react";
import http from "./http.Script";
import { RiArrowLeftSLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import NavBar1 from "./navBar1";
class SeatMovie extends Component {

    state = {
        movieData: {},
        seats: {},
        postData: this.props.postData
    }
    async fetchData() {
        let { city, id } = this.props.match.params
        let response1 = await http.get(`/movies/${city}/${id}`)
        let response = await http.get("/seats")
        let { data } = response1
        console.log(data)
        this.setState({ movieData: data, seats: response })
    }

    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {

        if (prevProps !== this.props) this.fetchData();
    }
    changeSeat = (val, seat, price) => {
        let s1 = { ...this.state }
        s1.postData.amount = s1.postData.amount + price
        s1.postData.tickets.push(`${seat}${val}`)
        this.setState(s1)
    }
    changeSeatRm = (val, seat, price) => {
        let s1 = { ...this.state }
        s1.postData.amount = s1.postData.amount - price
        let index = s1.postData.tickets.findIndex(op => op.seat == `${seat}${val}`)
        s1.postData.tickets.splice(index, 1)
        this.setState(s1)
    }
    showButtons = (p,stNo,edNo,postData) =>{
        return(p.seatList.map((itm, inx) => (
            itm.seatNo >= stNo && itm.seatNo <= edNo
                ? postData.tickets.find(it => it == `${p.rowName}${itm.seatNo}`)
                    ? <button className={" btn btn-success mx-1 mt-1 btn-sm"}
                        onClick={() => this.changeSeatRm(itm.seatNo, p.rowName, p.price)}
                        style={{ width: "26px", height: "26px",  borderRadius:"8px", fontSize: "10px" }}>
                        {itm.seatNo}
                    </button>
                    : <button className={" btn btn-outline-secondary mx-1 mt-1 btn-sm"}
                        onClick={() => this.changeSeat(itm.seatNo, p.rowName, p.price)}
                        style={{ width: "26px", height: "26px",  borderRadius:"8px", fontSize: "10px" }}>
                        {itm.seatNo}
                    </button> : ""
           )))
    }







    changeTime = (val) => {
        let s1 = { ...this.state }
        s1.postData.time = val
        this.setState(s1)
    }
    async postDataFunction(url, obj) {
        let response = await http.post(url, obj)

        this.props.history.push("/payment")
    }
    paymentData = () => {
        let s1 = { ...this.state }
        this.props.onChangeFunction(s1.postData)
        this.postDataFunction("/seat", s1.postData)

    }
    
   



    render() {
        let { movieData, seats, postData } = this.state

        let { data = [] } = seats
        console.log(data)
        let { city, id, row, index } = this.props.match.params
        let { title, showTiming = [] } = movieData
        postData.title = title
        showTiming.map((op, ind) => (0 == ind && op.map((p, inx) => { if (inx == row) postData.movieHall = p.name })))
        return (<div>

            <div className=" row" style={{ backgroundColor: "#333332" }}>
                <div className="col-1 text-light">
                    <RiArrowLeftSLine style={{ fontSize: "71px" }} onClick={() => this.props.history.push(`/bookMovie/${city}/${id}`)} />
                </div>
                <div className="col-9 text-light">
                    <p className="h2">{title}</p>
                    <p className="h4">{showTiming.map((op, ind) => (0 == ind && op.map((p, inx) => inx == row && p.name)))}</p>
                </div>
                <div className="col-1 mt-4 text-light">
                    <span>{postData.tickets.length} Tickets</span>
                </div>
                <div className="col-1 text-light">
                    <IoClose style={{ fontSize: "40px", textAlign: "center", marginTop: "20px" }} onClick={() => this.props.history.push(`/bookMovie/${city}/${id}`)} />
                </div>

            </div>

            <div className="bg-light mx-5 mt-2">
                {showTiming.map((p, ind) => (
                    ind == 0 && p.map((op, inx) => (
                        inx == row && op.timings.map((itm, itmId) => (
                            <button
                                className={" btn btn-outline-success m-2 btn-sm  " + "text-info"}
                                style={
                                    postData.time == itm.name
                                        ? { backgroundColor: "green", color: "white" }
                                        : {}
                                }

                                onClick={() => this.changeTime(itm.name)}
                            >{itm.name}</button>
                        ))
                    ))
                ))}
            </div>

            <div className="container mt-2">
                <p className="h5 text-secondary">RECLINER - Rs 420.00 </p><hr />
                <div className="row">
                    {data.map((op, index1) => (

                        index1 == 0 && op.seats.map(p => (
                            <React.Fragment>
                                {p.rowName == "A" || p.rowName == "B"
                                    ? <React.Fragment>
                                        <div className="col-1">
                                            {p.rowName}
                                        </div>
                                        <div className="col-11">
                                            {this.showButtons(p,1,27,postData)}
                                        </div>
                                        {p.rowName == "B" && <p className="h5 text-secondary">GOLD - Rs 250.00</p>}
                                        {p.rowName == "B" && <hr />}
                                    </React.Fragment>
                                    : <React.Fragment>
                                        <div className="col-1">{p.rowName}</div>
                                        <div className="col-11">
                                            <div className="row">
                                                <div className="col-4">
                                                    {this.showButtons(p,1,7,postData)}
                                                </div>
                                               
                                                <div className="col-5 ">
                                                     {this.showButtons(p,8,18,postData)}
                                                </div>
                                                
                                              
                                                <div className="col-3">
                                                {this.showButtons(p,19,27,postData)}
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                            </React.Fragment>







                        ))
                    ))}
                </div><br />
                <div className="text-center">
                    <svg enable-background="new 0 0 100 100" viewBox="0 0 260 20" width="260px" height="20px" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" >
                        <g fill="none" fill-rule="evenodd" opacity=".3">
                            <g fill="#E1E8F1">
                                <path id="da" d="M27.1 0h205.8L260 14.02H0z">
                                </path></g>
                            <path stroke="#4F91FF" stroke-width=".65" d="M27.19.33L1.34 13.7h257.32L232.81.32H27.2z"></path>
                            <path fill="#8FB9FF" d="M28.16 2.97h203.86l17.95 9.14H10.35z"></path>
                            <g fill="#E3ECFA"><path id="db" d="M0 13.88h260l-3.44 6.06H3.44z"></path></g>
                            <path stroke="#4F91FF" stroke-width=".65" d="M.56 14.2l3.075.41h252.74l3.07-5.4H.56z"></path>
                        </g></svg><br />
                    <span>All Eyes this way please!</span><br />
                    {postData.tickets.length > 0 ? <button className="btn btn-primary btn-block " style={{ width: "350px" }} onClick={() => this.paymentData()}> Pay  Rs :  {postData.amount}</button> : ""}
                </div>

            </div>

        </div>
        )

    }
}
export default SeatMovie;