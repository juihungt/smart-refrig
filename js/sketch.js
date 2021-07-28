let scenes = [];

let buttonC, buttonO, buttonImg;
let counter = 0;

let cam, pose, pNet;

let AveR, AveB, gameFont;
let imgvent, imglockClosed, imglockOpen, imgCodeBarReader, imgCodeBar;
let imgApple, imgBanana, imgGrapes, imgKiwi, imgMango, imgOrange, imgPineapple, imgStrawberry, imgWatermelon;
let imgCodeBarApple, imgCodeBarBanana, imgCodeBarGrapes, imgCodeBarKiwi, imgCodeBarOrange, imgCodeBarPineapple, imgCodeBarStrawberry, imgCodeBarWatermelon;
let emojiCry, emojiHeart, emojiLeft, emojiMad, emojiRight, emojiSmile, imgMemo;

let firstTouched = false;
let okButtonFirstTouched = false;
let onceReturn = false;
let refrigStatus = false;

let memoText, memoRightInputText, memoRighttext, memoRighttextReturn, emojiShowed, foldFactor, foldFactor2, foldImage, foldImage2, me, imgWarning;

let grapesStatus = false;
let bananaStatus = false;
let orangeStatus = false;
let appleStatus = false;
let pineappleStatus = false;
let strawberryStatus = false;
let kiwiStatus = false;
let watermelonStatus = false;

let foldLength;

//img preload ------------------------------------------------------------
function preload(){
    AveR = loadFont("data/AvenirNextLTPro-Regular.otf");
    AveB = loadFont("data/AvenirNextLTPro-Bold.otf");
    gameFont = loadFont("data/game_over.ttf");

    imgvent = loadImage("data/vent.png");
    imglockClosed = loadImage("data/close.png");
    imglockOpen = loadImage("data/open.png");
    imgCodeBarReader = loadImage("data/barcodereader.png");
    imgCodeBar = loadImage("data/barcode.png")

    imgApple = loadImage("data/apple.png");
    imgBanana = loadImage("data/banana.png");
    imgGrapes = loadImage("data/grapes.png");
    imgKiwi = loadImage("data/kiwi.png");
    imgMango = loadImage("data/mango.png");
    imgOrange = loadImage("data/orange.png");
    imgPineapple = loadImage("data/pineapple.png");
    imgStrawberry = loadImage("data/strawberry.png");
    imgWatermelon = loadImage("data/watermelon.png");
    imgCodeBarApple = loadImage("data/barcodeapple.png");
    imgCodeBarBanana = loadImage("data/barcodebanana.png");
    imgCodeBarGrapes = loadImage("data/barcodegrapes.png");
    imgCodeBarKiwi = loadImage("data/barcodekiwi.png");
    imgCodeBarOrange = loadImage("data/barcodeorange.png");
    imgCodeBarPineapple = loadImage("data/barcodepipneapple.png");
    imgCodeBarStrawberry = loadImage("data/barcodestrawberry.png");
    imgCodeBarWatermelon = loadImage("data/barcodewatermelon.png");

    emojiCry = loadImage("data/emojiCry.png");
    emojiHeart = loadImage("data/emojiHeart.png");
    emojiLeft = loadImage("data/emojiLeft.png");
    emojiMad = loadImage("data/emojiMad.png");
    emojiRight = loadImage("data/emojiRight.png");
    emojiSmile = loadImage("data/emojiSmile.png");
    imgMemo = loadImage("data/memo.png");

    me = loadImage("data/me.png")
    imgWarning = loadImage("data/warning.png")
}

//SETUP ------------------------------------------------------------
function setup() {
    createCanvas(windowWidth, windowHeight);

    if (isMobileDevice()) {
        scenes[0] = new MobileWarning();
    } else {
        scenes[0] = new RefrigClosed();
    }


    cam = createCapture(VIDEO);
    cam.hide();
    pNet = ml5.poseNet(cam, modelLoaded);
    pNet.on('pose', posesReady);

    scenes[0] = new RefrigClosed();
    scenes[1] = new Refrig();

    buttonC = new ButtonC();
    buttonO = new ButtonO();
    buttonImg = new ButtonImg();
    warning = new Warning();

    memoRightInputText = "";
    memoText = "Leave your message here!"

    emojiShowed = emojiHeart;
    foldFactor = 0;
    foldFactor2 = 0;
    //noCursor();
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

//DRAW ------------------------------------------------------------
function draw() {
    background(255);
    scenes[counter].show();

    //button
    buttonO.show();
    buttonO.wasClicked();
    buttonC.show();
    buttonC.wasClicked();
    buttonImg.show();

    memoRighttext = "Hi, "+scenes[0].inputField.inputText+", nice to meet you :)   I am your smart refrigerator. You could stylize me by the slider bars at any time. Let’s open and see what is living inside me.";
    memoRighttextReturn = "Hi, I am "+scenes[0].inputField.inputText+"'s smart refrigerator. You could stylize me by the slider bars at any time. Let’s open and see what is living inside me.";


    if (refrigStatus == false) {
        if (okButtonFirstTouched == false && onceReturn == false){
            scenes[0].welcomeDialog.showL(scenes[0].rgbSlider);
        } else if (okButtonFirstTouched == true && onceReturn == false){
            //scenes[0].welcomeDialog.showL(scenes[0].rgbSlider);
            scenes[0].welcomeDialog.showR(scenes[0].rgbSlider, scenes[0].inputField);
            scenes[0].memo.show();
            scenes[0].memo.sendButtonMouseOver();
            scenes[0].memo.emojiButtonMouseOver();
            scenes[0].memo.foldButtonMouseOver();
            scenes[0].memo.showMemo(scenes[0].inputField);
            scenes[0].memo.showEmoji();
        } else if (onceReturn == true){
            scenes[0].welcomeDialog.showR(scenes[0].rgbSlider, scenes[0].inputField);
            scenes[0].memo.show();
            scenes[0].memo.sendButtonMouseOver();
            scenes[0].memo.emojiButtonMouseOver();
            scenes[0].memo.foldButtonMouseOver();
            scenes[0].memo.showMemo(scenes[0].inputField);
            scenes[0].memo.showEmoji();
        }
    } else {  //refrigStatus = true

    }
    
    if (windowWidth/windowHeight < 1) {
        warning.showIncreaseW();
    } else if (windowWidth/windowHeight > 2.15) {
        warning.showIncreaseH();
    } else {

    }
    foldLength = windowWidth-windowWidth*.8775;
}
function mouseClicked() {

    if (buttonC.wasClicked()){  //refrig OPEN
        if (counter < scenes.length-1) {
            counter++;
            buttonC.cr3 = color('#90C7E6');
            buttonO.cr2 = color(236, 239, 240, 200);
            buttonO.bcr2 = color('#90C7E6');
            scenes[0].rgbSlider.sliderR.hide();
            scenes[0].rgbSlider.sliderG.hide();
            scenes[0].rgbSlider.sliderB.hide();
            scenes[0].rgbSlider.sliderT.hide();
            scenes[0].inputField.inputField.hide();
            scenes[0].memo.inputField.hide();
            onceReturn = true;
            refrigStatus = true;
        } else {
          
        }
    }
    if (buttonO.wasClicked()){   //refrig CLOSED
        if (counter > 0) {
            counter--;
            buttonC.cr3 = color(236, 239, 240, 200);
            buttonO.cr2 = color('#635A60');
            buttonO.bcr2 = color('#635A60');
            scenes[0].rgbSlider.sliderR.show();
            scenes[0].rgbSlider.sliderG.show();
            scenes[0].rgbSlider.sliderB.show();
            scenes[0].rgbSlider.sliderT.show();
            scenes[0].inputField.inputField.show();
            scenes[0].memo.inputField.show();
            onceReturn = true;
            refrigStatus = false;
        } else {
            
        }
    }

    if (scenes[0].nameButton.wasClicked() == true){
        okButtonFirstTouched = true;
        memoRightInputText = memoRighttext;
    } else {
        
    }

    if (scenes[0].memo.sendButtonWasClicked() == true && scenes[0].memo.inputText.length >0){
        memoText = scenes[0].memo.inputText;
        memoRightInputText = memoRighttextReturn;
    }

    if (scenes[0].memo.heartButtonWasClicked() == true) {
        emojiShowed = emojiHeart;
    } else if (scenes[0].memo.smileButtonWasClicked() == true) {
        emojiShowed = emojiSmile;
    } else if (scenes[0].memo.cryButtonWasClicked() == true) {
        emojiShowed = emojiCry;
    } else if (scenes[0].memo.madButtonWasClicked() == true) {
        emojiShowed = emojiMad;
    } else {

    }


    
    if (scenes[0].memo.foldButtonWasClicked() == true && foldFactor == 0) {
        foldFactor = foldLength;
        foldImage = emojiLeft;
    } else if (scenes[0].memo.foldButtonWasClicked() == true && foldFactor > 0) {
        foldFactor = 0;
        foldImage = emojiRight;
    } else if (scenes[0].memo.foldButtonWasClicked() == false && foldFactor > 0) {
        foldFactor = foldLength;
        foldImage = emojiLeft;
    } else if (scenes[0].memo.foldButtonWasClicked() == false && foldFactor == 0) {
        foldFactor = 0;
        foldImage = emojiRight;
    } else {
    }

    if (scenes[1].instruction.foldButtonWasClicked() == true && foldFactor2 == 0) {
        foldFactor2 = (windowWidth-windowWidth*.8775);
        foldImage2 = emojiLeft;
    } else if (scenes[1].instruction.foldButtonWasClicked() == true && foldFactor2 > 0) {
        foldFactor2 = 0;
        foldImage2 = emojiRight;
    } else if (scenes[1].instruction.foldButtonWasClicked() == false && foldFactor2 > 0) {
        foldFactor2 = (windowWidth-windowWidth*.8775);
        foldImage2 = emojiLeft;
    } else if (scenes[1].instruction.foldButtonWasClicked() == false && foldFactor2 == 0) {
        foldFactor2 = 0;
        foldImage2 = emojiRight;
    } else {
    }
}


function modelLoaded(){
    console.log("Pose is loaded.")
}
function posesReady(poses){
    if(poses.length > 0){
        pose = poses[0].pose;
    }
}


//BUTTON ------------------------------------------------------------
class NameButton{
    constructor(){
        this.cr2 = color(99, 90, 96);
        this.cr3 = color(236, 239, 240);
        this.cr3t = color(236, 239, 240, 120);

    }
    show(){
        this.x = windowWidth*.8;
        this.y = windowWidth*.045;
        this.sliderX = this.x + windowWidth*.015;
        this.sliderY = this.y + windowWidth*.07;
        this.factor = windowWidth*.05;
        this.sliderW = windowWidth*.1;
        this.sliderH = windowWidth*.015;
        this.buttonW = windowWidth*.06;

        this.textSize = windowWidth*.03;

        fill(this.cr3t);  
        rect(this.sliderX+this.sliderW+windowWidth*.005, this.sliderY-this.factor, this.buttonW, this.sliderH);

        push();
        fill(this.cr2);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT, TOP);
        textLeading(this.textSize/2.35);
        noStroke();
        text("OK", this.sliderX+this.sliderW+windowWidth*.005, this.sliderY-this.factor);
        pop();
    }

    mouseOver(){
        this.hit = collidePointRect(mouseX, mouseY, this.sliderX+this.sliderW+windowWidth*.005, this.sliderY-this.factor, this.buttonW, this.sliderH);
        if (this.hit){
            this.cr3t = color(236, 239, 240);
        } else {
            this.cr3t = color(236, 239, 240, 120);
        }
    }

    wasClicked(){
        this.hit = collidePointRect(mouseX, mouseY, this.sliderX+this.sliderW+windowWidth*.005, this.sliderY-this.factor, this.buttonW, this.sliderH);
        if (this.hit){
            return true;          
        } else {
            return false;
        }     
    }
}
class ButtonO {
    constructor(){
        this.cr1 = color('#90C7E6');
        this.cr2 = color('#635A60');
        this.bcr2 = color('#635A60');
        this.cr3 = color('#ECEFF0');
        this.cr3C = color('#ECEFF0');
        this.bc = color(236, 239, 240, 150);
    }
    
