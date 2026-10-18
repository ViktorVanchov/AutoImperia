FROM nginxinc/nginx-unprivileged:stable-alpine

COPY index.html styles.css app.js presentation.js /usr/share/nginx/html/

EXPOSE 8080
