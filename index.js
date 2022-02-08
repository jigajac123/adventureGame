
import platformImage from '../images/gamePlatformGraceModify1PNG.png'
import background from '../images/background1.jpg'
import background1 from '../images/big-tree.png'
import background2 from '../images/tree.png'
import background3 from '../images/doubled.png'
import background4 from '../images/mountain2.png'
import platformImage1 from '../images/gamePlatformGraceModify4.png'


const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 570
const gravity = 0.5

let scrollOffset = 0
class Player {
  constructor() {
    this.position ={
      x:100,
      y:100
    }
    this.velocity ={
      x:0,
      y: 5
    }
    this.width = 30
    this.height = 30
  }

  draw(){
    c.fillStyle ='red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

update(){
  this.draw()
  this.position.y += this.velocity.y
  this.position.x += this.velocity.x

  if(this.position.y + this.height +
    this.velocity.y <= canvas.height)
  this.velocity.y += gravity


}

}

class Platform{
  constructor({x,y,image}){
    this.position ={
      x,
      y
    }

    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw(){

    c.drawImage(this.image, this.position.x, this.position.y)
  }



}

class BackgroundImage{
  constructor({x,y,image}){
    this.position ={
      x,
      y
    }

    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw(){

    c.drawImage(this.image, this.position.x, this.position.y)
  }



}

class BackgroundMovement{
  constructor({x,y,image}){
    this.position ={
      x,
      y
    }

    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw(){

    c.drawImage(this.image, this.position.x, this.position.y)
  }



}

function displayImage(imageSrc){
  const image = new Image()
  image.src= imageSrc
  return image

}

const platform = displayImage(platformImage)
const backgroundHelper = displayImage(background)
const backgroundHelper1 = displayImage(platformImage1)

const player = new Player()
const platforms = [new Platform({x:-1, y:505, image: platform}),
                   new Platform({x:platform.width -3, y:505, image: platform}),
                   new Platform({x:1100, y:400, image: backgroundHelper1}),
                   new Platform({x:1800, y:300, image: backgroundHelper1}),
                   new Platform({x:2500, y:505, image: platform}),
                   new Platform({x:2998, y:505, image: platform})]


const backgroundImages = [new BackgroundImage({x:0, y:-300, image: backgroundHelper})]

const backgroundMovements = [new BackgroundMovement({x:0, y:300,
  image:displayImage(background3)}),

new BackgroundMovement({x:500, y:300, image: displayImage(background2)}),
new BackgroundMovement({x:1200, y:110, image: displayImage(background2)}),
new BackgroundMovement({x:2300, y:-120, image: displayImage(background1)}),
new BackgroundMovement({x:4000, y:400, image: displayImage(background4)})
]

const keys = {
  right:{
    pressed : false
  },
  left:{
    pressed: false
  }
}


function animation(){
  requestAnimationFrame(animation)
  c.fillStyle ='white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  backgroundImages.forEach((background) =>{
    background.draw()
  })

backgroundMovements.forEach((movement) =>{
  movement.draw()
})

platforms.forEach((platform) =>{
  platform.draw()
})
player.update()

if(keys.right.pressed && player.position.x < 400){
  player.velocity.x = 5
}
else if(keys.left.pressed && player.position.x > 100){

  player.velocity.x = -5
}
else{
  player.velocity.x = 0

  if(keys.right.pressed){
      scrollOffset += 5
    platforms.forEach((platform) =>{
      platform.position.x -= 5
    })

    backgroundMovements.forEach((movement) =>{
      movement.position.x -=3
    })
  }
  else if(keys.left.pressed){
       scrollOffset -= 5
    platforms.forEach((platform) =>{
        platform.position.x += 5
    })

    backgroundMovements.forEach((movement) =>{
      movement.position.x +=3
    })
  }
}

//collusion detection
platforms.forEach((platform) =>{

  if(player.position.y + player.height <=
  platform.position.y && player.position.y + player.height +
  player.velocity.y >= platform.position.y && player.position.x + player.width >=
platform.position.x && player.position.x + player.width <=
platform.position.x + platform.width){

  player.velocity.y = 0
}

})

//winning condition
if(scrollOffset > 4000){
  console.log('You won')
}

//losing condition
if(player.position.y > canvas.height){
  console.log('you lost')
}
}



animation()


addEventListener('keydown', ({keyCode}) =>{

switch (keyCode){
  case 86:
 console.log('Top')
 player.velocity.y = -20
 break

 case 66:
console.log('down')

break

 case 78:
console.log('right')
keys.right.pressed = true
break

case 77:
console.log('left')
keys.left.pressed = true
break
}

})


addEventListener('keyup', ({keyCode}) =>{

switch (keyCode){
  case 86:
 console.log('Top')
 player.position.y = 0
 break

 case 66:
console.log('down')
break

 case 78:
console.log('right')
keys.right.pressed = false
break

case 77:
console.log('left')
keys.left.pressed = false
break
}

})
