window.addEventListener('DOMContentLoaded', () => {
    const block = document.querySelector('.block'),
          blockStyle = block.style,
          blockExactStyle = getComputedStyle(block),
          apple = document.querySelector('.apple'),
          appleStyle = apple.style,
          appleExactStyle = getComputedStyle(apple),
          border = document.querySelector('.wrapper'),
          borderStyle = getComputedStyle(border),
          body = document.querySelector('body'),
          bodyStyle = getComputedStyle(body),
          scoreBlock = document.querySelector('.score'),
          scoreBlockStyle = getComputedStyle(scoreBlock),
          currentScore = document.querySelector('.currentScore_res'),
          bestScore = document.querySelector('.bestScore_res'),
          blockImage = block.querySelector('.block_img'),
          appleImage = apple.querySelector('.apple_img'),
          wrapper = getComputedStyle(body.querySelector('.wrapper'));
    
    let Moving, 
        fps = 60, 
        wholeTime = 1000,
        InitialChange = 300,
        ratioOfChange = min(parseFloat(wrapper.width) / 1465.6, parseFloat(wrapper.height)  / 614.037),
        wholeChange = InitialChange * ratioOfChange,
        time = wholeTime / fps,
        change = wholeChange / fps,
        startChange = change;

        // 614.037

    let lastMove = 0,
        spaceClick = 0,
        funStuff = 1,
        speedAdd = 20 * ratioOfChange;

    let allLeftPad = pixelToNumber(bodyStyle.paddingLeft),
        allTopPad = pixelToNumber(bodyStyle.paddingTop) + pixelToNumber(scoreBlockStyle.height);

    let startWidthOfScreen = allLeftPad,
        endWidthOfScreen = allLeftPad + pixelToNumber(borderStyle.width),
        startHeightOfScreen = allTopPad,
        endHeightOfScreen = allTopPad + pixelToNumber(borderStyle.height);

    let borderLength = pixelToNumber(borderStyle.borderWidth);

    let centerPointX = (startWidthOfScreen + endWidthOfScreen) / 2,
        centerPointY = (startHeightOfScreen + endHeightOfScreen) / 2,
        startPosX = centerPointX - block.offsetWidth + "px", 
        startPosY = centerPointY - block.offsetHeight + "px";
           
    console.log(wrapper.height);

    // body.style.padding = "100px";
    
    //console.dir(borderStyle);

    blockStyle.top = startPosY;
    blockStyle.left = startPosX;

    // console.log(block.style.left);

    function min(a, b) {
        if (a >= b) {
            return b;
        }
        else {
            return a;
        }
    }
    
    function checkFuntions() {
        checkInteraction();
        gameOver();
    }
    
    function checkInteraction() {
        let dxAdit = apple.offsetWidth / 2 - block.offsetWidth / 2;
        let dx = Math.abs(pixelToNumber(appleStyle.left) + dxAdit - pixelToNumber(blockStyle.left));
        let dyAdit = apple.offsetHeight / 2 - block.offsetHeight / 2;
        let dy = Math.abs(pixelToNumber(appleStyle.top) + dyAdit - pixelToNumber(blockStyle.top));
        let blockDistance = apple.offsetHeight + block.offsetHeight;
        // 4 * (dx * dx + dy * dy) <= blockDistance * blockDistance
        // dx <= apple.offsetWidth && dy <= apple.offsetHeight
        if (4 * (dx * dx + dy * dy) <= blockDistance * blockDistance) {
            getPoint();
            speedUp(funStuff);
            currentScore.textContent = parseInt(currentScore.textContent) + 1;
            if (parseInt(currentScore.textContent) > parseInt(bestScore.textContent)) {
                bestScore.textContent = currentScore.textContent;
            }
        }
    }

    const catImages = {
        "longEarCat.png": "221x257",
        "redCat.png": "188:201",
        "smileCat.png": "257:257"
    };
    const catcherImages = {
        "catcher.png": "240x414",
        "catsBasket.png": "225x225"
    };

    function getCatImage() {
        let cat = Object.keys(catImages);
        let randCat = randFrom(0, cat.length - 1);
        let resolution = Object.values(catImages)[randCat].split("x");
        appleImage.src = "images/" + cat[randCat];
        let ratio = parseInt(resolution[1]) / parseInt(resolution[0]);
        apple.style.height = pixelToNumber(appleExactStyle.width) * ratio + "px";
    }

    function getCatherImage() {
        let catcher = Object.keys(catcherImages);
        let randCat = randFrom(0, catcher.length - 1);
        let resolution = Object.values(catcherImages)[randCat].split("x");
        blockImage.src = "images/" + catcher[randCat];
        let ratio = parseInt(resolution[1]) / parseInt(resolution[0]);
        block.style.height = pixelToNumber(blockExactStyle.width) * ratio + "px";
    }

    function gameOverFunctions() {
        blockStyle.top = startPosY;
        blockStyle.left = startPosX;
        clearInterval(Moving);
        lastMove = 0;
        change = startChange;
        currentScore.textContent = 0;
        getPoint();
        getCatherImage();
    }

    function gameOver() {
        let BlockX1 = pixelToNumber(blockStyle.left);
        let BlockX2 = pixelToNumber(blockStyle.left) + block.offsetWidth;
        let BlockY1 = pixelToNumber(blockStyle.top);
        let BlockY2 = pixelToNumber(blockStyle.top) + block.offsetHeight;

        let BorderX1 = startWidthOfScreen + borderLength;
        let BorderX2 = endWidthOfScreen - borderLength;
        let BorderY1 = startHeightOfScreen + borderLength;
        let BorderY2 = endHeightOfScreen - borderLength;

        if (BlockX1 <= BorderX1 || BlockX2 >= BorderX2 || BlockY1 <= BorderY1 || BlockY2 >= BorderY2) {
            gameOverFunctions();
        }
    }

    function speedUp(switcher) {
        if (switcher) {
            change += speedAdd / fps;
            //console.log(change);
        }
    }

    function pixelToNumber(obj) {
        return Number(obj.split("px")[0]); 
    }
    
    function randFrom(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }

    function getPoint() {
        let difAppleX = apple.offsetWidth + 15,
            difAppleY = apple.offsetHeight + 15,
            difBlockX = block.offsetWidth - 10,
            difBlockY = block.offsetHeight - 10;


        let x = randFrom(startWidthOfScreen + difAppleX, endWidthOfScreen - difAppleX);

        while (x >= centerPointX - difBlockX && x <= centerPointX + difBlockX) {
            x = randFrom(startWidthOfScreen + difAppleX, endWidthOfScreen - difAppleX);
        }

        let y = randFrom(startHeightOfScreen + difAppleY, endHeightOfScreen - difAppleY);

        while (y >= centerPointY - difBlockY && y <= centerPointY + difBlockY) {
            y = randFrom(startHeightOfScreen + difAppleY, endHeightOfScreen - difAppleY);
        }

        appleStyle.left = x + "px";
        appleStyle.top = y + "px";

        getCatImage();
    }

    let mp = {
        1: function moveUp() {
            blockStyle.top = String(pixelToNumber(blockStyle.top) - change) + "px";
            checkFuntions();
        },
        2: function moveDown() {
            blockStyle.top = String(pixelToNumber(blockStyle.top) + change) + "px";
            checkFuntions();
        },
        3: function moveLeft() {
            blockStyle.left = String(pixelToNumber(blockStyle.left) - change) + "px";
            checkFuntions();
        },
        4: function moveRight() {
            blockStyle.left = String(pixelToNumber(blockStyle.left) + change) + "px";
            checkFuntions();
        }    
    };
    
    getCatImage();
    getCatherImage();
    getPoint();

    const moves = new Set(['s', 'w', 'a', 'd', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);

    document.addEventListener('keydown', (e) => {
        if (moves.has(e.key) || e.key == ' ') {
            clearInterval(Moving);
        }

        if (e.key == ' ') {
            spaceClick += 1;
            if (spaceClick % 2 == 0 && lastMove > 0) {
                Moving = setInterval(mp[lastMove], time);
            }
        }

        
        if (e.key == 'w' || e.key == 'ArrowUp') {
            lastMove = 1;
        }
        if (e.key == 's' || e.key == 'ArrowDown') {
            lastMove = 2;
        }
        if (e.key == 'a' || e.key == 'ArrowLeft') {
            lastMove = 3;
        }
        if (e.key == 'd' || e.key == 'ArrowRight') {
            lastMove = 4;
        }

        if (moves.has(e.key)) {
            spaceClick = 0;
            Moving = setInterval(mp[lastMove], time);
        }
    });

    document.addEventListener('mousedown1', (e) => {
        if (e.button == 0) {
            //console.log(e);
            let dx = e.clientX - blockStyle.left.split("px")[0] - block.offsetWidth / 2;
            let dy = e.clientY - blockStyle.top.split("px")[0] - block.offsetHeight / 2;
            if (Math.abs(dx) <= block.offsetWidth / 2 || Math.abs(dy) <= block.offsetHeight / 2) {
                clearInterval(Moving);
                if (dx >= block.offsetWidth / 2) {
                    Moving = setInterval(mp[4], time);
                }
                else if (dx <= -block.offsetWidth / 2) {
                    Moving = setInterval(mp[3], time);
                }
                else if (dy >= block.offsetHeight / 2) {
                    Moving = setInterval(mp[2], time);
                }
                else {
                    Moving = setInterval(mp[1], time);
                }
            }
        }
    });


});