import { useEffect, useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

function reduce(state,action){
  switch(action.type){
    case "Loading":
      return {...state,isLoading:true}
    case "Error":
      return {...state,isLoading:false,isError:true}
    case "Succes":
      return {...state,isLoading:false,footballMatches:action.payload}
    case "Search":
      return {...state,isLoading:false,footballMatches:action.payload}
    default:
      return {isLoading: false,isError: false,footballMatches: []}
  }
}
function App() {
  let [data,setVal]=useReducer(reduce,{isLoading: false,isError: false,footballMatches: []})
  let [ser,setSer]=useState("")
  let [a,setA]=useState([])
  function fetchData(){
    fetch("https://jsonmock.hackerrank.com/api/football_matches?page=2").
    then((e)=>e.json()).
    then((e)=>{console.log(e.data)
      setVal({type:"Loading"})
      setVal({type:"Succes",payload:e.data})
      setA(e.data)
    }).catch((err)=>{setVal({type:"Error",payload:err})})
  }
  useEffect(()=>{
    fetchData()
  },[])
  function search(){
    console.log(ser)
    if(ser!==""){
      let b=a.filter((v,i)=>{
        return (v.team1===ser) || (v.team2===ser) || (v.round===ser)
      })
      setVal({type:"Search",payload:b})
    }else{
      fetchData()
    }
  }
  function sewage(name){
    console.log(name)
    if(name){
      let b=a.filter((v)=>{
        return (v.round===name)
      })
      console.log(b)
      setVal({type:"Search",payload:b})
    }else{
      fetchData()
    }
  }
  return (
    <>
      <h1 style={{color:"orange"}}>UEFA Champions League</h1>
      <input type='text' value={ser} placeholder='search' onChange={(e)=>{setSer(e.target.value)}}/>
      <button onClick={search}>Search</button>
      <div>
      <select onChange={(e)=>sewage(e.target.value)}>
          <option value="">All</option>
          <option value="GroupA">GroupA</option>
          <option value="GroupB">GroupB</option>
          <option value="GroupC">GroupC</option>
          <option value="GroupD">GroupD</option>
        </select> 
      </div>
      {data?.isLoading && !data?.isError && <h1>Loading ...</h1>}
      {!data?.isLoading && data?.isError && <h1>Error in data Loading</h1>}
      {!data?.isLoading && data?.footballMatches.map((v,i)=>{
        return(
          <div  key={i} style={{border:"1px solid black",marginTop:"25px"}}>
            <h1>{v.competition} {v.year}</h1>
            <h2>Group: {v.round}</h2>
            <h2>Match: {v.team1} Vs {v.team2}</h2>
            <h2>{v.team1} Goals: {v.team1goals}</h2>
            <h2>{v.team2} Goals: {v.team2goals}</h2>
            <h2>Match win By:{(Number(v.team1goals)>Number(v.team2goals))?v.team1:(Number(v.team1goals)===Number(v.team2goals))?"Match is Tie":v.team2}</h2>
          </div>
        )
      })}
    </>
  )
}

export default App
