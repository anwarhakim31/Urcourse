import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { NextResponse } from "next/server";
interface GroupedRevenue {
  [key: string]: number;
}

export async function GET() {
  try {
    const now = new Date();
    const startOf12MonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 11,
      1
    );
    const endOfCurrentMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    );

    const purchaseData = await db.purchase.findMany({
      where: {
        status: "PAID",
        user: {
          isAdmin: false,
        },
        transactions: {
          some: {
            createdAt: {
              gte: startOf12MonthsAgo,
              lte: endOfCurrentMonth,
            },
          },
        },
      },
      include: {
        transactions: true,
      },
    });

    const revenue = purchaseData.reduce((acc, purchase) => {
      return acc + purchase.price;
    }, 0);

    const groupedRevenue = purchaseData.reduce(
      (acc: GroupedRevenue, purchase) => {
        purchase?.transactions.forEach((transaction) => {
          const createdAt = new Date(transaction.createdAt);
          const monthKey = `${createdAt.getFullYear()}-${String(
            createdAt.getMonth() + 1
          ).padStart(2, "0")}`; // Format: YYYY-MM

          if (!acc[monthKey]) {
            acc[monthKey] = 0;
          }

          acc[monthKey] += transaction.amount;
        });

        return acc;
      },
      {}
    );

    const allMonths = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      allMonths.unshift({
        month: `${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${date.getFullYear()}`,
        total: groupedRevenue[monthKey] || 0,
      });
    }

    const totalPurchase = await db.purchase.count({
      where: {
        status: "PAID",
        user: {
          isAdmin: false,
        },
      },
    });

    const category = await db.category.findMany({
      include: {
        _count: {
          select: {
            course: true,
          },
        },
      },
    });

    const totalCourse = await db.course.count({});
    const totalUser = await db.user.count({});

    const categoryStat = category.map((item) => ({
      name: item.name,
      total: item._count.course,
    }));

    const popularCourse = await db.course.findMany({
      where: {
        purchases: {
          some: {
            status: "PAID",
            user: {
              isAdmin: false,
            },
          },
        },
      },
      take: 3,
    });

    return NextResponse.json({
      success: true,
      message: "Statistik fetched successfully",
      data: {
        categoryStat,
        revenue,
        totalPurchase,
        totalCourse,
        totalUser,
        allMonths,
        popularCourse,
      },
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