    show(){
        this.x = (windowWidth*0.9 + windowWidth)/2;
        this.y = windowHeight*.5;
        this.r = windowWidth*.05;

        push();
        //background
        fill(this.bc);
        noStroke();
        rectMode(CENTER);
        rect(this.x-windowWidth*.005, this.y, this.r + windowWidth*.005, this.r*2 + windowWidth*.01, (this.r + windowWidth*.005)/2, (this.r + windowWidth*.005)/2, (this.r + windowWidth*.005)/2, (this.r + windowWidth*.005)/2);
        
        fill(this.bcr2);
        noStroke();
        rectMode(CENTER);
        rect(this.x, this.y, this.r + windowWidth*.005, this.r*2 + windowWidth*.01, (this.r + windowWidth*.005)/2, (this.r + windowWidth*.005)/2, (this.r + windowWidth*.005)/2, (this.r + windowWidth*.005)/2);
        pop();

        fill(this.cr2);
        circle(this.x, this.y+this.r/2, this.r);
    }

    wasClicked(){
        this.hit = collidePointCircle(mouseX, mouseY, this.x, this.y+this.r/2, this.r);
        if (this.hit){
            return true; 
        } else {
            return false;
        }
    }
}
class ButtonC {
    constructor(){
        this.cr1 = color('#90C7E6');
        this.cr2 = color('#635A60');
        this.cr3 = color(236, 239, 240, 200);
        this.bc = color(236, 239, 240, 150);
    }
    
    show(){
        this.x = (windowWidth*0.9 + windowWidth)/2;
        this.y = windowHeight*.5;
        this.r = windowWidth*.05;

        fill(this.cr3);
        circle(this.x, this.y-this.r/2, this.r);
    }
    
    wasClicked(){
        this.hit = collidePointCircle(mouseX, mouseY, this.x, this.y-this.r/2, this.r);
        if (this.hit){
            return true; 
        } else {
            return false;
        }
    }
}
class ButtonImg {
    constructor(){
    }
    show(){
        push();
        translate((windowWidth*0.9 + windowWidth)/2, windowHeight*.5+windowWidth*.05/2);
        imageMode(CENTER);
        image(imglockOpen, 0, 0, windowWidth*.04, windowWidth*.04);
        pop();

        push();
        translate((windowWidth*0.9 + windowWidth)/2, windowHeight*.5-windowWidth*.05/2);
        imageMode(CENTER);
        image(imglockClosed, 0, 0, windowWidth*.04, windowWidth*.04);
        pop();
    }
}


//WARNING ------------------------------------------------------------
class Warning {
    constructor(){
        this.cr2 = color(99, 90, 96, 230);
        this.cr3 = color(236, 239, 240);
    }
    showIncreaseH(){
        this.textSize = windowWidth*.055;

        fill(this.cr2);
        noStroke();
        rect(0, 0, windowWidth, windowHeight);

        fill(this.cr3);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(CENTER);
        textLeading(this.textSize/2.35);
        noStroke();
        text("Please increase the window height!", windowWidth*.5, windowHeight*.5);

        push();
        imageMode(CENTER);
        image(imgWarning, windowWidth*.5, windowHeight*.5-windowWidth*.05, windowWidth*.05, windowWidth*.05);
        pop();
    }
    showIncreaseW(){
        this.textSize = windowWidth*.055;

        fill(this.cr2);
        noStroke();
        rect(0, 0, windowWidth, windowHeight);

        fill(this.cr3);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(CENTER);
        textLeading(this.textSize/2.35);
        noStroke();
        text("Please increase the window width!", windowWidth*.5, windowHeight*.5);

        push();
        imageMode(CENTER);
        image(imgWarning, windowWidth*.5, windowHeight*.5-windowWidth*.05, windowWidth*.05, windowWidth*.05);
        pop();
    }
}


class MobileWarning {
    constructor(){
        this.cr2 = color(99, 90, 96, 230);
        this.cr3 = color(236, 239, 240);
    }
    show(){
        this.textSize = windowWidth*.055;

        fill(this.cr2);
        noStroke();
        rect(0, 0, windowWidth, windowHeight);

        fill(this.cr3);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(CENTER);
        textLeading(this.textSize/2.35);
        noStroke();
        text("The content is only available on a desktop!", windowWidth*.5, windowHeight*.5);

        push();
        imageMode(CENTER);
        image(imgWarning, windowWidth*.5, windowHeight*.5-windowWidth*.05, windowWidth*.05, windowWidth*.05);
        pop();
    }
    
}


//SCENES [0] ------------------------------------------------------------
//Refrig CLOSED ------------------------------------------------------------
class RefrigClosed {
    constructor(){
        this.cr1 = color('#F64B62');
        this.cr2 = color('#635A60');
        this.cr3 = color('#ECEFF0');
        this.cr4 = color('#C9E8FF');
        this.cr5 = color('#AFD7EC');
        this.cr6 = color('#90C7E6');
        this.rgbSlider = new RGBSlider();
        this.inputField = new InputField();
        this.nameButton = new NameButton();
        this.memo = new Memo();
        this.welcomeDialog = new WelcomeDialog();
        this.sign = new Sign();
    }

    show(){
        fill(this.cr3);
        noStroke();
        rect(0, 0, windowWidth, windowHeight);

        this.rgbSlider.show();
        this.inputField.show();
        this.nameButton.show();
        this.nameButton.mouseOver();
        this.sign.show();
    }
}

