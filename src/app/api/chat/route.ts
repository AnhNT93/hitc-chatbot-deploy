import { google } from "@ai-sdk/google";
import { streamText, tool, type CoreMessage } from "ai";
import { z } from "zod";
import {
  HITC_CATEGORIES,
  HITC_CONTACT,
  HITC_DATA_CENTER,
  HITC_PARTNERS,
  HITC_POSITIONING,
  HITC_PROFILE,
  HITC_STATS,
  HITC_USPS,
  findServices,
  getServiceById,
  recommendServices,
} from "@/lib/hitc-data";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.GOOGLE_MODEL || "gemini-2.0-flash-exp";

const SYSTEM_PROMPT = `Bạn là trợ lý ảo của HITC (Hanoi Information Technology Corporation) — nhà cung cấp hạ tầng viễn thông, Data Center, Cloud và chuyển đổi số tại Việt Nam.

NGUYÊN TẮC:
- Trả lời bằng tiếng Việt, ngắn gọn, đúng trọng tâm, giọng chuyên nghiệp và thân thiện.
- LUÔN ưu tiên dùng tools để hiển thị thông tin trực quan (generative UI) thay vì liệt kê bằng text dài.
  • Khi user hỏi về danh sách / nhóm dịch vụ → gọi listServicesByCategory hoặc searchServices.
  • Khi user hỏi chi tiết 1 dịch vụ → gọi getServiceDetail.
  • Khi user mô tả nhu cầu/bài toán → gọi recommend.
  • Khi user hỏi về công ty / giới thiệu → gọi showCompanyOverview.
  • Khi user hỏi Data Center / EcoDC / Tier 3 → gọi showDataCenter.
  • Khi user hỏi liên hệ / hotline / địa chỉ → gọi showContact.
  • Khi user hỏi "tại sao chọn HITC", "USP", "lợi thế cạnh tranh", "so với đối thủ", HOẶC khi đang chốt deal / cần thuyết phục → gọi showWhyHITC.
- Sau khi gọi tool, viết 1–2 câu kết luận hoặc gợi ý câu hỏi tiếp theo. Không lặp lại nội dung tool đã render.
- Nếu user hỏi điều ngoài phạm vi HITC, lịch sự từ chối và gợi ý chủ đề HITC có thể hỗ trợ.

NGỮ CẢNH NHANH: ${HITC_PROFILE.about}`;

const categorySchema = z.enum(["data", "internet", "cloud", "digital", "voice"]);

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = streamText({
    model: google(MODEL),
    system: SYSTEM_PROMPT,
    messages,
    maxSteps: 4,
    tools: {
      showCompanyOverview: tool({
        description:
          "Hiển thị tổng quan công ty HITC (sứ mệnh, tầm nhìn, số liệu nổi bật, đối tác). Dùng khi user hỏi 'HITC là ai', 'giới thiệu HITC', 'về công ty'.",
        parameters: z.object({}),
        execute: async () => ({
          profile: HITC_PROFILE,
          stats: HITC_STATS,
          partners: HITC_PARTNERS,
        }),
      }),

      listServicesByCategory: tool({
        description:
          "Liệt kê các dịch vụ HITC theo nhóm (data/internet/cloud/digital/voice). Dùng khi user hỏi về 'các dịch vụ cloud', 'dịch vụ thoại có gì', v.v.",
        parameters: z.object({
          category: categorySchema.describe(
            "Nhóm dịch vụ: data | internet | cloud | digital | voice",
          ),
        }),
        execute: async ({ category }) => ({
          category,
          meta: HITC_CATEGORIES[category],
          services: findServices({ category, limit: 8 }),
        }),
      }),

      searchServices: tool({
        description:
          "Tìm kiếm dịch vụ theo từ khoá (vd: 'backup', 'kubernetes', 'tổng đài ảo').",
        parameters: z.object({
          keyword: z.string().min(2).describe("Từ khoá tìm kiếm"),
          category: categorySchema.optional(),
        }),
        execute: async ({ keyword, category }) => ({
          keyword,
          services: findServices({ keyword, category, limit: 6 }),
        }),
      }),

      getServiceDetail: tool({
        description:
          "Lấy chi tiết một dịch vụ cụ thể theo id. Cloud IDs: 'sun-vm', 'private-cloud', 'sun-kubernetes', 'sun-container', 'sun-s3', 'sun-database', 'sun-load-balancer', 'sun-cdn', 'sun-kafka', 'sun-monitor', 'sun-drive', 'sun-container-registry', 'acronis', 'hybrid-cloud'. Khác: 'colocation', 'rack', 'dedicated-server', 'ops-management', 'ftth', 'ill', 'p2p', 'vpn-mpls', 'iplc', 'workbase', 'e-government', 'aiot', '1800-1900', 'voip', 'cloud-pbx', 'brandname-call', 'omni-channel'.",
        parameters: z.object({
          id: z.string().describe("Service id, vd 'sun-kubernetes'"),
        }),
        execute: async ({ id }) => {
          const service = getServiceById(id);
          if (!service) return { found: false as const, id };
          return { found: true as const, service };
        },
      }),

      recommend: tool({
        description:
          "Gợi ý gói dịch vụ phù hợp dựa trên mô tả nhu cầu/bài toán của khách hàng.",
        parameters: z.object({
          goal: z
            .string()
            .min(5)
            .describe(
              "Mô tả nhu cầu của khách, vd 'cần backup dữ liệu cho 50 máy chủ' hoặc 'muốn build tổng đài CSKH 100 agent'",
            ),
        }),
        execute: async ({ goal }) => ({
          goal,
          services: recommendServices(goal),
        }),
      }),

      showDataCenter: tool({
        description: "Hiển thị thông tin Data Center EcoDC Tier 3 của HITC.",
        parameters: z.object({}),
        execute: async () => ({
          dc: HITC_DATA_CENTER,
          stats: HITC_STATS,
        }),
      }),

      showContact: tool({
        description:
          "Hiển thị thông tin liên hệ HITC (hotline, email, địa chỉ, website).",
        parameters: z.object({}),
        execute: async () => ({ contact: HITC_CONTACT }),
      }),

      showWhyHITC: tool({
        description:
          "Hiển thị USP / lợi thế cạnh tranh của HITC. Dùng khi user hỏi 'tại sao chọn HITC', 'lợi thế', 'USP', 'so sánh với đối thủ', hoặc khi cần thuyết phục/chốt deal sau khi đã giới thiệu dịch vụ.",
        parameters: z.object({}),
        execute: async () => ({
          positioning: HITC_POSITIONING,
          usps: HITC_USPS,
        }),
      }),
    },
  });

  return result.toDataStreamResponse({
    getErrorMessage: (err) => {
      console.error("[/api/chat] error:", err);
      return err instanceof Error ? err.message : String(err);
    },
  });
}
