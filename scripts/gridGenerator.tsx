const containerStyle = {
  backgroundColor: "white",
  width: 451,
  height: 451,
  paddingTop: 35,
  textAlign: "center" as const,
};
const gridStyle = {
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};
const coordStyle = {
  marginTop: -17,
  marginBottom: 17,
  fontSize: 22,
};
export default function Grid(): JSX.Element {
  const grids = [];
  for (let i = 1; i <= 400; i++) {
    const lower = Math.floor(i / 20) * 20;
    const upper = Math.ceil(i / 20) * 20;
    let x = i - lower;
    const y = upper / 20;
    if (x == 0) x = 20; // index: 400
    grids.push(<G key={i} i={i} x={x} y={y} />);
  }
  return <div>{grids}</div>;
}
function G({ i, x, y }: { i: number; x: number; y: number }) {
  const size = 17.5;
  const x_coord = x * 17.5 - size;
  const y_coord = y * 17.5 - size;
  let formattedX: string = `${x}`;
  while (formattedX.length < 2) {
    formattedX = `0${formattedX}`;
  }
  let formattedY: string = `${y}`;
  while (formattedY.length < 2) {
    formattedY = `0${formattedY}`;
  }
  return (
    <div style={{ padding: 50 }}>
      <div id={`grid_${i}`} style={containerStyle}>
        <div style={coordStyle}>
          📍 ({formattedX}, {formattedY})
        </div>
        <svg style={gridStyle} className="mx-auto" width="350.5" height="350.5" xmlns="http://www.w3.org/2000/svg">
          <image href="/pxlgen_watermark.png" width="351" height="351" className="opacity-20" />

          <defs>
            <pattern id="grid" width="17.5" height="17.5" patternUnits="userSpaceOnUse">
              <path d="M 17.5 0 L 0 0 0 17.5" fill="none" stroke="black" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="351" height="351" fill="url(#grid)" />
          <rect x={x_coord} y={y_coord} width="17.5" height="17.5" stroke="red" fill="#ff8c8c" />
        </svg>
      </div>
    </div>
  );
}
