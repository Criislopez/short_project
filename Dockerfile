FROM node:24-alpine
COPY . .
RUN npm
CMD  ["npm", "start"]