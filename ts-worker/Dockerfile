FROM keymetrics/pm2:12-alpine

# Bundle APP files
COPY src src/
COPY package.json .
COPY tsconfig.json .
COPY app.yml .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production
RUN npm run build

# Expose the listening port of your app
EXPOSE 3000

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "app.yml", "--no-autorestart" ]