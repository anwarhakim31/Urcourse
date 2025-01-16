import { db } from "@/lib/db";
import { ResponseErrorApi } from "@/lib/response-error";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: NextRequest) {
  try {
    const { courseId } = await request.json();

    const token = await verifyToken(request);

    if (token instanceof NextResponse) {
      return token;
    }

    if (token && typeof token === "object" && "id" in token) {
      const course = await db.course.findUnique({
        where: {
          id: courseId,
        },
      });

      if (!course) {
        return ResponseErrorApi(404, "Course not found");
      }

      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const html = `
     <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap');
            .certificate-title { font-family: 'Playfair Display', serif; }
          </style>
        </head>
        <body>
          <div class="w-[1123px] h-[794px] bg-white relative p-16">
            <!-- Border Dekoratif -->
            <div class="absolute inset-0 border-[20px] border-double border-indigo-700"></div>
            
            <!-- Konten Sertifikat -->
            <div class="relative h-full flex flex-col items-center justify-between py-8">
              <!-- Header -->
                <div class="absolute top-7 left-5 flex items-center gap-2">
                 <img src="https://h8r9gekx08.ufs.sh/f/EZBEM0av8ypxIX1ZKTLmJE4FfelhgPa672QU5skiTXnqRYW1" alt="Logo" class="w-14 h-auto">
                 <span
                   class="text-2xl text-indigo-700  font-medium"
                  >
                 Urcourse
                  </span>
                 </div>

              <div class="text-center">
                <h1 class="certificate-title text-4xl text-gray-800 mb-2">Certificate of Completion</h1>
                <div class="w-32 h-1 bg-blue-600 mx-auto"></div>
              </div>
              
              <!-- Konten Utama -->
              <div class="text-center space-y-6 my-12">
                <p class="text-gray-600 text-xl">This is to certify that</p>
                <h2 class="certificate-title text-5xl text-blue-700 mb-8">${
                  token.name
                }</h2>
                <p class="text-gray-600 text-xl">has successfully completed the course</p>
                <h3 class="certificate-title text-3xl text-gray-800 mb-8">${
                  course.title
                }</h3>
                <p class="text-gray-600 text-lg">
                  demonstrating dedication and mastery of the subject matter
                </p>
              </div>
              
              <!-- Footer dengan Tanda Tangan -->
              <div class="w-full flex justify-between items-end px-10">
                <div class="text-center">
                  <p class="text-gray-500 mb-4">${new Date().toLocaleDateString(
                    "id-ID",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}</p>
                </div>
              
              </div>
            </div>
          </div>
        </body>
      </html>
  `;
      await page.setContent(html);

      const pdfBuffer = await page.pdf({
        format: "A4",
        landscape: true,
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });

      await browser.close();

      return new Response(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="certificate.pdf"',
        },
      });
    }
  } catch (error) {
    console.error("Error generating certificate:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}
