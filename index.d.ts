declare class Welcome {
    constructor(options: {
      username?: string;
      avatar?: string;
      title?: string;
      message?: string;
      background?: string;
      usernameColor?: string;
      titleColor?: string;
      messageColor?: string;
    });
  
    setName(name: string, usernameColor?: string): this;
    setAvatar(image: string): this;
    setTitle(title: string, titleColor?: string): this;
    setMessage(message: string, messageColor?: string): this;
    setBackground(background: string): this;
    build(): Promise<Buffer>;
}
  
  export = Welcome;
  