class RGBSlider {
    constructor(){
        this.cr2 = color(99, 90, 96, 150);
        this.cr3 = color(236, 239, 240);
        this.cr3t = color(236, 239, 240, 120);
        
        this.sliderR = createSlider(0, 255, 246, 1);
        this.sliderG = createSlider(0, 255, 75, 1);
        this.sliderB = createSlider(0, 255, 98, 1);
        this.sliderT = createSlider(5, 45, 20);
    }
    show(){
        this.rValue = (this.sliderR.value());
        this.gValue = (this.sliderG.value());
        this.bValue = (this.sliderB.value());
        this.tValue = (this.sliderT.value());

        fill(this.rValue, this.gValue, this.bValue, 230);
        noStroke();
        rect(0, 0, windowWidth*0.9, windowHeight, 0, windowHeight*.03, 0, 0);

        fill(this.rValue, this.gValue, this.bValue);
        noStroke();
        rect(windowWidth*.025, windowWidth*.025, windowWidth*.9-windowWidth*.025*2, windowHeight, windowHeight*.03, windowHeight*.03, 0, 0);

        push();
        translate(windowWidth*.9, 0);
        scale(-(windowWidth*.9/cam.width), windowHeight/cam.height);
        imageMode(CORNER);
        tint(255, this.tValue);
        image(cam,0,0);
        pop();
        

        //TOP RIGHT
        this.x = windowWidth*.8;
        this.y = windowWidth*.045;
        this.w = windowWidth-windowWidth*.8;
        this.h = windowWidth*.15;
        this.c = windowWidth*.01;

        fill(this.cr2);
        rect(this.x, this.y, this.w, this.h, this.c, 0, 0, this.c);

        //-----
        this.sliderX = this.x + windowWidth*.015;
        this.sliderY = this.y + windowWidth*.05;
        this.factor = windowWidth*.02;
        this.sliderW = windowWidth*.1;
        this.textSize = windowWidth*.03;

        this.sliderR.position(this.sliderX, this.sliderY);
        this.sliderR.style('width', this.sliderW+'px');
        
        this.sliderG.position(this.sliderX, this.sliderY+this.factor);
        this.sliderG.style('width', this.sliderW+'px');

        this.sliderB.position(this.sliderX, this.sliderY+this.factor*2);
        this.sliderB.style('width', this.sliderW+'px');

        this.sliderT.position(this.sliderX, this.sliderY+this.factor*3);
        this.sliderT.style('width', this.sliderW+'px');

        push();
        fill(this.cr3);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT, TOP);
        textLeading(this.textSize/2.35);
        noStroke();
        text("R", this.sliderX+this.sliderW+windowWidth*.005, this.sliderY);
        text("G", this.sliderX+this.sliderW+windowWidth*.005, this.sliderY+this.factor);
        text("B", this.sliderX+this.sliderW+windowWidth*.005, this.sliderY+this.factor*2);
        text("Reflection", this.sliderX+this.sliderW+windowWidth*.005, this.sliderY+this.factor*3);
        pop();

        //CIRCLE and HANDLE
        this.circleX = windowWidth*.6;
        this.circleY = this.y;
        this.circleR = windowWidth*.05;
        this.circleFactor = windowWidth*.075;
        this.tr = 120;

        fill(this.gValue, this.bValue, this.rValue, this.tr);
        noStroke();
        circle(this.circleX, this.circleY+this.circleR/2, this.circleR);

        fill(this.bValue, this.rValue, this.gValue, this.tr);
        noStroke();
        circle(this.circleX+this.circleFactor, this.circleY+this.circleR/2, this.circleR);

        fill(this.bValue, this.gValue, this.rValue, this.tr);
        noStroke();
        circle(this.circleX+this.circleFactor*2, this.circleY+this.circleR/2, this.circleR);


        this.handleX = windowWidth*.075;
        this.handleY = windowHeight*.85;
        this.handleW = windowWidth*.3;
        this.handleR = windowWidth*.025;

        fill(this.cr3t);
        noStroke();
        rect(this.handleX, this.handleY, this.handleW, this.handleR*2, this.handleR, this.handleR, this.handleR, this.handleR);
    }
}
class InputField {
    constructor(){
        this.inputField = createInput().attribute('placeholder', " My name is…");
        this.inputField.style('border-style','none');
    }
    show(){
        this.x = windowWidth*.8;
        this.y = windowWidth*.045;
        this.sliderX = this.x + windowWidth*.015;
        this.sliderY = this.y + windowWidth*.07;
        this.factor = windowWidth*.05;
        this.sliderW = windowWidth*.1;
        this.sliderH = windowWidth*.015;
        this.buttonW = windowWidth*.06;

        this.inputField.position(this.sliderX, this.sliderY-this.factor);
        this.inputField.size(this.sliderW, this.sliderH);

        this.inputText = this.inputField.value();
    }
}

class Memo {
    constructor(){
        this.cr2 = color(99, 90, 96, 150);
        this.cr2o = color(99, 90, 96);
        this.cr3 = color(236, 239, 240);
        this.cr3t = color(236, 239, 240, 120);
        this.cr3tforSendButton = color(236, 239, 240, 120);
        this.cr3tforEmoji = color(236, 239, 240, 120);

        this.inputField = createInput().attribute('placeholder', " Leave your message here!");
        this.inputField.style('border-style','none');

        this.rotateCounter = 0;
    }

