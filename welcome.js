const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");

GlobalFonts.registerFromPath(
  "node_modules/welcome-canvas/font/Caveat-VariableFont_wght.ttf",
  "username"
);
GlobalFonts.registerFromPath(
  "node_modules/welcome-canvas/font/Montserrat-ExtraLight.ttf",
  "montserrat-extra-light"
);
GlobalFonts.registerFromPath(
  "node_modules/welcome-canvas/font/EduSABeginner-VariableFont_wght.ttf",
  "welcome"
);

//Default background image
const defaultBg = "https://s6.imgcdn.dev/ZpIVD.png";

class Welcome {
  constructor(options) {
    this.username = options?.member?.username?.name;
    this.usernameColor = options?.member?.username?.color ?? "#FFD700";
    this.avatar = options?.member?.avatar;
    this.title = options?.title?.text;
    this.titleColor = options?.title?.color ?? "#FFFFFF";
    this.message = options?.message?.text;
    this.messageColor = options?.message?.color ?? "#FFFFFF";
    this.background = options?.background;
  }

  /**
   * @param {string} text
   * @param {string} color
   */
  setName(text, color) {
    this.username = name;
    this.usernameColor = color ?? "#FFD700";
    return this;
  }
  /**
   * @param {string} imageUrl
   */
  setAvatar(imageUrl) {
    this.avatar = imageUrl;
    return this;
  }
  /**
   * @param {string} text
   * @param {string} color
   */
  setTitle(text, color) {
    this.title = text;
    this.titleColor = color ?? "#FFFFFF";
    return this;
  }
  /**
   * @param {string} text
   * @param {string} color
   */
  setMessage(text, color) {
    this.message = text;
    this.messageColor = message ?? "#FFFFFF";
    return this;
  }
  /**
   * @param {string} backgroundUrl
   */
  setBackground(backgroundUrl) {
    this.background = backgroundUrl;
    return this;
  }

  async build() {
    if (!this.username) throw new Error("Provide username to display on card");
    if (!this.avatar) throw new Error("Provide valid avatar url of user");
    if (!this.message) throw new Error("Provide message to display on card");
    if (!this.background) this.setBackground(defaultBg);
    if (!this.title) this.setTitle("WELCOME");

    if (typeof this.username !== 'string') throw new Error("Username must be string");
    if (typeof this.avatar !== 'string') throw new Error("Avatar must be string");
    if (typeof this.message !== 'string') throw new Error("Message must be string");
    if (typeof this.title !== 'string') throw new Error("Title must be string");
    if (typeof this.username !== 'string') throw new Error("Background must be string");
    if (typeof(this.usernameColor && this.titleColor && this.messageColor) !== 'string') throw new Error("Color must be string");



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

    ctx.fillStyle = this.usernameColor;
    ctx.font = "91px username";
    ctx.textAlign = "center";

    ctx.fillText(`${this.username}`.toUpperCase(), centerX, centerY + 70);

    ctx.fillStyle = this.titleColor;
    ctx.globalAlpha = 0.4;

    ctx.fillStyle = "#00BFFF";
    ctx.font = "76px welcome";

    ctx.fillText(`${this.title}`, centerX, centerY + 150);
    ctx.fillStyle = this.messageColor;
    ctx.font = "bold 41px montserrat-extra-light";

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
