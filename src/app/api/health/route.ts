export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    ok: true,
    mode: "frontend-demo",
    message: "TutorMigo Debate UI is running.",
  });
}
