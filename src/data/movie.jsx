import React, { Component } from "react"
import { Dropdown, DropdownButton } from "react-bootstrap";
import NavBar1 from "./navBar1";
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import {ImMobile} from "react-icons/im";
import {IoFastFoodOutline} from "react-icons/io5";
import { Link } from "react-router-dom";
import http from "./http.Script";
class Movie extends Component {

    state = {
        movieData: {},
        postData:this.props.postData,
        filterPriceArr:[{name:"Rs. 101-200",value:"101"},{name:"Rs. 201-300",value:"201"},{name:"Rs. 301-350",value:"301"}],
        filterPrice:[]

    }
    async fetchData() {
        let {city,id} = this.props.match.params
        let response = await http.get(`/movies/${city}/${id}`)
        let { data } = response
        console.log(data)
        this.setState({ movieData: data })
    }
      componentDidMount() {
        this.fetchData();
      }  
      componentDidUpdate(prevProps, prevState) {
        
        if (prevProps !== this.props) this.fetchData();
      }
      changeDate = (val) =>{
          let s1 = {...this.state}
          s1.postData.date=val
          this.props.onChangeFunction(s1.postData)
      }
      changeTime = (tym) =>{
          let s1 = {...this.state}
          s1.postData.time=tym
          this.props.onChangeFunction(s1.postData)
      }
      showCheckBoxField = (Arr, name,value) => {
        return (
        <div className="container ">
            {Arr.map((crc) => (<option>
                <div className="form-check ">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name={name}
                        value={crc.value}
                        checked={value.find((val) => val === crc)}
                        onChange={this.handleChange}
                    />
                    <label className="form-check-label">{crc.name}</label></div></option>
            ))}</div>)
    }
    handleChange = (e) => {
        let s1 = {...this.state}
        let { currentTarget: input } = e;
        s1.filterPrice = (this.updateCBs(s1.filterPrice, input.checked, input.value))
        this.setState(s1)
        
    }
    updateCBs = (inpValue, checked, value) => {
        let inpArr = inpValue ;
        if (checked) {
            inpArr.push(value)
        } else {
            let index = inpArr.findIndex((ele) => ele === value);
            if (index >= 0) inpArr.splice(index, 1);
        }
        return inpArr
    }

    render() {
        let {city,id} = this.props.match.params
        let { movieData,postData,filterPrice,filterPriceArr } = this.state
        let {showTiming=[],title,votes,rating} =movieData
        let newDate = new Date()
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var d = new Date()
        let today = d.getDate()
        d.setDate(d.getDate() + 1)
        today=`${today}Today`
        let tom = d.getDate()
        tom=`${tom}${monthNames[d.getMonth()]}`
        d.setDate(d.getDate() + 1)
        let tom1 = d.getDate()
        tom1=`${tom1}${monthNames[d.getMonth()]}`
        

        return (<React.Fragment>
            <NavBar1  param={city}/>
            <div style={{ backgroundColor: "gray", color: "white" }}>
                <h3 className="mx-3" style={{ fontSize: "40px" }}>{title}</h3>
                <span style={{ fontSize: "25px" }}><AiFillHeart className="text-danger mx-2" />{rating}</span>
                <button className="btn btn-secondary btn-sm mx-3" style={{ borderRadius: "20px" }}>ACTION</button>
                <button className="btn btn-secondary btn-sm mx-3" style={{ borderRadius: "20px" }}>THRILLER</button>
                <br />
                <span className="mx-3">{votes} votes</span>
            </div>
            <div className="row">
                <div className="col-9">
                <div className="row mt-3">
                <div className="col-7">
                    <button className="btn btn-outline-light   text-dark mx-3 " style={postData.date==today||postData.date==''?{ backgroundColor: "#58e043", width: "120px", height: "32px" }:{}} onClick={()=>this.changeDate(today)}><h6>{today} </h6></button>
                    <button className="btn btn-outline-light text-dark mx-3" style={postData.date==tom?{ backgroundColor: "#58e043", width: "120px", height: "32px" }:{}}    onClick={()=>this.changeDate(tom)}><h6>{tom} </h6></button>
                    <button className="btn btn-outline-light text-dark mx-3" style={postData.date==tom1?{ backgroundColor: "#58e043", width: "120px", height: "32px" }:{}} onClick={()=>this.changeDate(tom1)}><h6>{tom1}</h6></button>
                </div>
                <div className="col-2  ">
                    
                </div>
                <div className="col-2 " >
                   
                </div>
            </div>
           
           <div className="row " style={{backgroundColor:"#edb198"}}>
               <div className="col-6 border">
                   <ImMobile style={{fontSize:"40px"}} className="text-success mx-4 mt-4"/><br/>
                   <span style={{fontSize:"11px",margin:"10px"}}>M-Ticket Available</span>
                   </div>
               <div className="col-6 border">
                  <IoFastFoodOutline style={{fontSize:"40px",color:"#d95f2b"}} className=" mx-4 mt-4"/><br/>
                  <span style={{fontSize:"11px",margin:"10px"}}>Food Available</span>
               </div>
           </div> 
           {showTiming.map((p,index)=>(
                             index==0&&
                             p.map((itm,ind)=>(
                                
                                <div>
                                <div className="row">
                                    <div className="col-2">
                                        <AiOutlineHeart style={{fontSize:"22px"}}/>
                                    </div>
                                 <div className="col-3">
                                 <span>{itm.name}</span>
                                 <div className="row">
                                 <div className="col-6">
                                     <ImMobile style={{color:"#a5de92",fontSize:"22px"}}/><br/>
                                  <span className="mx-4">M-Ticket</span>
                                </div>
                                 <div className="col-4">
                                      <IoFastFoodOutline style={{fontSize:"22px",color:"#d95f2b"}} /><br/>
                                      <span className="mx-4">F&B</span>
                                </div>
                                 </div>
                                 </div>
                                 <div className="col-6">
                                     {itm.timings.map((tym,indx)=>(
                                        <Link to={`/bookMovie/${city}/${id}/buyTicket/${ind}/${indx}/1`}> <button className="btn btn-outline-dark m-2 btn-sm text-info" onClick={()=>this.changeTime(tym.name)}>{tym.name}</button></Link>
                                     ))}
                                 </div>
                                 </div>
                                 <span style={{margin:"500px"}}> <span className="text-danger m-2">* </span>  Cancellation available</span><br/><br/>
                             </div>
                             ))
                            ))
                     }
                  
                     
                  </div>
                     <div className="col-2">
                         <img className="mt-5" src="https://i.ibb.co/JqbbCJz/1331654202504679967.jpg"></img>
                         </div>
               
            </div>
            
        </React.Fragment>)


    }
}
export default Movie;