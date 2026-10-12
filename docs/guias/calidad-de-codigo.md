# Calidad de código

- **Linter/Formatter**: Biome (no ESLint/Prettier). El linting de Biome está desactivado para `.astro`; solo aplica formato.
- **Formato**: tabs, comillas dobles, punto y coma, comas finales, paréntesis siempre en arrow functions.
- **Orden de imports**: Biome lo exige (paquetes externos alfabéticamente antes que internos). Es la fuente más común de errores de lint.
- **Git hooks**: Husky + lint-staged ejecuta `biome check --fix` en archivos `.js/.jsx/.ts/.tsx/.astro` en stage y `biome format --write` en `.json/.css`.
- **Commits**: Conventional Commits con commitlint. Tipos permitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

## Hooks de Claude Code (`.claude/`)

- `hooks/check-conventions.sh` (PostToolUse en Write/Edit): corre Biome y avisa de imports relativos profundos, hex de marca hardcodeados y directivas `client:*` dentro de `.tsx`.
- `hooks/block-coauthor.sh` (PreToolUse en Bash): bloquea commits con trailer `Co-Authored-By`.
