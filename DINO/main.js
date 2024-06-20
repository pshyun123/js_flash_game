// 캔버스에 도형 그리기
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

// 공룡 캐릭터 속성 미리 저장
var dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

// 장애물
class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// 코드 1초에 60번 실행
var timer = 0;
var cactuses = [];

function 프레임마다실행() {
  requestAnimationFrame(프레임마다실행);
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 지우기
  //   dino.x++;
  // 해상도에 맞추어 120 프레임마다 {장애물} 생성 -> array에 넣음
  if (timer % 120 === 0) {
    var cactus = new Cactus();
    cactuses.push(cactus);
  }
  cactuses.forEach((a) => {
    a.x--;
    a.draw();
  });

  dino.draw();
}

프레임마다실행();
