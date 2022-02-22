import React, { Component } from "react"
import SimpleImageSlider from "react-simple-image-slider";
import http from "./http.Script"
import { AiFillHeart, } from "react-icons/ai";
import { GrFormDown } from "react-icons/gr";
import { IoIosArrowUp } from "react-icons/io";
import NavBar1 from "./navBar1";
import queryString from "query-string";
import { Link } from "react-router-dom";
class ShowAllMovies extends Component {

    state = {
        moviesData: [],
        showCheck: { lg: false, frmt: false, gnre: false },
        showCheckArr: {
            lgArr: ["Hindi", "English", "Punjabi", "Tamil"],
            frmtArr: ["2D", "3D", "4DX"],
            gnreArr: ["Action", "Adventure", "Biography", "Comedy"]
        },
        searchData:"",param:"NCR"
    }

    async fetchData() {
        let { city } = this.props.match.params
        let queryParams = queryString.parse(this.props.location.search);
        let searchStr =  this.makeSearchString(queryParams)
        let response = null
        if(searchStr){
          response = await http.get(`/movies/${city}?${searchStr}`)
        }else{
            response = await http.get(`/movies/${city}`)
        }
     
        let { data } = response
        this.setState({ moviesData: data })
    }
    componentDidMount() {
        this.fetchData();
      }  
      componentDidUpdate(prevProps, prevState) {
        
        if (prevProps !== this.props) this.fetchData();
      }
    callURl = (url, options) => {
        let searchString = this.makeSearchString(options);
        this.props.history.push({
            pathname: url,
            search: searchString,
        });
    };
    makeSearchString = (options) => {
        let { lang, format, genre } = options;
        let searchStr = "";
        searchStr = this.addToQueryString(searchStr, "lang", lang);
        searchStr = this.addToQueryString(searchStr, "format", format);
        searchStr = this.addToQueryString(searchStr, "genre", genre);
        return searchStr;
    };
    addToQueryString = (str, parmName, paramValue) =>
        paramValue
            ? str
                ? `${str}&${parmName}=${paramValue}`
                : `${parmName}=${paramValue}`
            : str;


    handleChange = (e) => {
        let { city } = this.props.match.params
        let { currentTarget: input } = e;
        let queryParams = queryString.parse(this.props.location.search);
        queryParams[input.name] = (this.updateCBs(queryParams[input.Name], input.checked, input.value))
        console.log(queryParams)
        this.callURl(`/home/${city}`, queryParams)
    }
    updateCBs = (inpValue, checked, value) => {
        let inpArr = inpValue ? inpValue.split(",") : [];
        if (checked) {
            inpArr.push(value)
        } else {
            let index = inpArr.findIndex((ele) => ele === value);
            if (index >= 0) inpArr.splice(index, 1);
        }
        return inpArr.join(",");
    }

    showCheckBoxField = (Arr, name, value) => {
        return (<div className="container ">
            {Arr.map((crc) => (
                <div className="form-check ">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name={name}
                        value={crc}
                        checked={value.find((val) => val === crc)}
                        onChange={this.handleChange}
                    />
                    <label className="form-check-label">{crc}</label></div>
            ))}</div>)
    }

    changeShow = (val, check) => {
        let s1 = { ...this.state }
        console.log(check, val)
        if (val == "lg" && check == false)
            s1.showCheck.lg = true
        else
            s1.showCheck.lg = false
        if (val == "frmt" && check == false)
            s1.showCheck.frmt = true
        else
            s1.showCheck.frmt = false
        if (val == "gnre" && check == false)
            s1.showCheck.gnre = true
        else
            s1.showCheck.gnre = false
        this.setState(s1)
    }

    filterMovie=(val)=>{
        let s1 = {...this.state}
        s1.searchData = val
        this.setState(s1)
    }

