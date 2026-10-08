import { dbService } from "@/services/dbService";
import { NextResponse } from "next/server";

// GET: Fetch all items for a resource (e.g., /api/blogs or /api/services)
export async function GET(request, { params }) {
  const { resource } = await params;
  const result = await dbService.getAll(resource);
  
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true, data: result.data });
}

// POST: Create a new item
export async function POST(request, { params }) {
  const { resource } = await params;
  try {
    const body = await request.json();
    const result = await dbService.create(resource, body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ success: true, id: result.id, data: result.data });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}

// PUT / PATCH: Update an item
export async function PUT(request, { params }) {
  const { resource } = await params;
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const result = await dbService.update(resource, id, updates);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// DELETE: Remove an item
export async function DELETE(request, { params }) {
  const { resource } = await params;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });

  const result = await dbService.remove(resource, id);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true, message: "Deleted successfully" });
}