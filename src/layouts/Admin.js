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

import routes from "routes.js";
import { useState, useEffect, useRef } from "react";
import sidebarImage from "assets/img/sidebar-3.jpg";
import axios from "axios";
import {MathJaxContext,MathJax} from 'better-react-mathjax'
// import template from '../template.txt';
function Admin() {
  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const [dataMenu, setdataMenu] = useState([]);
  const mainPanel = useRef(null);
  const [selectedExercise, setSelectedExercises] = useState("")
  const [dataSolution, setdataSolution] = useState({});
//   function template(){
//     return {__html: `<div>
//     <script type="text/x-mathjax-config">
//         MathJax.Hub.Config({
//           jax: ["input/TeX", "output/HTML-CSS"],
//           extensions: ["tex2jax.js"],
//           "HTML-CSS": { preferredFont: "TeX", availableFonts: ["STIX","TeX"] },
//           tex2jax: { inlineMath: [ ["$", "$"], ["\\\\(","\\\\)"] ], displayMath: [ ["$$","$$"], ["\\\\[", "\\\\]"] ], processEscapes: true, ignoreClass: "tex2jax_ignore|dno" },
//           TeX: { noUndefined: { attributes: { mathcolor: "red", mathbackground: "#FFEEEE", mathsize: "90%" } } },
//           messageStyle: "none"
//         });
//         </script>  
//     <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js"></script>
//     <div >
//     ### 2.1a - Balance sheet identity.\n\nBalance sheet identity, or accounting equation, is mathematical formula used to analyze the financial transactions that affects business. Such formula is as follows: \n$$\\begin{aligned} \\text{Assets} &= \\text{Liabilities} +{\\text{Equity}}\\\\[1pt] \\end{aligned}$$\n\nThe amounts recorded by the entity must always balance. Therefore, assets should be equal to the sum of liabilities and equity.</div>
// </div>`}
//   }
//   function load() {
//     var script = document.createElement("script");
//     script.type = "text/x-mathjax-config";
//     script.src = "https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js";   // use the location of your MathJax
//     script.id = "MathJax-script"
//     var config = `MathJax.Hub.Config({
//       jax: ["input/TeX", "output/HTML-CSS"],
//       extensions: ["tex2jax.js"],
//       "HTML-CSS": { preferredFont: "TeX", availableFonts: ["STIX","TeX"] },
//       tex2jax: { inlineMath: [ ["$", "$"], ["\\(","\\)"] ], displayMath: [ ["$$","$$"], ["\\[", "\\]"] ], processEscapes: true, ignoreClass: "tex2jax_ignore|dno" },
//       TeX: { noUndefined: { attributes: { mathcolor: "red", mathbackground: "#FFEEEE", mathsize: "90%" } } },
//       messageStyle: "none"
//     });`;

//     if (window.opera) {
//       script.innerHTML = config
//     } else {
//       script.text = config
//     }

//     script.addEventListener('load', function () {
//       MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
//     })

//     document.getElementsByTagName("head")[0].appendChild(script);
//   };
  useEffect(() => {
    // load()
    axios.get('https://handutran.github.io/data.json').then((datamenu) => {
      setdataMenu(datamenu.data)
    })

  }, []);
  useEffect(() => {
    if (selectedExercise) {
      axios.get(`https://handutran.github.io/Dataset/${selectedExercise}.json`).then((res) => {
        setdataSolution(res.data)
        // console.log(dataSolution.solutions[0].steps)
      })
    }
  }, [selectedExercise]);
  function setSelectedExercise(exercise) {

    setSelectedExercises(exercise)
    console.log("selectedExercise", exercise)
  }
  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} dataMenu={dataMenu} selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise} />
        <div className="main-panel" ref={mainPanel}>
          <div className="content">
          <MathJaxContext>
            {dataSolution.solutions ? dataSolution.solutions[0].steps.map((el) => {
              var content = '### 2.1a - Balance sheet identity.\n\nBalance sheet identity, or accounting equation, is mathematical formula used to analyze the financial transactions that affects business. Such formula is as follows: \n$$\\begin{aligned} \\text{Assets} &= \\text{Liabilities} +{\\text{Equity}}\\[1pt] \\end{aligned}$$\n\nThe amounts recorded by the entity must always balance. Therefore, assets should be equal to the sum of liabilities and equity.'
              return (<div className="text1"
              //  dangerouslySetInnerHTML={template()}
               >
                <MathJax>
                {el.columns[0].text}
                </MathJax>
              </div>
              );

            }) : ""}
            </MathJaxContext>
          </div>       
        </div>
      </div>
    </>
  );
}

export default Admin;
