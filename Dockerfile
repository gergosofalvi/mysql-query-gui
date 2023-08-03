# Alapvető kép létrehozása Node.js alkalmazásokhoz
FROM node:18

# Munkakönyvtár beállítása az alkalmazás számára
WORKDIR /usr/src/app

# Függőségek másolása és telepítése
COPY package*.json ./
RUN npm install

# Alkalmazás másolása a munkakönyvtárba
COPY . .

# Port beállítása, amin az alkalmazás fut
EXPOSE 3000

# Indítás az "npm start" parancs segítségével
CMD ["npm", "start"]