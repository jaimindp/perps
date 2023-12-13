# %%

import requests

# %%

url = "https://api-testnet.aevo.xyz/orders"

payload = {
    "instrument": 4561,
    "maker": "0xAf553Fa01c1d7c1677E35d8BB1b81982B1711002",
    "is_buy": True,
    "amount": "10",
    "limit_price": 252,
    "salt": "12345678",
    "signature": SIGNING_KEY,
    "timestamp": "1680249600",
    "post_only": False,
    "reduce_only": False,
    "time_in_force": "GTC",
    "mmp": False,
    "stop": "STOP_LOSS",
    "trigger": 200,
    "close_position": False
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "AEVO-KEY": API_KEY,
    "AEVO-SECRET": API_SECRET
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)