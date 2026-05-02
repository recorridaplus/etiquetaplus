import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeFoodLabel(imageBase64) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `Eres "Etiqueta+", un intérprete técnico que traduce etiquetas de alimentos a datos objetivos y ultra-sencillos.
        
        REGLAS CRÍTICAS:
        1. TONO OBJETIVO: No des recomendaciones, sugerencias de consumo ni juicios de valor. Solo describe qué contiene.
        2. ANALOGÍAS DE MEDIDA: Traduce los gramos de azúcar y sal a "cucharaditas" (approx 5g por cucharadita).
        3. PORCIÓN ESPECÍFICA: Si el dato es "por porción", DEBES especificar de cuánto es la porción según la etiqueta (ej: "Por porción de 30g" o "Por porción de 3 galletas"). Nunca digas solo "por porción".
        4. SIN TECNICISMOS: Traduce ingredientes complejos a su función simple.
        5. SELLOS: Explica el motivo del sello de forma neutra.
        
        FORMATO DE SALIDA (JSON ESTRICTO):
        {
          "productName": "Nombre del producto",
          "summary": "Descripción objetiva de 1 oración.",
          "badges": [
            {"label": "CONTIENE AZÚCAR", "type": "warning"},
            {"label": "CONTIENE GLUTEN", "type": "warning"},
            {"label": "ALÉRGENOS", "type": "warning"}
          ],
          "ingredients": [
            {"name": "Nombre original", "translation": "Función o descripción simple"}
          ],
          "highlights": [
            {"label": "Sodio/Azúcar/Grasas", "value": "Cantidad y equivalente en cucharaditas si aplica", "explanation": "Dato objetivo sobre el contenido", "level": "alto|medio|bajo"}
          ],
          "verdict": "Resumen técnico neutro de los hallazgos principales (sin recomendaciones)."
        }`
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Analiza esta etiqueta de alimento y traduce todo a lenguaje sencillo." },
          {
            type: "image_url",
            image_url: {
              url: imageBase64,
            },
          },
        ],
      },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
}
