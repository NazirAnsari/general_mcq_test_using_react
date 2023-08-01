import React, { useState,useEffect } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import {questionData} from './question'
import StackedExample from './stackedBar';

export default function Index() {
    const [question,setQuestion] = useState(questionData)
    const [currentPage, setCurrPage] = useState(1)
    const [next,setNext] = useState (false)
    const [text,setText] = useState  ('')
    const [now,setNow] = useState(5)
    const [correctAns,setCorrectAns]=useState(0)

    const recordPerPage = 1
    const lastIndex = currentPage * recordPerPage
    const firstIndex = lastIndex - recordPerPage
    const records = question && question.slice(firstIndex, lastIndex)
    const totalPage = Math.ceil(question && (question.length / recordPerPage))

   const  getTextValue = (myData,event)=>{
      let txt=event.target.innerText;
      event.target.style.backgroundColor="black"
      event.target.style.color='white'
 
      if(myData.correct_answer === txt ){

        if(correctAns<100){
         setCorrectAns(correctAns+5)
        }
        else
        setCorrectAns(100)
        }
      setText(txt)
      setNext(true)
    }

    useEffect(() => {
      // Function to reset button colors when the "Next" button is clicked
      const resetButtonColors = () => {
        const buttons = document.getElementsByClassName('btn');
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].style.backgroundColor = '';
          buttons[i].style.color = '';
        }
      };
  
      resetButtonColors(); // Reset button colors on component mount
    }, [currentPage]);

  return (
    <div>
      <ProgressBar now={now} label={`${now}%`} />

      <h4>General MCQ Test</h4>
      {records && records.map((myData,index)=>(
        
        <div key={index}>
        <h2>Question {currentPage} of {question.length}</h2>
        <p>{myData.category}</p>
        {myData.difficulty == 'easy'? '★' : (myData.difficulty == 'medium' ?  '★★' : '★★★')}
        <h4>
            {myData.question}
        </h4>
        <div className='questionBtn'>
            <button  className='btn' onClick={(event)=>getTextValue(myData,event)}>{myData.correct_answer}</button>

            {myData.incorrect_answers.map((incorrect) => (
              <button  className='btn' onClick={(event)=>getTextValue(myData,event)} key={incorrect}>{incorrect}</button>
            ))}
        </div>

        {next &&  <h1 className='textCenter'>{myData.correct_answer == text ? 'Correct!' : 'Sorry!'} </h1>}
        <div className='nextBtn'>
        {
        next && <button className="btn centered-button" disabled={currentPage == totalPage} onClick={() => { (currentPage != totalPage) && setCurrPage(currentPage + 1); setNext(false);setNow(now+5)}}>Next</button>
        }
        </div>
        </div>
      ))}
    <StackedExample now={correctAns} currentPage={currentPage}/>
    </div>
  )
}