    show(){
        this.sliderX = this.x + windowWidth*.015;
        this.sliderY = this.y + windowWidth*.07;
        this.factor = windowWidth*.05;
        this.sliderW = windowWidth*.1;
        this.sliderH = windowWidth*.015;
       
        //Bottom RIGHT
        this.x = windowWidth*.8;
        this.y = windowHeight-windowWidth*.045-this.h;
        this.w = windowWidth-windowWidth*.8;
        this.h = windowWidth*.15;
        this.c = windowWidth*.01;
        this.emojiX = this.x + this.emojiR/2 + this.gap;
        this.emojiY = (windowHeight-windowWidth*.045-this.h)+ this.emojiR/2 + this.gap;
        this.emojiR = windowWidth*.025;
        this.gap = windowWidth*.0075;
        this.emojiSize = windowWidth*.03;


        //background
        fill(this.cr2);
        rect(this.x+foldFactor, this.y, this.w, this.h, this.c, 0, 0, this.c);

        //button background
        fill(this.cr3t);
        circle(this.emojiX+foldFactor, this.emojiY, this.emojiR);
        push();
        fill(this.cr3tforEmoji);
        rect(this.emojiX-this.emojiR/2+foldFactor, this.emojiY+this.emojiR/2+this.gap/2, this.emojiR, this.emojiR*4.2, this.emojiR/2, this.emojiR/2, this.emojiR/2, this.emojiR/2);
        pop();

        //emoji button
        imageMode(CENTER);
        image(foldImage, this.emojiX+foldFactor, this.emojiY, this.emojiSize, this.emojiSize);
        image(emojiHeart, this.emojiX+foldFactor, this.emojiY+this.emojiR+this.gap, this.emojiSize, this.emojiSize);
        image(emojiSmile, this.emojiX+foldFactor, this.emojiY+this.emojiR*2+this.gap, this.emojiSize, this.emojiSize);
        image(emojiCry, this.emojiX+foldFactor, this.emojiY+this.emojiR*3+this.gap, this.emojiSize, this.emojiSize);
        image(emojiMad, this.emojiX+foldFactor, this.emojiY+this.emojiR*4+this.gap, this.emojiSize, this.emojiSize);


        //INPUT FIELD --------------------
        this.inputField.position(this.emojiX+this.emojiR/2+this.gap+foldFactor, this.emojiY);
        this.inputField.size(this.w-this.emojiR-this.gap*5, this.h-this.emojiR/2-this.gap*3-this.sliderH);
        this.inputText = this.inputField.value();


        //SEND BUTTON --------------------
        this.textSize = windowWidth*.03;

        fill(this.cr3tforSendButton);
        rect(this.emojiX+this.emojiR/2+this.gap+foldFactor, this.emojiY+(this.h-this.emojiR/2-this.gap*3-this.sliderH)+this.gap/1.5, this.w-this.emojiR-this.gap*4.6, this.sliderH);

        push();
        fill(this.cr2o);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT, TOP);
        textLeading(this.textSize/2.35);
        noStroke();
        text(" Send", this.emojiX+this.emojiR/2+this.gap+foldFactor, this.emojiY+(this.h-this.emojiR/2-this.gap*3-this.sliderH)+this.gap/1.5);
        pop();
    }

    sendButtonMouseOver(){
        this.hit = collidePointRect(mouseX, mouseY, this.emojiX+this.emojiR/2+this.gap+foldFactor, this.emojiY+(this.h-this.emojiR/2-this.gap*3-this.sliderH)+this.gap/1.5, this.w-this.emojiR-this.gap*4.6, this.sliderH);
        if (this.hit){
            this.cr3tforSendButton = color(236, 239, 240);
        } else {
            this.cr3tforSendButton = color(236, 239, 240, 120);
        }
    }
    sendButtonWasClicked(){
        this.hit = collidePointRect(mouseX, mouseY, this.emojiX+this.emojiR/2+this.gap+foldFactor, this.emojiY+(this.h-this.emojiR/2-this.gap*3-this.sliderH)+this.gap/1.5, this.w-this.emojiR-this.gap*4.6, this.sliderH);
        if (this.hit){
            return true;
        } else {
            return false;
        } 
    }

    emojiButtonMouseOver(){
        this.hitEmoji = collidePointRect(mouseX, mouseY, this.emojiX-this.emojiR/2+foldFactor, this.emojiY+this.emojiR/2+this.gap/2, this.emojiR, this.emojiR*4.2, this.emojiR/2, this.emojiR/2, this.emojiR/2, this.emojiR/2);
        if (this.hitEmoji){
            this.cr3tforEmoji = color(236, 239, 240);
        } else {
            this.cr3tforEmoji = color(236, 239, 240, 120);
        }
    }
    heartButtonWasClicked(){
        this.hitHeart = collidePointCircle(mouseX, mouseY, this.emojiX+foldFactor, this.emojiY+this.emojiR+this.gap, this.emojiSize*.7);
        if (this.hitHeart){
            return true;
        } else {
            return false;
        } 
    }
    smileButtonWasClicked(){
        this.hitSmile = collidePointCircle(mouseX, mouseY, this.emojiX+foldFactor, this.emojiY+this.emojiR*2+this.gap, this.emojiSize*.7);
        if (this.hitSmile){
            return true;
        } else {
            return false;
        } 
    }
    cryButtonWasClicked(){
        this.hitCry = collidePointCircle(mouseX, mouseY, this.emojiX+foldFactor, this.emojiY+this.emojiR*3+this.gap, this.emojiSize*.7);
        if (this.hitCry){
            return true;
        } else {
            return false;
        } 
    }
    madButtonWasClicked(){
        this.hitMad = collidePointCircle(mouseX, mouseY, this.emojiX+foldFactor, this.emojiY+this.emojiR*4+this.gap, this.emojiSize*.7);
        if (this.hitMad){
            return true;
        } else {
            return false;
        } 
    }


    foldButtonMouseOver(){
        this.hitFold = collidePointCircle(mouseX, mouseY, this.emojiX+foldFactor, this.emojiY, this.emojiR);
        if (this.hitFold){
            this.cr3t = color(236, 239, 240);
        } else {
            this.cr3t = color(236, 239, 240, 120);
        }
    }
    foldButtonWasClicked(){
        this.hitFold = collidePointCircle(mouseX, mouseY, this.emojiX+foldFactor, this.emojiY, this.emojiR);
        if (this.hitFold){
            return true;
        } else {
            return false;
        } 
    }

    showMemo(_inputField){
        this.lx = windowWidth*.075;
        this.ly = windowWidth*.045+windowWidth*.05/2;
        this.lw = windowWidth*.3;
        this.lh = this.lw*1236/1280;
        this.llength = windowWidth*.05;
        this.sw = windowWidth*.005;
        this.range = random(-windowWidth*.002, windowWidth*.002)


        if (memoText.length < 130) {
            this.textSize = windowWidth*.055;
        } else {
            this.textSize = windowWidth*.03;
        }

        push();
        imageMode(CORNER);
        tint(255, 200);
        image(imgMemo, this.lx, this.ly, this.lw, this.lh);
        pop();

        //BY......
        fill(this.cr2o);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT);
        textLeading(this.textSize/2.35);
        noStroke();
        text(memoText, this.lx+this.lw/7.5, this.ly+this.lh/4, this.lw/1.5);
        text("- "+_inputField.inputText, this.lx+this.lw/7.5, this.ly+this.lh/1.15, this.lw/1.5);
    }


    showEmoji(){
        this.circleX = windowWidth*.25;
        this.circleY = windowWidth*.045;
        this.circleR = windowWidth*.1;
        this.circleFactor = windowWidth*.075;
        this.tr = 120;
        this.rotateCounter+=.2;

        push();
        translate(this.circleX, this.circleY+this.circleR/2.75);
        imageMode(CENTER);
        rotate(this.rotateCounter % 628);
        image(emojiShowed, 0, 0, this.circleR, this.circleR);
        pop();
    }
}
class WelcomeDialog {
    constructor(){
        this.cr2 = color(99, 90, 96, 150);
        this.cr2o = color(99, 90, 96);
        this.cr2t = color(99, 90, 96, 50);
        this.cr3 = color(236, 239, 240);
        this.cr3t = color(236, 239, 240, 50);

        this.textColor = this.cr3;
        this.frameColor = this.cr3t;
    }
    showL(_rgbSlider){
        this.lx = windowWidth*.075;
        this.ly = windowWidth*.045+windowWidth*.05/2;
        this.lw = windowWidth*.3;
        this.lh = windowWidth*.25;
        this.llength = windowWidth*.05;
        this.sw = windowWidth*.005;
        this.range = random(-windowWidth*.002, windowWidth*.002)

        this.textSize = windowWidth*.055;
        this.text = "Before exploring your refrigerator, please allow me to use your camera and tell me your name in the input fill on the top right.";

        push();

        stroke(this.frameColor);
        strokeWeight(this.sw);
        strokeCap(PROJECT);
        line(this.lx + this.range, this.ly + this.range, this.lx + this.llength + this.range, this.ly + this.range);
        line(this.lx + this.range, this.ly + this.range, this.lx + this.range, this.ly + this.llength + this.range);
        line(this.lx + this.lw - this.llength + this.range, this.ly + this.range, this.lx + this.lw + this.range, this.ly + this.range);
        line(this.lx + this.lw + this.range, this.ly + this.llength + this.range, this.lx + this.lw + this.range, this.ly + this.range);
        line(this.lx + this.range, this.ly + this.lh - this.llength + this.range, this.lx + this.range, this.ly + this.lh + this.range);
        line(this.lx + this.range, this.ly + this.lh + this.range, this.lx + this.llength + this.range, this.ly + this.lh + this.range);
        line(this.lx + this.lw - this.llength + this.range, this.ly + this.lh + this.range, this.lx + this.lw + this.range, this.ly + this.lh + this.range);
        line(this.lx + this.lw + this.range, this.ly + this.lh - this.llength + this.range, this.lx + this.lw + this.range, this.ly + this.lh + this.range);

        line(this.lx + this.lw/2 - this.llength/2 + this.range, this.ly + this.lh/2 + this.range, this.lx + this.lw/2 + this.llength/2 + this.range, this.ly + this.lh/2 + this.range);
        line(this.lx + this.lw/2 + this.range, this.ly + this.lh/2 - this.llength/2 + this.range, this.lx + this.lw/2 + this.range, this.ly + this.lh/2 + this.llength/2 + this.range);

        pop();


        if (_rgbSlider.rValue > 127 && _rgbSlider.gValue > 127 && _rgbSlider.bValue < 127) {
            this.textColor = this.cr2o;
            this.frameColor = this.cr2t;
        } else if (_rgbSlider.rValue < 127 && _rgbSlider.gValue > 127 && _rgbSlider.bValue > 127) {
            this.textColor = this.cr2o;
            this.frameColor = this.cr2t;
        } else if (_rgbSlider.rValue > 127 && _rgbSlider.gValue < 127 && _rgbSlider.bValue > 127) {
            this.textColor = this.cr2o;
            this.frameColor = this.cr2t;
        } else if (_rgbSlider.rValue > 127 && _rgbSlider.gValue > 127 && _rgbSlider.bValue > 127) {
            this.textColor = this.cr2o;
            this.frameColor = this.cr2t;
        }else {
            this.textColor = this.cr3;
            this.frameColor = this.cr3t;
        }

        fill(this.textColor);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT);
        textLeading(this.textSize/2.35);
        noStroke();
        text(this.text, this.lx, this.ly+this.lh/2.85, this.lw);
    }
    showR(_rgbSlider, _inputField){
        this.lx = windowWidth*.5;
        this.ly = windowWidth*.045+windowWidth*.05*3;
        this.lw = windowWidth*.265;
        this.lh = windowWidth*.25;
        this.llength = windowWidth*.05;
        this.sw = windowWidth*.005;
        this.range = random(-windowWidth*.002, windowWidth*.002)

        this.textSize = windowWidth*.055;

        push();

        stroke(this.frameColor);
        strokeWeight(this.sw);
        strokeCap(PROJECT);
        line(this.lx + this.range, this.ly + this.range, this.lx + this.llength + this.range, this.ly + this.range);
        line(this.lx + this.range, this.ly + this.range, this.lx + this.range, this.ly + this.llength + this.range);
        line(this.lx + this.lw - this.llength + this.range, this.ly + this.range, this.lx + this.lw + this.range, this.ly + this.range);
        line(this.lx + this.lw + this.range, this.ly + this.llength + this.range, this.lx + this.lw + this.range, this.ly + this.range);
        line(this.lx + this.range, this.ly + this.lh - this.llength + this.range, this.lx + this.range, this.ly + this.lh + this.range);
        line(this.lx + this.range, this.ly + this.lh + this.range, this.lx + this.llength + this.range, this.ly + this.lh + this.range);
        line(this.lx + this.lw - this.llength + this.range, this.ly + this.lh + this.range, this.lx + this.lw + this.range, this.ly + this.lh + this.range);
        line(this.lx + this.lw + this.range, this.ly + this.lh - this.llength + this.range, this.lx + this.lw + this.range, this.ly + this.lh + this.range);

        line(this.lx + this.lw/2 - this.llength/2 + this.range, this.ly + this.lh/2 + this.range, this.lx + this.lw/2 + this.llength/2 + this.range, this.ly + this.lh/2 + this.range);
        line(this.lx + this.lw/2 + this.range, this.ly + this.lh/2 - this.llength/2 + this.range, this.lx + this.lw/2 + this.range, this.ly + this.lh/2 + this.llength/2 + this.range);

        pop();


        if (_rgbSlider.rValue > 127 && _rgbSlider.gValue > 127 && _rgbSlider.bValue < 127) {
            this.textColor = this.cr2o;
            this.frameColor = this.cr2t;
        } else if (_rgbSlider.rValue < 127 && _rgbSlider.gValue > 127 && _rgbSlider.bValue > 127) {
            this.textColor = this.cr2o;
            this.frameColor = this.cr2t;
        } else if (_rgbSlider.rValue > 127 && _rgbSlider.gValue < 127 && _rgbSlider.bValue > 127) {
            this.textColor = this.cr2o;
            this.frameColor = this.cr2t;
        } else if (_rgbSlider.rValue > 127 && _rgbSlider.gValue > 127 && _rgbSlider.bValue > 127) {
            this.textColor = this.cr2o;
            this.frameColor = this.cr2t;
        }else {
            this.textColor = this.cr3;
            this.frameColor = this.cr3t;
        }


        if (onceReturn == true) {
            memoRightInputText = memoRighttextReturn;
        } 


        fill(this.textColor);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT);
        textLeading(this.textSize/2.35);
        noStroke();
        text(memoRightInputText, this.lx, this.ly+this.lh/4.2, this.lw);
    }
}


