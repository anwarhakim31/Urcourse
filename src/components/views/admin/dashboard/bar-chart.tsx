"use client";

import { AreaChartIcon } from "lucide-react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Rectangle,
  Bar,
  BarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/helpers";

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function BarCharComp({
  data,
  loading,
}: {
  data: { month: string; total: number }[];
  loading: boolean;
}) {
  return (
    <Card className="rounded-md shadow-sm mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AreaChartIcon
            strokeWidth={1.5}
            size={18}
            className="text-gray-600"
          />
          <h3 className="font-medium text-sm text-gray-600">Stats Income</h3>
        </CardTitle>
        <CardDescription className="">
          <Separator className="mt-2" />
        </CardDescription>
      </CardHeader>
      <CardContent className="m-0">
        {loading ? (
          <div className="w-full h-[250px] relative">
            <div className="absolute top-0 left-0 w-full h-full flex items-end justify-between px-32 py-4  animate-pulse">
              <div className="w-[30px] h-[200px] rounded-[4px]  bg-indigo-400 "></div>
              <div className="w-[30px] h-[150px] rounded-[4px]  bg-indigo-400 "></div>
              <div className="w-[30px] h-[200px] rounded-[4px]  bg-indigo-400 "></div>
            </div>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="h-[250px] w-full  m-0"
          >
            <BarChart
              width={20}
              height={20}
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: 50,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} />
              <YAxis
                axisLine={false}
                dataKey={"total"}
                fontSize={10}
                width={25}
                tickFormatter={(value) => {
                  return formatCurrency(value);
                }}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="total"
                fill="#312ecb"
                barSize={30}
                className="w-[20px]"
                radius={4}
                activeBar={
                  <Rectangle fill="#4f46e5" stroke="#312ecb" radius={4} />
                }
              />
            </BarChart>
          </ChartContainer>
        )}
        <p className="text-xs mt-2 text-center">Monthly </p>
      </CardContent>
    </Card>
  );
}
