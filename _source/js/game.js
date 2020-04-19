let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let _timer = 0,
    backgr_bottom_pos = 0,
    backgr_top_pos = 0,
    player, bullet, cursor;

backgr = new Image();
backgr.src = '/_assets/img/backgr.jpg';
backgr_bottom = new Image();
backgr_bottom.src = '/_assets/img/backgr-bottom.png';
backgr_top = new Image();
backgr_top.src = '/_assets/img/backgr-top.png';
bullet_img = new Image();
bullet_img.src = '/_assets/img/bullet.png';
player_img = new Image();
player_img.src = '/_assets/img/player.png';
cursor_img = new Image();
cursor_img.src = '/_assets/img/cursor.png';

//LOAD
backgr_top.onload = function () {
    init();
    game();
}

//LEGACY
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 20);
        };
})();

//INIT
function init() {
    _timer = 0;
    cursor = {
        x: 0,
        y: 0
    }
    player = {
        x: 50,
        y: 400,
        left: false,
        right: false,
        speedr: 0,
        speedl: 0,
    };
    bullet = {
        x: 700,
        y: 700,
        left: false,
        right: false,
        speedr: 0,
        speedl: 0,
    };
    document.addEventListener("keydown", function (event) {
        if (event.key == 'ArrowRight') {
            player.right = true;
        }
        if (event.key == 'ArrowLeft') {
            player.left = true;
        }
        console.log(player.x);
        console.log(bullet.x);
    });
    document.addEventListener("keyup", function (event) {
        if (event.key == 'ArrowRight') {
            player.right = false;
        }
        if (event.key == 'ArrowLeft') {
            player.left = false;
        }
        console.log(player.x);
        console.log(bullet.x);
    });
    canvas.addEventListener("click", function (event) {
        bullet.x = event.offsetX - 8;
        bullet.y = event.offsetY - 2;
    });
    document.oncontextmenu = function (event) {
        event.preventDefault();
        player = {
            x: 50,
            y: 400,
            left: false,
            right: false,
            speedr: 0,
            speedl: 0,
        };
        return false;
    };
    canvas.addEventListener("mousemove", function (event) {
        cursor.x = event.offsetX - 13;
        cursor.y = event.offsetY - 13;
    });
}

//INSTANCE
function game() {
    update();
    render();
    requestAnimFrame(game);
}

//ENGINE
function update() {
    _timer++;
    backgr_bottom_speed = Math.trunc(_timer * 0.7);
    backgr_bottom_pos = backgr_bottom_speed % 600;
    backgr_top_speed = Math.trunc(_timer * 0.3);
    backgr_top_pos = backgr_top_speed % 600;
    if (player.x + 37 > bullet.x &&
        player.x < bullet.x + 19 &&
        player.y + 60 > bullet.y &&
        player.y < bullet.y + 24) {
        player.x = player.x - player.speedr;
        player.speedr = 0;
        player.x = player.x + player.speedl;
        player.speedl = 0;
    }
    if (player.right == true) {
        if (player.speedr < 10) {
            player.speedr++;
            player.x = player.x + player.speedr;
        } else {
            player.x = player.x + player.speedr;
        }
    } else {
        if (player.speedr > 0) {
            player.speedr--;
            player.x = player.x + player.speedr;
        }
    }
    if (player.left == true) {
        if (player.speedl < 10) {
            player.speedl++;
            player.x = player.x - player.speedl;
        } else {
            player.x = player.x - player.speedl;
        }
    } else {
        if (player.speedl > 0) {
            player.speedl--;
            player.x = player.x - player.speedl;
        }
    }
}

// RENDER
function render() {
    context.drawImage(backgr, 0, 0, 600, 600);
    context.drawImage(backgr_bottom, -backgr_bottom_pos, 0, 600, 600);
    context.drawImage(backgr_bottom, -backgr_bottom_pos + 600, 0, 600, 600);
    context.drawImage(backgr_top, -backgr_top_pos, 0, 600, 600);
    context.drawImage(backgr_top, -backgr_top_pos + 600, 0, 600, 600);
    context.drawImage(bullet_img, bullet.x, bullet.y, 19, 24);
    context.drawImage(player_img, player.x, player.y, 37, 60);
    context.drawImage(cursor_img, cursor.x, cursor.y, 25, 25);
}