class Sign {
    constructor(){
        this.cr2o = color(99, 90, 96, 200);
    }
    show(){
        this.textSize = windowWidth*.025;

        push();
        translate(windowWidth*.965, windowHeight-windowWidth*.025);
        rotate(frameCount*.05 % 628);
        imageMode(CENTER);
        image(me, 0, 0, windowWidth*.03, windowWidth*.03);
        pop();

        push();
        fill(this.cr2o);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(RIGHT);
        textLeading(this.textSize/2.35);
        noStroke();
        text("JUIHUNG", windowWidth*.945, windowHeight-windowWidth*.0325);
        text("TSENG", windowWidth*.945, windowHeight-windowWidth*.022);
        textSize(this.textSize*.75);
        text("PRATT INSTITUTE M.S. REP", windowWidth*.945, windowHeight-windowWidth*.014);
        pop();
    }
}

//SCENES [1] ------------------------------------------------------------
//Refrig OPEN ------------------------------------------------------------
class Refrig {
    constructor(){   
        this.cr2 = color('#635A60');
        this.cr3 = color('#ECEFF0');
        this.cr4 = color('#C9E8FF');
        this.cr4t = color(201, 232, 255, 50);
        this.cr5 = color('#AFD7EC');
        this.cr6 = color('#90C7E6');
        
        this.vent = new Vent();
        this.airflow = new AirFlow();
        this.tempBar = new TempBar();
        this.apple = new Apple();
        this.banana = new Banana();
        this.grapes = new Grapes();
        this.kiwi = new Kiwi();
        this.orange = new Orange();
        this.pineapple = new Pineapple();
        this.strawberry = new Strawberry();
        this.watermelon = new Watermelon();
        this.instruction = new Instruction();
        this.codebarreader = new CodeBarReader();
    }

    show(){
        this.cr1 = color(scenes[0].rgbSlider.rValue, scenes[0].rgbSlider.gValue, scenes[0].rgbSlider.bValue);

        //red
        fill(this.cr1);
        noStroke();
        rect(0, 0, windowWidth*0.9, windowHeight, 0, windowHeight*.03, 0, 0);

        fill(this.cr1);
        noStroke();
        rect(windowWidth*0.9+15, 0, windowWidth, windowHeight, windowHeight*.03, 0, 0, 0);

        //gray
        fill(this.cr2);
        noStroke();
        rect(windowWidth*0.9, windowHeight*.03+20, 15, windowHeight, 0, 0, 0, 0);

        //white
        fill(this.cr3);
        noStroke();
        rect(windowWidth*.025, windowWidth*.025, windowWidth*.9-windowWidth*.025*2, windowHeight, windowHeight*.03, windowHeight*.03, 0, 0);

        fill(this.cr3);
        noStroke();
        rect(windowWidth*0.9+15+windowWidth*.025, windowWidth*.025, windowWidth, windowHeight, windowHeight*.03, 0, 0, 0);

        //blue
        fill(this.cr4);
        noStroke();
        rect(windowWidth*.06, windowWidth*.06, windowWidth*.9-windowWidth*.06*2, windowHeight, 0, 0, 0, 0);

        fill(this.cr4);
        noStroke();
        rect(windowWidth*0.9+15+windowWidth*.06, windowWidth*.06, windowWidth, windowHeight, 0, 0, 0, 0);

        //blue2
        fill(this.cr5);
        noStroke();
        quad(windowWidth*.06, windowWidth*.06, windowWidth*.06+windowWidth*.1, windowWidth*.06+windowWidth*.1, windowWidth*.06+windowWidth*.1, windowHeight, windowWidth*.06, windowHeight);

        fill(this.cr5);
        noStroke();
        quad(windowWidth*.9-windowWidth*.06, windowWidth*.06, windowWidth*.9-windowWidth*.06-windowWidth*.1, windowWidth*.06+windowWidth*.1, windowWidth*.9-windowWidth*.06-windowWidth*.1, windowHeight, windowWidth*.9-windowWidth*.06, windowHeight);

        //blue3
        fill(this.cr6);
        noStroke();
        quad(windowWidth*.06, windowWidth*.06, windowWidth*.06+windowWidth*.1, windowWidth*.06+windowWidth*.1, windowWidth*.9-windowWidth*.06-windowWidth*.1, windowWidth*.06+windowWidth*.1, windowWidth*.9-windowWidth*.06, windowWidth*.06);

        this.vent.show(this.tempBar);
        this.grapes.show();
        this.orange.show();
        this.strawberry.show();
        this.pineapple.show();
        this.banana.show();
        this.watermelon.show();
        this.apple.show();
        this.kiwi.show();
        this.airflow.show();
        this.tempBar.show();
        this.instruction.show();
        this.instruction.foldButtonMouseOver();
        this.codebarreader.show(this.banana, this.grapes, this.watermelon, this.orange, this.apple, this.kiwi, this.strawberry, this.pineapple);
    }
}
class Vent {
    constructor(){
        this.speed = 0;
        this.cb1 = ('#0257C2');
        this.cr6 = color('#90C7E6');
    }

    show(_tempBar){
        this.ventS = windowWidth*.2
        this.rotateSpeed = _tempBar.getTempText();

        push();
        translate(((windowWidth*.9-windowWidth*.06-windowWidth*.1)+(windowWidth*.06+windowWidth*.1))/2, windowWidth*.06+windowWidth*.1+this.ventS*.6);

        fill(0, 235, 253, 10);
        stroke(this.cr6);
        strokeWeight(this.ventS*.025)
        rectMode(CENTER);
        rect(0, 0, this.ventS, this.ventS, this.ventS*.05, this.ventS*.05, this.ventS*.05, this.ventS*.05);

        imageMode(CENTER);

        if(this.rotateSpeed >= 0.1 && this.rotateSpeed <5){
            rotate(this.speed+=.35);
        } else if(this.rotateSpeed >= 5 && this.rotateSpeed <10){
            rotate(this.speed+=.313);
        } else if(this.rotateSpeed >= 10 && this.rotateSpeed <15){
            rotate(this.speed+=.275);
        } else if(this.rotateSpeed >= 15 && this.rotateSpeed <20){
            rotate(this.speed+=.237);
        } else if(this.rotateSpeed >= 20 && this.rotateSpeed <25){
            rotate(this.speed+=.2);
        } else if(this.rotateSpeed >= 25 && this.rotateSpeed <30){
            rotate(this.speed+=.163);
        } else if(this.rotateSpeed >= 30 && this.rotateSpeed <35){
            rotate(this.speed+=.125);
        } else if(this.rotateSpeed >= 35 && this.rotateSpeed <40){
            rotate(this.speed+=.087);
        } else{
            rotate(this.speed+=.05);
        }
        
        image(imgvent, 0, 0, this.ventS*.9, this.ventS*.9);
        pop();
    }
}
class AirFlow {
    constructor(_vent){
        this.cr7 = color(1, 161, 223, 15);
        this.textIncrease = 0;
        this.circleSizeIncrease = 0;
    }

