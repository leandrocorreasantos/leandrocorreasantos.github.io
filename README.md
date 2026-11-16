# Blog pessoal — geopolítica, finanças e tecnologia

Site estático construído com [Hugo](https://gohugo.io/) e o tema
[m11c](https://github.com/leandrocorreasantos/hugo-theme-m11c), publicado no
GitHub Pages via GitHub Actions.

- Produção: <https://leandrocorreasantos.github.io/>
- Conteúdo: geopolítica, finanças e tecnologia.

## Requisitos

- Hugo **0.170+** (a edição *extended* foi removida nessa versão)
- [Dart Sass](https://gohugo.io/functions/css/sass/#dart-sass) no `PATH` (o tema usa SCSS)

Instalação local sem `sudo`:

```bash
mkdir -p ~/.local/bin ~/.local/dart-sass

curl -sSL https://github.com/gohugoio/hugo/releases/download/v0.170.0/hugo_0.170.0_linux-amd64.tar.gz \
  | tar -xz -C ~/.local/bin hugo

curl -sSL https://github.com/sass/dart-sass/releases/download/1.108.2/dart-sass-1.108.2-linux-x64.tar.gz \
  | tar -xz -C ~/.local/dart-sass --strip-components=1
ln -sf ~/.local/dart-sass/sass ~/.local/bin/sass
```

## Uso

```bash
git clone --recurse-submodules git@github.com:leandrocorreasantos/leandrocorreasantos.github.io.git
cd leandrocorreasantos.github.io

hugo server -D        # preview em http://localhost:1313
hugo --gc --minify    # build de produção em public/
```

Ao clonar sem `--recurse-submodules`, rode `git submodule update --init --recursive`.

## Escrevendo

```bash
hugo new content posts/meu-novo-post.md
```

O arquétipo já preenche `date`, `draft`, `description`, `categories` e `tags`.
Categorias usadas no menu: `Geopolítica`, `Finanças`, `Tecnologia`.

- Rascunhos (`draft = true`) aparecem no `hugo server -D`, mas não no build de produção.
- Imagens ficam em `static/` (ex.: `static/images/meu-post/foto.png` → `/images/meu-post/foto.png`).
- Datas são exibidas em português via `time.Format ":date_long"` nos overrides de `layouts/`.

## Estrutura

```
content/
  _index.md                    # introdução da home
  about.md                     # página Sobre
  categories/<tema>/_index.md  # introdução de cada categoria
  posts/                       # artigos
layouts/_default/              # overrides de listagem e post (textos em PT)
static/                        # avatar, favicon e imagens
themes/hugo-theme-m11c/        # submódulo do tema
```

## Publicação

O workflow `.github/workflows/deploy.yml` roda a cada push em `master`:

1. baixa Hugo 0.170.0 e Dart Sass 1.108.2;
2. builda o site com `--baseURL` do Pages;
3. publica o artefato com `actions/deploy-pages`.

O GitHub Pages precisa estar configurado uma única vez com
**Source: GitHub Actions** (Settings → Pages). Também é possível habilitar via CLI:

```bash
gh api --method POST repos/leandrocorreasantos/leandrocorreasantos.github.io/pages \
  -f build_type=workflow
```

## Tema

O tema é um submódulo fixado em um commit específico. Para atualizar:

```bash
git submodule update --remote themes/hugo-theme-m11c
```

As correções de compatibilidade com Hugo 0.170/Dart Sass estão no repositório do
tema (seletores SCSS de `c++`/`c#`, `site.Language.Locale` e `hugo.Data`). Se
editar o tema localmente, faça commit/push lá e atualize o ponteiro do submódulo.

## Histórico

Este repositório já foi um site Jekyll (2020–2023) e depois foi substituído por
um README de perfil. Em 2026 voltou a ser um blog, agora com Hugo.
