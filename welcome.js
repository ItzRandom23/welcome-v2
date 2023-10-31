const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");

GlobalFonts.registerFromPath(
  "node_modules/welcome-canvas/font/PlayfairDisplay-SemiBold.ttf",
  "username"
);
GlobalFonts.registerFromPath(
  "node_modules/welcome-canvas/font/Montserrat-ExtraLight.ttf",
  "message"
);
GlobalFonts.registerFromPath(
  "node_modules/welcome-canvas/font/Ubuntu-Regular.ttf",
  "welcome"
);

const imageUrls = "https://s6.imgcdn.dev/ZpIVD.png";

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

    const gradientImage = await loadImage("https://s6.imgcdn.dev/9Qs3v.png");
    ctx.drawImage(gradientImage, 0, 0, canvasWidth, canvasHeight);

    const avatar = await loadImage(this.avatar);

    ctx.fillStyle = "#FFD700";
    ctx.font = "91px username";
    ctx.textAlign = "center";
    ctx.fillText(`${this.username}`.toUpperCase(), centerX, centerY + 70);
    ctx.fillStyle = "#FFFFFF";
    ctx.globalAlpha = 0.4;

    ctx.fillStyle = "#00BFFF";
    ctx.font = "76px welcome";
    ctx.fillText(`${this.title}`, centerX, centerY + 150);

    ctx.fillStyle = "#FFFFFF";
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

module.exports = { welcome };
