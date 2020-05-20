
/* canvas는 많은 능력(특히 픽셀을 다루는)을 가지고 있는 HTML5의 요소 */
/* canvas는 pixel 을 다루기 때문에 기본적으로 save 기능이 내장되어 있음! */
/* 1. 캔버스 가지고 오기 */
const canvas = document.getElementById("jsCanvas");

/* 28. fill 버튼 위한 캔버스 사이즈 변수 설정 */
const CANVAS_SIZE = 500;

/* 14. 색상 패널 가지고 오기 */
const colors = document.getElementsByClassName("jsColor")

/* 17. 선 굵기 값 가지고 오기 */
const range = document.getElementById("jsRange")

/* 20. 채우기 버튼(fill) 가지고 오기 */
const mode = document.getElementById("jsMode");

/* 33. save 버튼 가지고 오기 */
const saveBtn = document.getElementById("jsSave");

/* 25. 색상 초기화 */
const INITIAL_COLOR = "#2c2c2c"

/* 13. pixel manipulation size -> pixel을 다룰 수 있는 element로서 만드는 것 (실제 픽셀사이즈 부여) 
pixel modifier에 사이즈를 부여하여야만 펜이 그려짐 */
/* css로 캔버스 자체의 크기 부여 + 픽셀을 다루는 윈도우의 크기 설정(=canvas에게 알려주기) */
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

/* 8. 캔버스 API 활용하기 -> 
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D 
context -> canvas안에서 픽셀을 다루는 것 */
const ctx = canvas.getContext('2d');
/* 9. context default 설정 -> 색상 */
ctx.strokeStyle = INITIAL_COLOR;
/* 10. context 굵기 설정 */
ctx.lineWidth = 2.5;

/* 26. 채우기 버튼 기본값 설정 */
ctx.fillStyle = INITIAL_COLOR;

/* 30. canvas 투명 배경 저장을 방지하기 위한 배경 색상 설정 */
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, CANVAS_SIZE);

// /* 24. fillstyle 이용 채우기 내부 기본 색상 설정 */
// /* fillStyle 이 fillRect 보다 아래에 있으면 적용 안됨! */
// /* canvas는 위에서부터 아래로 실행되기 때문에! */
// ctx.fillStyle = "green";
// /* 23. fillRect 이용 x, y값 부여해서 색 채우기 */
// ctx.fillRect(50, 20, 100, 40); /* x, y 좌표 + 가로, 세로 크기 */

/* ------------------------------------------- */

/* 5. 페인팅 변수 설정 */
let painting = false;

/* 23. 채우기 내부 필요 변수 추가 -> 채워졌는지 아닌지 확인위해 필요 */
let filling = false;

/* 7. 클릭해제 함수 설정 */
function stopPainting() {
  painting = false;
}

/* 11. 그림그리기 시작 함수 설정 */
function startPainting() {
  painting = true;
}

/* 3. 마우스 움직임 함수 */
function onMouseMove(event) {
  /* console.log(event); */
  /* offset -> 캔버스 부분과 관련있는 값 */
  /* client -> 윈도우 전체의 범위 내에서 마우스 위치값 표시 */
  /* 4. 캔버스내 x,y 좌표 얻기 */
  const x = event.offsetX;
  const y = event.offsetY;
  // console.log(x,y);

  /* 12. 선 그리기 함수 -> 마우스를 움직이는 내내 실행됨! */
  if(!painting) {
    /* 선 그리기 시작 -> 단 보이지는 않음 (클릭하지 않았기에) */
    /* 그냥 path만 움직일 뿐 */
    console.log(`creating path in ${x}, ${y}`)
    ctx.beginPath();
    /* 선 x, y 값 받아오기 */
    ctx.moveTo(x, y);
  } else {
    /* 선 그리기 종료(선끼리 이어주기) */
    console.log(`creating line in ${x}, ${y}`)
    ctx.lineTo(x, y);
    /* 선을 현재의 fill style로 채워주기 */
    ctx.stroke();
  }
}

/* 4. 마우스 클릭 함수 */
// function onMouseDown(event) {
//   /* console.log(event); */
//   painting = true;
// }

/* 5. 마우스 클릭 해제 함수 */
// function onMouseUp(event) {
//   /* console.log(event); */
//   // painting = false;
//   stopPainting();
// }

/* 6. 마우스 캔버스 외부 이탈 함수 */
// function onMouseLeave(event) {
//   /* console.log(event); */
//   painting = false;
// }

/* 2. 마우스 감지 */if(canvas) {
  /* mousemove -> 마우스 움직임 */
  canvas.addEventListener("mousemove", onMouseMove);
  /* mousedown -> 마우스 클릭 */
  canvas.addEventListener("mousedown", startPainting);
  /* mouseup -> 마우스 클릭 해제 */
  canvas.addEventListener("mouseup", stopPainting);
  /* mouseleave -> 마우스 캔버스 외부로 이탈 */
  canvas.addEventListener("mouseleave", stopPainting);
  /* 28. fill button 마우스 감지 */
  canvas.addEventListener("click", handleCanvasClick);
  /* 31. context menu 호출 만들기(기본내장 제외하고 새로 만들기) */
  /* contextmenu 라는 이벤트(-> 실행될 때 발생) */
  canvas.addEventListener("contextmenu", handleCM);
}

/* 15. Array 이용 colors를 돌려서 값 추출하기 */
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

/* 16. 색상 변경 함수 */
function handleColorClick(event) {
  //console.log(event.target.style);
  /* color 배열에서 rgba 값만 가지고 옴 */
  const color = event.target.style.backgroundColor;
  console.log(color);
  /* 기존의 strokeStyle을 override 시킴 */
  ctx.strokeStyle = color;
  /* 27. 선 색상과 채우기 색상 동일하게 만들기 */
  ctx.fillStyle = color;
}

/* 29. fill 버튼 작동 함수 */
/* 오탈자 언제나 확인할 것!!!(그냥 c v 로 해...) */
function handleCanvasClick() {
  if(filling) {
  ctx.fillRect(0, 0, canvas.width, CANVAS_SIZE);
  }
}

/* 18. 선 굵기(range)값 가지고 왔는지 확인 */
if(range) {
  range.addEventListener("input", handleRangeChange);
}

/* 19. 선 굵기 변경 함수 */
function handleRangeChange(event) {
  /* 어떤 값이 필요한지 콘솔창에서 알아보기 */
  //console.log(event);
  //console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

/* 21. 채우기 버튼 가지고 왔는지 확인 */
if(mode) {
  mode.addEventListener("click", handleModeClick)
}

/* 34. savaBtn 기능 구현 준비 */
if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

/* 22. 채우기 버튼 실행 함수 */
function handleModeClick() {
  if(filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

/* 32. contextmenu 함수(저장 기능) -> 
  이 기능으로 우클릭 방지 기능 구현 가능 */
function handleCM(event) {
  //console.log(event);
  event.preventDefault();
}

/* 35. saveBtn 클릭 저장 함수 */
/* canvas의 데이터를 image 처럼 얻어야 함 */
/* canvas to data url 검색 -> default PNG*/
function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  //console.log(image);
  /* 36. 가상의 링크 작성 */
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS_EXPORT";
  // console.log(link);
  /* 37. 가짜 클릭 만들기 */
  link.click();
}
