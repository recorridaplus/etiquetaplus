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
        2. ANALOGÍAS DE MEDIDA: Traduce los gramos de azúcar y sal a "cucharaditas".
        3. VALOR PRINCIPAL HUMANO: El campo "value" DEBE ser una frase humana y sencilla (ej: "No contiene Sodio", "Mucha Azúcar", "Grasas Moderadas"). NUNCA pongas solo un número técnico (como "0mg") en el campo "value".
        4. DATOS TÉCNICOS EN EXPLICACIÓN: Pon los datos técnicos o porciones en el campo "explanation" (ej: "0mg por porción de 30g").
        5. SIN TECNICISMOS: Traduce ingredientes complejos a su función simple.
        6. SELLOS: Explica el motivo del sello de forma neutra.
        
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
