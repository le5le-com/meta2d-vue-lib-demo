import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs';
import formidable from 'formidable';
import { resolve, join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    fileList(),
  ]
})

function fileList() {
  return {
    name: 'vite-plugin-svg-png-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ;

        if (
          (url.startsWith('/svg/') || url.startsWith('/png/')) &&
          url.endsWith('/')
        ) {
          const pwd = decodeURI(join(__dirname, 'public', url));
          const files = fs.readdirSync(pwd, {
            withFileTypes: true,
          });

          const list= [];
          for (const item of files) {
            if (item.isDirectory()) {
              list.push({ name: item.name, type: 'directory' });
            } else {
              list.push({ name: item.name });
            }
          }
          res.end(JSON.stringify(list));
        } else if (url === '/img' && req.method === 'POST') {
          const form = formidable({
            uploadDir: decodeURI(join(__dirname, 'public', '/img')),
            keepExtensions: true,
          });
          form.parse(req, (err, fields, files) => {
            if (!err) {
              res.end(
                JSON.stringify({ url: '/img/' + files.file.newFilename })
              );
            }
          });
        } else {
          next();
        }
      });
    },
  };
}
