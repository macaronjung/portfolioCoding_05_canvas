
/* 1. 캔버스 가지고오기 */
const canvas = document.getElementById("jsCanvas");

/* 5. 페인팅 변수 설정 */
let painting = false;

/* 클릭해제 함수 설정 */
function stopPainting() {
  painting = false;
}

/* 3. 마우스 움직임 함수 */
function onMouseMove(event) {
  /* console.log(event); */
  /* offset -> 캔버스 부분과 관련있는 값 */
  /* client -> 윈도우 전체의 범위 내에서 마우스 위치값 표시 */
  /* 4. 캔버스내 x,y 좌표 얻기 */
  const x = event.offsetX;
  const y = event.offsetY;
  console.log(x,y);
}

/* 4. 마우스 클릭 함수 */
function onMouseDown(event) {
  /* console.log(event); */
  painting = true;
}

/* 5. 마우스 클릭 해제 함수 */
function onMouseUp(event) {
  /* console.log(event); */
  // painting = false;
  stopPainting(); /* -> 나중에 선 그리는 기능 때문에 밑에서 stop 미실시 */
}

/* 6. 마우스 캔버스 외부 이탈 함수 */
// function onMouseLeave(event) {
//   /* console.log(event); */
//   painting = false;
// }

/* 2. 마우스 감지 */
if(canvas) {
  /* mousemove -> 마우스 움직임 */
  canvas.addEventListener("mousemove", onMouseMove);
  /* mousedown -> 마우스 클릭 */
  canvas.addEventListener("mousedown", onMouseDown);
  /* mouseup -> 마우스 클릭 해제 */
  canvas.addEventListener("mouseup", onMouseUp);
  /* mouseleave -> 마우스 캔버스 외부로 이탈 */
  canvas.addEventListener("mouseleave", stopPainting);
}