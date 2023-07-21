import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";
import { MdTimer, MdTimerOff } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";

const data = [
  { name: "Fechado", value: 400, fill: "#27AE60" },
  { name: "Em Andamento", value: 300, fill: "#F1C40F" },
  { name: "Em Espera", value: 300, fill: "#E67E22" },
  { name: "Por Atribuir", value: 200, fill: "#E74C3C" },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#001946"
      >{`Total: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#8895A9"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const PieChartClienteTarefa = () => {
  const tarefas = [
    {
      id: 1,
      taskname: "Adidas",
      abertoNome: "Cristiano Fula Mariano",
      atribuidoName: "Nuno Pereira",
      estado: 1,
      tempo: 0,
      faze: "Iniciante",
      telefone: "922 777 222",
      dataAtribuicao: "11/07/2023",
      dataCriacao: "01/07/2023",
    },
    {
      id: 2,
      taskname: "SanSung",
      abertoNome: "Cristiano Fula Mariano",
      atribuidoName: "Nuno Pereira",
      estado: 2,
      tempo: 5,
      faze: "Iniciante",
      telefone: "922 777 222",
      dataAtribuicao: "11/07/2023",
      dataCriacao: "01/07/2023",
    },
    {
      id: 3,
      taskname: "Lenovo",
      abertoNome: "Cristiano Fula Mariano",
      atribuidoName: "Nuno Pereira",
      estado: 3,
      tempo: 5,
      faze: "Iniciante",
      telefone: "922 777 222",
      dataAtribuicao: "11/07/2023",
      dataCriacao: "01/07/2023",
    },
    {
      id: 4,
      taskname: "Adidas",
      abertoNome: "Cristiano Fula Mariano",
      atribuidoName: "Nuno Pereira",
      estado: 1,
      tempo: 0,
      faze: "Iniciante",
      telefone: "922 777 222",
      dataAtribuicao: "11/07/2023",
      dataCriacao: "01/07/2023",
    },
  ];

  //Ver mais
  const [nextItems, setNextItems] = useState(3);
  const loadMoreHandler = () => {
    setNextItems((prev) => prev + 3);
  };

  //Grafico
  const [activeIndex, setActiveIndex] = useState(1);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full">
        <div className="mt-4 grid grid-rows gap-4">
          {tarefas?.slice(0, nextItems)?.map((task, index) => (
            <div
              key={index}
              className={`bg-primaryColor bg-opacity-10 grid grid-cols-3 gap-4 items-center rounded-md px-4 py-3  text-[14px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out ${
                task.estado == 4 && "border-l-[6px] border-[#E74C3C]"
              }`}
            >
              <div>
                Aberto por
                <strong className="text-primaryColor">
                  {" "}
                  {task.abertoNome}
                </strong>
                , atribuido a
                <strong className="text-primaryColor">
                  {" "}
                  {task.atribuidoName}{" "}
                </strong>
                - <small>({task.dataAtribuicao})</small>
              </div>

              <div
                className={`${
                  task.estado == 1
                    ? "text-[#27AE60]"
                    : task.estado == 2
                    ? "text-[#F1C40F]"
                    : task.estado == 3
                    ? "text-[#E67E22]"
                    : "text-[#E74C3C]"
                } flex gap-4 font-medium items-center col-span-1`}
              >
                <AiOutlineBarChart size={20} />
                {task.estado == 1
                  ? "Fechado"
                  : task.estado == 2
                  ? "Em Andamento"
                  : task.estado == 3
                  ? "Em Espera"
                  : "Por Atribuir"}
              </div>
              <div className="flex gap-4 items-cente col-span-1">
                {task.tempo == 0 ? (
                  <MdTimerOff size={20} />
                ) : (
                  <MdTimer size={20} />
                )}
                <p className={`${task.tempo == 0 ? "text-[#E74C3C]" : ""}`}>
                  {task.tempo}
                  <small> Horas{task.tempo == 0 ? "(100%)" : ""}</small>
                </p>
              </div>
            </div>
          ))}
        </div>
        {nextItems < tarefas.length && data.length > 3 && (
          <div className="mt-5 flex justify-center">
            <button
              onClick={loadMoreHandler}
              className="bg-primaryColor text-secudaryColor flex gap-2 rounded-md hover:bg-hoverColor px-4 py-2 items-center shadow-2xl hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
              type="button"
            >
              Ver mais
            </button>
          </div>
        )}
      </div>
      <div className="border border-gray-300 rounded-lg mt-4 shadow-lg lg:block hidden">
        <div className="w-full bg-primaryColor text-secudaryColor py-2 px-4 rounded-lg">
          Gráfico
        </div>
        <PieChart width={550} height={400} className="w-1/2">
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={300}
            cy={200}
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default PieChartClienteTarefa;
