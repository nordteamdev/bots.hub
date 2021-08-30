import { createCanvas } from 'canvas'

export default class NiaCommand {
  name = 'nia'
  right = 'topsecret'
  
  handler (ctx) {
    const canvas = createCanvas(200, 200) 
    
    const context = canvas.getContext('2d') 
    // Write "Awesome!" 
    context.font = '30px Impact'
     context.rotate(0.1)
      context.fillText('Awesome!', 50, 100) 
    
    ctx.builder()
      .text('maow')
      .photo(canvas.toBuffer())
      .answer()
  }
}