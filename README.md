# Algoritma

Proje Nestjs(Backend) ve React(Frontend) altyapısı ile kurulmuştur. Veritabanı olarak MongoDB kullanılmıştır.


## Proje Kurulumu

Gereksinimler:
Node.js (npm)
MongoDB Compass
Nestjs CLI

### Node.js
node.js kurulumu için ilk önce şu adrese gitmeli ve Current versiyonunu indirmelisiniz.
https://nodejs.org/en/download/prebuilt-installer


Node.js kurulumunu yaptıktan sonra (terminal üzerinden node -v / npm -v) yapıp kontrol edin
yüksek ihtimalle kusursuz kurulacaktır
bilgisayarınızda node varsa yeniden yüklemeyin >18 olması yeterli

### MongoDB Compass
Burada 2 adet program yüklenecek

1- GUI Kurulumu
https://www.mongodb.com/try/download/compass

2- Community Server Kurulumu
https://www.mongodb.com/try/download/community-edition

### Nestjs CLI
Bilgisayar terminalini açıp `npm i -g @nestjs/cli` komutunu çalıştırın
NOT: npm recognized gibi bir hata alıyorsanız. Bilgisayarı bu durumda yeniden başlatın ve deneyin


## Proje Clone Kısmı
Mevcut Repository kısmında CODE alanından kodları zip olarak indirebilir.
ya da
GİTHUB üzerinden clone olarak alabilirsiniz.
NOT: Bu durumda bilgisayarınızda git yoksa yüklemeniz gerekir

## Proje Kurulduktan Sonra
Kullanılan ide içerisinde 2 farklı terminal açın
1.Terminal:
`cd frontend`
`npm i` hata verirse `npm i --force`
`npm run start`

2. Terminal
`cd backend`
`npm i` hata verirse `npm i --force`
`npm run start:dev`

Bu durumdan sonra projeniz hem veritabanında hem backend(nest) hem frontend(web) kısmında çalışacaktır

## Veritabanına Bağlanıp Verileri Görmek
MongoDB Compass uygulamasını açın
mongodb://localhost:27017 ya da mongodb://localhost:27017/Algoritma
olarak bağlantı kurun
