import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { calculateFeeAndPPN, formatPaymentMethod } from "@/utils/helpers";
import { v4 as uuid } from "uuid";
import QRCode from "qrcode";

import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await verifyToken(req);
    const { purchaseId, paymentType, paymentName } = await req.json();

    if (token instanceof NextResponse) {
      return token;
    }

    if (token && typeof token === "object" && "id" in token) {
      const purchase = await db.purchase.findUnique({
        where: {
          id: purchaseId,
        },
      });

      if (purchase?.status === "PAID") {
        return ResponseErrorApi(400, "Purchase already paid");
      }

      if (!purchase) {
        return ResponseErrorApi(404, "Purchase not found");
      }

      const { total } = calculateFeeAndPPN(
        purchase?.price as number,
        paymentType
      );

      const currentTime = new Date();
      const expirationTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
      const invoice = `INV-${uuid()
        .split("-")[0]
        .toLocaleUpperCase()}${new Date().getTime()}`;

      const createXenditTransaction = (
        paymentName: string,
        paymentType: string
      ) => {
        if (paymentType === "virtualAccount") {
          return {
            url: "https://api.xendit.co/callback_virtual_accounts",
            body: {
              external_id: invoice,
              bank_code: paymentName.toUpperCase(),
              name: token.fullname,
              expected_amount: total,
              is_closed: true,
              in_single_use: true,
              expiration_date: expirationTime.toISOString(),
              currency: "IDR",
              country: "ID",
            },
          };
        } else if (paymentName === "Alfamart" || paymentName === "Indomaret") {
          return {
            url: "https://api.xendit.co/fixed_payment_code",
            body: {
              external_id: invoice,
              retail_outlet_name: paymentName.toUpperCase(),
              name: token.fullname,
              expected_amount: total,
              is_closed: true,
              in_single_use: true,
              expiration_date: expirationTime.toISOString(),
              currency: "IDR",
              country: "ID",
            },
          };
        } else if (
          paymentType === "dana" ||
          paymentType === "linkaja" ||
          paymentType === "ovo" ||
          paymentType === "shopeepay"
        ) {
          return {
            url: "https://api.xendit.co/ewallets/charges",
            body: {
              reference_id: invoice,
              checkout_method: "ONE_TIME_PAYMENT",
              channel_code: `ID_${paymentName.toUpperCase()}`,
              name: token.fullname,
              amount: total,
              is_closed: true,
              in_single_use: true,
              expiration_date: expirationTime.toISOString(),
              currency: "IDR",
              country: "ID",
              channel_properties: {
                success_redirect_url: `${process.env.NEXT_PUBLIC_DOMAIN}/payment/${invoice}/success`,
              },
            },
          };
        } else if (paymentType === "creditcard") {
          return {
            url: "https://api.xendit.co/v2/invoices",
            body: {
              external_id: invoice,
              amount: total,
              currency: "IDR",
              country: "ID",
              success_redirect_url: `${process.env.NEXT_PUBLIC_DOMAIN}/payment/${invoice}/success`,
            },
          };
        } else {
          return {
            url: "https://api.xendit.co/qr_codes",
            body: {
              external_id: invoice,
              type: "DYNAMIC",
              name: token.fullname,
              amount: total,
              expires_at: expirationTime.toISOString(),
              callback_url: `${process.env.NEXT_PUBLIC_DOMAIN}/payment/${invoice}/success`,
            },
          };
        }
      };

      const data = createXenditTransaction(paymentName, paymentType);

      const xenditResponse = await axios.post(
        data?.url as string,
        {
          ...data?.body,
        },
        {
          auth: {
            username: `${process.env.XENDIT_SECRET_KEY}`,
            password: "",
          },
        }
      );
      let qrCodeUrl = "";
      if (paymentName === "QRIS") {
        qrCodeUrl = await QRCode.toDataURL(xenditResponse?.data?.qr_string);
      }

      const paymentMethod = formatPaymentMethod(paymentType as string);

      const transaction = await db.transaction.create({
        data: {
          purchaseId,
          amount: total,
          paymentMethod,
          paymentName: paymentName,
          paymentCode:
            xenditResponse?.data?.account_number ||
            xenditResponse?.data?.payment_code ||
            xenditResponse?.data?.actions?.mobile_web_checkout_url ||
            xenditResponse?.data?.actions?.mobile_deeplink_checkout_url ||
            xenditResponse?.data?.invoice_url ||
            qrCodeUrl,
          status: "PENDING",
          expired: xenditResponse?.data?.expiration_date || expirationTime,
          invoice: invoice,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Transaction created successfully",
        data: transaction,
      });
    }
  } catch (error) {
    console.log("[error]", error);
    return ResponseErrorApi(500, "Internal Server Error");
  }
}
