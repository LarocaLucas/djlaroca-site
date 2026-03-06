# DJ Laroca — Site Oficial

Site institucional / landing page do DJ Laroca, especializado em Funk e Rave Funk.

---

## 📁 Estrutura do Projeto

```
djlaroca/
├── index.html          # Estrutura principal da página
├── css/
│   └── style.css       # Estilos globais e componentes
├── js/
│   └── main.js         # Scripts e interatividade
├── assets/
│   ├── images/         # Fotos, logo e imagens do site
│   │   └── laroca-logo.png
│   └── fonts/          # Fontes locais (se necessário)
└── README.md           # Este arquivo
```

---

## 🎨 Identidade Visual

| Elemento        | Valor             |
|----------------|-------------------|
| Cor principal  | `#9b30ff` (roxo)  |
| Cor neon       | `#d966ff`         |
| Background     | `#060408`         |
| Fonte display  | Bebas Neue        |
| Fonte título   | Black Ops One     |
| Fonte corpo    | Space Mono        |
| Fonte UI       | Oswald            |

---

## 📄 Seções do Site

1. **Hero** — Logo, gêneros musicais, estatísticas
2. **Sobre** — Biografia e foto do artista
3. **Estilos & Sonoridade** — Cards de Funk, Rave Funk, Sets ao Vivo
4. **Histórico** — Timeline da trajetória
5. **Galeria** — Grid de fotos + mini vídeos
6. **Contato** — Redes sociais + botão Press Kit

---

## 🚀 Deploy (AWS)

O site é estático (HTML + CSS + JS puro), sem dependências de build.

### Opções de hospedagem recomendadas:
- **AWS S3 + CloudFront** — Ideal para site estático com CDN global
- **AWS Amplify** — Deploy automático via Git
- **EC2 + Nginx** — Caso já tenha instância rodando

### Subir para servidor via SCP:
```bash
scp -r ./djlaroca ubuntu@<IP_DA_VM>:/var/www/html/
```

### Nginx config sugerida:
```nginx
server {
    listen 80;
    server_name djlaroca.com.br;
    root /var/www/html/djlaroca;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

## 🛠️ Personalização

### Adicionar fotos reais:
Coloque os arquivos em `assets/images/` e referencie no HTML:
```html
<img src="assets/images/foto-evento.jpg" alt="DJ Laroca no evento">
```

### Atualizar links das redes sociais:
Em `index.html`, localize a seção `#contato` e atualize os `href`:
```html
<a href="https://instagram.com/SEU_USUARIO" ...>
<a href="https://tiktok.com/@SEU_USUARIO" ...>
<a href="https://soundcloud.com/SEU_USUARIO" ...>
```

### Atualizar link do Press Kit:
```html
<a href="assets/presskit-laroca.pdf" class="press-kit-btn">
```

---

## 📦 Dependências Externas (CDN)

| Biblioteca     | Uso                        |
|---------------|----------------------------|
| Google Fonts  | Black Ops One, Bebas Neue, Space Mono, Oswald |

Nenhuma dependência npm ou build necessária.

---

## 👨‍💻 Desenvolvimento

Projeto desenvolvido com assistência de IA (Claude - Anthropic).

**Stack:** HTML5 · CSS3 · JavaScript Vanilla

---

## 📝 Changelog

### v1.0.0
- Estrutura inicial do projeto
- Layout hero com logo e animações
- Seções: Sobre, Estilos, Histórico, Galeria, Contato
- Logo oficial integrada
- Cursor customizado com glow roxo
- Scroll reveal animations
- Layout responsivo (mobile-first)
