import React , {Component} from "react";
import { RiArrowLeftSLine} from "react-icons/ri";
import {IoClose} from "react-icons/io5";
class PaymentData extends Component{



    render(){
          let {data} = this.props
          console.log(data)
         return(
         <div className="bg-light">
              <div className=" row" style={{backgroundColor:"#333332"}}>
                <div className="col-1 text-light">
                   <RiArrowLeftSLine  style={{fontSize:"71px"}} onClick={()=>this.props.history.push(`/bookMovie`)}/>
                </div>
               <div className="col-9 text-light">
               <p className="h2">{data.title}</p>
               <p className="h4">{data.movieHall}</p>
               </div>
               <div className="col-1 mt-4 text-light">
                  
               </div>
               <div className="col-1 text-light">
                   <IoClose style={{fontSize:"40px",textAlign:"center",marginTop:"20px"}} onClick={()=>this.props.history.push(`/bookMovie/`)}/>
               </div>
              
            </div>
         
         <div  className="row">
              <div className="col-7 mt-3 mx-3" style={{backgroundColor:"white"}}>
              <img  className="img-fluid" src="https://i.ibb.co/SK0HfNT/bookasmile-03.png"/>
              </div>
              <div className="col-4">
                  <div className="container" style={{backgroundColor:"white"}}>
                     <p className="text-danger h4">Booking Summary</p>
                     <div className="row" >
                         <div className="col-6 mt-2 " style={{fontSize:"20px"}}>
                             Movie Name<br/>
                             Movie Hall<br/><br/><br/><br/>
                             Total Ticket<br/>
                             Ticket<br/>
                             Date<br/>
                             Time<br/><br/>
                             Total Amount
                         </div>
                         <div className="col-6 mt-2" style={{fontSize:"20px"}}>
                             {data.title}<br/>
                             {data.movieHall}<br/><br/><br/>
                             {data.tickets.length}<br/>
                             {data.tickets.join(",")}<br/>
                             {data.date}<br/>
                             {data.time}<br/><br/>
                             Rs : {data.amount}
                         </div>
                     </div>
                     <img className="img-fluid" src="https://i.ibb.co/CVHYxVK/images-q-tbn-ANd9-Gc-Qq-PT1-GB7-Cpvo3-WDDCi-Wt-Vto-Q-SLqp-Z9-B1x-D3-D69-WTj-MPyl-Chnd.png" height="300px" width="300px"/>
                  </div>
              </div>
         </div>

  
         </div>)


    }
}
export default PaymentData