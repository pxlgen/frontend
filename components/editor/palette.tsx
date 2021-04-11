const colours = [
  "#000000ff",
  "#7f7f7fff",
  "#880015ff",
  "#ed1c24ff",
  "#ff7f27ff",
  "#fff200ff",
  "#22b124ff",
  "#00a2e8ff",
  "#3f48ccff",
  "#a349a4ff",
  "#ffffffff",
  "#c3c3c3ff",
  "#b97a57ff",
  "#ffaec9ff",
  "#ffc90eff",
  "#efe4b0ff",
  "#b5e61dff",
  "#99d9eaff",
  "#7092beff",
  "#c8bfe7ff",
];

interface Props {
  activeColour: string;
  setColour: React.Dispatch<React.SetStateAction<string>>;
}
export default function Palette({ activeColour, setColour }: Props): JSX.Element {
  return (
    <div className="lg:w-28 lg:float-right">
      {colours.map((x) => (
        <span
          key={x}
          onClick={() => setColour(x)}
          className={`box-border h-14 w-14 float-left cursor-pointer ${
            activeColour == x ? "border-2 border-blue-500 transform scale-125" : ""
          }`}
          style={{ backgroundColor: `${x}` }}
        ></span>
      ))}
    </div>
  );
}
