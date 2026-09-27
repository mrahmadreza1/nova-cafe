import { NextResponse } from "next/server";

/* ذخیرهٔ درون‌حافظه‌ای برای نمونه. در محیط واقعی به دیتابیس و
   یک کانال realtime (Supabase / Pusher) وصل شود تا KDS زنده شود. */

export type OrderStatus = "new" | "preparing" | "ready" | "done";

export type KitchenOrder = {
  id: string;
  number: string;
  table: number;
  status: OrderStatus;
  total: number;
  items: { name: string; qty: number }[];
  createdAt: number;
};

const orders: KitchenOrder[] = [];
let counter = 1041;

export async function GET() {
  return NextResponse.json({ orders });
}

export async function POST(req: Request) {
  const body = await req.json();
  const order: KitchenOrder = {
    id: crypto.randomUUID(),
    number: String(++counter),
    table: body.table ?? 0,
    status: "new",
    total: body.total ?? 0,
    items: body.items ?? [],
    createdAt: Date.now(),
  };
  orders.unshift(order);
  return NextResponse.json({ order }, { status: 201 });
}

export async function PATCH(req: Request) {
  const { id, status } = (await req.json()) as { id: string; status: OrderStatus };
  const order = orders.find((o) => o.id === id);
  if (!order) return NextResponse.json({ error: "سفارش پیدا نشد" }, { status: 404 });
  order.status = status;
  return NextResponse.json({ order });
}
