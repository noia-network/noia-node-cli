docker build . --tag noia/alpine
docker run --rm -p :7676:7676 -e WALLET_ADDRESS=0x4adc7773bceedf7b4c687f9bfdd1598378b7d5e1 noia/alpine
