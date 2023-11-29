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
import { useLocation, NavLink } from "react-router-dom";
import image from 'assets/img/NEW_WATERMARK_001.png'
import "../../assets/css/menu.css";
import { useState, useEffect, useRef } from "react";
function Exercise({
  Item,
  level,
  visible,
  setSelectedExercise,
  selectedExercise,
  id,
  selectedMenuId
}) {
  function onClick() {
    setSelectedExercise(Item.id);
    console.log('selectedId ', id)
    localStorage.setItem("selectedMenuId", id)
  }
  if (visible) {
    return (
      <div className="menuItem-wraper">
        <div
          className={
            Item.id == selectedExercise
              ? `menuItem level-${level} active-1`
              : `menuItem level-${level}`
          }
          id={Item.id}
          onClick={onClick}
        >
          {`Bài tập ${Item.exerciseName ? Item.exerciseName : ""}`}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
function MenuItem({
  Item,
  level,
  visible,
  selectedExercise,
  setSelectedExercise,
  id,
  selectedMenuId
}) {
  const [selected, setSelected] = useState(false || selectedMenuId.includes(id));
  var title = "";
  if (Item.type == "chapter") {
    title = "Chương ";
  } else if (Item.type == "section") {
    title = "Phần ";
  }
  if (Item.type == "group") {
    title = "Trang ";
  }
  function onClick() {
    setSelected(!selected);
  }
  if (visible) {
    if (Object.keys(Item).includes("children")) {
      return (
        <div className="menuItem-wraper">
          <div className={`menuItem level-${level}`} onClick={onClick}>
            {title + `${Item.name}: ${Item.title}`}
          </div>
          {Item.children.map((Item1) => (
            <MenuItem
              Item={Item1}
              level={level + 1}
              visible={selected}
              selectedExercise={selectedExercise}
              setSelectedExercise={setSelectedExercise}
              id={id + '~#~' + Item1.id}
              selectedMenuId={selectedMenuId}
            ></MenuItem>
          ))}
        </div>
      );
    } else {
      return (
        <div className="menuItem-wraper">
          <div className={`menuItem level-${level}`} onClick={onClick}>
            {title +
              `${Item.name ? Item.name : ""}${Item.page ? Item.page : ""}: ${Item.title
              }`}
          </div>
          {Item.exercises
            ? Item.exercises.map((Exercise1) => (
              <Exercise
                Item={Exercise1}
                level={level + 1}
                visible={selected}
                selectedExercise={selectedExercise}
                setSelectedExercise={setSelectedExercise}
                id={id + '~#~' + Exercise1.id}
                selectedMenuId={selectedMenuId}
              ></Exercise>
            ))
            : ""}
        </div>
      );
    }
  } else {
    return null;
  }
}
function Sidebar({
  dataMenu,
  setSelectedExercise,
  selectedExercise

}) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  const [selectedMenuId, setSelectedMenuId] = useState("")
  const [firstLoad, setfirstLoad] = useState(true)
  useEffect(() => {
    setSelectedMenuId(localStorage.getItem("selectedMenuId") || '')
    console.log('selectedMenuId', localStorage.getItem("selectedMenuId"))

    if(firstLoad){
      
    setTimeout(() => {
      // console.log('element',localStorage.getItem("selectedMenuId"))
      let id = localStorage.getItem("selectedMenuId")
      console.log('element', id)
      if (id) {
        id = id.split('~#~')[id.split('~#~').length-1]
        console.log('element', id)
        const element = document.getElementById(id);
        console.log('element', element)
        element.scrollIntoView()
        setfirstLoad(false)
      }
    }, 1000);
    }

    // document.getElementsByClassName('active-1').scrollIntoView();
  }, []);
  // useEffect(() => {
  //   // console.log('getElementById',document.getElementsByClassName('active-1'))
  //   console.log('getElementById',document.getElementById('14881406'))
  //   // document.getElementsByClassName('active-1').ge.scrollIntoView();
  // }, [selectedMenuId]);
  return (
    <div className="sidebar" >
      <div className="Header-Menu">
        <div className="logo" id='logo'>
        </div>
        <div className="text-header">Tặng Hân Du!!!</div>
      </div>
      <div className="menuList">
        {dataMenu.map((Item) => (
          <MenuItem
            Item={Item}
            level={1}
            visible={true}
            selectedExercise={selectedExercise}
            setSelectedExercise={setSelectedExercise}
            id={Item.id}
            selectedMenuId={selectedMenuId}
          ></MenuItem>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
