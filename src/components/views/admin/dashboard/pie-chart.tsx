"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChartIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PieChartComponent({
  data,
  loading,
}: {
  data: {
    name: string;
    total: string;
  }[];
  loading: boolean;
}) {
  return (
    <Card className="rounded-md shadow-sm mt-4 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon strokeWidth={1.5} size={18} className="text-gray-600" />
          <h3 className="font-medium text-sm text-gray-600">
            Course Per Category
          </h3>
        </CardTitle>
        <CardDescription className="">
          <Separator className="mt-2" />
        </CardDescription>
      </CardHeader>
      <CardContent className="m-0">
        <ChartContainer config={{}} className="h-[175px] w-full px-0">
          {loading ? (
            <div className="w-full h-full flex-center">
              <div className="w-32 h-32 rounded-full bg-indigo-400 animate-pulse"></div>
            </div>
          ) : data.length > 0 ? (
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="total" hideLabel />}
              />
              <Pie
                data={data}
                dataKey="total"
                label
                nameKey="name"
                fill="#312ecb"
              />
            </PieChart>
          ) : (
            <div className="h-[175px] flex-center">
              <p className="text-sm">No Course Found</p>
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
