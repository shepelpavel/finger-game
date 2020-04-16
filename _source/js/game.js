let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let _timer = 0,
    backgr_bottom_pos = 0,
    backgr_top_pos = 0,
    player;

backgr = new Image();
backgr.src = '/_assets/img/backgr.jpg';
backgr_bottom = new Image();
backgr_bottom.src = '/_assets/img/backgr-bottom.png';
backgr_top = new Image();
backgr_top.src = '/_assets/img/backgr-top.png';
player_img = new Image();
player_img.src = '/_assets/img/player.png';

//старт игры
backgr_top.onload = function () {
    init();
    game();
}

//совместимость с браузерами
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

//начальные установки
function init() {
    _timer = 0;
    player = {
        x: 50,
        y: 400,
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
    });
    document.addEventListener("keyup", function (event) {
        if (event.key == 'ArrowRight') {
            player.right = false;
        }
        if (event.key == 'ArrowLeft') {
            player.left = false;
        }
    });
}

//основной игровой цикл
function game() {
    update();
    render();
    requestAnimFrame(game);
}

//функция обновления состояния игры
function update() {
    _timer++;
    backgr_bottom_speed = Math.trunc(_timer * 0.7);
    backgr_bottom_pos = backgr_bottom_speed % 600;
    backgr_top_speed = Math.trunc(_timer * 0.3);
    backgr_top_pos = backgr_top_speed % 600;
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

function render() {
    context.drawImage(backgr, 0, 0, 600, 600);
    context.drawImage(backgr_bottom, -backgr_bottom_pos, 0, 600, 600);
    context.drawImage(backgr_bottom, -backgr_bottom_pos + 600, 0, 600, 600);
    context.drawImage(backgr_top, -backgr_top_pos, 0, 600, 600);
    context.drawImage(backgr_top, -backgr_top_pos + 600, 0, 600, 600);
    context.drawImage(player_img, player.x, player.y, 60, 60);
}
