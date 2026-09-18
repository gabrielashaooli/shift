// El runtime de Cloudflare expone las conexiones del Worker en este módulo.
// No trae tipos propios en el proyecto, así que se declara lo que se usa.
declare module "cloudflare:workers" {
  export const env: {
    AI?: {
      run: (
        model: string,
        input: Record<string, unknown>,
      ) => Promise<{ response?: unknown; usage?: Record<string, number> }>;
    };
  };
}
