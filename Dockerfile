FROM node:16
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node package*.json ./
RUN npm install
COPY --chown=node ./ .
RUN npm run build
EXPOSE 5001
CMD ["npm", "run", "start:prod"]
