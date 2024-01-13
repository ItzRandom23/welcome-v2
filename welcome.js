const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");

GlobalFonts.registerFromPath(
  "node_modules/welcome-v2/font/PlayfairDisplay-SemiBold.ttf",
  "username"
);
GlobalFonts.registerFromPath(
  "node_modules/welcome-v2/font/Montserrat-ExtraLight.ttf",
  "message"
);
GlobalFonts.registerFromPath(
  "node_modules/welcome-v2/font/Ubuntu-Regular.ttf",
  "welcome"
);

const imageUrls = "https://s6.imgcdn.dev/9W4xv.png";

class Welcome {
  constructor(options) {
    this.username = options?.username;
    this.avatar = options?.avatar;
    this.title = options?.title;
    this.message = options?.message;
    this.background = options?.background;
    this.usernameColor = options?.usernameColor || "#FFD700"; // Default color
    this.titleColor = options?.titleColor || "#00BFFF"; // Default color
    this.messageColor = options?.messageColor || "#FFFFFF"; // Default color
  }

  setName(name, usernameColor) {
    this.username = name;
    if (usernameColor) {
      this.usernameColor = usernameColor;
    }
    return this;
  }

  setAvatar(image) {
    this.avatar = image;
    return this;
  }

  setTitle(title, titleColor) {
    this.title = title;
    if (titleColor) {
      this.titleColor = titleColor;
    }
    return this;
  }

  setMessage(message, messageColor) {
    this.message = message;
    if (messageColor) {
      this.messageColor = messageColor;
    }
    return this;
  }

  setBackground(background) {
    this.background = background;
    return this;
  }


  async build() {
    if (!this.username) throw new Error("Provide username to display on card");
    if (!this.avatar) throw new Error("Provide valid avatar url of user");
    if (!this.title) this.setTitle("WELCOME");
    if (!this.message) throw new Error("Provide message to display on card");
    if (!this.background) this.setBackground(imageUrls);

    if (this.username.length >= 27) {
      this.username = this.username.slice(0, 24) + "...";
    }

    if (this.title.length >= 27) {
      this.title = this.title.slice(0, 24) + "...";
    }

    if (this.message.length >= 27) {
      this.message = this.message.slice(0, 24) + "...";
    }

    const canvasWidth = 1280;
    const canvasHeight = 720;

    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    // Load the current background image
    const backgroundImage = await loadImage(this.background);
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

    const gradientImage = await loadImage("https://s6.imgcdn.dev/9WMon.png");
    ctx.drawImage(gradientImage, 0, 0, canvasWidth, canvasHeight);

    const avatar = await loadImage(this.avatar);

    
    ctx.fillStyle = this.usernameColor; // Use the provided username color
    ctx.font = "91px username";
    ctx.textAlign = "center";
    ctx.fillText(`${this.username}`.toUpperCase(), centerX, centerY + 70);

    ctx.fillStyle = this.titleColor; // Use the provided title color
    ctx.font = "76px welcome";
    ctx.fillText(`${this.title}`, centerX, centerY + 150);

    ctx.fillStyle = this.messageColor; // Use the provided message color
    ctx.font = "bold 41px message";
    ctx.fillText(`${this.message}`.toUpperCase(), centerX, centerY + 290);

    ctx.globalAlpha = 1;

    ctx.save();
    ctx.beginPath();
    ctx.arc(510 + 130, 92 + 130, 130, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 510, 92, 260, 260);
    ctx.restore();

    return canvas.toBuffer("image/png");
  }
}

module.exports = { Welcome };