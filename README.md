# Legal PRO Vercel Admin

Plantilla legal para Stremio con panel admin desde navegador.
Solo para contenido propio o licenciado.

## Funciones
- HTTPS/SSL automático en Vercel
- manifest.json compatible con Stremio
- endpoints catalog/meta/stream
- panel admin visual en /admin
- importación/exportación JSON
- edición de catálogo desde navegador
- demo listo en data/catalog.json

## Despliegue
1. Sube el proyecto a GitHub
2. Importa el repo en Vercel
3. Despliega
4. Abre /admin para editar el catálogo
5. Exporta el JSON y sustituye data/catalog.json en tu repo
6. Redeploy

## Nota
En Vercel estático, el panel edita en navegador y exporta JSON.
Para guardar directamente online haría falta base de datos o KV.
