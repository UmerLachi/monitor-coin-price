# Coin Price Monitor

This is a script that monitors the price of a coin from coinmarketcap and sends you an email if the target price is reached

# Env Variables

Create a .env file in then root and add the following

```
MAIL_SERVER_HOST = yourSmtpHost
MAIL_SERVER_USER = yourSmtpUser
MAIL_SERVER_PASS = yourSmtpPass
MAIL_SERVER_PORT = 587
FROM_EMAIL = sender@example.com
TO_EMAIL = reciever@example.com
COIN_NAME = Bitcoin
COIN_URL = https://coinmarketcap.com/currencies/bitcoin/
```

# Install Dependencies

```bash
$ yarn
# or
$ yarn install
```

# Run the script

```
yarn start
```