    render() {
        let { city } = this.props.match.params
        let { moviesData, showCheck, showCheckArr ,searchData} = this.state
        console.log(moviesData)
        let queryParams = queryString.parse(this.props.location.search);
        let {lgVal,frmtVal,gnreVal} = queryParams
        console.log(lgVal,frmtVal,gnreVal)
        if(lgVal==undefined)lgVal=[]
        if(frmtVal==undefined)frmtVal=[]
        if(gnreVal==undefined)gnreVal=[]
        const images = [
            { url: "https://i.ibb.co/ZGsJ3dh/jio-mami-21st-mumbai-film-festival-with-star-2019-02-09-2019-10-58-45-992.png" },
            { url: "https://i.ibb.co/wRr7W1P/hustlers-01-10-2019-05-09-55-486.png" },
            { url: "https://i.ibb.co/qFWPRpF/laal-kaptaan-16-10-2019-12-48-06-721.jpg" }
        ]
        if(searchData==""){}
         else{ {moviesData=moviesData
            .filter(item => {
           
              if (item.title.includes(searchData)) {

                return true
              }
            })
         }}
        return (<div>
            <NavBar1 searchData={searchData} param={city} onFilter={this.filterMovie} />
            <div className="container">
                <div>
                    <SimpleImageSlider
                        width={1100}
                        height={400}
                        images={images}
                        showNavs
                        slideDuration={0.1}

                        showBullets
                    />
                </div>
                <div className="bg-light">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                        <a className="navbar-brand" href="#" style={{ fontSize: "35px" }}>Movies</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a class="nav-link" href="#">Now Showing</a>
                                </li>
                                <li className="nav-item">
                                    <a class="nav-link" href="#">Coming Soon</a>
                                </li>
                                <li className="nav-item">
                                    <a class="nav-link" href="#">Exclusive</a>
                                </li>

                            </ul>
                        </div>
                    </nav>
                    <div className="row " style={{ backgroundColor: "#dee0df" }}>
                        <div className="col-3">
                            <img src="https://i.ibb.co/Hry1kDH/17443322900502723126.jpg"></img>

                            <div className="mx-2  mt-5 form-group" style={{ backgroundColor: "white" }}>
                                <div className="form-control">
                                    <span className={"  " + showCheck.lg == true && "text-info"} onClick={() => this.changeShow("lg", showCheck.lg)}>
                                        {showCheck.lg == false ? <IoIosArrowUp /> : <GrFormDown />} Select Language</span>
                                    {showCheck.lg == true && this.showCheckBoxField(showCheckArr.lgArr, "lang", lgVal)}
                                </div>

                            </div>
                            <div className={"mx-2 mt-5 form-group"} style={{ backgroundColor: "white" }}>
                                <div className="form-control">
                                    <span className={"  " + showCheck.frmt == true && " text-info"} onClick={() => this.changeShow("frmt", showCheck.frmt)}>
                                        {showCheck.frmt == false ? <IoIosArrowUp /> : <GrFormDown />} Format</span>
                                    {showCheck.frmt == true && this.showCheckBoxField(showCheckArr.frmtArr, "format", frmtVal)}
                                </div>
                            </div>
                            <div className="mx-2 mt-5 form-group" style={{ backgroundColor: "white" }}>
                                <div className="form-control">
                                    <span className={"form-control  " + showCheck.gnre == true && " text-info"} onClick={() => this.changeShow("gnre", showCheck.gnre)}>
                                        {showCheck.gnre == false ? <IoIosArrowUp /> : <GrFormDown />} Genre</span>
                                    {showCheck.gnre == true && this.showCheckBoxField(showCheckArr.gnreArr, "genre", gnreVal)}
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="row" style={{ backgroundColor: "white" }}>
                                {moviesData.map((op, index) => (
                                    <div className="col-4" key={op.img}>
                                        <Link to={`/bookMovie/${city}/${index}`}> <img src={op.img} width="250" height="250" style={{ borderRadius: "20px" }}></img></Link>
                                        <span><AiFillHeart className="text-danger" /> {op.rating}</span>
                                        <span style={{ marginLeft: "68px" }}> {op.title}</span><br />
                                        <span>{op.votes}</span>
                                        <span style={{ marginLeft: "68px" }}>{op.desc}</span><br />
                                        <span>votes</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-1">
                            <img src="https://i.ibb.co/JqbbCJz/1331654202504679967.jpg"></img>
                        </div>
                    </div>



                </div>
            </div></div>)

    }
}
export default ShowAllMovies;