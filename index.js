
import platformImage from '../images/gamePlatformGraceModify1PNG.png'


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
  else this.velocity.y = 0

}

}

class Platform{
  constructor({x,y,image}){
    this.position ={
      x,
      y
    }

    this.image = image
    this.width = 200
    this.height = 20
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

const player = new Player()
const platforms = [new Platform({x:100, y:200, image: platform}),
                   new Platform({x:500, y:150, image: platform})]


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
player.update()
platforms.forEach((platform) =>{
  platform.draw()
})


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

  }
  else if(keys.left.pressed){
       scrollOffset -= 5
    platforms.forEach((platform) =>{
        platform.position.x += 5
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

if(scrollOffset > 2000){
  console.log('You won')
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
