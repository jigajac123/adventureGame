
import platformImage from '../images/gamePlatformGraceModify1PNG.png'
import background from '../images/background1.jpg'
import background1 from '../images/big-tree.png'
import background2 from '../images/tree.png'
import background3 from '../images/doubled.png'
import background4 from '../images/mountain2.png'
import platformImage1 from '../images/gamePlatformGraceModify4.png'
import animeStandRight from '../images/animeStand.png'
import animeRunRight from '../images/animeRunRight.png'
import animeRunLeft from '../images/animeRunLeft.png'



const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 570
const gravity = 0.5

let scrollOffset = 0
class Player {
  constructor() {
    this.speed = 10
    this.position ={
      x:100,
      y:100
    }
    this.velocity ={
      x:0,
      y: 5
    }

    this.width = 104
    this.height = 103

    this.image = displayImage(animeStandRight)
    this.frames = 0
    this.sprites = {
      stand:{
        right:displayImage(animeStandRight),
        left :'',
        cropHeight:56
      },

      run:{
        right: displayImage(animeRunRight),
        left : displayImage(animeRunLeft),
        cropHeight : 59
      }
    }
    this.currentSprite = this.sprites.stand.right
    this.currentCropWidth = 64
    this.currentCropHeight = 56
  }

  draw(){
    c.drawImage(this.currentSprite,
      this.currentCropWidth*this.frames,
      0,
      this.currentCropWidth,
      this.currentCropHeight,
      this.position.x,
      this.position.y,
      this.width,
      this.height)
  }

update(){
  this.frames++

  if(this.frames > 9 ){
    this.frames =0
  }


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

let platform = displayImage(platformImage)
let backgroundHelper = displayImage(background)
let backgroundHelper1 = displayImage(platformImage1)

let player = new Player()
let platforms = []


let backgroundImages = []

let backgroundMovements = []

const keys = {
  right:{
    pressed : false
  },
  left:{
    pressed: false
  }
}

function Init(){
 scrollOffset = 0
  function displayImage(imageSrc){
    const image = new Image()
    image.src= imageSrc
    return image

  }

   platform = displayImage(platformImage)
   backgroundHelper = displayImage(background)
   backgroundHelper1 = displayImage(platformImage1)

   player = new Player()
   platforms = [new Platform({x:-1, y:505, image: platform}),
                     new Platform({x:platform.width -3, y:505, image: platform}),
                     new Platform({x:1100, y:400, image: backgroundHelper1}),
                     new Platform({x:1800, y:300, image: backgroundHelper1}),
                     new Platform({x:2500, y:505, image: platform}),
                     new Platform({x:2998, y:505, image: platform}),
                     new Platform({x:3497, y:505, image: platform}),
                     new Platform({x:3497, y:300, image: backgroundHelper1}),
                     new Platform({x:4500, y:505, image: platform}),
                     new Platform({x:4997, y:505, image: platform})]


   backgroundImages = [new BackgroundImage({x:0, y:-300, image: backgroundHelper})]

   backgroundMovements = [new BackgroundMovement({x:0, y:300,
    image:displayImage(background3)}),

  new BackgroundMovement({x:500, y:300, image: displayImage(background2)}),
  new BackgroundMovement({x:1200, y:110, image: displayImage(background2)}),
  new BackgroundMovement({x:2300, y:-120, image: displayImage(background1)}),
  new BackgroundMovement({x:4000, y:400, image: displayImage(background4)})
  ]
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
  player.velocity.x = player.speed
}
else if((keys.left.pressed && player.position.x > 100) ||
keys.left.pressed && scrollOffset === 0 && player.position.x > 0){

  player.velocity.x = -player.speed
}
else{
  player.velocity.x = 0

  if(keys.right.pressed ){
      scrollOffset += 5
    platforms.forEach((platform) =>{
      platform.position.x -= player.speed*0.66
    })

    backgroundMovements.forEach((movement) =>{
      movement.position.x -= player.speed*0.66
    })
  }
  else if(keys.left.pressed && scrollOffset > 0){
       scrollOffset -= 5
    platforms.forEach((platform) =>{
        platform.position.x += player.speed*0.66
    })

    backgroundMovements.forEach((movement) =>{
      movement.position.x += player.speed*0.66
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
if(scrollOffset > 3500){
  console.log('You won')
}

//losing condition
if(player.position.y > canvas.height){
  Init()
}
}


Init()
animation()


addEventListener('keydown', ({keyCode}) =>{

switch (keyCode){
  case 86:
 console.log('Top')
 player.velocity.y = -15
 break

 case 66:
console.log('down')

break

 case 78:
console.log('right')
keys.right.pressed = true
player.currentSprite = player.sprites.run.right
player.currentCropHeight = player.sprites.run.cropHeight
break

case 77:
console.log('left')
keys.left.pressed = true
player.currentSprite = player.sprites.run.left
player.currentCropHeight = 57
break
}

})


addEventListener('keyup', ({keyCode}) =>{

switch (keyCode){
  case 86:
 console.log('Top')
 break

 case 66:
console.log('down')
break

 case 78:
console.log('right')
keys.right.pressed = false
player.currentSprite = player.sprites.stand.right
player.currentCropHeight = player.sprites.stand.cropHeight
break

case 77:
console.log('left')
keys.left.pressed = false
player.currentSprite = player.sprites.stand.right
player.currentCropHeight = player.sprites.stand.cropHeight
break
}

})
