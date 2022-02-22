import React , {Component} from "react"
import NavBar1 from "./navBar1";
import ShowAllMovies from "./showAllMovies";
import {Route,Redirect,Switch} from "react-router-dom";
import Movie from "./movie";
import PaymentData from "./paymentData";
import SeatMovie from "./seatMovie";
class Main extends Component{
  
    state={
        postData:{title:"",movieHall:"",tickets:[],amount:0,time:"",date:""},
    }

    handleChange=(val)=>{
        let s1 = {...this.state}
        s1.postData=val
       
        this.setState(s1)
    }
   

    render(){
        let {postData} = this.state
        if(postData.date==''){
            const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
            var d = new Date()
            postData.date = `${d.getDate()} ${monthNames[d.getMonth()]}`
            
        }
       
        
        return(<div >
           <Switch>
           <Route path="/payment"
                render={(props) => <PaymentData {...props} data={postData} />} />
          
           <Route path="/bookMovie/:city/:id/buyTicket/:row/:index/:date"
                render={(props) => <SeatMovie {...props} postData={postData} onChangeFunction={this.handleChange} />} />
          
            <Route path="/home/:city" component={ShowAllMovies}  />
          
           <Route path="/bookMovie/:city/:id"
                   render={(props) => <Movie {...props} postData={postData} onChangeFunction={this.handleChange} />} />
              
                     
              <Redirect from="/" to="/home/NCR"/>
          </Switch>  
        </div>)
      
    }
}
export default Main;

