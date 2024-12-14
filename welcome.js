const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");

const FONT_PATHS = {
  username: "node_modules/welcome-v2/font/Poppins-Bold.ttf",
   message: "node_modules/welcome-v2/font/OpenSans-Regular.ttf",
   welcome: "node_modules/welcome-v2/font/Nunito-SemiBold.ttf",
 };

GlobalFonts.registerFromPath(FONT_PATHS.username, "username");
GlobalFonts.registerFromPath(FONT_PATHS.message, "message");
GlobalFonts.registerFromPath(FONT_PATHS.welcome, "welcome");

const DEFAULT_BACKGROUND = "https://s6.imgcdn.dev/9W4xv.png";
const DEFAULT_GRADIENT = "https://s6.imgcdn.dev/9WMon.png";
const DEFAULT_COLORS = {
  username: "#FFD700", //FFD700",
  title: "#00BFFF",//00BFFF",
  message: "#FFFFFF",
};

class Welcome {
  constructor(options = {}) {
    this.username = options.username;
    this.avatar = options.avatar;
    this.title = options.title || "WELCOME";
    this.message = options.message;
    this.background = options.background || DEFAULT_BACKGROUND;
    this.usernameColor = options.usernameColor || DEFAULT_COLORS.username;
    this.titleColor = options.titleColor || DEFAULT_COLORS.title;
    this.messageColor = options.messageColor || DEFAULT_COLORS.message;

    this.canvasWidth = 1280;
    this.canvasHeight = 720;
  }

  truncateText(text, maxLength) {
    return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
  }

  setName(name, usernameColor) {
    this.username = name;
    if (usernameColor) this.usernameColor = usernameColor;
    return this;
  }

  setAvatar(image) {
    this.avatar = image;
    return this;
  }

  setTitle(title, titleColor) {
    this.title = title;
    if (titleColor) this.titleColor = titleColor;
    return this;
  }

  setMessage(message, messageColor) {
    this.message = message;
    if (messageColor) this.messageColor = messageColor;
    return this;
  }

  setBackground(background) {
    this.background = background;
    return this;
  }

  async build() {
    if (!this.username) throw new Error("Provide a username to display on the card.");
    if (!this.avatar) throw new Error("Provide a valid avatar URL.");
    if (!this.message) throw new Error("Provide a message to display on the card.");

    this.username = this.truncateText(this.username, 27);
    this.title = this.truncateText(this.title, 27);
    this.message = this.truncateText(this.message, 27);

    const canvas = createCanvas(this.canvasWidth, this.canvasHeight);
    const ctx = canvas.getContext("2d");

    const backgroundImage = await loadImage(this.background);
    ctx.drawImage(backgroundImage, 0, 0, this.canvasWidth, this.canvasHeight);

    const gradientImage = await loadImage(DEFAULT_GRADIENT);
    ctx.drawImage(gradientImage, 0, 0, this.canvasWidth, this.canvasHeight);

    const avatar = await loadImage(this.avatar);
    const avatarX = 510, avatarY = 92, avatarSize = 260;
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();

    ctx.textAlign = "center";

    ctx.fillStyle = this.usernameColor;
    ctx.font = "91px username";
    ctx.fillText(this.username.toUpperCase(), this.canvasWidth / 2, this.canvasHeight / 2 + 70);

    ctx.fillStyle = this.titleColor;
    ctx.font = "76px welcome";
    ctx.fillText(this.title, this.canvasWidth / 2, this.canvasHeight / 2 + 150);

    ctx.fillStyle = this.messageColor;
    ctx.font = "bold 41px message";
    ctx.fillText(this.message.toUpperCase(), this.canvasWidth / 2, this.canvasHeight / 2 + 290);

    return canvas.toBuffer("image/png");
  }
}

module.exports = { Welcome };
