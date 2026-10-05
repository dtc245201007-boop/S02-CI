# [Thực hành] Chuyển đổi CSS sang SASS/SCSS

## Mục tiêu
- Chuyển CSS truyền thống sang SCSS.
- Sử dụng variables, mixins, nesting và partials.
- Tổ chức mã nguồn theo thư mục `abstracts`, `base`, `layout`, `components`.
- Đưa mã nguồn lên GitHub.

## Cấu trúc

```text
bai-thuc-hanh-sass/
├── index.html
├── package.json
├── README.md
├── css/
│   └── main.css
└── scss/
    ├── main.scss
    ├── abstracts/
    │   ├── _variables.scss
    │   └── _mixins.scss
    ├── base/
    │   └── _global.scss
    ├── layout/
    │   └── _container.scss
    └── components/
        ├── _buttons.scss
        └── _cards.scss
```

## Chạy bài

```bash
npm install
npm run sass
```

Sau đó mở `index.html` bằng trình duyệt.