    show(){
        this.airflowX = ((((windowWidth*.9-windowWidth*.06-windowWidth*.1)+(windowWidth*.06+windowWidth*.1))/2)-windowWidth*.061);
        this.airflowY = ((windowWidth*.06+windowWidth*.1+windowWidth*.2*.6)+windowWidth*.047);

        this.textSize = windowWidth*.2;
        this.circleSize = windowWidth*.05;
        
        if (this.textSize+this.textIncrease > windowWidth*2) {
            this.circleSize = windowWidth*.05;
            this.circleSizeIncrease = 0;
            this.textIncrease = 0;
        } else {
            this.textIncrease++;
        }
      
        this.points = AveR.textToPoints("o", this.airflowX, this.airflowY, this.textSize+this.textIncrease, {
            sampleFactor: .01,
            simplifyThreshold: 0
        });

        this.circleSizeIncrease+= .15;
        this.moveX = map(mouseX, 0, windowWidth, -(((windowWidth*.9-windowWidth*.06-windowWidth*.1)+(windowWidth*.06+windowWidth*.1))/2), 50);
        this.moveY = map(mouseY, 0, windowHeight, 0.5, (windowWidth*.06+windowWidth*.1+windowWidth*.18)*.7);
        

        for (let i=0; i<this.points.length; i++){
            this.moveX++;
            this.moveY++;

            fill(this.cr7);
            noStroke();
            circle(this.points[i].x+this.moveX, this.points[i].y+this.moveY, this.circleSize+this.circleSizeIncrease);
        }
    }
}
class TempBar {
    constructor(){
        this.cr1 = color('#F64B62');
        this.cr2 = color('#635A60');
        this.cr3 = color('#ECEFF0');
        this.cr4 = color('#C9E8FF');
        this.cr5 = color('#AFD7EC');
        this.cr6 = color('#90C7E6');
        this.control = 0;
    }
    show(){
        this.barY = windowHeight*.6+windowHeight*.35/2;

        fill(this.cr3);
        noStroke();
        rect(windowWidth*.9-windowWidth*.11, windowHeight*.6, windowWidth*.02, windowHeight*.35, windowWidth*.01, windowWidth*.01, windowWidth*.01, windowWidth*.01);

        fill(this.cr1);
        noStroke();
        circle(windowWidth*.9-windowWidth*.11+windowWidth*.0095, this.barY+this.control, windowWidth*.019);

        if (this.barY+this.control >= windowHeight*.6+windowWidth*.019/2 && this.barY+this.control <= windowHeight*.6+windowHeight*.35-windowWidth*.019/2){
            if (keyIsPressed === true && key == 's'){
                this.control++;
            } else {
                
            }

            if (keyIsPressed === true && key == 'w'){
                this.control--;
            } else {
                
            }

        } else {
            this.control = 0;
        }
        
        this.tempText = map(this.getLocationY(), windowHeight*.6+windowWidth*.019/2, windowHeight*.6+windowHeight*.35-windowWidth*.019/2, 44.6, 0.1);

        fill(this.cr2);
        textSize(windowWidth*.08);
        textFont(gameFont);
        textAlign(RIGHT);
        noStroke();
        text(ceil(this.tempText)+"ºF", windowWidth*.9-windowWidth*.22, windowHeight*.6, windowWidth*.15);
    }

    getLocationY() {
        return this.barY+this.control;
    }
    getTempText() {
        return this.tempText;
    }
}
class Instruction {
    constructor(){
        this.cr2 = color(99, 90, 96, 100);
        this.cr3 = color(236, 239, 240);
        this.cr3t = color(236, 239, 240, 120);
        this.text = "# Press S and W to control the temperature.";
        this.text2 = "# Use your eyes to scan the barcodes on the fruit family, and make sure to keep your camera on.";
    }
    show(){
        this.x = windowWidth*.8;
        this.y = windowWidth*.045;
        this.w = windowWidth-windowWidth*.8;
        this.h = windowWidth*.15;
        this.c = windowWidth*.01;

        this.textSize = windowWidth*.03;

        this.emojiX = this.x + this.emojiR/2 + this.gap;
        this.emojiY = (this.y)+ this.emojiR/2 + this.gap;
        this.emojiR = windowWidth*.025;
        this.emojiSize = windowWidth*.03;
        this.gap = windowWidth*.0075;

        //----------
        fill(this.cr2);
        rect(this.x+foldFactor2, this.y, this.w, this.h, this.c, 0, 0, this.c);

        fill(this.cr3);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT);
        textLeading(this.textSize/2.35);
        noStroke();
        text(this.text, this.x+windowWidth*.015+foldFactor2, this.y+windowWidth*.05, this.w-windowWidth*.03);
        text(this.text2, this.x+windowWidth*.015+foldFactor2, this.y+windowWidth*.085, this.w-windowWidth*.03);


        //----------
        fill(this.cr3t);
        circle(this.emojiX+foldFactor2, this.emojiY, this.emojiR);
        image(foldImage2, this.emojiX+foldFactor2, this.emojiY, this.emojiSize, this.emojiSize);
    }

    foldButtonMouseOver(){
        this.hitFold2 = collidePointCircle(mouseX, mouseY, this.emojiX+foldFactor2, this.emojiY, this.emojiR);
        if (this.hitFold2){
            this.cr3t = color(236, 239, 240);
        } else {
            this.cr3t = color(236, 239, 240, 120);
        }
    }
    foldButtonWasClicked(){
        this.hitFold2 = collidePointCircle(mouseX, mouseY, this.emojiX+foldFactor2, this.emojiY, this.emojiR);
        if (this.hitFold2){
            return true;
        } else {
            return false;
        } 
    }
}

//FRUIT ------------------------------------------------------------
class Apple {
    constructor(){
        this.cr3 = color(236, 239, 240, 220);
    }
    show(){
        this.x = windowWidth*.35;
        this.y = windowHeight-windowWidth*.225/3.5;
        this.s = windowWidth*.225;
        this.c = this.s*.05;

        imageMode(CENTER);
        image(imgApple, this.x, this.y, this.s, this.s);

        push();
        rectMode(CENTER);
        fill(this.cr3);
        rect(this.x, this.y/.975, this.s*.2, this.s*.2, this.c, this.c, this.c, this.c);

        imageMode(CENTER);
        image(imgCodeBarApple, this.x, this.y/.975, this.s*.125, this.s*.125);
        pop();
    }
}
class Banana {
    constructor(){
        this.cr3 = color(236, 239, 240, 220);
    }
    show(){
        this.x = windowWidth*.2;
        this.y = windowHeight-windowWidth*.25/3.5;
        this.s = windowWidth*.25;
        this.c = this.s*.05;

        imageMode(CENTER);
        image(imgBanana, this.x, this.y, this.s, this.s);

        push();
        rectMode(CENTER);
        fill(this.cr3);
        rect(this.x, this.y, this.s*.2, this.s*.2, this.c, this.c, this.c, this.c);

        imageMode(CENTER);
        image(imgCodeBarBanana, this.x, this.y, this.s*.125, this.s*.125);
        pop();
    }
}
class Grapes {
    constructor(){
        this.cr3 = color(236, 239, 240, 220);
    }
    show(){
        this.x = windowWidth*.1;
        this.y = windowHeight-windowWidth*.28/2.8;
        this.s = windowWidth*.28;
        this.c = this.s*.05;

        imageMode(CENTER);
        image(imgGrapes, this.x, this.y, this.s, this.s);

        push();
        rectMode(CENTER);
        fill(this.cr3);
        rect(this.x, this.y, this.s*.2, this.s*.2, this.c, this.c, this.c, this.c);

        imageMode(CENTER);
        image(imgCodeBarGrapes, this.x, this.y, this.s*.125, this.s*.125);
        pop();
    }
}
class Kiwi {
    constructor(){
        this.cr3 = color(236, 239, 240, 220);
    }
    show(){
        this.x = windowWidth*.6;
        this.y = windowHeight-windowWidth*.2/3.5;
        this.s = windowWidth*.2;
        this.c = this.s*.05;

        imageMode(CENTER);
        image(imgKiwi, this.x, this.y, this.s, this.s);

        push();
        rectMode(CENTER);
        fill(this.cr3);
        rect(this.x*1.025, this.y, this.s*.2, this.s*.2, this.c, this.c, this.c, this.c);

        imageMode(CENTER);
        image(imgCodeBarKiwi, this.x*1.025, this.y, this.s*.125, this.s*.125);
        pop();
    }
}
class Orange {
    constructor(){
        this.cr3 = color(236, 239, 240, 220);
    }
    show(){
        this.x = windowWidth*.31;
        this.y = windowHeight-windowWidth*.2/1.5;
        this.s = windowWidth*.2;
        this.c = this.s*.05;

        imageMode(CENTER);
        image(imgOrange, this.x, this.y, this.s, this.s);

        push();
        rectMode(CENTER);
        fill(this.cr3);
        rect(this.x, this.y, this.s*.2, this.s*.2, this.c, this.c, this.c, this.c);

        imageMode(CENTER);
        image(imgCodeBarOrange, this.x, this.y, this.s*.125, this.s*.125);
        pop();
    }
}
class Pineapple {
    constructor(){
        this.cr3 = color(236, 239, 240, 220);
    }
    show(){
        this.x = windowWidth*.45;
        this.y = windowHeight-windowWidth*.25/2.7;
        this.s = windowWidth*.25;
        this.c = this.s*.05;

        imageMode(CENTER);
        image(imgPineapple, this.x, this.y, this.s, this.s);

        push();
        rectMode(CENTER);
        fill(this.cr3);
        rect(this.x, this.y/.975, this.s*.2, this.s*.2, this.c, this.c, this.c, this.c);

        imageMode(CENTER);
        image(imgCodeBarPineapple, this.x, this.y/.975, this.s*.125, this.s*.125);
        pop();
    }
}
class Strawberry {
    constructor(){
        this.cr3 = color(236, 239, 240, 220);
    }
    show(){
        this.x = windowWidth*.54;
        this.y = windowHeight-windowWidth*.18/1.6;
        this.s = windowWidth*.18;
        this.c = this.s*.05;

        imageMode(CENTER);
        image(imgStrawberry, this.x, this.y, this.s, this.s);

        push();
        rectMode(CENTER);
        fill(this.cr3);
        rect(this.x, this.y, this.s*.2, this.s*.2, this.c, this.c, this.c, this.c);

        imageMode(CENTER);
        image(imgCodeBarStrawberry, this.x, this.y, this.s*.125, this.s*.125);
        pop();
    }
}
class Watermelon {
    constructor(){
        this.cr3 = color(236, 239, 240, 220);
    }
    show(){
        this.x = windowWidth*.73;
        this.y = windowHeight-windowWidth*.28/3.5;
        this.s = windowWidth*.28;
        this.c = this.s*.05;

        imageMode(CENTER);
        image(imgWatermelon, this.x, this.y, this.s, this.s);

        push();
        rectMode(CENTER);
        fill(this.cr3);
        rect(this.x, this.y, this.s*.2, this.s*.2, this.c, this.c, this.c, this.c);

        imageMode(CENTER);
        image(imgCodeBarWatermelon, this.x, this.y, this.s*.125, this.s*.125);
        pop();
    }
}

