import { analyzeFoodLabel } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No se proporcionó ninguna imagen." }, { status: 400 });
    }

    const analysis = await analyzeFoodLabel(image);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error en el análisis:", error);
    return NextResponse.json(
      { error: "Hubo un problema al analizar la etiqueta. Intenta con una foto más clara." },
      { status: 500 }
    );
  }
}
