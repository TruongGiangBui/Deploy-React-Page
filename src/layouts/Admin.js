/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import "../assets/css/main.css";
import routes from "routes.js";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MathJaxContext, MathJax } from 'better-react-mathjax'
import MathTex from '../components/MathTex';
import Latex from "react-latex";
function Admin() {
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const [dataMenu, setdataMenu] = useState([]);
  const mainPanel = useRef(null);
  const [selectedExercise, setSelectedExercises] = useState("")
  const [dataSolution, setdataSolution] = useState({});
  const [selectedSolution,setselectedSolution]=useState(0)
  const mathJaxConfig = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    }
  };
  useEffect(() => {
    // load()
    axios.get('https://handutran.github.io/data.json').then((datamenu) => {
      setdataMenu(datamenu.data)
    })
    if(localStorage.getItem("SelectedExercise")){
      setSelectedExercises(localStorage.getItem("SelectedExercise"))
    }
    if(localStorage.getItem("selectedSolution")){
      setselectedSolution(localStorage.getItem("selectedSolution"))
    }
  }, []);
  useEffect(() => {
    if (selectedExercise) {
      axios.get(`https://handutran.github.io/Dataset/${selectedExercise}.json`).then((res) => {
        setdataSolution(res.data)
        // console.log(dataSolution.solutions[0].steps)
      })
    }
  }, [selectedExercise]);
  function reloadSolution(){
    localStorage.setItem("SelectedExercise",selectedExercise)
    localStorage.setItem("selectedSolution",selectedSolution)
    window.location.reload()
  }
  function setSelectedExercise(exercise) {
    console.log(exercise)
    setSelectedExercises(exercise)
  }
  function removeUnDisplay(string){

    string=string.split('$$').join("~#~").split("$").join('\\$').split("~#~").join('$$')
    if(string.match(/\\\[([0-9]*pt)\]/g)){
      var match=string.match(/\\\[([0-9]*pt)\]/g)[0];
      // console.log(match)
      // console.log("string.split(match).join()",string.split(match).join(""))
      string= string.split(match).join("")
    }
    // console.log("string",string)
    return string
  }
  function hanleChangeSolution(index){
    try{
      if(dataSolution.solutions[index].steps){
        setselectedSolution(index)
      }
    }catch(err){
      console.log(err)
    }
    
  }
  function renderSolution(text){
    // console.log(text)
    text=removeUnDisplay(text);
    if(text.match(/\$\$[\s\S]*\$\$/g)){
      var match=text.match(/\$\$[\s\S]*\$\$/g);
      console.log(match)
      return <div>      
      <MathJax>
        <MathTex>{text.split(match[0])[0]}</MathTex>
      </MathJax>
      <MathJax>
        {match[0]}
      </MathJax>
      <MathJax>
        <MathTex>{text.split(match[0])[1]}</MathTex>
      </MathJax>
      </div>
    }else{
      return  <MathJax>
      <MathTex>{text}</MathTex>
    </MathJax>
    }
  }
  return (
    <>
      <div className="wrapper">
        <MathJaxContext config={mathJaxConfig} version={3}>
          <div className="container1">
          <Sidebar  dataMenu={dataMenu} selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise} />
          <div className="main-panel1" ref={mainPanel}>
            <div className="content">
              <div className="btn-bar">
                
                {dataSolution.solutions ? dataSolution.solutions.map((el,index) => {           
                return (<div onClick={()=>{hanleChangeSolution(index)}} className={selectedSolution==index?"btn-soluton active-1":"btn-soluton"} >
                      Lời giải {index+1}
                  </div>
                );
              }) : ""}
                <div onClick={()=>{reloadSolution()}} className={"btn-soluton"} >
                      Tải lại trang
                  </div>
              </div>
              {dataSolution.solutions ? dataSolution.solutions[selectedSolution].steps.map((el) => {
                
                return (<div className="text1"
                >
                  
                  {/* <MathJax>
                    <MathTex>{removeUnDisplay(el.columns[0].text)}</MathTex>
                  </MathJax> */}
                  {/* <MathJax>
                    {removeUnDisplay(el.columns[0].text)}
                  </MathJax> */}
                  {renderSolution(el.columns[0].text)}
                </div>
                );
              }) : ""}
            </div>
          </div>
          </div>
        </MathJaxContext>
      </div>
    </>
  );
}

export default Admin;