//FRUIT NOTES ------------------------------------------------------------
class GrapesNote{
    constructor(){
        this.cr2 = color('#635A60');
        this.cr3 = color(236, 239, 240, 150);
        this.text = "The Middle East was described as my homeland, and the cultivation of me began there 6,000-8,000 years ago. I can be used for making wine, jam, raisins, vinegar, and grape seed oil. I am a non-climacteric type of fruit, generally occurring in clusters.";
    }
    show(_grapes){
        this.x = windowWidth*.1;
        this.y = windowWidth*.1;
        this.w = windowWidth*.23;
        this.h = windowWidth*.215;
        this.c = windowWidth*.01;
        this.textSize = windowWidth*.04;

        fill(this.cr3);
        rect(this.x, this.y, this.w, this.h, this.c, this.c, this.c, this.c);
        triangle(this.x+this.c, this.y+this.h, this.x+this.c+windowWidth*.03, this.y+this.h, _grapes.x, _grapes.y-_grapes.s*.2/1.5);

        fill(this.cr2);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT);
        textLeading(this.textSize/2.35);
        noStroke();
        text(this.text, this.x+windowWidth*.015, this.y+windowWidth*.03, this.w-windowWidth*.03);
    }
}
class BananaNote{
    constructor(){
        this.cr2 = color('#635A60');
        this.cr3 = color(236, 239, 240, 150);
        this.text = "I am from tropical Indomalaya and Australia. I am grown in 135 countries, and I can make fiber, banana wine, and banana beer. The world's largest producers of me in 2017 were India and China.";
    }
    show(_banana){
        this.x = windowWidth*.1;
        this.y = windowWidth*.12;
        this.w = windowWidth*.23;
        this.h = windowWidth*.165;
        this.c = windowWidth*.01;
        this.textSize = windowWidth*.04;

        fill(this.cr3);
        rect(this.x, this.y, this.w, this.h, this.c, this.c, this.c, this.c);
        triangle(this.x+this.c, this.y+this.h, this.x+this.c+windowWidth*.03, this.y+this.h, _banana.x, _banana.y-_banana.s*.2/1.5);

        fill(this.cr2);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT);
        textLeading(this.textSize/2.35);
        noStroke();
        text(this.text, this.x+windowWidth*.015, this.y+windowWidth*.03, this.w-windowWidth*.03);
    }
}
class OrangeNote{
    constructor(){
        this.cr2 = color('#635A60');
        this.cr3 = color(236, 239, 240, 150);
        this.text = "I originated in a region encompassing Southern China, Northeast India, and Myanmar. As of 1987, orange trees were found to be the most cultivated fruit tree in the world. My family is widely grown in tropical and subtropical climates. I can be eaten fresh or processed for juice or fragrant peel.";
    }
    show(_orange){
        this.x = windowWidth*.1;
        this.y = windowWidth*.09;
        this.w = windowWidth*.23;
        this.h = windowWidth*.235;
        this.c = windowWidth*.01;
        this.textSize = windowWidth*.04;

        fill(this.cr3);
        rect(this.x, this.y, this.w, this.h, this.c, this.c, this.c, this.c);
        triangle(this.x+this.w-this.c, this.y+this.h, this.x+this.w-this.c-windowWidth*.03, this.y+this.h, _orange.x, _orange.y-_orange.s*.2/1.5);

        fill(this.cr2);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT);
        textLeading(this.textSize/2.35);
        noStroke();
        text(this.text, this.x+windowWidth*.015, this.y+windowWidth*.03, this.w-windowWidth*.03);
    }
}
class AppleNote{
    constructor(){
        this.cr2 = color('#635A60');
        this.cr3 = color(236, 239, 240, 150);
        this.text = "I am originated in Central Asia and have been grown for thousands of years in Asia and Europe. I have religious and mythological significance in many cultures. My trees are large if grown from seed. Generally, my cultivars are propagated by grafting onto rootstocks.";
    }
    show(_apple){
        this.x = windowWidth*.1;
        this.y = windowWidth*.09;
        this.w = windowWidth*.23;
        this.h = windowWidth*.22;
        this.c = windowWidth*.01;
        this.textSize = windowWidth*.04;

        fill(this.cr3);
        rect(this.x, this.y, this.w, this.h, this.c, this.c, this.c, this.c);
        triangle(this.x+this.w-this.c, this.y+this.h, this.x+this.w-this.c-windowWidth*.03, this.y+this.h, _apple.x, _apple.y-_apple.s*.2/1.5);

        fill(this.cr2);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT);
        textLeading(this.textSize/2.35);
        noStroke();
        text(this.text, this.x+windowWidth*.015, this.y+windowWidth*.03, this.w-windowWidth*.03);
    }
}

class WatermelonNote{
    constructor(){
        this.cr2 = color('#635A60');
        this.cr3 = color(236, 239, 240, 150);
        this.text = "I am scrambling and trailing vine-like plant, and I was originally domesticated in Africa. I am a highly cultivated fruit worldwide, with more than 1,000 varieties. My sweet, juicy flesh is usually deep red to pink, with many black seeds.";
    }
    show(_watermelon){
        this.x = windowWidth*.57;
        this.y = windowWidth*.09;
        this.w = windowWidth*.185;
        this.h = windowWidth*.27;
        this.c = windowWidth*.01;
        this.textSize = windowWidth*.04;

        fill(this.cr3);
        rect(this.x, this.y, this.w, this.h, this.c, this.c, this.c, this.c);
        triangle(this.x+this.w-this.c, this.y+this.h, this.x+this.w-this.c-windowWidth*.03, this.y+this.h, _watermelon.x, _watermelon.y-_watermelon.s*.2/1.5);

        fill(this.cr2);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT);
        textLeading(this.textSize/2.35);
        noStroke();
        text(this.text, this.x+windowWidth*.015, this.y+windowWidth*.03, this.w-windowWidth*.03);
    }
}
class KiwiNote{
    constructor(){
        this.cr2 = color('#635A60');
        this.cr3 = color(236, 239, 240, 150);
        this.text = "I have a thin, fuzzy, fibrous, tart but edible light brown skin and light green or golden flesh with rows of tiny, black, edible seeds. I have a soft texture with a sweet and unique flavor. In the early 20th century, cultivation of me spread from China to New Zealand, where the first commercial plantings occurred.";
    }
    show(_kiwi){
        this.x = windowWidth*.57;
        this.y = windowWidth*.07;
        this.w = windowWidth*.185;
        this.h = windowWidth*.302;
        this.c = windowWidth*.01;
        this.textSize = windowWidth*.04;

        fill(this.cr3);
        rect(this.x, this.y, this.w, this.h, this.c, this.c, this.c, this.c);
        triangle(this.x+this.w-this.c, this.y+this.h, this.x+this.w-this.c-windowWidth*.03, this.y+this.h, _kiwi.x*1.025, _kiwi.y-_kiwi.s*.2/1.5);

        fill(this.cr2);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT);
        textLeading(this.textSize/2.35);
        noStroke();
        text(this.text, this.x+windowWidth*.015, this.y+windowWidth*.03, this.w-windowWidth*.03);
    }
}
class StrawberryNote{
    constructor(){
        this.cr2 = color('#635A60');
        this.cr3 = color(236, 239, 240, 150);
        this.text = "I am not, from a botanical point of view, a berry. Technically, I am an aggregate accessory fruit. Each apparent seed outside of me is one of the flower's ovaries, with a seed inside it. In 2019, world production of strawberries was 9 million tonnes, led by China with 40% of the total.";
    }
    show(_strawberry){
        this.x = windowWidth*.57;
        this.y = windowWidth*.07;
        this.w = windowWidth*.185;
        this.h = windowWidth*.3;
        this.c = windowWidth*.01;
        this.textSize = windowWidth*.04;

        fill(this.cr3);
        rect(this.x, this.y, this.w, this.h, this.c, this.c, this.c, this.c);
        triangle(this.x+this.c, this.y+this.h, this.x+this.c+windowWidth*.03, this.y+this.h, _strawberry.x, _strawberry.y-_strawberry.s*.2/1.5);

        fill(this.cr2);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT);
        textLeading(this.textSize/2.35);
        noStroke();
        text(this.text, this.x+windowWidth*.015, this.y+windowWidth*.03, this.w-windowWidth*.03);
    }
}
class PineappleNote{
    constructor(){
        this.cr2 = color('#635A60');
        this.cr3 = color(236, 239, 240, 150);
        this.text = "I am indigenous to South America, where it has been cultivated for many centuries. I am the third most important tropical fruit in world production. I grows as a small shrub and typically matures within a year.";
    }
    show(_pineapple){
        this.x = windowWidth*.57;
        this.y = windowWidth*.07;
        this.w = windowWidth*.185;
        this.h = windowWidth*.235;
        this.c = windowWidth*.01;
        this.textSize = windowWidth*.04;

        fill(this.cr3);
        rect(this.x, this.y, this.w, this.h, this.c, this.c, this.c, this.c);
        triangle(this.x+this.c, this.y+this.h, this.x+this.c+windowWidth*.03, this.y+this.h, _pineapple.x, _pineapple.y/.975-_pineapple.s*.2/1.5);

        fill(this.cr2);
        textSize(this.textSize);
        textFont(gameFont);
        textAlign(LEFT);
        textLeading(this.textSize/2.35);
        noStroke();
        text(this.text, this.x+windowWidth*.015, this.y+windowWidth*.03, this.w-windowWidth*.03);
    }
}

