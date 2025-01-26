"use client";
import SectionWrapper from "@/components/Layouts/section-wrapper";
import { Separator } from "@/components/ui/separator";
import BarCharComp from "@/components/views/admin/dashboard/bar-chart";
import { PieChartComponent } from "@/components/views/admin/dashboard/pie-chart";
import PopularCourse from "@/components/views/admin/dashboard/popular-course";
import useGetStatistic from "@/hooks/dashboard/useGetStatistic";
import { cn } from "@/lib/utils";
import { StatistikItem } from "@/utils/constants";
import { formatCurrency } from "@/utils/helpers";
import { Loader2 } from "lucide-react";

import React from "react";

const DashboardPage = () => {
  const { data, isLoading } = useGetStatistic();

  return (
    <SectionWrapper isScroll={true}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 ">
        {StatistikItem.map((item) => (
          <div
            key={item.type}
            className="border rounded-md p-2.5 bg-white border-indigo-400/20 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  `w-8 h-8 rounded-md flex-center text-white`,
                  "bg-gradient-to-r ",
                  item.type === "course" && "from-orange-400 to-orange-500",
                  item.type === "user" && "from-purple-600 to-purple-700",
                  item.type === "purchase" && "from-blue-500 to-blue-600",
                  item.type === "income" && "from-green-400 to-green-500"
                )}
              >
                <item.icon size={18} strokeWidth={1.5} className="text-white" />
              </div>
              <h3 className=" font-medium text-sm text-slate-600 ">
                {item.title}
              </h3>
            </div>
            <Separator className="my-3 bg-indigo-400/20" />
            {isLoading ? (
              <div className=" text-slate-700 text-lg mt-2 flex-center">
                <Loader2
                  size={18}
                  strokeWidth={1.5}
                  className="animate-spin text-indigo-400 "
                />
              </div>
            ) : (
              <p className="text-slate-800 text-lg mt-2 font-semibold text-center">
                {item.type === "income" && formatCurrency(data?.revenue || 0)}
                {item.type === "purchase" && data?.totalPurchase}
                {item.type === "user" && data?.totalUser}
                {item.type === "course" && data?.totalCourse}
              </p>
            )}
          </div>
        ))}
      </div>

      <BarCharComp data={data?.allMonths || []} loading={isLoading} />
      <div className="mt-4 flex flex-col lg:flex-row gap-4">
        <PieChartComponent
          data={data?.categoryStat || []}
          loading={isLoading}
        />
        <PopularCourse data={data?.popularCourse || []} loading={isLoading} />
      </div>
    </SectionWrapper>
  );
};

export default DashboardPage;
