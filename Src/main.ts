import { Circle } from "./DomClasses/circle.js"
import { randomIntFromInterval } from "./Helpers/mathHelper.js"
// Start button logic

const startWrapper = (function(){

    let buttonState:boolean = false
    let bounceInterval:number
    let circlesElements:Circle[] = []
    let bounceDiv:HTMLDivElement = <HTMLDivElement>document.getElementById("bounceDiv");

    function createCircle(){
        const newDiv:HTMLDivElement = document.createElement("div");

        const gradientDirection:number = randomIntFromInterval(0,360)
        
        const colorRed1:number = randomIntFromInterval(0,255)
        const colorGreen1:number = randomIntFromInterval(0,255)
        const colorBlue1:number = randomIntFromInterval(0,255)

        const colorRed2:number = randomIntFromInterval(0,255)
        const colorGreen2:number = randomIntFromInterval(0,255)
        const colorBlue2:number = randomIntFromInterval(0,255)

        const circleRadius:number = randomIntFromInterval(40,100)
        newDiv.style.width=circleRadius+"px"
        newDiv.style.height=circleRadius+"px"
        newDiv.classList.add("circle")
        newDiv.style.backgroundImage = `linear-gradient(${gradientDirection}deg, rgba(${colorRed1},${colorGreen1},${colorBlue1}), rgba(${colorRed2},${colorGreen2},${colorBlue2}))`

        return newDiv
    }
    
    return function(){
        document.getElementById("startButton")!.addEventListener("click", function(){
            if(!buttonState){
                this.innerText = "Stop"
                let ballsNumber:number = parseInt((<HTMLInputElement>document.getElementById("ballCountInput")).value)
        
                let {top:topBounceDiv,left:leftBounceDiv,bottom:bottomBounceDiv,right:rightBounceDiv} = bounceDiv!.getBoundingClientRect();
        
                let diffRightLeft:number = rightBounceDiv-leftBounceDiv
                let difTopBottom:number = bottomBounceDiv - topBounceDiv
        
                for(let i=0;i<ballsNumber;i++){

                    let newDiv:HTMLDivElement = createCircle()
                    let xCoord:number = (leftBounceDiv+randomIntFromInterval(0,diffRightLeft-parseInt(newDiv.style.width)))
                    let yCoord:number = (topBounceDiv+randomIntFromInterval(0,difTopBottom-parseInt(newDiv.style.width)))
                    
                    newDiv.style.left=xCoord+"px"
                    newDiv.style.top=yCoord+"px"
        
                    circlesElements.push({
                        dom:newDiv,
                        x:xCoord,
                        y:yCoord,
                        step:randomIntFromInterval(1,10),
                        direction:randomIntFromInterval(0,1),
                        slope:Math.random()
                    })
                        bounceDiv!.append(newDiv)
                }
                
        
                bounceInterval = setInterval(()=>{
                    console.log("Bounce interval")
                    let {top:topBounceDiv,left:leftBounceDiv,bottom:bottomBounceDiv,right:rightBounceDiv} = bounceDiv!.getBoundingClientRect();
                    circlesElements.forEach((circle)=>{
        
                        let circleRadius = parseInt(circle.dom.style.width)
                        let direction = circle.direction
                        if(direction == 0){
                            circle.x += circle.step
                        } else {
                            circle.x -= circle.step
                        }
        
        
                        circle.y += circle.slope*circle.step
        
                        if(circle.x > rightBounceDiv - circleRadius){ // Right
                            circle.direction = (direction+1)%2
                            circle.x = rightBounceDiv - circleRadius
                        } else if (circle.x < leftBounceDiv){
                            circle.direction = (direction+1)%2
                            circle.x = leftBounceDiv
                        }
        
                        if(circle.y > bottomBounceDiv - circleRadius){ // Right
                            circle.slope *= -1;
                            circle.y = bottomBounceDiv - circleRadius
                            
                        }  else if(circle.y < topBounceDiv){
                            circle.slope *= -1;
                            circle.y =  topBounceDiv
                        }
        
                        circle.dom.style.left = circle.x+"px"
                        circle.dom.style.top = circle.y+"px"
                    })
                },15)
                buttonState = !buttonState
            } else {
                this.innerText = "Bounce"
                clearInterval(bounceInterval)
                let removeInterval = setInterval(function(){
                    console.log("Remove interval")
                    circlesElements.forEach((circle)=>{
                        let newRadius = (parseInt(circle.dom.style.width)-2)+"px"
                        circle.dom.style.width = newRadius
                        circle.dom.style.height = newRadius
                        circle.dom.style.left = (parseInt(circle.dom.style.left)+1)+"px"
                        circle.dom.style.top = (parseInt(circle.dom.style.top)+1)+"px"
                        console.log(circle.dom.style.left)
                        console.log(circle.dom.style.top)
                    })
                    circlesElements = circlesElements.filter((circle)=>{
                        if(parseInt(circle.dom.style.width) > 10)
                        {
                            return true;
                        } else {
                            bounceDiv!.removeChild(circle.dom)
                            return false;
                        }
                    })
        
                    if(!circlesElements.length){
                        buttonState = !buttonState
                        clearInterval(removeInterval)
                    }
        
                },10)
            }    
        });        
    }
})()()



// Animation 
  const bounceAnimation = [
    {color: 'coral'},
    {color: 'rgb(250, 238, 76)', transform: 'translateX(-45px) translateY(25px)'},
    {color: 'rgb(61, 236, 114)', transform: 'translateX(45px) translateY(25px)'},
    {color: 'rgb(58, 158, 204)', transform: 'translateX(45px) translateY(-25px)'},
    {color: 'rgb(221, 56, 180)', transform: 'translateX(-45px) translateY(-25px)'},
    {color: 'coral'}
  ];
document.getElementById("title")!.addEventListener("click", function(){
    this.animate(bounceAnimation, {
        duration: 2000,
        iterations: 3
      });
    
});