//READER ------------------------------------------------------------
class CodeBarReader{
    constructor(){
        this.cr1 = color('#F64B62');
        this.bananaNote = new BananaNote();
        this.grapesNote = new GrapesNote();
        this.watermelonNote = new WatermelonNote();
        this.orangeNote = new OrangeNote();
        this.appleNote = new AppleNote();
        this.kiwiNote = new KiwiNote();
        this.strawberryNote = new StrawberryNote();
        this.pipeappleNote = new PineappleNote();    
    }
    show(_banana, _grapes, _watermelon, _orange, _apple, _kiwi, _strawberry, _pipeapple){

        push();
        translate(windowWidth, 0);
        scale(-(windowWidth/cam.width), windowHeight/cam.height);
        imageMode(CORNER);
        //image(cam,0,0);

        if(pose){
            this.rEye = pose.rightEye;
            this.lEye = pose.leftEye;
            map(this.rEye.x, -5, 5, 0, windowWidth);
            map(this.lEye.x, -5, 5, 0, windowWidth);
            this.distance = dist(this.rEye.x, this.rEye.y, this.lEye.x, this.lEye.y);
 
            imageMode(CENTER);
            image(imgCodeBarReader, (this.rEye.x+this.lEye.x)/2, (this.rEye.y+this.lEye.y)/2*2, this.distance, this.distance);

            this.hitBanana = collidePointRect(Math.abs(windowWidth-((this.rEye.x+this.lEye.x)/2)*(windowWidth/cam.width)), Math.abs((this.rEye.y+this.lEye.y)/2*2)*(windowHeight/cam.height), (_banana.x-_banana.s*.2/2), (_banana.y-_banana.s*.2/2), (_banana.s*.2), (_banana.s*.2));
            this.hitGrapes = collidePointRect(Math.abs(windowWidth-((this.rEye.x+this.lEye.x)/2)*(windowWidth/cam.width)), Math.abs((this.rEye.y+this.lEye.y)/2*2)*(windowHeight/cam.height), (_grapes.x-_grapes.s*.2/2), (_grapes.y-_grapes.s*.2/2), (_grapes.s*.2), (_grapes.s*.2));
            this.hitWatermelon = collidePointRect(Math.abs(windowWidth-((this.rEye.x+this.lEye.x)/2)*(windowWidth/cam.width)), Math.abs((this.rEye.y+this.lEye.y)/2*2)*(windowHeight/cam.height), (_watermelon.x-_watermelon.s*.2/2), (_watermelon.y-_watermelon.s*.2/2), (_watermelon.s*.2), (_watermelon.s*.2));
            this.hitOrange = collidePointRect(Math.abs(windowWidth-((this.rEye.x+this.lEye.x)/2)*(windowWidth/cam.width)), Math.abs((this.rEye.y+this.lEye.y)/2*2)*(windowHeight/cam.height), (_orange.x-_orange.s*.2/2), (_orange.y-_orange.s*.2/2), (_orange.s*.2), (_orange.s*.2));
            this.hitApple = collidePointRect(Math.abs(windowWidth-((this.rEye.x+this.lEye.x)/2)*(windowWidth/cam.width)), Math.abs((this.rEye.y+this.lEye.y)/2*2)*(windowHeight/cam.height), (_apple.x-_apple.s*.2/2), (_apple.y/.975-_apple.s*.2/2), (_apple.s*.2), (_apple.s*.2));
            this.hitKiwi = collidePointRect(Math.abs(windowWidth-((this.rEye.x+this.lEye.x)/2)*(windowWidth/cam.width)), Math.abs((this.rEye.y+this.lEye.y)/2*2)*(windowHeight/cam.height), (_kiwi.x*1.025-_kiwi.s*.2/2), (_kiwi.y-_kiwi.s*.2/2), (_kiwi.s*.2), (_kiwi.s*.2));
            this.hitStrawberry = collidePointRect(Math.abs(windowWidth-((this.rEye.x+this.lEye.x)/2)*(windowWidth/cam.width)), Math.abs((this.rEye.y+this.lEye.y)/2*2)*(windowHeight/cam.height), (_strawberry.x-_kiwi.s*.2/2), (_strawberry.y-_strawberry.s*.2/2), (_strawberry.s*.2), (_strawberry.s*.2));
            this.hitPineapple = collidePointRect(Math.abs(windowWidth-((this.rEye.x+this.lEye.x)/2)*(windowWidth/cam.width)), Math.abs((this.rEye.y+this.lEye.y)/2*2)*(windowHeight/cam.height), (_pipeapple.x-_pipeapple.s*.2/2), (_pipeapple.y/.975-_pipeapple.s*.2/2), (_pipeapple.s*.2), (_pipeapple.s*.2));
        }
        pop();
        
        if (this.hitBanana) {
            bananaStatus = true;
            grapesStatus = false;
            orangeStatus = false;
            appleStatus = false;
            watermelonStatus = false;
            kiwiStatus = false;
            strawberryStatus = false;
            pineappleStatus = false;
        }
        if (this.hitGrapes) {          
            grapesStatus = true;
            bananaStatus = false;
            orangeStatus = false;
            appleStatus = false;
            watermelonStatus = false;
            kiwiStatus = false;
            strawberryStatus = false;
            pineappleStatus = false;
        }
        if(this.hitOrange) { 
            orangeStatus = true;
            bananaStatus = false;
            grapesStatus = false;
            appleStatus = false;
            watermelonStatus = false;
            kiwiStatus = false;
            strawberryStatus = false;
            pineappleStatus = false;
        }
        if (this.hitApple) {
            appleStatus = true;
            bananaStatus = false;
            grapesStatus = false;
            orangeStatus = false;
            watermelonStatus = false;
            kiwiStatus = false;
            strawberryStatus = false;
            pineappleStatus = false;
        }

        if (this.hitWatermelon) {
            watermelonStatus = true;
            kiwiStatus = false;
            strawberryStatus = false;
            pineappleStatus = false;
            appleStatus = false;
            bananaStatus = false;
            grapesStatus = false;
            orangeStatus = false;
        }
        if (this.hitKiwi) {
            kiwiStatus = true;
            watermelonStatus = false;
            strawberryStatus = false;
            pineappleStatus = false;
            appleStatus = false;
            bananaStatus = false;
            grapesStatus = false;
            orangeStatus = false;
        }
        if (this.hitStrawberry) {
            strawberryStatus = true;
            watermelonStatus = false;
            kiwiStatus = false;
            pineappleStatus = false;
            appleStatus = false;
            bananaStatus = false;
            grapesStatus = false;
            orangeStatus = false;
        }
        if (this.hitPineapple) {
            pineappleStatus = true;
            watermelonStatus = false;
            kiwiStatus = false;
            strawberryStatus = false;
            appleStatus = false;
            bananaStatus = false;
            grapesStatus = false;
            orangeStatus = false;
        }

        if (bananaStatus == true) {
            this.bananaNote.show(scenes[1].banana);          
        }
        if (grapesStatus == true) {
            this.grapesNote.show(scenes[1].grapes);
        }
        if(orangeStatus == true) {
            this.orangeNote.show(scenes[1].orange);
        }
        if (appleStatus == true) {
            this.appleNote.show(scenes[1].apple);
        }
        if (watermelonStatus == true) {
            this.watermelonNote.show(scenes[1].watermelon);
        }
        if (kiwiStatus == true) {
            this.kiwiNote.show(scenes[1].kiwi);
        }
        if (strawberryStatus == true) {
            this.strawberryNote.show(scenes[1].strawberry);
        }
        if (pineappleStatus == true) {
            this.pipeappleNote.show(scenes[1].pineapple);
        }

      
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}