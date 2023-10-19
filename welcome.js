const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');


GlobalFonts.registerFromPath("node_modules/welcome-canvas/font/Caveat-VariableFont_wght.ttf", "username");
GlobalFonts.registerFromPath("node_modules/welcome-canvas/font/Montserrat-ExtraLight.ttf", "montserrat-extra-light");
GlobalFonts.registerFromPath("node_modules/welcome-canvas/font/EduSABeginner-VariableFont_wght.ttf", "welcome");


const imageUrls = [
  'https://s6.imgcdn.dev/ZpcLw.png',
  'https://s6.imgcdn.dev/ZpCUT.png',
  'https://s6.imgcdn.dev/Zp4wt.png',
  'https://s6.imgcdn.dev/ZpIVD.png',
  'https://s6.imgcdn.dev/ZpNo9.png',
  'https://s6.imgcdn.dev/Zpisy.png',
  'https://s6.imgcdn.dev/Zpkx8.png',
  'https://s6.imgcdn.dev/ZpnH2.png',
];


  let currentImageIndex = 0;


  class welcome {
    constructor(options) {
        this.username = options?.username;
        this.avatar = options?.avatar;
        this.title = options?.title;
        this.message = options?.message;
        this.background = options?.background;
    }

    setName(name) {
        this.username = name;
        return this;
    }

    setAvatar(image) {
        this.avatar = image;
        return this;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setMessage(message) {
        this.message = message;
        return this;
    }

    setBackground(background) {
        this.background = background
        return this;
    }

    async build() {
        if (!this.username) throw new Error("Provide username to display on card");
        if (!this.avatar) throw new Error("Provide valid avatar url of user");
        if (!this.title) this.setTitle("WELCOME");
        if (!this.message) throw new Error("Provide message to display on card");
        this.setBackground(imageUrls)

        if(this.username.length >= 16) {
            throw new Error(`The Username Should be Less Than 15 Words`);
        }

        if(this.title.length >= 16) {
            throw new Error(`The title Should be Less Than 15 Words`);
        }

        if (this.message.length >= 36) {
            throw new Error(`The message Should be Less Than 36 Words`);
        }

    const canvasWidth = 1280;
    const canvasHeight = 720;

    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Load the current background image
    const backgroundImage = await loadImage(imageUrls[currentImageIndex]);
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

    // Increment the current image index and loop back to the first image if it's the last one
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length;

  
   
    const gradientImage = await loadImage('https://s6.imgcdn.dev/ZqFsH.png');
    ctx.drawImage(gradientImage, 0, 0, canvasWidth, canvasHeight);
  
  
    const avatar = await loadImage(this.avatar);
  
  
    ctx.fillStyle = '#FFD700'; 
ctx.font = '91px username';
ctx.textAlign = 'center';

ctx.fillText(`${this.username}`.toUpperCase(), centerX, centerY + 70);

ctx.fillStyle = '#FFFFFF'; 
ctx.globalAlpha = 0.4;

ctx.fillStyle = '#00BFFF';
ctx.font = '76px welcome';

ctx.fillText(`${this.title}`, centerX, centerY + 150);
ctx.fillStyle = '#FFFFFF'; 
ctx.font = 'bold 41px montserrat-extra-light';

ctx.fillText(`${this.message}`.toUpperCase(), centerX, centerY + 290);

ctx.globalAlpha = 1;

  
    ctx.save();
    ctx.beginPath();
    ctx.arc(510 + 130, 92 + 130, 130, 0, Math.PI * 2) 
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 510, 92, 260, 260); 
    ctx.restore();
  

    return canvas.toBuffer("image/png");
  }
}

module.exports = { welcome };
